import React from "react";
import Icon from "../ui/Icon";
import { DEPARTMENTS, LOCATIONS, JOB_TYPES } from "../../data/careersData";

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (val: string) => void;
  selectedLocation: string;
  onLocationChange: (val: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  onClearAll: () => void;
  totalMatches: number;
}

export default function JobFilters({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLocation,
  onLocationChange,
  selectedType,
  onTypeChange,
  onClearAll,
  totalMatches,
}: JobFiltersProps) {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedDepartment !== "All Departments" ||
    selectedLocation !== "All Locations" ||
    selectedType !== "All Types";

  return (
    <div className="careers-filters-wrapper" role="search" aria-label="Filter job openings">
      {/* 1. Quick Department Filter Pills */}
      <div className="careers-dept-pills-bar">
        {DEPARTMENTS.map((dept) => {
          const isActive = selectedDepartment === dept;
          return (
            <button
              key={dept}
              type="button"
              onClick={() => onDepartmentChange(dept)}
              className={`careers-dept-pill ${isActive ? "is-active" : ""}`}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {/* 2. Main Search & Dropdown Controls Card */}
      <div className="careers-filters-main-row">
        {/* Search input with sleek icon and clear button */}
        <div className="careers-search-box">
          <span className="careers-search-icon" aria-hidden="true">
            <Icon name="search" size={18} />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, tech stack, skill, or keyword..."
            className="careers-search-input"
            aria-label="Search job openings"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="careers-search-clear"
              aria-label="Clear search text"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdowns Row with contextual icons */}
        <div className="careers-selects-row">
          {/* Department Select */}
          <div className="careers-select-wrap">
            <span className="careers-select-icon" aria-hidden="true">
              <Icon name="briefcase" size={15} />
            </span>
            <select
              id="dept-filter"
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="careers-filter-select"
              aria-label="Filter by department"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <span className="careers-select-chevron" aria-hidden="true">
              <Icon name="chevron" size={14} />
            </span>
          </div>

          {/* Location Select */}
          <div className="careers-select-wrap">
            <span className="careers-select-icon" aria-hidden="true">
              <Icon name="map-pin" size={15} />
            </span>
            <select
              id="loc-filter"
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="careers-filter-select"
              aria-label="Filter by location"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <span className="careers-select-chevron" aria-hidden="true">
              <Icon name="chevron" size={14} />
            </span>
          </div>

          {/* Type Select */}
          <div className="careers-select-wrap">
            <span className="careers-select-icon" aria-hidden="true">
              <Icon name="clock" size={15} />
            </span>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="careers-filter-select"
              aria-label="Filter by employment type"
            >
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="careers-select-chevron" aria-hidden="true">
              <Icon name="chevron" size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Results & Active Tags Status Bar */}
      <div className="careers-filters-status-bar">
        <div className="careers-status-left">
          <span className="careers-results-badge">
            <span className="careers-results-dot" />
            Showing <strong>{totalMatches}</strong> {totalMatches === 1 ? "position" : "positions"}
          </span>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="careers-active-chips-wrap">
              {searchQuery.trim() && (
                <span className="careers-filter-chip">
                  Keyword: "{searchQuery}"
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    aria-label="Remove search filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDepartment !== "All Departments" && (
                <span className="careers-filter-chip">
                  {selectedDepartment}
                  <button
                    type="button"
                    onClick={() => onDepartmentChange("All Departments")}
                    aria-label="Remove department filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedLocation !== "All Locations" && (
                <span className="careers-filter-chip">
                  {selectedLocation}
                  <button
                    type="button"
                    onClick={() => onLocationChange("All Locations")}
                    aria-label="Remove location filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType !== "All Types" && (
                <span className="careers-filter-chip">
                  {selectedType}
                  <button
                    type="button"
                    onClick={() => onTypeChange("All Types")}
                    aria-label="Remove job type filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="careers-btn-clear-filters"
          >
            Clear all filters ✕
          </button>
        )}
      </div>
    </div>
  );
}
