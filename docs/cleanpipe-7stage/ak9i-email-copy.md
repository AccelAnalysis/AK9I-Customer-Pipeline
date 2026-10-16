# AK9I pipeline email copy (approved by Jonathan; active in cleanpipe only)

Status (updated Oct 16, ~7:55 AM ET): all 58 new templates are **available (active) in cleanpipe only**, approved as-is by Jonathan; production is untouched. They are classic text templates in the hidden folder "AK9I Pipeline (Drafts)" (folder name unchanged) and are sent by the active flows in cleanpipe, each send through F0.

Placeholders: `{ENROLLMENT_FORM_URL}` (form link; production domain pending) `{BOOKINGS_URL}`, `{DOC_UPLOAD_URL}`, `{EMPLOYMENT_SURVEY_URL}`, `{ALUMNI_URL}` (matching custom labels AK9I_Bookings_URL etc. exist for flows; replace when the real URLs are known).

Facts used only from existing AK9I emails: address, phone, enrollment@ak9i.com, classes start the first Monday of every month, hands-on training with working dogs, VA / SkillBridge / VR&E. No prices or new claims. Marketing emails carry the existing unsubscribe wording plus the postal address; any email that says "GI Bill" carries the trademark notice.

## Existing templates reused (wording unchanged)

| Stage / trigger | Existing template |
|---|---|
| Applied (Contact Status Applied / Application Received) | Application Received (`Applicant_Engagement_1785772436128`), sent by Enrollment_Engagement_Strategy |
| Accepted: acceptance letter | Accepted Student Outreach (`Accepted_Student_Outreach_1785775370511`) |
| Accepted: $100 fee link | Enrollment - $100 Administrative Fee Payment (`Enrollment_100_Administrative_Fee_Payment_1791207900642`) |
| Enrolled: 30 / 7 days before start | 30 Days Before Start, 7 Days Before Start |
| Active Student: 2 weeks in | Active Student Outreach |
| Graduation: 2 weeks before / day of | Preparing for Graduation, Graduation Day Email |
| Nurture | Nurture Campaign Emails 1-12 (after the new N0 first touch) |

Notes on existing copy for Jonathan: "Preparing for Graduation" has a typo ("want to help"); "Active Student Outreach" says "midpoint" at 2 weeks, which is not the midpoint of 8- or 12-week courses; "Accepted Student Outreach" signs as "AK9I | BGK9 Team". Not changed.

## Source-tailored opening sentence (Lead Source x Status)

Every Stage 2 email (Nurture N0, Interested I1, partial-form P1) opens with a sentence chosen by Lead Source (formula field `Lead.AK9I_Source_Intro__c`), so each Lead Source x Status combination gets its own version:

| Lead Source | Opening sentence |
|---|---|
| Advertisement | Thank you for responding to our ad. |
| Contact Us | Thank you for reaching out to us through our website. |
| Instagram | Thanks for connecting with us on Instagram. |
| Facebook | Thanks for connecting with us on Facebook. |
| Job Fair | It was great to meet you at the job fair. |
| Trade Show | It was great to meet you at the trade show. |
| Referral | We are glad someone you know pointed you our way. |
| Skillbridge | Thank you for your interest in training with us through the DoD SkillBridge program. |
| TAPS | Thank you for connecting with us through your transition (TAP) program. |
| Web | Thank you for visiting our website. |
| Word of mouth | We are glad you heard about us. |
| YouTube | Thanks for watching our videos on YouTube. |
| Other | Thank you for your interest in American K-9 Interdiction. |
| BGK9 | Thank you for your interest through BGK9. |

## New templates

### P1 Partial form - day 1 (`AK9I_P1_Partial_Form_Day1`)
- Object: Lead  |  Trigger: Lead Status = Applicant (form started, not submitted) + 1 day  |  Transactional/solicited
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. {!Lead.AK9I_Source_Intro__c}

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### P2 Partial form - day 4 (`AK9I_P2_Partial_Form_Day4`)
- Object: Lead  |  Trigger: Still Applicant + 4 days  |  Transactional/solicited
- **Subject:** Questions about your enrollment form?

