// Contract shared between the persona CTAs (Personas.tsx) and the contact form (Contact.tsx).
// Persona cards dispatch a service KEY; the form resolves it to the localized option.

export const PRESET_SERVICE_EVENT = "forpus:preset-service";

// Canonical service order — MUST match the order of `contact.form.serviceOptions`
// in lib/i18n/dictionary.ts (both locales). This is the single positional source of truth.
export const SERVICE_KEYS = ["web", "mobile", "ads", "social", "all"] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];
