// Preparado para GA4 (gtag) e Meta Pixel (fbq). Nenhum ID está configurado:
// adicione os scripts oficiais no head quando tiver os IDs reais.
type W = Window & {
  gtag?: (...a: unknown[]) => void;
  fbq?: (...a: unknown[]) => void;
  dataLayer?: unknown[];
};
export type GFEvent =
  | "whatsapp_click"
  | "cta_primary_click"
  | "form_start"
  | "form_submit"
  | "final_cta_click";

export function track(event: GFEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.("event", event, params);
  if (event === "form_submit") w.fbq?.("track", "Lead", params);
  else if (event === "whatsapp_click" || event === "final_cta_click") w.fbq?.("track", "Contact", params);
  else w.fbq?.("trackCustom", event, params);
}
