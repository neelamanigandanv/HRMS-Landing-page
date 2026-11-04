/**
 * Phone Number Utilities & Geolocation Country Detection
 * Detects visitor's origin (USA vs India vs International)
 * and formats & validates phone numbers accordingly.
 */

export interface CountryInfo {
  code: string;         // e.g. "US", "IN"
  name: string;         // "United States", "India"
  dialCode: string;     // "+1", "+91"
  flag: string;         // "🇺🇸", "🇮🇳"
  placeholder: string;  // "(555) 019-2834", "98765 43210"
  nationalLength: number;
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    placeholder: "(555) 019-2834",
    nationalLength: 10,
  },
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳",
    placeholder: "98765 43210",
    nationalLength: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
    placeholder: "7911 123456",
    nationalLength: 10,
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦",
    placeholder: "(555) 019-2834",
    nationalLength: 10,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    flag: "🇦🇪",
    placeholder: "50 123 4567",
    nationalLength: 9,
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    flag: "🇦🇺",
    placeholder: "412 345 678",
    nationalLength: 9,
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    flag: "🇸🇬",
    placeholder: "8123 4567",
    nationalLength: 8,
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪",
    placeholder: "151 12345678",
    nationalLength: 11,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦",
    placeholder: "50 123 4567",
    nationalLength: 9,
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷",
    placeholder: "6 12 34 56 78",
    nationalLength: 9,
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "+81",
    flag: "🇯🇵",
    placeholder: "90 1234 5678",
    nationalLength: 10,
  },
  {
    code: "PH",
    name: "Philippines",
    dialCode: "+63",
    flag: "🇵🇭",
    placeholder: "917 123 4567",
    nationalLength: 10,
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "+27",
    flag: "🇿🇦",
    placeholder: "71 123 4567",
    nationalLength: 9,
  },
  {
    code: "NL",
    name: "Netherlands",
    dialCode: "+31",
    flag: "🇳🇱",
    placeholder: "6 12345678",
    nationalLength: 9,
  },
];

/**
 * Detect the visitor's country based on client-side timezone, browser language,
 * and optional URL query parameters (e.g. ?country=US).
 */
