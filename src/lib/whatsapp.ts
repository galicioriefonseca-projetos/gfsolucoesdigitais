export const WHATSAPP_NUMBER = "5517996140963";
export const DEFAULT_MESSAGE =
  "Olá! Acessei a página da GF Soluções Digitais e gostaria de solicitar um diagnóstico gratuito da presença digital da minha empresa.";
export const waLink = (msg: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
