import React from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import { JobOpening } from "../../data/careersData";

interface JobCardProps {
  job: JobOpening;
  onApply: (job: JobOpening) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <article className="careers-job-card" aria-labelledby={`job-title-${job.id}`}>
      <div className="careers-job-card-main">
        {/* Department Badge & Title Header */}
        <div className="careers-job-card-header">
          <div className="careers-job-dept-row">
            <span className="careers-job-dept-badge">
              <span className="careers-dept-bullet" aria-hidden="true" />
              {job.department}
            </span>
            <span className="careers-job-date-text">Posted Recently</span>
          </div>

          <h3 id={`job-title-${job.id}`} className="careers-job-title">
            <Link to={`/careers/${job.id}`} className="careers-job-title-link">
              {job.title}
            </Link>
          </h3>
        </div>

        <p className="careers-job-summary">{job.shortSummary}</p>

        {/* Metadata Badges Row */}
        <div className="careers-job-meta-row">
          <span className="careers-job-meta-tag">
            <Icon name="map-pin" size={13} /> {job.location}
          </span>
          <span className="careers-job-meta-tag">
            <Icon name="clock" size={13} /> {job.type}
          </span>
          <span className="careers-job-meta-tag">
            <Icon name="briefcase" size={13} /> {job.experience}
          </span>
          {job.salaryRange && (
            <span className="careers-job-meta-tag salary">
              <Icon name="wallet" size={13} /> {job.salaryRange}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="careers-job-card-actions">
        <Link
          to={`/careers/${job.id}`}
          className="careers-btn-view-details"
          aria-label={`View full details for ${job.title}`}
        >
          <span>View Details</span>
          <Icon name="arrow" size={14} />
        </Link>
        <button
          type="button"
          onClick={() => onApply(job)}
          className="careers-btn-apply-direct"
          aria-label={`Apply directly for ${job.title}`}
        >
          Apply Now
        </button>
      </div>
    </article>
  );
}