export function detectUserCountry(): CountryInfo {
  // Check URL query override if testing or debugging
  if (typeof window !== "undefined") {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryCountry = urlParams.get("country");
      if (queryCountry) {
        const found = SUPPORTED_COUNTRIES.find(
          (c) => c.code.toLowerCase() === queryCountry.toLowerCase()
        );
        if (found) return found;
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  if (typeof window === "undefined") {
    return SUPPORTED_COUNTRIES[1]; // default India
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      ""
    ).toLowerCase();

    // 1. Detect United States
    const isUsTimezone =
      tz.startsWith("America/New_York") ||
      tz.startsWith("America/Chicago") ||
      tz.startsWith("America/Denver") ||
      tz.startsWith("America/Los_Angeles") ||
      tz.startsWith("America/Phoenix") ||
      tz.startsWith("America/Anchorage") ||
      tz.startsWith("America/Detroit") ||
      tz.startsWith("America/Indiana") ||
      tz.startsWith("America/Boise") ||
      tz.startsWith("America/Menominee") ||
      tz.startsWith("America/Kentucky") ||
      tz.startsWith("America/North_Dakota") ||
      tz.startsWith("Pacific/Honolulu") ||
      tz.startsWith("US/");

    if (isUsTimezone) {
      return SUPPORTED_COUNTRIES[0]; // US
    }

    // 2. Detect Canada
    if (
      tz.includes("Toronto") ||
      tz.includes("Vancouver") ||
      tz.includes("Montreal") ||
      tz.includes("Edmonton") ||
      tz.includes("Winnipeg") ||
      tz.includes("Halifax") ||
      tz.startsWith("Canada/")
    ) {
      return SUPPORTED_COUNTRIES[3]; // CA
    }

    // 3. Detect India
    if (
      tz === "Asia/Kolkata" ||
      tz === "Asia/Calcutta" ||
      lang.endsWith("-in") ||
      lang === "hi" ||
      lang.startsWith("hi-")
    ) {
      return SUPPORTED_COUNTRIES[1]; // IN
    }

    // 4. Detect United Kingdom
    if (tz === "Europe/London" || lang === "en-gb") {
      return SUPPORTED_COUNTRIES[2]; // GB
    }

    // 5. Detect Australia
    if (tz.startsWith("Australia/") || lang === "en-au") {
      return SUPPORTED_COUNTRIES[5]; // AU
    }

    // 6. Detect UAE
    if (tz === "Asia/Dubai") {
      return SUPPORTED_COUNTRIES[4]; // AE
    }

    // 7. Detect Singapore
    if (tz === "Asia/Singapore" || lang === "en-sg") {
      return SUPPORTED_COUNTRIES[6]; // SG
    }

    // 8. If browser language is en-US and not in India, default to US
    if (lang === "en-us" && !tz.includes("Kolkata") && !tz.includes("Calcutta")) {
      return SUPPORTED_COUNTRIES[0]; // US
    }

    // Default to India for regional HRMS traffic
    return SUPPORTED_COUNTRIES[1];
  } catch {
    return SUPPORTED_COUNTRIES[1];
  }
}

/**
 * Finds country info by code (e.g. "US") or dialCode (e.g. "+1")
 */
export function getCountryByCode(codeOrDial: string): CountryInfo {
  const match = SUPPORTED_COUNTRIES.find(
    (c) =>
      c.code.toLowerCase() === codeOrDial.toLowerCase() ||
      c.dialCode === codeOrDial
  );
  return match || SUPPORTED_COUNTRIES[1]; // fallback India
}

/**
 * Format national digits for display depending on country
 */
export function formatNationalNumber(digits: string, countryCode: string): string {
  const clean = digits.replace(/\D/g, "");

  if (countryCode === "US" || countryCode === "CA") {
    // (555) 019-2834
    if (clean.length === 0) return "";
    if (clean.length <= 3) return clean;
    if (clean.length <= 6) return `(${clean.slice(0, 3)}) ${clean.slice(3)}`;
    return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6, 10)}`;
  }

  if (countryCode === "IN") {
    // 98765 43210
    if (clean.length <= 5) return clean;
    return `${clean.slice(0, 5)} ${clean.slice(5, 10)}`;
  }

  if (countryCode === "GB") {
    // 7911 123456
    if (clean.length <= 4) return clean;
    return `${clean.slice(0, 4)} ${clean.slice(4, 10)}`;
  }

  if (countryCode === "AE" || countryCode === "SA") {
    // 50 123 4567
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 2)} ${clean.slice(2)}`;
    return `${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5, 9)}`;
  }

  if (countryCode === "AU") {
    // 412 345 678
    if (clean.length <= 3) return clean;
    if (clean.length <= 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)}`;
  }

  if (countryCode === "SG") {
    // 8123 4567
    if (clean.length <= 4) return clean;
    return `${clean.slice(0, 4)} ${clean.slice(4, 8)}`;
  }

  // Generic 3-3-4
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
  return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 10)}`;
}

/**
 * Validate phone number with country-specific rules.
 * Returns empty string if valid, or a descriptive error message if invalid.
 */
