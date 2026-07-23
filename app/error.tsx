'use client' // 🚀 OBLIGATOIRE : Un gestionnaire d'erreur doit être un composant client

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw, Home, Mail, FileText } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void // Fonction native Next.js pour tenter de re-rendre la page
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // En production, loguez l'erreur WordPress vers un service d'analyse (ex: Sentry)
    console.error('Erreur critique WordPress Headless :', error)
  }, [error])

  return (
    <div className='bg-background min-h-screen text-foreground font-sans antialiased'>
      {/* 🚀 BANDEAU D'ALERTE FIL INFO (Breaking News) */}
      <div className='w-full bg-red-700 text-white text-center py-2 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2'>
        <AlertCircle className='h-4 w-4 animate-pulse' />
        <span>
          Incident Technique : Interruption de liaison avec les serveurs
          d'impression
        </span>
      </div>

      <div className='container max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12 text-center md:text-left'>
        {/* =========================================================================
            1. ZONE DE TEXTE ÉDITORIALE (Style Grand Journal)
            ========================================================================= */}
        <div className='space-y-6 border-b-4 border-black pb-10'>
          <span className='inline-block text-xs font-black uppercase tracking-widest bg-red-700/10 text-red-700 px-3 py-1 rounded-none border border-red-700/20 font-mono'>
            Erreur Système : 500 INTERNAL_SERVER_ERROR
          </span>

          <h1 className='text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight max-w-3xl'>
            Une erreur technique empêche la distribution de cet article.
          </h1>

          <p className='text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed'>
            Nos flux de synchronisation avec le back-office rencontrent une
            surcharge temporaire. L'interruption de service a été transmise à
            notre régie technique pour une résolution immédiate.
          </p>

          {/* Code d'erreur technique affiché de manière propre et discrète */}
          {error.digest && (
            <div className='bg-muted p-3 font-mono text-[11px] text-muted-foreground w-fit rounded-none border-l-2 border-muted-foreground/40'>
              Identifiant de l'incident :{' '}
              <span className='font-bold text-foreground'>{error.digest}</span>
            </div>
          )}
        </div>

        {/* =========================================================================
            2. CAPACITÉS DE RELANCE ET ACTIONS STRATÉGIQUES
            ========================================================================= */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
          {/* Actions Immédiates (Boutons géométriques stricts) */}
          <div className='space-y-4'>
            <h3 className='text-xs font-black uppercase tracking-widest text-red-700 font-sans'>
              Options de secours
            </h3>
            <div className='flex flex-col sm:flex-row gap-3'>
              {/* Le bouton reset tente de re-charger le Server Component qui a planté */}
              <Button
                onClick={() => reset()}
                className='rounded-none bg-red-700 text-white hover:bg-black font-sans font-bold uppercase text-xs tracking-wider px-6 h-11 transition-colors flex-1'
              >
                <RefreshCw className='mr-2 h-4 w-4' />
                Réessayer la lecture
              </Button>
              <Button
                asChild
                variant='outline'
                className='rounded-none border-black hover:bg-muted font-sans font-bold uppercase text-xs tracking-wider px-6 h-11 flex-1'
              >
                <Link href='/'>
                  <Home className='mr-2 h-4 w-4' />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>

          {/* Assistance & Liens Annexes */}
          <div className='space-y-3 p-5 bg-muted/40 border border-dashed rounded-none text-left'>
            <h4 className='text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5'>
              <Mail className='h-4 w-4 text-red-700' />
              Régie Technique
            </h4>
            <p className='text-xs text-muted-foreground leading-relaxed'>
              Si le problème persiste après actualisation, vous pouvez consulter
              nos rubriques d'assistance ou notifier nos ingénieurs système.
            </p>
            <div className='flex gap-4 pt-1 text-xs font-bold uppercase tracking-wider text-red-700'>
              <Link
                href='/assistance'
                className='hover:underline flex items-center gap-1'
              >
                <FileText className='h-3.5 w-3.5' /> Aide en ligne
              </Link>
              <Link href='/contact' className='hover:underline'>
                Signaler un bug →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
