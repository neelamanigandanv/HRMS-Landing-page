import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type CurrencyType = "INR" | "USD";

interface CurrencyContextValue {
  currency: CurrencyType;
  isIndia: boolean;
  currencySymbol: string;
  setCurrency: (c: CurrencyType) => void;
  toggleCurrency: () => void;
  formatPrice: (inrAmount: number, usdAmount?: number) => string;
  formatSetup: (plan: "standard" | "professional" | "enterprise") => string;
  formatUserRate: (plan: "standard" | "professional") => string;
  formatText: (text: string) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

// Mapping of known static rupee expressions to their clean dollar equivalents
const RUPEE_TO_DOLLAR_MAP: Record<string, string> = {
  "₹28,42,650": "$34,500",
  "₹ 48,75,000": "$59,200",
  "₹48,75,000": "$59,200",
  "₹28.42L": "$34.5K",
  "₹34.8L": "$42.5K",
  "₹6.4L": "$7.8K",
  "₹28.4L": "$34.7K",
  "₹48.2L": "$58.5K",
  "₹48.75L": "$59.2K",
  "₹11.2L": "$13.6K",
  "₹2.1L": "$2.5K",
  "₹9.1L": "$11.1K",
  "₹8.4L": "$10.2K",
  "₹1.6L": "$1.9K",
  "₹6.8L": "$8.3K",
  "₹5.2L": "$6.3K",
  "₹1.0L": "$1.2K",
  "₹4.2L": "$5.1K",
  "₹4L+": "$5,000+",
  "₹6L+": "$7,500+",
  "₹5.8L": "$7,000+",
  "₹25,000": "$299",
  "₹50,000": "$599",
  "₹38,500": "$465",
  "₹2,450": "$30",
  "₹0": "$0",
  "₹12,000 – ₹35,000": "$150 – $420",
  "₹15,000": "$180",
  "₹21,000": "$250",
  "₹60,000": "$720",
  "₹24,000 to ₹30,000": "$290 to $360",
  "₹1,800": "$22",
  "₹18,000": "$220",
  "₹135": "$1.60",
  "₹585": "$7.00",
  "₹200": "$2.50",
  "₹300": "$3.60",
  "₹150 – ₹300": "$2 – $4",
  "₹3,000": "$36",
  "₹99": "$1.50",
  "₹199": "$2.50",
};

/**
 * Automatically detects whether the visitor is from India.
 * Factors checked:
 * 1. Saved localStorage preference
 * 2. Timezone (Asia/Kolkata or Asia/Calcutta)
 * 3. Timezone offset (-330 for UTC+5:30)
 * 4. Browser language / locale (e.g. en-IN, hi-IN, etc.)
 */
function detectIsIndia(): boolean {
  try {
    const saved = localStorage.getItem("lattium_currency");
    if (saved === "INR") return true;
    if (saved === "USD") return false;
  } catch {
    // ignore local storage restrictions
  }

  // Timezone check
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Calcutta") || tz.includes("Kolkata")) {
      return true;
    }
  } catch {
    // ignore
  }

  // Timezone offset check (India is UTC+5:30 -> offset -330 minutes)
  try {
    const offset = new Date().getTimezoneOffset();
    if (offset === -330) {
      return true;
    }
  } catch {
    // ignore
  }

  // Browser language check
  try {
    const langs = navigator.languages || [navigator.language];
    for (const l of langs) {
      if (/-IN$/i.test(l) || /^(hi|ta|te|kn|mr|gu|bn|pa|ml)/i.test(l)) {
        return true;
      }
    }
  } catch {
    // ignore
  }

  return false;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [isIndia, setIsIndia] = useState<boolean>(() => detectIsIndia());
  const [currency, setCurrencyState] = useState<CurrencyType>(() => (detectIsIndia() ? "INR" : "USD"));

  const setCurrency = useCallback((c: CurrencyType) => {
    setCurrencyState(c);
    setIsIndia(c === "INR");
    try {
      localStorage.setItem("lattium_currency", c);
    } catch {
      // ignore
    }
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrency(currency === "INR" ? "USD" : "INR");
  }, [currency, setCurrency]);

  // Non-blocking IP Geolocation verification
  useEffect(() => {
    // Only attempt IP lookup if the user hasn't explicitly set a preference in localStorage
    try {
      const saved = localStorage.getItem("lattium_currency");
      if (saved) return;
    } catch {
      // ignore
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);

    fetch("https://api.country.is/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timer);
        if (data && data.country) {
          const fromIndia = data.country.toUpperCase() === "IN";
          setIsIndia(fromIndia);
          setCurrencyState(fromIndia ? "INR" : "USD");
        }
      })
      .catch(() => {
        // Fallback to ipapi.co
        fetch("https://ipapi.co/json/", { signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.country_code) {
              const fromIndia = data.country_code.toUpperCase() === "IN";
              setIsIndia(fromIndia);
              setCurrencyState(fromIndia ? "INR" : "USD");
            }
          })
          .catch(() => {
            // Keep default timezone/locale detection
          });
      });

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const currencySymbol = isIndia ? "₹" : "$";

  /**
   * Formats a given number into the active currency
   */
  const formatPrice = useCallback(
    (inrAmount: number, usdAmount?: number): string => {
      if (isIndia) {
        return `₹${inrAmount.toLocaleString("en-IN")}`;
      }
      const finalUsd = usdAmount ?? Math.round(inrAmount / 82);
      return `$${finalUsd.toLocaleString("en-US")}`;
    },
    [isIndia]
  );

  /**
   * One-time setup fee text
   */
  const formatSetup = useCallback(
    (plan: "standard" | "professional" | "enterprise"): string => {
      if (plan === "enterprise") return "Custom";
      if (isIndia) {
        return plan === "standard" ? "₹25,000" : "₹50,000";
      }
      return plan === "standard" ? "$299" : "$599";
    },
    [isIndia]
  );

  /**
   * Per-user monthly rate text
   */
  const formatUserRate = useCallback(
    (plan: "standard" | "professional"): string => {
      if (isIndia) {
        return plan === "standard" ? "₹99" : "₹199";
      }
      return plan === "standard" ? "$1.50" : "$2.50";
    },
    [isIndia]
  );

  /**
   * Converts any text containing rupee symbols and expressions into dollars if outside India
   */
  const formatText = useCallback(
    (text: string): string => {
      if (isIndia || !text) return text;

      let result = text;

      // Replace known exact matches first
      for (const [rupeeStr, dollarStr] of Object.entries(RUPEE_TO_DOLLAR_MAP)) {
        if (result.includes(rupeeStr)) {
          result = result.split(rupeeStr).join(dollarStr);
        }
      }

      // If any lingering ₹ symbol exists, convert it intelligently:
      // Matches pattern like ₹ 1234 or ₹1234
      result = result.replace(/₹\s?([0-9,]+(?:\.[0-9]+)?)\s?L\b/gi, (_, numStr) => {
        const val = parseFloat(numStr.replace(/,/g, ""));
        const usdVal = ((val * 100000) / 82 / 1000).toFixed(1);
        return `$${usdVal}K`;
      });

      result = result.replace(/₹\s?([0-9,]+(?:\.[0-9]+)?)/g, (_, numStr) => {
        const val = parseFloat(numStr.replace(/,/g, ""));
        if (isNaN(val)) return `$${numStr}`;
        const usdVal = Math.round(val / 82);
        return `$${usdVal.toLocaleString("en-US")}`;
      });

      // Replace standalone ₹ with $
      result = result.replace(/₹/g, "$");

      return result;
    },
    [isIndia]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        isIndia,
        currencySymbol,
        setCurrency,
        toggleCurrency,
        formatPrice,
        formatSetup,
        formatUserRate,
        formatText,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

export default CurrencyContext;
