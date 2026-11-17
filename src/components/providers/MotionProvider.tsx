"use client";

import { MotionConfig } from "motion/react";

// "user" respeta la opción "reducir movimiento" del sistema: se mantienen los
// fundidos de opacidad y se omiten desplazamientos, escalas y bucles.
const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
