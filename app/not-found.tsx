import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { pays } from '@/lib/utils' // Votre tableau avec les emojis drapeaux
import {
  Home,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CalendarDays,
} from 'lucide-react'

// Simulation d'articles de secours pour retenir le lecteur sur le site (Fil d'actualité de secours)
const articlesSecours = [
  {
    id: 1,
    title:
      "Abidjan : Clôture du sommet sur l'innovation technologique en Afrique",
    slug: 'sommet-innovation-abidjan',
    date: '2026-07-23',
    country: "Côte d'Ivoire",
    flag: '🇨🇮',
  },
  {
    id: 2,
    title:
      "Économie : Ce qu'il faut retenir du nouveau plan de croissance de la CEDEAO",
    slug: 'plan-croissance-cedeao',
    date: '2026-07-22',
    country: 'Sénégal',
    flag: '🇸🇳',
  },
  {
    id: 3,
    title:
      'Transition numérique : Une accélération majeure des infrastructures en RDC',
    slug: 'transition-numerique-rdc',
    date: '2026-07-20',
    country: 'RDC',
    flag: '🇨🇩',
  },
]

export default function NotFound() {
  return (
    <div className='bg-background min-h-screen text-foreground font-sans antialiased'>
      {/* 🚀 BANDEAU D'ALERTE INSTITUTIONNEL STYLE PRESSE */}
      <div className='w-full bg-red-700 text-white text-center py-2 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2'>
        <AlertCircle className='h-4 w-4 animate-pulse' />
        <span>Alerte Rédaction : Page Introuvable ou Archive Déplacée</span>
      </div>

      <div className='container max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-16'>
        {/* =========================================================================
            1. ZONE PRINCIPALE : L'ERREUR ÉDITORIALE (Grille asymétrique 2/3 - 1/3)
            ========================================================================= */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-center border-b pb-16'>
          {/* BLOC TEXTE PRINCIPAL (2/3) */}
          <div className='lg:col-span-2 space-y-6'>
            <h2 className='text-7xl md:text-9xl font-serif font-black tracking-tighter text-red-700/20 leading-none'>
              404
            </h2>
            <div className='space-y-3'>
              <h1 className='text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight'>
                L'article ou la rubrique demandée n'est plus en ligne.
              </h1>
              <p className='text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed'>
                Le contenu que vous recherchez a pu être déplacé dans nos
                archives numériques, renommé ou supprimé par notre équipe
                éditoriale.
              </p>
            </div>

            {/* BOUTONS D'ACTIONS STRAGÉTIQUES (shadcn/ui géométriques) */}
            <div className='flex flex-wrap gap-4 pt-2'>
              <Button
                asChild
                className='rounded-none bg-black text-white hover:bg-red-700 font-sans font-bold uppercase text-xs tracking-wider px-6 h-11 transition-colors'
              >
                <Link href='/'>
                  <Home className='mr-2 h-4 w-4' />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button
                variant='outline'
                className='rounded-none border-black hover:bg-muted font-sans font-bold uppercase text-xs tracking-wider px-6 h-11'
                onClick={() => window.location.reload()}
              >
                <RefreshCw className='mr-2 h-4 w-4' />
                Actualiser la page
              </Button>
            </div>
          </div>

          {/* BLOC RECHERCHE RAPIDE PAR PAYS (1/3) : Style Jeune Afrique */}
          <div className='p-6 bg-muted/40 border border-black rounded-none space-y-4'>
            <h3 className='text-xs font-black uppercase tracking-widest text-red-700 border-b pb-2'>
              Naviguer par Focus Pays
            </h3>
            <p className='text-xs text-muted-foreground leading-relaxed'>
              Accédez directement aux dépêches et analyses politiques régionales
              :
            </p>
            <div className='grid grid-cols-2 gap-2'>
              {pays.map((p) => (
                <Link
                  key={p.name}
                  href={`/pays/${p.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className='flex items-center gap-2 p-2 bg-background border hover:border-red-700 hover:text-red-700 transition-all text-xs font-bold uppercase tracking-wider'
                >
                  <span className='truncate'>{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. ZONE COMPLÉMENTAIRE : FIL D'ACTUALITÉS DE SECOURS (Anti-Rebond)
            ========================================================================= */}
        <div className='space-y-6'>
          <div className='flex items-end justify-between border-b-2 border-black pb-2'>
            <h2 className='text-xl md:text-2xl font-sans font-black uppercase tracking-wider'>
              À lire en direct sur Hamanie.news
            </h2>
            <Link
              href='/blog'
              className='text-xs font-bold text-red-700 uppercase tracking-widest flex items-center gap-1 hover:underline'
            >
              Toute l'actualité <ArrowRight className='h-3 w-3' />
            </Link>
          </div>

          {/* Grille des articles recommandés au format Forbes / Jeune Afrique */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {articlesSecours.map((article) => (
              <Card
                key={article.id}
                className='rounded-none border-0 bg-transparent shadow-none flex flex-col justify-between group'
              >
                <div className='space-y-3'>
                  <div className='flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-red-700'>
                    <span>{article.flag}</span>
                    <span>{article.country}</span>
                  </div>
                  <CardHeader className='p-0'>
                    <CardTitle className='text-base md:text-lg font-serif font-black leading-snug group-hover:text-red-700 transition-colors line-clamp-3'>
                      <Link href={`/posts/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <div className='flex items-center gap-1 text-[11px] text-muted-foreground font-sans'>
                    <CalendarDays className='h-3.5 w-3.5' />
                    <span>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        dateStyle: 'long',
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
