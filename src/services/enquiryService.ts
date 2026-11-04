/**
 * LattiumHR - Centralized CRM Lead & Public Enquiry Service
 *
 * Connects all website forms to the CRM backend endpoint:
 * POST https://[YOUR_BACKEND_DOMAIN]/api/platform/enquiries/public
 * (Local dev: http://localhost:5000/api/platform/enquiries/public)
 */

export type NatureOfEnquiry =
  | 'SCHEDULE_LIVE_DEMO'
  | 'GENERAL_ENQUIRY'
  | 'JOB_APPLICATION'
  | 'PARTNER_APPLICATION'
  | 'SUPPORT_REQUEST'
  | 'CUSTOM_PRICE'
  | 'IMPLEMENTATION_PARTNERSHIP'
  | string;

export interface CrmEnquiryPayload {
  // Common identity fields
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  work_email?: string;
  email?: string;
  business_email?: string;
  phone?: string;
  company_name?: string;
  team_size?: string;

  // Intent & Categorization
  primary_area_of_interest?: string;
  nature_of_enquiry: NatureOfEnquiry;
  notes?: string;
  source_page: string;

  // Extended payload structure (rendered in CRM Lead Dossier)
  extra_data?: Record<string, unknown>;

  // Allow custom/form-specific root fields as specified in API documentation
  [key: string]: unknown;
}

// Backward-compatible alias
export type EnquiryPayload = CrmEnquiryPayload;

export interface EnquiryResponseData {
  id?: number | string;
  name?: string;
  email?: string;
  work_email?: string;
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
 * Resolves the target CRM / backend API endpoint for all website form submissions:
 * 1. VITE_CRM_API_URL or VITE_ENQUIRY_API_URL (exact full URL if provided)
 * 2. VITE_API_BASE_URL (appends /public/enquiry if pointing to neuverve)
 * 3. Default backend URL: 'http://192.168.1.5:5173/neuverve/public/enquiry'
 */
export function getEnquiryEndpoint(): string {
  const customUrl = import.meta.env.VITE_CRM_API_URL || import.meta.env.VITE_ENQUIRY_API_URL;
  if (customUrl && typeof customUrl === 'string' && customUrl.trim()) {
    return customUrl.trim();
  }

  const rawUrl = import.meta.env.VITE_API_BASE_URL;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) {
    const trimmed = rawUrl.trim().replace(/\/+$/, '');
    if (trimmed.endsWith('/public/enquiry') || trimmed.endsWith('/api/platform/enquiries/public')) {
      return trimmed;
    }
    if (trimmed.endsWith('/neuverve')) {
      return `${trimmed}/public/enquiry`;
    }
    return `${trimmed}/neuverve/public/enquiry`;
  }

  return 'http://192.168.1.5:5173/neuverve/public/enquiry';
}

/**
 * Submits enquiry payload directly into the CRM / Neuverve Lead Management backend.
 * Compatible with HTTP 201 (Created) and HTTP 200 (OK).
 * Includes resilient multi-candidate routing to avoid 404 errors if backend routes differ.
 */
export async function submitCrmEnquiry(payload: CrmEnquiryPayload): Promise<EnquiryResponse> {
  const primaryEndpoint = getEnquiryEndpoint();

  const currentSourcePage =
    typeof window !== 'undefined'
      ? window.location.pathname + window.location.hash
      : '/';

  // Normalize common identity fields for maximum CRM backend compatibility
  const resolvedEmail = (payload.work_email || payload.business_email || payload.email || '').trim();
  const resolvedName = (
    payload.name ||
    payload.full_name ||
    [payload.first_name, payload.last_name].filter(Boolean).join(' ') ||
    ''
  ).trim();

  const body: Record<string, unknown> = {
    ...payload,
    name: resolvedName,
    full_name: resolvedName,
    work_email: resolvedEmail,
    email: resolvedEmail,
    business_email: resolvedEmail,
    company_name: (payload.company_name || 'Not Specified').toString().trim(),
    team_size: payload.team_size || 'Not Specified',
    primary_area_of_interest: payload.primary_area_of_interest || 'Platform Suite',
    nature_of_enquiry: payload.nature_of_enquiry || 'GENERAL_ENQUIRY',
    source_page: payload.source_page || currentSourcePage,
  };

  if (payload.first_name) body.first_name = payload.first_name.trim();
  if (payload.last_name) body.last_name = payload.last_name.trim();
  if (payload.phone) body.phone = payload.phone.trim();

  // If extra_data is provided, pass it directly
  if (payload.extra_data && typeof payload.extra_data === 'object') {
    body.extra_data = payload.extra_data;
  }

  // Build candidate URL variations to try in case of route variations (e.g. 404 on base path)
  const baseHost = primaryEndpoint.replace(/\/public\/enquiry$|\/api\/platform\/enquiries\/public$|\/neuverve(\/.*)?$/, '');
  const candidateUrls: string[] = [
    primaryEndpoint, // 1. Canonical: http://192.168.1.5:5173/neuverve/public/enquiry
    `${baseHost}/neuverve/public/enquiry`,
    `${baseHost}/neuverve/`,
    `${baseHost}/neuverve`,
    `${baseHost}/neuverve/api/platform/enquiries/public`,
    `${baseHost}/neuverve/enquiry`,
    // Same-origin dev proxy fallbacks to avoid CORS blocks
    '/neuverve/public/enquiry',
    '/neuverve/',
  ];
  const uniqueEndpoints = Array.from(new Set(candidateUrls.filter(Boolean)));

  // Helper to post JSON payload
  const postPayload = async (targetUrl: string): Promise<Response> => {
    return await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  let lastError: any = null;
  let lastStatus: number | null = null;
  let lastStatusText: string = '';

  for (const candidate of uniqueEndpoints) {
    try {
      const response = await postPayload(candidate);
      lastStatus = response.status;
      lastStatusText = response.statusText;

      // If this endpoint returned 404, try the next candidate route
      if (response.status === 404) {
        continue;
      }

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        // Non-JSON or empty response body
      }

      if (response.ok || response.status === 201 || response.status === 200) {
        if (result && result.success === false) {
          throw new Error(result.message || 'Submission failed');
        }
        return {
          success: true,
          message:
            result?.message ||
            'Thank you! Your submission has been received. Our team will connect with you shortly.',
          data: result?.data,
        };
      }

      // If error is 4xx or 5xx (other than 404), throw the specific error message
      const errorMessage =
        result?.message ||
        `Submission failed (${response.status}: ${response.statusText || 'Server Error'})`;
      throw new Error(errorMessage);
    } catch (err: any) {
      lastError = err;
      // If network failure / CORS, try next candidate
      if (err.name === 'TypeError' || err.message?.includes('Failed to fetch')) {
        continue;
      }
      // If server returned another validation or business error, stop and report it
      if (!err.message?.includes('404')) {
        throw err;
      }
    }
  }

  // If all candidate routes exhausted
  if (lastError && (lastError.name === 'TypeError' || lastError.message?.includes('Failed to fetch'))) {
    throw new Error(
      `Unable to reach the backend server at ${primaryEndpoint}. Please ensure the server is running on 192.168.1.5:5173.`
    );
  }

  throw new Error(
    lastError?.message ||
    `Submission failed (${lastStatus || 404}: ${lastStatusText || 'Not Found'}). Please verify the backend route on ${primaryEndpoint}.`
  );
}

// Backward-compatible alias
export const submitEnquiry = submitCrmEnquiry;
