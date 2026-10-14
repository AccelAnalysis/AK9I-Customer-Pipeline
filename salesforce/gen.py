"""Regenerate phase-1 field XML, the Outreach Log, the permission set, and
lead-convert-mappings.json. Run from salesforce/. Does not deploy and does not
rewrite sfdx-project.json.
"""
import os, textwrap
from xml.sax.saxutils import escape as e
base="force-app/main/default/objects"
STAGES=["Awareness","Consideration","Enrollment","Training and Experience","Loyalty","Recurring Relationships","Advocacy"]
CONSENT=["Not Yet Engaged","Opted Out","Responded - Consent Not Confirmed","Consent Confirmed"]
CONSENT_SRC=["Web-to-Lead Form","Enrollment Form","Webinar Registration","Email Reply","Text Reply","Phone Call","In Person / Event","Rep / Event Form","Other"]
COURSES=['Detector Dog Handler 001','AK9ITA-005, P/D Dog Handler','AK9ITA-006, P/D Dog Trainer','AK9ITA-010, LEO P/D Dog Handler','AK9ITA-011, Static Mobile Detector Dog Handler','AK9ITA-012, Pet Dog Trainer','AK9ITA-013, Detector Dog Trainer']
LANE=["Student","Contract Client"]
ALUMNI=["Email","Text","Phone","Do Not Contact"]
MSGTYPE=["Email","Text","Outbound Call","Inbound Call","Voicemail","In Person"]
SOLICITED=["Unsolicited","Solicited"]
fields=[]  # (object, api, type, label, desc, extra)
def F(obj,api,typ,label,desc,**kw): fields.append((obj,api,typ,label,desc,kw))
for o in ("Lead","Contact"):
    F(o,"AK9I_Student_Stage__c","Picklist","Student Stage","L02. Seven-stage AK9I student pipeline.",values=STAGES)
    F(o,"AK9I_Next_Action__c","Text","Next Action","L03. Next step owed to this person.",length=255)
    F(o,"AK9I_Next_Action_Date__c","Date","Next Action Date","L04. Due date for Next Action.")
    F(o,"AK9I_Consent_Status__c","Picklist","Consent Status","L06-L08. Three-bucket consent model (Jonathan, Oct 13): Opted Out is a hard stop; Responded - Consent Not Confirmed stays under the 2-per-30-day unsolicited cap; Consent Confirmed opens the solicited lane. Not Yet Engaged = cold inbound.",values=CONSENT)
    F(o,"AK9I_Consent_Source__c","Picklist","Consent Source","L08. Where consent was captured.",values=CONSENT_SRC)
    F(o,"AK9I_Consent_Timestamp__c","DateTime","Consent Timestamp","L08. When consent was captured.")
    F(o,"AK9I_Consent_Evidence__c","LongTextArea","Consent Evidence","L08. Exact consent wording / form version / reply text.",length=32768,lines=4)
    F(o,"AK9I_Referred_By__c","Text","Referred By","L23.",length=255)
