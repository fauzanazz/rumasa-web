"use client";

import { Button } from "@/components/ui/button";

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
}

export function ScrollButton({ targetId, children }: ScrollButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button size="lg" variant="outline" onClick={handleClick}>
      {children}
    </Button>
  );
}
