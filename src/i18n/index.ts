import { en } from './en';
import { th } from './th';

export type Locale = 'en' | 'th';

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly string[]
      ? readonly string[]
      : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof en>;

export const translations: Record<Locale, Translations> = { en, th };
