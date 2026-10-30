/**
 * LattiumHR - Public Enquiry & Lead Generation Service
 *
 * Connects frontend CTA forms to the Neuverve / Lattium backend enquiry endpoint:
 * POST http://localhost:5000/neuverve/public/enquiry (or configured production endpoint)
 */

export type NatureOfEnquiry =
  | 'SCHEDULE_LIVE_DEMO'
  | 'CUSTOM_PRICE'
  | 'IMPLEMENTATION_PARTNERSHIP'
  | 'GENERAL_ENQUIRY';

export interface EnquiryPayload {
  name: string;
  email: string;
  company_name: string;
  phone?: string;
  team_size?: string;
  primary_area_of_interest?: string;
  nature_of_enquiry?: NatureOfEnquiry | string;
  notes?: string;
  source_page?: string;
}

export interface EnquiryResponseData {
  id?: number | string;
  name?: string;
  email?: string;
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
 * Resolves the target API endpoint based on Vite environment variables:
 * - VITE_ENQUIRY_API_URL: exact full URL if provided (e.g. https://api.domain.com/neuverve/public/enquiry)
 * - VITE_API_BASE_URL: base domain (e.g. https://api.domain.com), appends '/neuverve/public/enquiry'
 * - In production mode with no base URL set: falls back to relative '/neuverve/public/enquiry'
 * - In development mode: falls back to 'http://localhost:5000/neuverve/public/enquiry'
 */
export function getEnquiryEndpoint(): string {
  const customUrl = import.meta.env.VITE_ENQUIRY_API_URL;
  if (customUrl && typeof customUrl === 'string' && customUrl.trim()) {
    return customUrl.trim();
  }

  const rawUrl = import.meta.env.VITE_API_BASE_URL;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) {
    const trimmed = rawUrl.trim().replace(/\/+$/, '');

    // Case 1: Already includes the full enquiry path
    if (trimmed.endsWith('/public/enquiry')) {
      return trimmed;
    }

    // Case 2: URL ends with /neuverve (e.g. http://192.168.1.5:5173/neuverve)
    if (trimmed.endsWith('/neuverve')) {
      return `${trimmed}/public/enquiry`;
    }

    // Case 3: Base host (e.g. http://localhost:5000 or https://api.domain.com)
    return `${trimmed}/neuverve/public/enquiry`;
  }

  // If in production and no explicit base URL is configured,
  // use relative endpoint so it automatically targets the deployed domain.
  if (import.meta.env.PROD) {
    return '/neuverve/public/enquiry';
  }

  return 'http://localhost:5000/neuverve/public/enquiry';
}

/**
 * Submits prospect enquiry payload to the backend.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  const endpoint = getEnquiryEndpoint();

  const currentSourcePage =
    typeof window !== 'undefined'
      ? window.location.pathname + window.location.hash
      : '/';

  const body = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || '',
    company_name: payload.company_name.trim(),
    team_size: payload.team_size || 'Not Specified',
    primary_area_of_interest: payload.primary_area_of_interest || 'Platform Suite',
    nature_of_enquiry: payload.nature_of_enquiry || 'SCHEDULE_LIVE_DEMO',
    notes: payload.notes || '',
    source_page: payload.source_page || currentSourcePage,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let result: any = null;
    try {
      result = await response.json();
    } catch {
      // Non-JSON or empty response
    }

    if (response.ok && (result?.success || response.status === 200 || response.status === 201)) {
      return {
        success: true,
        message:
          result?.message ||
          'Thank you for reaching out! Our enterprise team will connect with you shortly.',
        data: result?.data,
      };
    }

    const errorMessage =
      result?.message ||
      `Submission failed (${response.status}: ${response.statusText || 'Server Error'})`;
    throw new Error(errorMessage);
  } catch (error: any) {
    // If it's a TypeError (e.g. Failed to fetch / connection refused because backend isn't up on port 5000)
    if (error.name === 'TypeError' || error.message?.includes('Failed to fetch')) {
      throw new Error(
        `Unable to reach the backend server at ${endpoint}. Please ensure the server is running on port 5000.`
      );
    }
    throw error;
  }
}