F("Lead","AK9I_Customer_Lane__c","Picklist","Customer Lane","L01. Student vs Contract Client lane on Lead.",values=LANE)
F("Contact","AK9I_Customer_Lane__c","Picklist","Customer Lane","L01. Lane selector; Contract_Path__c stays the contract stage field.",values=LANE)
F("Lead","AK9I_Program_Interest__c","Picklist","Program Interest","L05. Mirrors Contact.Course__c values so it maps at conversion.",values=COURSES)
# Contact-only build fields
F("Contact","AK9I_Actual_Start_Date__c","Date","Actual Start Date","L12.")
F("Contact","AK9I_Documents_Complete__c","Checkbox","Documents Complete","L13 (confirm no existing equivalent).")
F("Contact","AK9I_Red_List__c","Checkbox","Red List","L14. At-risk student flag.")
F("Contact","AK9I_Alumni_Contact_Preference__c","Picklist","Alumni Contact Preference","L17.",values=ALUMNI)
F("Contact","AK9I_Next_Employment_Followup__c","Date","Next Employment Follow-up","L18. Drives F10 30/60/90 check-ins.")
F("Contact","AK9I_Outcome_Evidence_On_File__c","Checkbox","Outcome Evidence On File","L21. ACCET outcome evidence.")
F("Contact","AK9I_Advocacy_Consent__c","Checkbox","Advocacy Consent","L22. Testimonial/referral consent.")
# Contact counterparts so Lead data survives conversion (L-MAP / L-MAP2)
F("Contact","Consent_Informational__c","Checkbox","Consent: Informational Messages","L-MAP counterpart of Lead.Consent_Informational__c.")
F("Contact","Consent_Marketing_Text__c","Checkbox","Consent: Marketing Text Messages","L-MAP counterpart of Lead.Consent_Marketing_Text__c.")
F("Contact","No_Text_Messages__c","Checkbox","No Text Messages Opt-Out","L-MAP counterpart of Lead.No_Text_Messages__c.")
F("Contact","Initial_Contact_Date__c","Date","Initial Contact Date","L-MAP counterpart.")
F("Contact","Alternate_Registration_Email__c","Email","Alternate Registration Email","L-MAP counterpart.")
for o in ("Contact",):
    F(o,"Rep_Code__c","Text","Rep Code","L-MAP2. James's rep attribution from the Web-to-Lead rep/event form.",length=50)
    F(o,"Event_Code__c","Text","Event Code","L-MAP2. Event attribution.",length=50)
# Outreach Log object fields
OL="AK9I_Outreach_Log__c"
F(OL,"Lead__c","Lookup","Lead","X01.",ref="Lead",rel="Outreach_Logs")
F(OL,"Contact__c","Lookup","Contact","X02.",ref="Contact",rel="Outreach_Logs")
F(OL,"Opportunity__c","Lookup","Opportunity","Optional link.",ref="Opportunity",rel="Outreach_Logs")
F(OL,"Message_Type__c","Picklist","Message Type","X03.",values=MSGTYPE,required=True)
F(OL,"Solicited__c","Picklist","Solicited / Unsolicited","Drives the 2-per-30-day unsolicited cap (F0, report R2).",values=SOLICITED,required=True)
F(OL,"Template_Version__c","Text","Template / Version","X04.",length=255)
F(OL,"Sent_At__c","DateTime","Sent At","X05.",required=True)
F(OL,"Stage_At_Send__c","Picklist","Stage At Send","X06.",values=STAGES)
F(OL,"Consent_Status_At_Send__c","Picklist","Consent Status At Send","Snapshot of consent bucket when the touch went out.",values=CONSENT)
F(OL,"Sent_By__c","Text","Sent By / Caller","Person or automation that made the touch (e.g. Paul, F0).",length=255)
F(OL,"Outcome__c","Text","Outcome","Call/message outcome.",length=255)

def picklist(values):
    v="".join(f"\n            <value>\n                <fullName>{e(x)}</fullName>\n                <default>false</default>\n                <label>{e(x)}</label>\n            </value>" for x in values)
    return f"\n    <valueSet>\n        <restricted>true</restricted>\n        <valueSetDefinition>\n            <sorted>false</sorted>{v}\n        </valueSetDefinition>\n    </valueSet>"
def fieldxml(obj,api,typ,label,desc,kw):
    body=f"    <fullName>{api}</fullName>\n    <description>{e(desc)}</description>\n    <externalId>false</externalId>\n    <label>{e(label)}</label>\n"
    if typ!="Checkbox": body+=f"    <required>{'true' if kw.get('required') else 'false'}</required>\n"
    body+="    <trackHistory>false</trackHistory>\n" if obj not in("Lead","Contact","Opportunity") else ""
    body+=f"    <type>{typ}</type>"
    if typ=="Text": body+=f"\n    <length>{kw['length']}</length>\n    <unique>false</unique>"
    if typ=="LongTextArea": body+=f"\n    <length>{kw['length']}</length>\n    <visibleLines>{kw['lines']}</visibleLines>"
    if typ=="Checkbox": body+="\n    <defaultValue>false</defaultValue>"
    if typ=="Email": body+="\n    <unique>false</unique>"
    if typ=="Picklist": body+=picklist(kw['values'])
    if typ=="Lookup": body+=f"\n    <deleteConstraint>SetNull</deleteConstraint>\n    <referenceTo>{kw['ref']}</referenceTo>\n    <relationshipLabel>Outreach Logs</relationshipLabel>\n    <relationshipName>{kw['rel']}</relationshipName>"
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">\n{body}\n</CustomField>\n'
for (obj,api,typ,label,desc,kw) in fields:
    d=f"{base}/{obj}/fields"; os.makedirs(d,exist_ok=True)
    open(f"{d}/{api}.field-meta.xml","w").write(fieldxml(obj,api,typ,label,desc,kw))
