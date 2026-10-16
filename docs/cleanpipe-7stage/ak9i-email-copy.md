# AK9I pipeline email copy (DRAFT for Jonathan's approval)

Status: all new templates are deployed to the cleanpipe sandbox as **classic text templates, not available for use** (`available=false`), in the hidden folder "AK9I Pipeline (Drafts)". No flow sends them yet. Every email-sending flow is inactive.

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

Notes on existing copy for Jonathan: "Preparing for Graduation" has a typo ("want tot help"); "Active Student Outreach" says "midpoint" at 2 weeks, which is not the midpoint of 8- or 12-week courses; "Accepted Student Outreach" signs as "AK9I | BGK9 Team". Not changed.

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
