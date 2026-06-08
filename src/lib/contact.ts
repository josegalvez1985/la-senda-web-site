// TODO: reemplazar con los datos reales de la librería.
export const WHATSAPP_NUMBER = "595000000000"; // formato internacional, sin + ni espacios
export const CONTACT_EMAIL = "contacto@lasenda.com";
export const CONTACT_PHONE = "+595 000 000 000";
export const CONTACT_ADDRESS = "Luque, Paraguay";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
