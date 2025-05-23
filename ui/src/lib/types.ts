export type ServiceStatus = "operational" | "degraded" | "partial_outage" | "major_outage";

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  lastChecked: string; // ISO date string
  description?: string;
}

export type IncidentStatus = "investigating" | "identified" | "resolved";

export interface IncidentUpdate {
  id: string;
  timestamp: string; // ISO date string
  message: string;
  status: IncidentStatus;
}

export interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  updates: IncidentUpdate[];
  affectedServices: string[];
  serviceName?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string; // ISO date string
  type: "resolved";
  description: string;
  incidentId?: string;
}

export interface StatusApiResponse {
  services: Service[];
  incidents: Incident[];
  activeIncidents: Incident[];
  timelineEvents: TimelineEvent[];
}

export interface WebSocketStatusChangeEvent {
  type: "statusChange";
  service: string; // service ID
  status: ServiceStatus;
}

export interface WebSocketIncidentUpdateEvent {
  type: "incidentUpdate";
  incident: Incident;
}

export type WebSocketEvent =
  | WebSocketStatusChangeEvent
  | WebSocketIncidentUpdateEvent;
