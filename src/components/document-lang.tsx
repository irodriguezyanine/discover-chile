"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { rtlLocales } from "@/i18n/config";

export function DocumentLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
