const TRACKING_API = "https://brandbnalo.com/api/tracking/create";

// Set your default supplier ID here
const DEFAULT_SUPPLIER_TOKEN: string =
  process.env.NEXT_PUBLIC_SUPPLIER_TOKEN || "6ae81d2d5fcdb8cdab421523";

export type TrackingEventType = "call_click" | "whatsapp_click";

export interface TrackingObject {
  name?: string;
  supplierToken?: string;
}

export interface TrackEventParams {
  eventType: TrackingEventType;
  obj?: TrackingObject | null;
  source?: string;
  supplierToken?: string;
}

export interface ClickParams {
  obj?: TrackingObject | null;
  source?: string;
  supplierToken?: string;
}

export const trackEvent = ({
  eventType,
  obj = null,
  source = "Website",
  supplierToken,
}: TrackEventParams): void => {
  const payload = {
    productId: obj?.name || "N/A",
    supplierToken:
      supplierToken || obj?.supplierToken || DEFAULT_SUPPLIER_TOKEN,
    eventType,
    source,
  };

  if (!payload.supplierToken) {
    console.warn("Tracking: supplierToken missing");
    return;
  }

  // Fire and forget - no blocking navigation
  fetch(TRACKING_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error: unknown) => {
    console.error("Tracking Error:", error);
  });
};

// Call tracking
export const handleCallClick = ({
  obj = null,
  source = "Website",
  supplierToken,
}: ClickParams = {}): void => {
  trackEvent({ eventType: "call_click", obj, source, supplierToken });
};

// WhatsApp tracking
export const handleWhatsappClick = ({
  obj = null,
  source = "Website",
  supplierToken,
}: ClickParams = {}): void => {
  trackEvent({ eventType: "whatsapp_click", obj, source, supplierToken });
};