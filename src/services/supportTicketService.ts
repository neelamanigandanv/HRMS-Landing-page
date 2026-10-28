// ============================================================================
// LATTIUM HR - SUPPORT TICKET API SERVICE (MOCK IMPLEMENTATION)
// Simulates POST /api/support/tickets with realistic SLA routing,
// priority flagging, session storage persistence, and tracking lookup.
// ============================================================================

import { SLA_RESPONSE_TIMES, PriorityOption } from "../data/supportData";

export interface TicketPayload {
  name: string;
  email: string;
  workEmail?: string;
  companyName: string;
  customerId?: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  subject: string;
  description: string;
  files?: Array<{ name: string; size: number; type: string }>;
  filesCount?: number;
  consent: boolean;
}

export interface TicketRecord extends TicketPayload {
  id: string;
  createdAt: string;
  status: "Open" | "In Review" | "In Progress" | "Assigned" | "Resolved";
  assignedTeam: string;
  expectedResponseSLA: string;
  isImmediateAlert: boolean;
  workEmail: string;
}

const STORAGE_KEY = "lattium_support_tickets_v1";

// In-memory fallback
const inMemoryTickets: Record<string, TicketRecord> = {};

function getStoredTickets(): Record<string, TicketRecord> {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch {
    // Ignore storage errors
  }
  return inMemoryTickets;
}

function saveTicket(ticket: TicketRecord) {
  try {
    const current = getStoredTickets();
    current[ticket.id] = ticket;
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
    inMemoryTickets[ticket.id] = ticket;
  } catch {
    inMemoryTickets[ticket.id] = ticket;
  }
}

/**
 * Determine internal support routing team based on issue category
 */
function determineAssignedTeam(category: string): string {
  if (category === "Payroll & compliance") return "Specialized Payroll & Compliance Team";
  if (category === "Integrations") return "Technical Integrations & Hardware Engineering";
  if (category === "Billing & subscription") return "Commercial & Billing Operations Desk";
  return "General HRMS Product Support Team";
}

/**
 * Submit a support ticket (Simulates POST /api/support/tickets)
 */
export async function submitSupportTicket(payload: TicketPayload): Promise<TicketRecord> {
  // Simulate network roundtrip latency (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Basic validation check
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.description?.trim()) {
    throw new Error("Please complete all required fields before submitting.");
  }

  // Generate unique human-readable ticket ID (e.g. TKT-2026-8921)
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `TKT-${new Date().getFullYear()}-${randomNum}`;

  const assignedTeam = determineAssignedTeam(payload.category);
  const expectedResponseSLA = SLA_RESPONSE_TIMES[payload.priority] || "1 business day";
  const isImmediateAlert = payload.priority === "Critical" || payload.priority === "High";

  const newTicket: TicketRecord = {
    ...payload,
    workEmail: payload.workEmail || payload.email,
    id: ticketId,
    createdAt: new Date().toISOString(),
    status: "Open",
    assignedTeam,
    expectedResponseSLA,
    isImmediateAlert,
  };

  // Persist ticket for tracking lookup
  saveTicket(newTicket);

  // In production, backend sends customer confirmation email with tracking link
  // e.g. https://lattiumhr.com/support/track?id=TKT-2026-XXXX
  console.log(`[Ticket Created] ${ticketId} routed to ${assignedTeam}. Immediate Alert: ${isImmediateAlert}`);

  return newTicket;
}

export type SupportTicket = TicketRecord;

/**
 * Retrieve a ticket by ID & optional email verification (synchronous from storage)
 */
export function getTicketById(
  ticketId: string,
  email?: string
): TicketRecord | null {
  const tickets = getStoredTickets();
  const normalizedId = ticketId.trim().toUpperCase();

  const found = Object.values(tickets).find(
    (t) => t.id.toUpperCase() === normalizedId
  );

  if (!found) {
    // If ticket was generated in past sessions, return a realistic mock matching the ID
    if (/^TKT-\d{4}-\d{4}$/i.test(normalizedId)) {
      return {
        id: normalizedId,
        name: "Valued Customer",
        email: email || "customer@company.com",
        workEmail: email || "customer@company.com",
        companyName: "Acme Enterprise",
        category: "Payroll & compliance",
        priority: "High",
        subject: "Monthly salary verification assistance",
        description: "Assistance requested regarding automated statutory tax computation preview.",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        status: "In Review",
        assignedTeam: "Specialized Payroll & Compliance Team",
        expectedResponseSLA: "4 hours",
        isImmediateAlert: true,
        consent: true,
      };
    }
    return null;
  }

  if (email && found.email.toLowerCase() !== email.trim().toLowerCase()) {
    throw new Error("Email does not match our records for this ticket ID.");
  }

  return found;
}
