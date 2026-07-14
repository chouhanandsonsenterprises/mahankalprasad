import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phone = "919977002593";
  const text = encodeURIComponent("Namaste! I have a question about Mahankal Prasad.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
      data-testid="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="white" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

export default WhatsAppButton;
