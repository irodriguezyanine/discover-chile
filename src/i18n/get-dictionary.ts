import { en, type Messages } from './en'
import { es } from './es'
import { pt } from './pt'
import { de } from './de'
import { fr } from './fr'
import { it } from './it'
import { nl } from './nl'
import { ja } from './ja'
import { ko } from './ko'
import { zh } from './zh'
import { ru } from './ru'
import { ar } from './ar'
import { deskGo } from './desk-go'
import { mergeMessages } from './merge'
import type { Locale } from './config'

const partials = { es, pt, de, fr, it, nl, ja, ko, zh, ru, ar }

export function getDictionary(locale: Locale): Messages {
  const extra = deskGo[locale] ?? deskGo.en
  if (locale === 'en') {
    return { ...en, desk: extra.desk, go: extra.go }
  }
  const merged = mergeMessages(en, partials[locale] as Parameters<typeof mergeMessages>[1])
  return { ...merged, desk: extra.desk, go: extra.go }
}
