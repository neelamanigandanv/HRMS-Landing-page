/**
 * Zentilos & Neuverve - Careers & Recruitment API Service
 *
 * Implements frontend integration for:
 * - Resume Upload: POST /recruitment/applications/upload-resume (field: "resume", max 5 MB)
 * - Apply to Join: POST /recruitment/applications (application_type: "APPLY_TO_JOIN")
 * - Direct Application: POST /recruitment/applications (application_type: "DIRECT_APPLICATION")
 * - Jobs Listing & Detail: GET /recruitment/careers/jobs, GET /recruitment/careers/jobs/:id
 */

import { apiRequest } from "./apiClient";

export interface CareerAnswers {
  notice_period?: string;
  why_lattium_hr?: string;
  why_zentilos?: string;
  what_do_you_want_to_build?: string;
  why_you_are_interested?: string;
  expected_ctc?: string;
  current_company?: string;
  linkedin_portfolio_url?: string;
  portfolio_url?: string;
  [key: string]: unknown;
}

export interface CareerApplicationPayload {
  application_type: "APPLY_TO_JOIN" | "DIRECT_APPLICATION";
  job_id?: number | null;
  target_role?: string;
  full_name: string;
  name?: string;
  email: string;
  phone: string;
  phone_number?: string;
  experience: string;
  total_experience?: string;
  current_location?: string;
  location?: string;
  resume_url: string;
  policies_accepted: boolean;
  answers?: CareerAnswers;
  [key: string]: unknown;
}

export interface CareerApplicationResponseData {
  candidate_id?: number;
  candidate_uuid?: string;
  application_id?: number;
  application_uuid?: string;
  application_type?: string;
  status?: string;
  correlation_id?: string;
  [key: string]: unknown;
}

export interface CareerApplicationResponse {
  success: boolean;
  message: string;
  data?: CareerApplicationResponseData;
}

export interface BackendJobOpening {
  id: number | string;
  title: string;
  department: string;
  location: string;
  type?: string;
  experience?: string;
  description?: string;
  requirements?: string[];
  [key: string]: unknown;
}

/**
 * Uploads candidate resume to POST /recruitment/applications/upload-resume
 * Supported file types: PDF, DOC/DOCX, JPG/PNG/WEBP (max 5 MB).
 * Field name: 'resume'
 * Returns resume_url string (e.g. '/upload/resume-12345.pdf')
 */
export async function uploadResumeFile(file: File): Promise<string> {
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File "${file.name}" exceeds the maximum allowed size of 5 MB.`);
  }

  const validExtensions = /\.(pdf|docx?|jpe?g|png|webp)$/i;
  if (!validExtensions.test(file.name)) {
    throw new Error(
      "Invalid resume format. Please upload a PDF, DOC, DOCX, JPG, PNG, or WEBP file."
    );
  }

  const formData = new FormData();
  formData.append("resume", file);

  const res = await apiRequest<{ resume_url?: string; url?: string }>(
    "/recruitment/applications/upload-resume",
    {
      method: "POST",
      body: formData,
    }
  );

  const url = res.resume_url || (res as any).url || (res.data as any)?.resume_url;
  if (url) {
    return url;
  }

  throw new Error(res.message || "Resume upload failed. No file URL returned.");
}

/**
 * Submits application to POST /recruitment/applications
 */
export async function submitCareerApplication(
  payload: CareerApplicationPayload
): Promise<CareerApplicationResponse> {
  const cleanName = (payload.full_name || payload.name || "").trim();
  const cleanEmail = (payload.email || "").trim();
  const cleanPhone = (payload.phone_number || payload.phone || "").trim();
  const cleanExp = (payload.experience || payload.total_experience || "").trim();
  const cleanLocation = (payload.current_location || payload.location || "").trim();

  const body: Record<string, unknown> = {
    application_type: payload.application_type,
    full_name: cleanName,
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    phone_number: cleanPhone,
    experience: cleanExp,
    total_experience: cleanExp,
    resume_url: payload.resume_url,
    policies_accepted: Boolean(payload.policies_accepted),
    answers: payload.answers || {},
  };

  if (payload.application_type === "APPLY_TO_JOIN") {
    if (typeof payload.job_id === "number" && !isNaN(payload.job_id)) {
      body.job_id = payload.job_id;
    }
    if (payload.target_role) {
      body.target_role = payload.target_role;
    }
  } else {
    // DIRECT_APPLICATION requires current_location and excludes job_id
    body.current_location = cleanLocation || "Not Specified";
    body.location = cleanLocation || "Not Specified";
  }

  const res = await apiRequest<CareerApplicationResponseData>(
    "/recruitment/applications",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  return {
    success: res.success ?? true,
    message: res.message || "Your application has been submitted successfully.",
    data: res.data,
  };
}

/**
 * Fetches available careers jobs from GET /recruitment/careers/jobs
 */
export async function fetchCareersJobs(): Promise<BackendJobOpening[]> {
  try {
    const res = await apiRequest<BackendJobOpening[]>("/recruitment/careers/jobs", {
      method: "GET",
    });

    if (Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch (err) {
    console.warn("[Careers API] Unable to fetch live jobs from backend:", err);
    return [];
  }
}

/**
 * Fetches single job detail from GET /recruitment/careers/jobs/:id
 */
export async function fetchJobDetail(
  id: string | number
): Promise<BackendJobOpening | null> {
  try {
    const res = await apiRequest<BackendJobOpening>(
      `/recruitment/careers/jobs/${id}`,
      { method: "GET" }
    );
    return res.data || null;
  } catch (err) {
    console.warn(`[Careers API] Unable to fetch job ${id} from backend:`, err);
    return null;
  }
}

