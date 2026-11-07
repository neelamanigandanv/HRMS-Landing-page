import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  CountryInfo,
  SUPPORTED_COUNTRIES,
  detectUserCountry,
  getCountryByCode,
  formatNationalNumber,
} from "../../utils/phoneUtils";
import CountryFlag from "./CountryFlag";
import Icon from "../ui/Icon";
import "./PhoneInput.css";

export interface PhoneInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (fullNumber: string, nationalNumber: string, countryCode: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  showTriggerFlag?: boolean;
  autoComplete?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  name = "phone",
  value = "",
  onChange,
  onBlur,
  hasError = false,
  required = false,
  placeholder,
  disabled = false,
  autoFocus = false,
  className = "",
  showTriggerFlag = false,
  autoComplete,
}) => {
  // 1. Initial country detection (USA if from US, India if from IN, or from value)
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(() => {
    // If value already has a country code prefix like +1 or +91
    if (value && value.startsWith("+")) {
      const matched = SUPPORTED_COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (matched) return matched;
    }
    return detectUserCountry();
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Extract national digits from current value
  const nationalDigits = useMemo(() => {
    if (!value) return "";
    let clean = value;
    // Strip dial code if present at start
    if (clean.startsWith(selectedCountry.dialCode)) {
      clean = clean.slice(selectedCountry.dialCode.length);
    } else if (clean.startsWith("+")) {
      // If it has another dial code, find and strip
      const other = SUPPORTED_COUNTRIES.find((c) => clean.startsWith(c.dialCode));
      if (other) clean = clean.slice(other.dialCode.length);
    }
    return clean.replace(/\D/g, "");
  }, [value, selectedCountry.dialCode]);

  // Formatted national number
  const formattedNational = useMemo(() => {
    return formatNationalNumber(nationalDigits, selectedCountry.code);
  }, [nationalDigits, selectedCountry.code]);

  // Sync country if value changes externally to a different dial code
  useEffect(() => {
    if (value && value.startsWith("+")) {
      const matched = SUPPORTED_COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (matched && matched.code !== selectedCountry.code) {
        setSelectedCountry(matched);
      }
    }
  }, [value]);

  // Filter countries for search
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return SUPPORTED_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return SUPPORTED_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle selecting a country
  const handleSelectCountry = (country: CountryInfo) => {
    setSelectedCountry(country);
    setIsOpen(false);

    // Format existing digits under the new country
    const newFormatted = formatNationalNumber(nationalDigits, country.code);
    const fullNumber = nationalDigits ? `${country.dialCode} ${newFormatted}` : "";
    onChange(fullNumber, nationalDigits, country.code);

    // Focus input after selecting
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Handle national number input typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, "");

    // Cap at reasonable max length for the country
    const maxDigits = selectedCountry.nationalLength + 2;
    const trimmedDigits = digitsOnly.slice(0, maxDigits);

    const formatted = formatNationalNumber(trimmedDigits, selectedCountry.code);
    const fullNumber = trimmedDigits ? `${selectedCountry.dialCode} ${formatted}` : "";

    onChange(fullNumber, trimmedDigits, selectedCountry.code);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={`phone-input-root ${className}`} ref={containerRef}>
      <div
        className={`phone-input-control ${isFocused ? "is-focused" : ""} ${
          hasError ? "has-error" : ""
        }`}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          className="phone-country-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Select Country Code (Current: ${selectedCountry.name} ${selectedCountry.dialCode})`}
          disabled={disabled}
        >
          {showTriggerFlag && (
            <span className="phone-country-flag" aria-hidden="true">
              <CountryFlag countryCode={selectedCountry.code} width={20} height={14} />
            </span>
          )}
          <span className="phone-country-dial">{selectedCountry.dialCode}</span>
          <span className="phone-country-chevron" aria-hidden="true">
            <Icon name="chevron-down" size={13} />
          </span>
        </button>

        {/* National Number Input */}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="tel"
          className="phone-national-input"
          value={formattedNational}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder || selectedCountry.placeholder}
          required={required}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete={autoComplete || "tel-national"}
          aria-invalid={hasError}
        />
      </div>

      {/* Country Selection Dropdown Menu */}
      {isOpen && (
        <div className="phone-dropdown-menu" role="listbox">
          <div className="phone-dropdown-search-wrap">
            <input
              ref={searchInputRef}
              type="text"
              className="phone-dropdown-search"
              placeholder="Search country or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search country or dial code"
            />
          </div>

          <ul className="phone-dropdown-list">
            {filteredCountries.map((country) => {
              const isSelected = country.code === selectedCountry.code;
              return (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={isSelected}
                  className={`phone-dropdown-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleSelectCountry(country)}
                >
                  <div className="phone-dropdown-item-left">
                    <span className="phone-dropdown-item-flag" aria-hidden="true">
                      <CountryFlag countryCode={country.code} width={18} height={13} />
                    </span>
                    <span className="phone-dropdown-item-name">{country.name}</span>
                  </div>
                  <span className="phone-dropdown-item-dial">{country.dialCode}</span>
                </li>
              );
            })}
            {filteredCountries.length === 0 && (
              <li className="phone-dropdown-empty">No countries matching &ldquo;{searchQuery}&rdquo;</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;

