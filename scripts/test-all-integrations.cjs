const fs = require('fs');

async function runLiveIntegrationTests() {
  const BASE_URL = 'http://143.110.191.151:9001/neuverve';
  console.log(`\n======================================================`);
  console.log(`RUNNING FULL FRONTEND API INTEGRATION TEST SUITE`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✔ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Request Demo
  console.log(`[TEST 1] Request Demo Form Submission (form_type: "request_demo")`);
  try {
    const res = await fetch(`${BASE_URL}/public/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'request_demo',
        name: 'Rohan Sharma',
        work_email: 'rohan.sharma@enterprise-demo.com',
        phone_number: '+919876543210',
        company_name: 'Sharma Logistics India',
        team_size: '51-200',
        primary_area_of_interest: 'Attendance & Statutory Payroll',
        additional_notes: 'Looking for multi-branch punch sync demo',
        source_page: '/request-demo'
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Request Demo returned 201 Created (ID: ${data?.data?.id})`);
  } catch (err) {
    assert(false, `Request Demo threw error: ${err.message}`);
  }

  // 2. Contact Us
  console.log(`\n[TEST 2] Contact Us Form Submission (form_type: "contact_us")`);
  try {
    const res = await fetch(`${BASE_URL}/public/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'contact_us',
        name: 'Kavya Sundaram',
        work_email: 'kavya.s@innovatecorp.in',
        phone_number: '+919876543211',
        company_name: 'InnovateCorp Technologies',
        team_size: '201-500',
        nature_of_inquiry: 'Pricing & Licensing',
        how_can_we_help_your_team: 'Inquiring about multi-location biometric turnstile setup timeline',
        source_page: '/contact'
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Contact Us returned 201 Created (ID: ${data?.data?.id})`);
  } catch (err) {
    assert(false, `Contact Us threw error: ${err.message}`);
  }

  // 3. Demo Popup
  console.log(`\n[TEST 3] Demo Popup Modal Submission (form_type: "demo_popup")`);
  try {
    const res = await fetch(`${BASE_URL}/public/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'demo_popup',
        name: 'Amitabh Sen',
        work_email: 'amitabh@senholdings.com',
        phone_number: '+919876543212',
        company_name: 'Sen Holdings',
        team_size: '500+',
        primary_area_of_interest: 'Multi-Branch Governance',
        source_page: '/#demo-popup'
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Demo Popup returned 201 Created (ID: ${data?.data?.id})`);
  } catch (err) {
    assert(false, `Demo Popup threw error: ${err.message}`);
  }

  // 4. Partner Application
  console.log(`\n[TEST 4] Partner Application Submission (form_type: "partner_application")`);
  try {
    const res = await fetch(`${BASE_URL}/public/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'partner_application',
        first_name: 'Suresh',
        last_name: 'Nair',
        company_name: 'Apex HR Consultants LLP',
        business_email: 'suresh@apexconsultants.co.in',
        phone_number: '+919876543213',
        location: 'Kochi, Kerala',
        interested_partner_track: 'Implementation & Advisory Partner',
        tell_us_about_your_client_base_and_operations: 'We manage payroll and compliance for 35 manufacturing firms across South India.',
        source_page: '/partners'
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Partner Application returned 201 Created (ID: ${data?.data?.id})`);
  } catch (err) {
    assert(false, `Partner Application threw error: ${err.message}`);
  }

  // 5. Support Attachment Upload
  console.log(`\n[TEST 5] Support Attachment Upload (POST /upload)`);
  let uploadedFileUrl = '';
  try {
    const formData = new FormData();
    const pngHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
    formData.append('file', new Blob([pngHeader], { type: 'image/png' }), 'turnstile-screenshot.png');

    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    uploadedFileUrl = data.url || '';
    assert(res.status === 200 && Boolean(uploadedFileUrl), `File upload returned 200 with URL: ${uploadedFileUrl}`);
  } catch (err) {
    assert(false, `File upload threw error: ${err.message}`);
  }

  // 6. Customer Support Form
  console.log(`\n[TEST 6] Customer Support Submission (form_type: "customer_support")`);
  try {
    const res = await fetch(`${BASE_URL}/public/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'customer_support',
        name: 'Pooja Varma',
        work_email: 'pooja.v@clientorg.com',
        company_name: 'ClientOrg Retail Network',
        issue_category: 'Biometric Turnstile & Hardware Sync',
        subject: 'Delhi NCR branch punch sync timeout',
        issue_description: 'Attendance punches between 9:00 AM and 9:30 AM are queued on local reader with error 504.',
        attachment: uploadedFileUrl,
        source_page: '/support'
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Customer Support returned 201 Created (ID: ${data?.data?.id})`);
  } catch (err) {
    assert(false, `Customer Support threw error: ${err.message}`);
  }

  // 7. Resume Upload
  console.log(`\n[TEST 7] Careers Resume Upload (POST /recruitment/applications/upload-resume)`);
  let uploadedResumeUrl = '';
  try {
    const formData = new FormData();
    const pdfHeader = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52]); // %PDF-1.4
    formData.append('resume', new Blob([pdfHeader], { type: 'application/pdf' }), 'candidate-cv.pdf');

    const res = await fetch(`${BASE_URL}/recruitment/applications/upload-resume`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    uploadedResumeUrl = data.resume_url || data.url || '';
    assert(res.status === 200 && Boolean(uploadedResumeUrl), `Resume upload returned 200 with URL: ${uploadedResumeUrl}`);
  } catch (err) {
    assert(false, `Resume upload threw error: ${err.message}`);
  }

  // 8. Careers - Direct Application
  console.log(`\n[TEST 8] Careers Direct Application (application_type: "DIRECT_APPLICATION")`);
  try {
    const res = await fetch(`${BASE_URL}/recruitment/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        application_type: 'DIRECT_APPLICATION',
        full_name: 'Vikramaditya Rao',
        name: 'Vikramaditya Rao',
        email: 'vikram.rao@candidate-direct.in',
        phone: '+919876543214',
        phone_number: '+919876543214',
        experience: '5–8 years',
        total_experience: '5–8 years',
        current_location: 'Bengaluru, India',
        resume_url: uploadedResumeUrl,
        policies_accepted: true,
        answers: {
          notice_period: '30 Days',
          why_lattium_hr: 'Excited about the robust engineering culture and multi-branch payroll architecture.',
          what_do_you_want_to_build: 'Real-time biometric telemetry pipelines.',
          why_you_are_interested: 'Deep interest in high-scale distributed systems.'
        }
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Direct Application returned 201 Created (Candidate ID: ${data?.data?.candidate_id}, App ID: ${data?.data?.application_id})`);
  } catch (err) {
    assert(false, `Direct Application threw error: ${err.message}`);
  }

  // 9. Careers - Apply to Join
  console.log(`\n[TEST 9] Careers Apply to Join (application_type: "APPLY_TO_JOIN")`);
  try {
    const res = await fetch(`${BASE_URL}/recruitment/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        application_type: 'APPLY_TO_JOIN',
        target_role: 'Senior Full-Stack Engineer (React & Node.js)',
        full_name: 'Ananya Deshmukh',
        name: 'Ananya Deshmukh',
        email: 'ananya.d@candidate-role.in',
        phone: '+919876543215',
        phone_number: '+919876543215',
        experience: '4–7 years',
        total_experience: '4–7 years',
        resume_url: uploadedResumeUrl,
        policies_accepted: true,
        answers: {
          notice_period: 'Immediate Joiner (0 days)',
          why_lattium_hr: 'Love the modern React 19 micro-frontend approach.',
          why_you_are_interested: 'Passionate about frontend developer experience.'
        }
      })
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, `Apply to Join returned 201 Created (Candidate ID: ${data?.data?.candidate_id}, App ID: ${data?.data?.application_id})`);
  } catch (err) {
    assert(false, `Apply to Join threw error: ${err.message}`);
  }

  // 10. Error Validation Handling
  console.log(`\n[TEST 10] Backend Error Validation & Feedback Check`);
  try {
    const missingNameRes = await fetch(`${BASE_URL}/public/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form_type: 'request_demo' })
    });
    const errData = await missingNameRes.json();
    assert(
      missingNameRes.status === 400 && errData.success === false && Boolean(errData.message),
      `Backend correctly returned 400 with message: "${errData.message}"`
    );

    const consentMissingRes = await fetch(`${BASE_URL}/recruitment/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        application_type: 'DIRECT_APPLICATION',
        full_name: 'No Consent Candidate',
        email: 'noconsent@example.com',
        phone: '+919876543210',
        policies_accepted: false
      })
    });
    const consentErrData = await consentMissingRes.json();
    assert(
      consentMissingRes.status === 400 && Boolean(consentErrData.message),
      `Backend correctly rejected missing consent with message: "${consentErrData.message}"`
    );
  } catch (err) {
    assert(false, `Error validation test threw error: ${err.message}`);
  }

  console.log(`\n======================================================`);
  console.log(`INTEGRATION TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`======================================================\n`);

  if (failed > 0) process.exit(1);
}

runLiveIntegrationTests();

