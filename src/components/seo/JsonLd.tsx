import { useEffect } from "react";
import type { SchemaGraph, SchemaObject } from "../../lib/schema";

export interface JsonLdProps {
  schema: SchemaGraph | SchemaObject | Array<SchemaObject>;
  id?: string;
}

/**
 * Renders a Schema.org JSON-LD structured data script in document.head.
 * Ensures safe JSON serialization (escaping '<' to prevent script-breakout XSS),
 * and prevents duplicate JSON-LD blocks on hydration by updating existing script tags in place.
 */
export function JsonLd({ schema, id = "zentilos-jsonld" }: JsonLdProps) {
  useEffect(() => {
    if (!schema) return;

    // Safe JSON serialization escaping HTML tag characters
    const serialized = JSON.stringify(schema, null, 2).replace(/</g, "\\u003c");

    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let targetScript: HTMLScriptElement | null = null;

    if (existingScripts.length > 0) {
      // Find the script matching our ID or attribute
      for (let i = 0; i < existingScripts.length; i++) {
        const s = existingScripts[i] as HTMLScriptElement;
        if (s.id === id || s.getAttribute("data-zentilos-jsonld") === "true") {
          targetScript = s;
          break;
        }
      }
      if (!targetScript) {
        targetScript = existingScripts[0] as HTMLScriptElement;
      }
      // Remove any duplicate JSON-LD scripts
      for (let i = 0; i < existingScripts.length; i++) {
        if (existingScripts[i] !== targetScript) {
          existingScripts[i].remove();
        }
      }
    }

    if (!targetScript) {
      targetScript = document.createElement("script");
      targetScript.id = id;
      targetScript.type = "application/ld+json";
      document.head.appendChild(targetScript);
    }

    targetScript.id = id;
    targetScript.setAttribute("data-zentilos-jsonld", "true");
    targetScript.textContent = serialized;
  }, [schema, id]);

  return null;
}

export default JsonLd;
