"use client";

import type { ReactNode } from "react";
import { SliderNavProvider } from "./SliderNavContext";
import WhatsAppFloating from "./WhatsAppFloating";

export default function AppChrome({ children }: { children: ReactNode }) {
  return (
    <SliderNavProvider>
      {children}
      <WhatsAppFloating />
    </SliderNavProvider>
  );
}
