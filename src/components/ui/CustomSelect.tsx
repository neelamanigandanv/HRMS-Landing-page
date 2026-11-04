import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import "./CustomSelect.css";

export interface CustomSelectOption {
  value: string;
  label: string;
  desc?: string;
  icon?: string;
}

interface CustomSelectProps {
  id?: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select an option",
  hasError = false,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          if (onBlur) onBlur();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onBlur]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      if (isOpen && onBlur) onBlur();
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      if (onBlur) onBlur();
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      onChange(options[nextIndex].value);
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      onChange(options[prevIndex].value);
    }
  };

  const handleSelectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    triggerRef.current?.focus();
    if (onBlur) onBlur();
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select-container ${isOpen ? "is-open" : ""} ${hasError ? "has-error" : ""} ${
        disabled ? "is-disabled" : ""
      } ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className="custom-select-trigger"
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            if (isOpen && onBlur) onBlur();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={hasError}
        disabled={disabled}
      >
        <span className={`custom-select-trigger-label ${!selectedOption ? "is-placeholder" : ""}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`custom-select-caret ${isOpen ? "rotate" : ""}`} aria-hidden="true">
          <Icon name="chevron-down" size={15} />
        </span>
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="custom-select-dropdown" role="listbox">
          <div className="custom-select-options-list">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`custom-select-option ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleSelectOption(option.value)}
                >
                  <div className="custom-select-option-content">
                    <span className="custom-select-option-label">{option.label}</span>
                    {option.desc && (
                      <span className="custom-select-option-desc">{option.desc}</span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="custom-select-check-icon" aria-hidden="true">
                      <Icon name="check" size={14} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