```
Hi {!Lead.FirstName},

We noticed your enrollment form is not finished yet. Many applicants pause to check dates, benefits or paperwork, and that is completely fine.

Our team can help with:
- choosing a course and start date
- VA education benefits, SkillBridge and VR&E
- what documents you will need

Finish your form: {ENROLLMENT_FORM_URL}
Or call (757) 304-9600.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### P3 Partial form - day 10 (`AK9I_P3_Partial_Form_Day10`)
- Object: Lead  |  Trigger: Still Applicant + 10 days (last partial-form email)  |  Transactional/solicited
- **Subject:** We saved your spot in the process

```
Hi {!Lead.FirstName},

Just one more note about your enrollment form. Classes start the first Monday of every month, so there is always an upcoming start date to plan around.

When you are ready, you can finish the form here: {ENROLLMENT_FORM_URL}

If now is not the right time, simply reply and let us know. We are glad to help whenever you are ready.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### I1 Interested - future: welcome (`AK9I_I1_Interested_Future_Welcome`)
- Object: Lead  |  Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0)  |  Marketing: needs marketing consent, F0, unsubscribe
- **Subject:** Planning your future start at AK9I

```
Hi {!Lead.FirstName},

Thank you for letting us know you are planning ahead. {!Lead.AK9I_Source_Intro__c}

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. When you are closer to your date, we will check in. In the meantime, you are welcome to call us with any questions about courses, housing or benefits.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### I2 Interested - future: 60-day check-in (`AK9I_I2_Interested_Future_Checkin`)
- Object: Lead  |  Trigger: +60 days  |  Marketing: needs marketing consent, F0, unsubscribe
- **Subject:** Checking in on your plans

```
Hi {!Lead.FirstName},

We wanted to check in on your plans to train with American K-9 Interdiction. If your timeline has changed, we can help you look at upcoming start dates and what you would need to get ready.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### I3 Interested - future: getting ready (`AK9I_I3_Interested_Future_Ready`)
- Object: Lead  |  Trigger: +90 days  |  Marketing: needs marketing consent, F0, unsubscribe
- **Subject:** Getting ready for your start date

```
Hi {!Lead.FirstName},

If your start date is getting closer, now is a good time to begin your enrollment form. It takes care of the agreement and lets our Student Services team schedule your phone interview.

Start here: {ENROLLMENT_FORM_URL}

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### N0 Nurture: source-tailored first touch (`AK9I_N0_Nurture_Source_Intro`)
- Object: Lead  |  Trigger: Lead Status = Nurture (day 0), then existing Nurture Emails 1-12  |  Marketing: needs marketing consent, F0, unsubscribe
- **Subject:** Thanks for your interest in American K-9 Interdiction

```
Hi {!Lead.FirstName},

{!Lead.AK9I_Source_Intro__c}

At American K-9 Interdiction, our training is hands-on with working dogs, and our programs start the first Monday of every month. If you have questions about courses, housing or education benefits, our team is happy to help.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### E1 Schedule your phone interview (`AK9I_E1_Schedule_Phone_Interview`)
- Object: Contact  |  Trigger: Enrollment Opportunity created at Applied (Enrollment Agreement step)  |  Transactional/solicited
- **Subject:** Next step: schedule your phone interview

```
Hi {!Contact.FirstName},

Thank you for submitting your enrollment form. The next step is a short phone interview with Michelle Hartman in Student Services.

Please choose a time that works for you:
{BOOKINGS_URL}

When you book, you can also confirm (optional):
- your course
- your course start and end dates
- single or dual purpose K9
- odor discipline

If you have questions before the call, contact Michelle at mhartman@ak9i.com or call (757) 304-9600.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600
```

### E2 Internal: interview not scheduled (`AK9I_E2_Interview_Not_Scheduled_Internal`)
- Object: Contact  |  Trigger: 2 days after Applied, no Interview Scheduled date (to Michelle)  |  Internal (Michelle)
- **Subject:** Applicant has not scheduled a phone interview: {!Contact.Name}

```
Michelle,

{!Contact.Name} applied two days ago and has not booked a phone interview yet.

Email: {!Contact.Email}
Phone: {!Contact.Phone}
Course: {!Contact.Course__c}

A Salesforce task has also been created for you. Please reach out to schedule the interview.
```

### E3 Documents request (`AK9I_E3_Documents_Request`)
- Object: Contact  |  Trigger: Enrollment Status = Accepted (sent with the acceptance letter and fee link)  |  Transactional/solicited
- **Subject:** Upload your enrollment documents

