"use client";

import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/actions/whatsapp";
import { ctaCopy } from "@/config/copy";

interface WhatsAppButtonProps {
  reasonId?: string;
  reasonTitle?: string;
}

export function WhatsAppButton({ reasonId, reasonTitle }: WhatsAppButtonProps) {
  const handleClick = async () => {
    const { url } = await createWhatsAppLink({ reasonId, reasonTitle });
    window.open(url, "_blank");
  };

  return (
    <Button onClick={handleClick} variant="outline" className="w-full">
      {ctaCopy.whatsapp_reason}
    </Button>
  );
}
