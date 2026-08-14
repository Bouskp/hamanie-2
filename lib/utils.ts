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

interface Category {
  id: number
  slug: string
  title: string
  children?: Category[]
}

export const categories: Category[] = [
  { id: 68, slug: 'economie', title: 'Economie' },
  { id: 1525, slug: 'finance-marchés', title: 'Finance & Marchés' },
  { id: 72, slug: 'politique', title: 'Politique' },
  { id: 959, slug: 'entreprises', title: 'Entreprises' },
  { id: 1527, slug: 'start-up', title: 'Start-up' },
  { id: 74, slug: 'societe', title: 'Société' },
  { id: 971, slug: 'education-formation', title: 'Éducation & Formation' },
  { id: 609, slug: 'international', title: 'International' },
  { id: 1533, slug: 'idees-analyses', title: 'Idees & Analyses' },
  { id: 1529, slug: 'portraits', title: 'Portraits' },
  {
    id: 1531,
    slug: 'dossiers-enquetes-decryptage"',
    title: 'Dossiers-Enquêtes-Décryptages',
  },
]

export const zones = [
  { id: 1629, slug: 'afrique-de-l-ouest', name: "Afrique de l'Ouest" },
  {
    id: 1630,
    slug: 'afrique-de-l-est',
    name: "Afrique de l'Est",
  },
  {
    id: 1631,
    slug: 'afrique-du-nord',
    name: 'Afrique du Nord',
  },
  {
    id: 1632,
    slug: 'afrique-du-sud',
    name: 'Afrique Australe',
  },
]

export const imagePlaceholderBase64 = () => {
  const str = `
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://w3.org">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <path d="M185 135 L215 135 L215 165 L185 165 Z" fill="#e5e7eb"/>
      <circle cx="200" cy="150" r="25" stroke="#e5e7eb" stroke-width="3" fill="none"/>
    </svg>
  `

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(str)}`
}

export function calculateReadingTime(htmlContent: string): number {
  if (!htmlContent) return 1
  // Supprime les balises HTML pour ne garder que le texte brut
  const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, '')
  // Compte le nombre de mots
  const wordsCount = text.trim().split(/\s+/).length
  // Base moyenne de lecture : 200 mots par minute
  const minutes = Math.ceil(wordsCount / 200)
  return minutes > 0 ? minutes : 1
}

export function formatMediaDate(dateString: string): string {
  if (!dateString) return ''

  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short', // 'short' donne 'juil.' ou 'août', 'long' donne 'juillet'
    year: 'numeric',
  })
}

/**
 * Nettoie l'extrait WordPress en retirant les balises HTML
 * et les crochets de troncature automatique [...]
 */
export function cleanWordPressExcerpt(excerpt: string): string {
  if (!excerpt) return ''

  return excerpt
    .replace(/<[^>]*>/g, '') // 1. Supprime toutes les balises HTML
    .replace(/\[\.\.\.\]/g, '') // 2. Supprime explicitement "[...]"
    .replace(/\[&hellip;\]/g, '') // 3. Supprime la variante encodée HTML "[&hellip;]"
    .trim() // 4. Nettoie les espaces vides restants au début et à la fin
}

export const groupeSites = [
  { label: 'Sakafo', href: 'https://sakafo.cooking/' },
  {
    label: 'Libula',
    href: 'https://libula.media/',
  },
  { label: 'Almasi', href: 'https://almasi.fashion/' },
  { label: 'MianMedia', href: 'https://mianmedia.com/' },
  { label: 'Sante360', href: '' },
]

export const footerLinks = [
  {
    title: 'Actualités',
    links: categories.map((p) => ({
      label: p.title,
      href: `/rubrique/${p.slug}`,
    })),
  },
  {
    title: 'Zones',
    links: zones.map((p) => ({
      label: p.name,
      href: `/zones/${p.slug}`,
    })),
  },
  {
    title: 'Autres sites du groupe',
    links: groupeSites,
  },
  {
    title: 'Services',
    links: [
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Boutique / Magazines', href: '/magazines' },
    ],
  },
  {
    title: 'Aide & Contact',
    links: [
      { label: 'FAQ / Aide', href: '/aide' },
      { label: 'Nous contacter', href: '/contact' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Charte éthique', href: '/charte' },
    ],
  },
]

export const RsLinksMianMedia = [
  {
    nom: 'facebook',
    url: '',
  },
  {
    nom: 'X(twitter)',
    url: '',
  },
  {
    nom: 'youTube',
    url: '',
  },
  {
    nom: 'instagram',
    url: '',
  },
  {
    nom: 'linkedin',
    url: '',
  },
]

export const RsLinksHamanie = [
  {
    nom: 'facebook',
    url: '',
  },
  {
    nom: 'X(twitter)',
    url: '',
  },
  {
    nom: 'youTube',
    url: '',
  },
  {
    nom: 'instagram',
    url: '',
  },
  {
    nom: 'linkedin',
    url: '',
  },
]
