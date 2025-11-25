import { WhatsAppWebhook } from "@/types/whatsAppWebHookAPI";

function isWhatsAppWebhook(body: any): body is WhatsAppWebhook {
  return (
    body &&
    typeof body === "object" &&
    body.object === "whatsapp_business_account" &&
    Array.isArray(body.entry) &&
    body.entry.every((e: any) =>
      e &&
      typeof e.id === "string" &&
      Array.isArray(e.changes) &&
      e.changes.every((c: any) =>
        c &&
        c.field === "messages" &&
        c.value &&
        c.value.messaging_product === "whatsapp"
      )
    )
  );
}

export default isWhatsAppWebhook;
