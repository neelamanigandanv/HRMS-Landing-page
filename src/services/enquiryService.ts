/**
 * Zentilos & Neuverve - Public Enquiry & Lead Management Service
 *
 * Implements frontend integration for:
 * - Request Demo (form_type: "request_demo")
 * - Contact Us (form_type: "contact_us")
 * - Demo Popup (form_type: "demo_popup")
 * - Partner Application (form_type: "partner_application")
 * - Customer Support (form_type: "customer_support")
 * - File Upload (POST /upload)
 */

import { apiRequest } from "./apiClient";

export type EnquiryFormType =
  | "request_demo"
  | "contact_us"
  | "demo_popup"
  | "partner_application"
  | "customer_support";

export interface RequestDemoPayload {
  form_type?: "request_demo";
  name: string;
  work_email: string;
  phone_number: string;
  company_name: string;
  team_size: string;
  primary_area_of_interest?: string;
  additional_notes?: string;
  source_page?: string;
  [key: string]: unknown;
}

export interface ContactUsPayload {
  form_type?: "contact_us";
  name: string;
  work_email: string;
  phone_number: string;
  company_name: string;
  team_size: string;
  nature_of_inquiry?: string;
  how_can_we_help_your_team: string;
  source_page?: string;
  [key: string]: unknown;
}

export interface DemoPopupPayload {
  form_type?: "demo_popup";
  name: string;
  work_email: string;
  phone_number: string;
  company_name: string;
  team_size: string;
  primary_area_of_interest?: string;
  source_page?: string;
  [key: string]: unknown;
}

export interface PartnerApplicationPayload {
  form_type?: "partner_application";
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number: string;
  location: string;
  interested_partner_track: string;
  tell_us_about_your_client_base_and_operations: string;
  source_page?: string;
  [key: string]: unknown;
}

export interface CustomerSupportPayload {
  form_type?: "customer_support";
  name: string;
  work_email: string;
  company_name: string;
  issue_category: string;
  subject: string;
  issue_description: string;
  attachment?: string;
  source_page?: string;
  [key: string]: unknown;
}

export type AnyEnquiryPayload =
  | RequestDemoPayload
  | ContactUsPayload
  | DemoPopupPayload
  | PartnerApplicationPayload
  | CustomerSupportPayload
  | Record<string, unknown>;

export interface EnquiryResponseData {
  id?: number | string;
  name?: string;
  email?: string;
  phone?: string;
  company_name?: string;
  status?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  data?: EnquiryResponseData;
}

/**
 * Uploads support attachments (screenshots/docs) to POST /upload
 * Supported file types: PDF, PNG, JPG, JPEG (max 5 MB).
 * Field name: 'file'
 * Returns the uploaded file URL (e.g. '/upload/file-1234567.png')
 */
export async function uploadSupportAttachment(file: File): Promise<string> {
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File "${file.name}" exceeds the maximum allowed size of 5 MB.`);
  }

  const validExtensions = /\.(pdf|png|jpe?g)$/i;
  if (!validExtensions.test(file.name)) {
    throw new Error("Invalid attachment format. Only PDF, PNG, JPG, and JPEG files are supported.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await apiRequest<{ url: string }>("/upload", {
    method: "POST",
    body: formData,
  });

  if (res.url) return res.url;
  if ((res.data as any)?.url) return (res.data as any).url;

  throw new Error(res.message || "File upload failed. No file URL returned.");
}

/**
 * Submits any public enquiry to POST {API_BASE_URL}/public/enquiry
 */
export async function submitPublicEnquiry(
  payload: AnyEnquiryPayload
): Promise<EnquiryResponse> {
  // Normalize identity and email fields for seamless backend ingestion
  const email = (
    (payload as any).work_email ||
    (payload as any).business_email ||
    (payload as any).email ||
    ""
  ).trim();

  const phone = (
    (payload as any).phone_number ||
    (payload as any).phone ||
    ""
  ).trim();

  const name = (
    (payload as any).name ||
    (payload as any).full_name ||
    [ (payload as any).first_name, (payload as any).last_name ].filter(Boolean).join(" ") ||
    ""
  ).trim();

  const currentSourcePage =
    typeof window !== "undefined"
      ? window.location.pathname + window.location.hash
      : "/";

  // Build the clean API body
  const body: Record<string, unknown> = {
    ...payload,
    name: name || undefined,
    work_email: email || undefined,
    email: email || undefined,
    phone_number: phone || undefined,
    phone: phone || undefined,
    source_page: (payload as any).source_page || currentSourcePage,
  };

  const response = await apiRequest<EnquiryResponseData>("/public/enquiry", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return {
    success: response.success ?? true,
    message:
      response.message ||
      "Thank you for reaching out! Our team will connect with you shortly.",
    data: response.data,
  };
}

// Backward-compatible aliases
export const submitEnquiry = submitPublicEnquiry;
export const submitCrmEnquiry = submitPublicEnquiry;