os.makedirs(f"{base}/{OL}",exist_ok=True)
open(f"{base}/{OL}/{OL}.object-meta.xml","w").write(f'''<?xml version="1.0" encoding="UTF-8"?>
<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">
    <deploymentStatus>Deployed</deploymentStatus>
    <description>X01-X06. One row per outreach touch (email, text, call). Required before F0 guarded send; feeds the 2-per-30-day unsolicited cap audit (R2).</description>
    <enableActivities>false</enableActivities>
    <enableBulkApi>true</enableBulkApi>
    <enableHistory>false</enableHistory>
    <enableReports>true</enableReports>
    <enableSearch>true</enableSearch>
    <enableSharing>true</enableSharing>
    <enableStreamingApi>true</enableStreamingApi>
    <label>Outreach Log</label>
    <nameField>
        <displayFormat>OL-{{000000}}</displayFormat>
        <label>Outreach Log Number</label>
        <type>AutoNumber</type>
    </nameField>
    <pluralLabel>Outreach Logs</pluralLabel>
    <sharingModel>ReadWrite</sharingModel>
    <visibility>Public</visibility>
</CustomObject>
''')
# Permission set granting FLS + object access
fp=""
for (obj,api,typ,label,desc,kw) in sorted(fields):
    if kw.get('required'): continue
    fp+=f"    <fieldPermissions>\n        <editable>true</editable>\n        <field>{obj}.{api}</field>\n        <readable>true</readable>\n    </fieldPermissions>\n"
os.makedirs("force-app/main/default/permissionsets",exist_ok=True)
open("force-app/main/default/permissionsets/AK9I_Pipeline_Fields.permissionset-meta.xml","w").write(f'''<?xml version="1.0" encoding="UTF-8"?>
<PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata">
    <description>Read/edit access to the AK9I pipeline phase-1 fields and the Outreach Log. Assign to Jonathan, Ron, Michelle and The AK9I Team.</description>
{fp}    <hasActivationRequired>false</hasActivationRequired>
    <label>AK9I Pipeline Fields</label>
    <objectPermissions>
        <allowCreate>true</allowCreate>
        <allowDelete>false</allowDelete>
        <allowEdit>true</allowEdit>
        <allowRead>true</allowRead>
        <modifyAllRecords>false</modifyAllRecords>
        <object>{OL}</object>
        <viewAllRecords>true</viewAllRecords>
    </objectPermissions>
</PermissionSet>
''')
# sfdx-project.json is the project shell for every phase. This script does not rewrite it.
# Lead conversion mapping additions (merged into a retrieved LeadConvertSettings, never deployed blind)
MAP={"Contact":[("Consent_Informational__c","Consent_Informational__c"),("Consent_Marketing_Text__c","Consent_Marketing_Text__c"),("No_Text_Messages__c","No_Text_Messages__c"),("Initial_Contact_Date__c","Initial_Contact_Date__c"),("Alternate_Registration_Email__c","Alternate_Registration_Email__c"),("Rep_Code__c","Rep_Code__c"),("Event_Code__c","Event_Code__c"),("AK9I_Program_Interest__c","Course__c"),("AK9I_Customer_Lane__c","AK9I_Customer_Lane__c")]+[(a,a) for a in ["AK9I_Student_Stage__c","AK9I_Next_Action__c","AK9I_Next_Action_Date__c","AK9I_Consent_Status__c","AK9I_Consent_Source__c","AK9I_Consent_Timestamp__c","AK9I_Consent_Evidence__c","AK9I_Referred_By__c"]]}
import json; json.dump(MAP,open("lead-convert-mappings.json","w"),indent=1)
print(len(fields),"fields")
