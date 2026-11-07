/**
 * Zentilos & Neuverve Centralized API Client
 *
 * Resolves API_BASE_URL from environment variable (VITE_API_BASE_URL)
 * without hardcoding localhost or duplicating the `/neuverve` prefix.
 */

export function getApiBaseUrl(): string {
  const envUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_CRM_API_URL ||
    import.meta.env.VITE_ENQUIRY_API_URL;

  if (typeof envUrl === "string" && envUrl.trim()) {
    let cleaned = envUrl.trim().replace(/\/+$/, "");
    if (cleaned.endsWith("/platform/enquiries")) {
      cleaned = cleaned.replace(/\/platform\/enquiries$/, "");
    } else if (cleaned.endsWith("/public/enquiry")) {
      cleaned = cleaned.replace(/\/public\/enquiry$/, "");
    }
    return cleaned;
  }

  return "http://143.110.191.151:9001/neuverve";
}

export function buildApiUrl(endpointPath: string): string {
  const base = getApiBaseUrl();
  const cleanPath = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;

  // If base already contains /neuverve, and path starts with /neuverve, avoid duplicate
  if (base.endsWith("/neuverve") && cleanPath.startsWith("/neuverve/")) {
    return `${base}${cleanPath.substring("/neuverve".length)}`;
  }

  return `${base}${cleanPath}`;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  [key: string]: unknown;
}

/**
 * Standard fetch helper that parses responses and extracts backend error messages
 */
export async function apiRequest<T = unknown>(
  endpointPath: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = buildApiUrl(endpointPath);

  const defaultHeaders: Record<string, string> = {};
  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  let response: Response;
  try {
    response = await fetch(url, mergedOptions);
  } catch (err: any) {
    const errorMsg =
      err?.name === "AbortError"
        ? "Request timed out. Please check your connection and try again."
        : err?.message || "Network error. Please verify your internet connection.";
    throw new Error(errorMsg);
  }

  let result: any = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      result = await response.json();
    } catch {
      result = null;
    }
  } else {
    const text = await response.text();
    result = { message: text };
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error ||
      `Request failed with status ${response.status}. Please try again.`;
    const error: any = new Error(message);
    error.status = response.status;
    error.data = result;
    throw error;
  }

  return result as ApiResponse<T>;
}

