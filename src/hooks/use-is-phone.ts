"use client";

import { useLayoutEffect, useState } from "react";

/** Matches the recovered mobile desk breakpoint (max-width: 767px). */
export function useIsPhone() {
  const [phone, setPhone] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return phone;
}
