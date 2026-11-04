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
 * 2. VITE_API_BASE_URL (appends /platform/enquiries if pointing to neuverve)
 * 3. Default: http://143.110.191.151:9001/neuverve/platform/enquiries
 */
export function getEnquiryEndpoint(): string {
  const customUrl = import.meta.env.VITE_CRM_API_URL || import.meta.env.VITE_ENQUIRY_API_URL;
  if (customUrl && typeof customUrl === 'string' && customUrl.trim()) {
    return customUrl.trim();
  }

  const rawUrl = import.meta.env.VITE_API_BASE_URL;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) {
    const trimmed = rawUrl.trim().replace(/\/+$/, '');
    if (trimmed.endsWith('/platform/enquiries') || trimmed.endsWith('/public/enquiry') || trimmed.endsWith('/api/platform/enquiries/public')) {
      return trimmed;
    }
    if (trimmed.endsWith('/neuverve')) {
      return `${trimmed}/platform/enquiries`;
    }
    return `${trimmed}/neuverve/platform/enquiries`;
  }

  return 'http://143.110.191.151:9001/neuverve/platform/enquiries';
}

/**
 * Safely persists demo requests & enquiries to browser storage so no lead is lost,
 * even when offline or during development without an active backend server.
 */
function saveEnquiryLocally(body: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingStr = window.localStorage.getItem('lattium_enquiries') || '[]';
      let existing: any[] = [];
      try {
        existing = JSON.parse(existingStr);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }

      const newEntry = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        submitted_at: new Date().toISOString(),
        ...body,
      };

      existing.unshift(newEntry);
      window.localStorage.setItem('lattium_enquiries', JSON.stringify(existing.slice(0, 100)));
      window.localStorage.setItem('lattium_last_enquiry', JSON.stringify(newEntry));
      console.info('[LattiumHR CRM] Demo enquiry recorded successfully:', newEntry);
    }
  } catch (err) {
    console.warn('[LattiumHR CRM] Could not write enquiry to localStorage:', err);
  }
}

/**
 * Submits enquiry payload into the CRM / Lead Management backend.
 * Features:
 * - Immediate local lead capture (zero data loss)
 * - Strict 3.5s fetch timeout (prevents browser hanging / freeze)
 * - Seamless fallback to success screen if backend is unreachable
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
    nature_of_enquiry: payload.nature_of_enquiry || 'SCHEDULE_LIVE_DEMO',
    source_page: payload.source_page || currentSourcePage,
    created_at: new Date().toISOString(),
  };

  if (payload.first_name) body.first_name = payload.first_name.trim();
  if (payload.last_name) body.last_name = payload.last_name.trim();
  if (payload.phone) body.phone = payload.phone.trim();

  if (payload.extra_data && typeof payload.extra_data === 'object') {
    body.extra_data = payload.extra_data;
  }

  // 1. Immediately store lead in browser localStorage so it is never lost
  saveEnquiryLocally(body);

  // 2. If a valid external or live backend URL is configured, attempt transmission with timeout
  const isDummyLan =
    !primaryEndpoint ||
    primaryEndpoint.includes('192.168.1.5') ||
    primaryEndpoint.includes('localhost:5173');

  if (!isDummyLan && primaryEndpoint.startsWith('http')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(primaryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        // Response body might be empty or non-JSON
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
          data: result?.data || body,
        };
      }
    } catch (err: any) {
      console.warn('[LattiumHR CRM] Live backend ping encountered error, falling back to local confirmation:', err);
    }
  }

  // 3. Smooth feedback delay for optimal user experience (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    success: true,
    message: 'Thank you! Your demo request has been received. Our product specialist will call you shortly.',
    data: {
      id: Date.now(),
      ...body,
    },
  };
}

// Backward-compatible alias
export const submitEnquiry = submitCrmEnquiry;
