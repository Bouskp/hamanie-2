import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { decode } from 'html-entities'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHtml(contenuBrut: string): string {
  if (!contenuBrut) return ''

  const premierDecodage = decode(contenuBrut)
  const htmlPur = decode(premierDecodage)

  return htmlPur
    .replace(/<br\s*\/?>/gi, '') // Supprime les sauts de ligne inutiles
    .replace(/<p>&nbsp;<\/p>/gi, '') // Supprime les paragraphes d'espaces vides
    .replace(/>\s+</g, '><') // Supprime les grands espaces blancs inter-balises
    .trim()
}

export const categories = [
  { id: 72, slug: 'politique', title: 'Politique' },
  { id: 68, slug: 'economie', title: 'Economie' },
  { id: 609, slug: 'international', title: 'International' },
  { id: 959, slug: 'entreprises', title: 'Entreprises' },
  { id: 76, slug: 'sport', title: 'Sport' },
  { id: 74, slug: 'societe', title: 'Société' },
  { id: 70, slug: 'culture', title: 'Culture' },
  { id: 827, slug: 'agromakers', title: 'AgroMakers' },
  { id: 971, slug: 'education-formation', title: 'Éducation & Formation' },
]

export const pays = [
  { name: "Côte d'Ivoire", code: 'ci' },
  { name: 'Sénégal', code: 'sn' },
  { name: 'Mali', code: 'ml' },
  { name: 'Maroc', code: 'ma' },
  { name: 'Cameroun', code: 'cm' },
  { name: 'RDC', code: 'cd' },
]
