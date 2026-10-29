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
import type { Locale } from './config'

const dictionaries: Record<Locale, Messages> = { en, es, pt, de, fr, it, nl, ja, ko, zh, ru, ar }
export function getDictionary(locale: Locale): Messages {
  return dictionaries[locale] ?? en
}