export function validatePhoneNumber(
  fullPhone: string,
  countryCode?: string,
  isRequired: boolean = true
): string {
  const trimmed = (fullPhone || "").trim();

  if (!trimmed) {
    return isRequired ? "Phone number is required" : "";
  }

  // Extract raw digits
  const rawDigits = trimmed.replace(/\D/g, "");

  // Resolve country: check prefix or parameter
  let country = countryCode ? getCountryByCode(countryCode) : null;
  if (!country) {
    if (trimmed.startsWith("+1") || (trimmed.startsWith("1") && rawDigits.length === 11)) {
      country = getCountryByCode("US");
    } else if (trimmed.startsWith("+91") || (trimmed.startsWith("91") && rawDigits.length === 12)) {
      country = getCountryByCode("IN");
    } else if (trimmed.startsWith("+44")) {
      country = getCountryByCode("GB");
    } else {
      country = detectUserCountry();
    }
  }

  // --- 1. US / CA Validation ---
  if (country.code === "US" || country.code === "CA") {
    let nationalDigits = rawDigits;
    if (rawDigits.length === 11 && rawDigits.startsWith("1")) {
      nationalDigits = rawDigits.slice(1);
    }
    if (nationalDigits.length === 0) {
      return "Phone number is required";
    }
    if (nationalDigits.length < 10) {
      return "Please enter a valid 10-digit US phone number";
    }
    if (nationalDigits.length > 10) {
      return "US phone numbers cannot exceed 10 digits";
    }
    // NANP area code cannot start with 0 or 1
    if (nationalDigits.startsWith("0") || nationalDigits.startsWith("1")) {
      return "US area code cannot start with 0 or 1";
    }
    // NANP exchange code (middle 3) cannot start with 0 or 1
    if (nationalDigits[3] === "0" || nationalDigits[3] === "1") {
      return "Invalid US phone number format";
    }
    return "";
  }

  // --- 2. India Validation ---
  if (country.code === "IN") {
    let nationalDigits = rawDigits;
    if (rawDigits.length === 12 && rawDigits.startsWith("91")) {
      nationalDigits = rawDigits.slice(2);
    } else if (rawDigits.length === 11 && rawDigits.startsWith("0")) {
      nationalDigits = rawDigits.slice(1);
    }
    if (nationalDigits.length === 0) {
      return "Phone number is required";
    }
    if (nationalDigits.length < 10) {
      return "Please enter a valid 10-digit Indian mobile number";
    }
    if (nationalDigits.length > 10) {
      return "Indian mobile numbers cannot exceed 10 digits";
    }
    if (!/^[6-9]/.test(nationalDigits)) {
      return "Indian mobile number must start with 6, 7, 8, or 9";
    }
    return "";
  }

  // --- 3. UK Validation ---
  if (country.code === "GB") {
    let nationalDigits = rawDigits;
    if (rawDigits.length === 12 && rawDigits.startsWith("44")) {
      nationalDigits = rawDigits.slice(2);
    }
    if (nationalDigits.length < 10) {
      return "Please enter a valid 10-digit UK phone number";
    }
    return "";
  }

  // --- 4. General International Validation ---
  if (rawDigits.length < 7) {
    return "Please enter a valid phone number (minimum 7 digits)";
  }
  if (rawDigits.length > 15) {
    return "Phone number exceeds maximum length of 15 digits";
  }

  return "";
}

/**
 * General Form Field Validators
 */
export const FormValidators = {
  name(value: string, isRequired = true): string {
    const trimmed = (value || "").trim();
    if (!trimmed) {
      return isRequired ? "Please enter your full name" : "";
    }
    if (trimmed.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  },

  email(value: string, isRequired = true): string {
    const trimmed = (value || "").trim();
    if (!trimmed) {
      return isRequired ? "Work email is required" : "";
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid work email (e.g. name@company.com)";
    }
    const parts = trimmed.split("@");
    if (parts.length === 2) {
      const domain = parts[1];
      if (!domain.includes(".")) {
        return "Please enter a valid domain (e.g. company.com)";
      }
      const tld = domain.split(".").pop();
      if (!tld || tld.length < 2) {
        return "Please enter a valid top-level domain (e.g. .com, .io)";
      }
    }
    return "";
  },

  company(value: string, isRequired = true): string {
    const trimmed = (value || "").trim();
    if (!trimmed) {
      return isRequired ? "Company name is required" : "";
    }
    if (trimmed.length < 2) {
      return "Company name must be at least 2 characters";
    }
    return "";
  },

  teamSize(value: string, isRequired = true): string {
    if (!value && isRequired) {
      return "Please select your team size";
    }
    return "";
  },

  phone(value: string, countryCode?: string, isRequired = true): string {
    return validatePhoneNumber(value, countryCode, isRequired);
  },
};

