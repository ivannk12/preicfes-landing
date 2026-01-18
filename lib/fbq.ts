// Meta Pixel helper for client-side events (use in onClick handlers for WhatsApp/CTA buttons).
export function trackContact() {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Contact");
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
