import React from "react";

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow?: string;
  title: string | React.ReactNode;
  body?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

export default SectionHeading;