```
Hi {!Contact.FirstName},

To complete your enrollment, please upload these documents:
- High school or college diploma, or transcript
- Joint Service Transcript (JST)
- VA Certificate of Eligibility or Statement of Benefits

Upload them securely here:
{DOC_UPLOAD_URL}?key={!Contact.AK9I_Doc_Upload_Key__c}

If you are using a funding source other than VA benefits, or you do not have one of these documents, reply to this email and Student Services will tell you what to send instead.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

GI Bill(R) is a registered trademark of the U.S. Department of Veterans Affairs (VA). More information about education benefits offered by VA is available at the official U.S. government website at https://www.benefits.va.gov/gibill.
```

### E4 Documents reminder (`AK9I_E4_Documents_Reminder`)
- Object: Contact  |  Trigger: Accepted + 7 days with documents outstanding  |  Transactional/solicited
- **Subject:** Reminder: enrollment documents still needed

```
Hi {!Contact.FirstName},

We are still missing one or more of your enrollment documents. You can upload them here:
{DOC_UPLOAD_URL}?key={!Contact.AK9I_Doc_Upload_Key__c}

Need help? Contact Michelle Hartman at mhartman@ak9i.com or call (757) 304-9600.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600
```

### E5 Enrollment complete (`AK9I_E5_Enrollment_Complete`)
- Object: Contact  |  Trigger: Enrollment Status = Enrolled (documents + fee + funding)  |  Transactional/solicited
- **Subject:** You are enrolled at American K-9 Interdiction

```
Hi {!Contact.FirstName},

Congratulations! Your enrollment is complete. We have received your documents, your administrative fee and your funding confirmation.

Your course: {!Contact.Course__c}
Start date: {!Contact.Course_Start_Date__c}

We will be in touch before your start date with what to bring and where to go. If you have questions in the meantime, reply to this email or call (757) 304-9600.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600
```

### S1 Internal: student start notice (`AK9I_S1_Start_Notice_Internal`)
- Object: Contact  |  Trigger: Actual Start Date set (to Michelle)  |  Internal (Michelle)
- **Subject:** Student start recorded: {!Contact.Name}

```
Michelle,

An actual start date of {!Contact.AK9I_Actual_Start_Date__c} was recorded for {!Contact.Name} ({!Contact.Course__c}).

Please confirm attendance and set Enrollment Status to Active Student on the Enrollment Opportunity. If the student did not attend, record a no-show.
```

### L1 30-day employment confirmation (`AK9I_L1_Employment_Survey`)
- Object: Contact  |  Trigger: 30 days after graduation (Course End Date), Status = Graduated  |  Transactional/solicited
- **Subject:** Your 30-day employment update

```
Hi {!Contact.FirstName},

Congratulations again on graduating from American K-9 Interdiction. As part of our graduate follow-up, we ask every graduate to complete a short employment confirmation about 30 days after graduation.

Please complete and sign it here:
{EMPLOYMENT_SURVEY_URL}

It only takes a few minutes, and it helps us support you and future students.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600
```

### R1 Recurring products (scent kits, dog food) (`AK9I_R1_Recurring_Products`)
- Object: Contact  |  Trigger: Stage 6-Recurring; requires marketing consent; not Do Not Contact; not opted out  |  Marketing: needs marketing consent, F0, unsubscribe
- **Subject:** Supplies for your working dog

```
Hi {!Contact.FirstName},

As an AK9I graduate, you know how important the right supplies are to keep your dog's training sharp. American K-9 Interdiction offers training scent kits and dog food for graduates.

To ask about availability and pricing, reply to this email or call (757) 304-9600.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### A1 Alumni program invitation (`AK9I_A1_Alumni_Invite`)
- Object: Contact  |  Trigger: Stage 6-Recurring (survey received, not yet alumni)  |  Marketing: needs marketing consent, F0, unsubscribe
- **Subject:** Join the AK9I Alumni program

```
Hi {!Contact.FirstName},

We would love to stay connected. The AK9I Alumni program keeps graduates in touch with each other and with our team.

Register here: {ALUMNI_URL}

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

## Consideration series by Lead Source x Status (added Oct 16, second build)

Status: 42 templates `AK9I_C_<NU|IF|AP>_<Source>` active (available) in cleanpipe, in the hidden folder "AK9I Pipeline (Drafts)". They are sent by active flows, and every send goes through F0 (`AK9I_F0_Guarded_Send`). Lead Source values come from cleanpipe (14). Each combination's series:

