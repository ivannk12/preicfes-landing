// Meta Pixel helper for client-side Contact events with CTA context.
type ContactParams = {
  channel: "whatsapp";
  cta_location: string;
};

export function trackContact(params: ContactParams) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Contact", params);
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