| Status | Email 1 (tailored by source) | Follow-ups | F0 type |
|---|---|---|---|
| Nurture | `AK9I_C_NU_<Source>` (day 0, flow AK9I_Consideration_Series) | existing Nurture Campaign Emails 1-12, starting day 16 and spaced ≥16 days apart (see spacing below) | marketing, unsolicited (needs Consent Confirmed) |
| Interested - Future | `AK9I_C_IF_<Source>` (day 0) | I2 at +60 days, I3 at +90 days | marketing, unsolicited |
| Applicant (partial form) | `AK9I_C_AP_<Source>` (day 1, flow AK9I_Partial_Form_Series) | P2 at +4 days, P3 at +10 days | non-marketing, unsolicited (counts toward the 2-in-30-days cap) |

Placeholders: `{COURSE_INFO_URL}`, `{ENROLLMENT_FORM_URL}`, `{BGK9_RELATIONSHIP_NOTE}` (what is BGK9's relationship to AK9I? Lance/Jonathan to fill in). No prices, dates, or outcomes are stated. Every email ends with the existing unsubscribe line and the postal address.

### C Nurture - YouTube (`AK9I_C_NU_YouTube`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up after our videos

```
Hi {!Lead.FirstName},

Thanks for watching our videos on YouTube. Our training is hands-on with working dogs, and we are happy to answer any questions the videos raised.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Web (`AK9I_C_NU_Web`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up after your website visit

```
Hi {!Lead.FirstName},

Thank you for visiting our website. If you did not find an answer there, our team can walk you through courses, start dates and education benefits by phone.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Other (`AK9I_C_NU_Other`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Thanks for your interest in American K-9 Interdiction

```
Hi {!Lead.FirstName},

Thank you for your interest in American K-9 Interdiction. Our team can walk you through courses, start dates and education benefits whenever you are ready.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Skillbridge (`AK9I_C_NU_Skillbridge`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on SkillBridge

```
Hi {!Lead.FirstName},

Thank you for your interest in training with us through the DoD SkillBridge program. SkillBridge timing depends on your separation date and your command's approval, so it helps to plan early. Our team can explain how SkillBridge works with our course start dates.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Referral (`AK9I_C_NU_Referral`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on your referral

```
Hi {!Lead.FirstName},

We are glad someone you know pointed you our way. If you tell us who referred you, we would like to thank them. And if they shared their experience with you, we are happy to fill in the details.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Job Fair (`AK9I_C_NU_Job_Fair`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on the job fair

```
Hi {!Lead.FirstName},

It was great to meet you at the job fair. Thank you for stopping by our table. If you thought of questions after the event, we are glad to answer them.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Contact Us (`AK9I_C_NU_Contact_Us`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on your message

```
Hi {!Lead.FirstName},

Thank you for reaching out to us through our website. If we have not fully answered your question yet, reply to this email and we will.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Advertisement (`AK9I_C_NU_Advertisement`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Thanks for your interest in American K-9 Interdiction

```
Hi {!Lead.FirstName},

Thank you for responding to our ad. We are glad it caught your attention, and our team is ready to answer your questions.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Facebook (`AK9I_C_NU_Facebook`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on Facebook

```
Hi {!Lead.FirstName},

Thanks for connecting with us on Facebook. You can message us there at any time, or simply reply to this email.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - TAPS (`AK9I_C_NU_TAPS`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on your transition plans

```
Hi {!Lead.FirstName},

Thank you for connecting with us through your transition (TAP) program. If you plan to use VA education benefits, SkillBridge or VR&E, our team can explain how each one works with our programs.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Word of mouth (`AK9I_C_NU_Word_of_mouth`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Thanks for your interest in American K-9 Interdiction

```
Hi {!Lead.FirstName},

We are glad you heard about us. Whatever you have heard, we are happy to give you the full picture of our courses and start dates.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Instagram (`AK9I_C_NU_Instagram`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on Instagram

```
Hi {!Lead.FirstName},

Thanks for connecting with us on Instagram. You can message us there at any time, or simply reply to this email.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - BGK9 (`AK9I_C_NU_BGK9`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on BGK9

```
Hi {!Lead.FirstName},

Thank you for your interest through BGK9. {BGK9_RELATIONSHIP_NOTE}

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Nurture - Trade Show (`AK9I_C_NU_Trade_Show`)
- Trigger: Lead Status = Nurture, not converted (day 0). Follow-ups: existing Nurture Campaign Emails 1-12.  |  Marketing
- **Subject:** Following up on the trade show

```
Hi {!Lead.FirstName},

It was great to meet you at the trade show. Thank you for stopping by our booth. If you thought of questions after the show, we are glad to answer them.

At American K-9 Interdiction, training is hands-on with working dogs, and our programs start the first Monday of every month. When you would like to look at courses, housing or education benefits, our team is happy to help.

Course information: {COURSE_INFO_URL}
Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - YouTube (`AK9I_C_IF_YouTube`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (after our videos)

```
Hi {!Lead.FirstName},

Thanks for watching our videos on YouTube. Thank you for letting us know you are planning ahead. Our training is hands-on with working dogs, and we are happy to answer any questions the videos raised.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Web (`AK9I_C_IF_Web`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (after your website visit)

```
Hi {!Lead.FirstName},

Thank you for visiting our website. Thank you for letting us know you are planning ahead. If you did not find an answer there, our team can walk you through courses, start dates and education benefits by phone.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Other (`AK9I_C_IF_Other`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your future start at AK9I

```
Hi {!Lead.FirstName},

Thank you for your interest in American K-9 Interdiction. Thank you for letting us know you are planning ahead. Our team can walk you through courses, start dates and education benefits whenever you are ready.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Skillbridge (`AK9I_C_IF_Skillbridge`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (SkillBridge)

```
Hi {!Lead.FirstName},

Thank you for your interest in training with us through the DoD SkillBridge program. Thank you for letting us know you are planning ahead. SkillBridge timing depends on your separation date and your command's approval, so it helps to plan early. Our team can explain how SkillBridge works with our course start dates.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Referral (`AK9I_C_IF_Referral`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (your referral)

```
Hi {!Lead.FirstName},

We are glad someone you know pointed you our way. Thank you for letting us know you are planning ahead. If you tell us who referred you, we would like to thank them. And if they shared their experience with you, we are happy to fill in the details.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Job Fair (`AK9I_C_IF_Job_Fair`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (the job fair)

```
Hi {!Lead.FirstName},

It was great to meet you at the job fair. Thank you for letting us know you are planning ahead. Thank you for stopping by our table. If you thought of questions after the event, we are glad to answer them.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Contact Us (`AK9I_C_IF_Contact_Us`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (your message)

```
Hi {!Lead.FirstName},

Thank you for reaching out to us through our website. Thank you for letting us know you are planning ahead. If we have not fully answered your question yet, reply to this email and we will.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Advertisement (`AK9I_C_IF_Advertisement`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your future start at AK9I

```
Hi {!Lead.FirstName},

Thank you for responding to our ad. Thank you for letting us know you are planning ahead. We are glad it caught your attention, and our team is ready to answer your questions.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Facebook (`AK9I_C_IF_Facebook`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (Facebook)

```
Hi {!Lead.FirstName},

Thanks for connecting with us on Facebook. Thank you for letting us know you are planning ahead. You can message us there at any time, or simply reply to this email.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - TAPS (`AK9I_C_IF_TAPS`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (your transition plans)

```
Hi {!Lead.FirstName},

Thank you for connecting with us through your transition (TAP) program. Thank you for letting us know you are planning ahead. If you plan to use VA education benefits, SkillBridge or VR&E, our team can explain how each one works with our programs.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Word of mouth (`AK9I_C_IF_Word_of_mouth`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your future start at AK9I

```
Hi {!Lead.FirstName},

We are glad you heard about us. Thank you for letting us know you are planning ahead. Whatever you have heard, we are happy to give you the full picture of our courses and start dates.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Instagram (`AK9I_C_IF_Instagram`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (Instagram)

```
Hi {!Lead.FirstName},

Thanks for connecting with us on Instagram. Thank you for letting us know you are planning ahead. You can message us there at any time, or simply reply to this email.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - BGK9 (`AK9I_C_IF_BGK9`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (BGK9)

```
Hi {!Lead.FirstName},

Thank you for your interest through BGK9. Thank you for letting us know you are planning ahead. {BGK9_RELATIONSHIP_NOTE}

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Interested - Future - Trade Show (`AK9I_C_IF_Trade_Show`)
- Trigger: Lead Status = Interested - Future Enrollment is > 3 months (day 0). Follow-ups: I2 (+60 days), I3 (+90 days).  |  Marketing
- **Subject:** Planning your AK9I start date (the trade show)

```
Hi {!Lead.FirstName},

It was great to meet you at the trade show. Thank you for letting us know you are planning ahead. Thank you for stopping by our booth. If you thought of questions after the show, we are glad to answer them.

Our programs start the first Monday of every month, so we can help you pick a start date that fits your timeline. We will check in as your date gets closer. In the meantime, you are welcome to call us with questions about courses, housing or benefits.

Call (757) 304-9600 or reply to this email.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - YouTube (`AK9I_C_AP_YouTube`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thanks for watching our videos on YouTube. Our training is hands-on with working dogs, and we are happy to answer any questions the videos raised.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Web (`AK9I_C_AP_Web`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for visiting our website. If you did not find an answer there, our team can walk you through courses, start dates and education benefits by phone.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Other (`AK9I_C_AP_Other`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for your interest in American K-9 Interdiction. Our team can walk you through courses, start dates and education benefits whenever you are ready.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Skillbridge (`AK9I_C_AP_Skillbridge`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for your interest in training with us through the DoD SkillBridge program. SkillBridge timing depends on your separation date and your command's approval, so it helps to plan early. Our team can explain how SkillBridge works with our course start dates.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Referral (`AK9I_C_AP_Referral`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. We are glad someone you know pointed you our way. If you tell us who referred you, we would like to thank them. And if they shared their experience with you, we are happy to fill in the details.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Job Fair (`AK9I_C_AP_Job_Fair`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. It was great to meet you at the job fair. Thank you for stopping by our table. If you thought of questions after the event, we are glad to answer them.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Contact Us (`AK9I_C_AP_Contact_Us`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for reaching out to us through our website. If we have not fully answered your question yet, reply to this email and we will.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Advertisement (`AK9I_C_AP_Advertisement`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for responding to our ad. We are glad it caught your attention, and our team is ready to answer your questions.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Facebook (`AK9I_C_AP_Facebook`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thanks for connecting with us on Facebook. You can message us there at any time, or simply reply to this email.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - TAPS (`AK9I_C_AP_TAPS`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for connecting with us through your transition (TAP) program. If you plan to use VA education benefits, SkillBridge or VR&E, our team can explain how each one works with our programs.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Word of mouth (`AK9I_C_AP_Word_of_mouth`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. We are glad you heard about us. Whatever you have heard, we are happy to give you the full picture of our courses and start dates.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Instagram (`AK9I_C_AP_Instagram`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thanks for connecting with us on Instagram. You can message us there at any time, or simply reply to this email.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - BGK9 (`AK9I_C_AP_BGK9`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. Thank you for your interest through BGK9. {BGK9_RELATIONSHIP_NOTE}

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```

### C Applicant (partial form) - Trade Show (`AK9I_C_AP_Trade_Show`)
- Trigger: Lead Status = Applicant (form started, not submitted) + 1 day. Follow-ups: P2 (+4 days), P3 (+10 days).  |  Non-marketing
- **Subject:** Your AK9I enrollment form is saved

```
Hi {!Lead.FirstName},

Thank you for starting your enrollment form with American K-9 Interdiction. It was great to meet you at the trade show. Thank you for stopping by our booth. If you thought of questions after the show, we are glad to answer them.

Your contact information is saved, so you can pick up where you left off. When you are ready, finish the form here:
{ENROLLMENT_FORM_URL}

If anything on the form is unclear, reply to this email or call us at (757) 304-9600 and we will walk you through it.

Best regards,
The AK9I Team
American K-9 Interdiction
4007 Burdette Rd, Carrsville, VA 23315
enrollment@ak9i.com | (757) 304-9600

You are receiving this email because you expressed interest in American K-9 Interdiction. To stop receiving these emails, reply with "Unsubscribe" and we will remove you from our list.
American K-9 Interdiction, 4007 Burdette Rd, Carrsville, VA 23315
```


## Proofreading fixes (Oct 16, ~8:15 AM ET), applied in cleanpipe and the repo

| Template | Before | After |
|---|---|---|
| `Email_1_1759772781323` | showed interest in American K-9 Interdiction recently | showed interest in American K-9 Interdiction |
| `Email_1_1759772781323` | a few reason | a few reasons |
| `Email_1_1759772781323` | real world K-9 | real-world K-9 |
| `Email_2_1759776763898` | its bee, | it's been, |
| `Email_7_1762785412096` | Its the perfect | It's the perfect |
| `Email_7_1762785412096` | classes has limited opening | classes have limited openings |
| `Active_Student_Outreach_1786019473236` | requirments | requirements |
| `Preparing_for_Graduation_1786022209869` | want tot help | want to help |
| `Preparing_for_Graduation_1786022209869` | Best regards | Best regards, |
| `Applicant_Engagement_1785772436128` | 304 - 9600 | 304-9600 |
| `Lead_Follow_up_1773244535494` | va benefits | VA benefits |
| `Lead_Follow_up_Post_Voicemail_1758289438739` | va benefits | VA benefits |
| `Lead_Follow_up_Post_Voicemail_1758289438739` | handler/ trainer | handler/trainer |
| `New_Fin_Aid_Company_1746632517891` | Have questions? you can | Have questions? You can |
| `Welcome_Email_1779376620315` | transcripts.. | transcripts. |
| `Welcome_to_American_K_9_Interdiction_1758289459190` | 3-5 business day | 3-5 business days |
| `Welcome_to_American_K_9_Interdiction_1758289459190` | Highschool | High school |
| `K9_Sales_1775736635998` | Schedule and Evaluation | Schedule an Evaluation |
| `K9_Sales_1775736635998` | agency specific | agency-specific |
| `Sorry_we_missed_you_1718661460921` | have the enrollment sent digitally | have the enrollment form sent digitally |
| `AK9I_C_NU_YouTube (subject)` | Following up on after our videos | Following up after our videos |
| `AK9I_C_NU_Web (subject)` | Following up on after your website visit | Following up after your website visit |
| `Generate_Stripe_Payment_Link (cancel URL)` | https://www.adkk9i.edu/?payment=cancelled | https://www.ak9i.edu/?payment=cancelled |

The scan covered the 58 AK9I templates, Nurture Emails 1-12, EnrolledStudents (8), the AK9I unfiled templates and the Lightning-builder templates. Nothing else was changed. The 2 Lightning-builder templates were fixed by an Apex update of HtmlValue after a rollback dry run.

Flagged but not changed (wording/meaning):
- Welcome_Email has a truncated sentence ("Additionally, you can fill out ") and a stale date ("except July which will be Tuesday July 7").
- Active Student Outreach says "midpoint" at 2 weeks.
- Accepted / 30 Days Before Start sign "The AK9I | BGK9 Team".
- Up_Coming_Courses, August flyers and Application_Review have no readable body text (image or blank).

**Nurture spacing (cleanpipe, `Nurture_Email_Scheduler` v6, from Nurture Start Date):** Nurture 0 (`AK9I_C_NU_<Source>`) on day 0, then Email 1 at day 16, Email 2 day 32, Email 3 day 48, Email 4 day 64, Email 5 day 80, Email 6 day 96, Email 7 day 112, Email 8 day 130, Email 9 day 180, Email 10 day 200, Email 11 day 250, Email 12 day 275. The old schedule was 0/10/25/35/60/90/100/130/180/200/250/275. Every send is at least 16 days after the previous one, so any rolling 30-day window holds at most 2 unsolicited emails (F0 cap 2/30). Routine sends are no longer blocked unless a rep or another automation adds unsolicited touches.

**Call notification (cleanpipe, `AK9I_Consideration_Series` v3):** after F0 allows Nurture 0, the flow does two things, whether or not the email was delivered:
- It creates a High-priority task for the lead owner, due the next day: "Call Nurture lead - obtain email consent".
- It sends an internal, ungated email to the custom label `AK9I_Enrollment_Inbox` (= enrollment@ak9i.com) with the lead's name, phone, mobile, email, Lead Source, status and a record link.

Jonathan asked for enrollment@ak9i.edu, but the org's only verified org-wide address is enrollment@ak9i.com, and every existing AK9I email uses .com. So .com is used; change the label if needed.

**OPEN ITEM (process, not automation):** on these Nurture calls, staff must obtain clear consent for follow-up emails and record it (AK9I Consent Status = Consent Confirmed, plus source, timestamp and evidence). The team needs training on how to ask for and record that consent. Owner and date: TBD (Jonathan).
