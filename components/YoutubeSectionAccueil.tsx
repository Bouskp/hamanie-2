// components/sections/YoutubeSectionAccueil.tsx
'use client'

import { useState } from 'react'
import { Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LogoMianTv from '../app/images/MianTvLogo.png'

interface VideoItem {
  id: string
  titre: string
  description: string
  duree: string
  categorie: string
}

export default function YoutubeSectionAccueil() {
  const [videos] = useState<VideoItem[]>([
    {
      id: 'gnwjwl-eMPc',
      titre: 'Financements structurés : le rôle décisif du juriste bancaire',
      description:
        'Dans ce deuxième épisode de The Financial Corner, Fabrice Ekouman reçoit Ahmed Ouattara, juriste spécialisé en financements structurés et en marchés de capitaux.Ils reviennent sur le rôle du juriste bancaire dans la structuration d’un financement, la négociation des contrats, les garanties, le cadre OHADA, les opérations transfrontalières et la gestion du risque juridique.Un échange concret pour mieux comprendre les coulisses des grandes opérations financières.',
      duree: '1:37',
      categorie: 'The Financial Corner',
    },
    {
      id: '1KgBlQy5SDI',
      titre: 'Ep 1 : Joseph ACKAH, spécialiste ALM',
      description:
        'Dans ce premier épisode de The Financial Corner, Fabrice Ekouman reçoit Joseph Ackah, spécialiste ALM (Asset and Liability Management), pour un échange à la fois accessible, pédagogique et concret. Cet épisode permet de mieux comprendre le rôle de l’ALM dans une banque et la gestion des risques financiers.',
      duree: '1:35:00',
      categorie: 'The Financial Corner',
    },
    {
      id: 'Io3JQnQQ54k',
      titre: 'AgroMakers Ep 1 - Fabrice Tamegnon',
      description:
        'Entrepreneurs agricoles, porteurs de projets, experts et acteurs du terrain y partagent leurs parcours, leurs realities et leurs enseignements, sans langue de bois. Dans ce premier épisode, nous ouvrons la discussion avec Fabrice Tamegnon autour des défis concrets de l’agriculture africaine.',
      duree: '54:48',
      categorie: 'AgroMakers',
    },
    {
      id: 'DaQQkt9iBRE',
      titre:
        'AgroMakers Ep 02 - Les réalités de la transformation locale - Axel Emmanuel',
      description:
        "Dans cet épisode 2 d’AgroMakers, nous recevons Axel Emmanuel, chocolatier ivoirien engagé dans la transformation locale du cacao. Dans un pays premier producteur mondial de cacao, comment construire une marque made in Côte d’Ivoire et valoriser l'industrie locale ?",
      duree: '46:46',
      categorie: 'AgroMakers',
    },
    {
      id: 'Tpnq7oq9Tw4',
      description:
        'Aujourd’hui, nous recevons le Dr Jules N’Guessan, chirurgien-dentiste de formation, titulaire d’un Master de l’ESSEC Business School en région parisienne, et ayant effectué un programme d’échange à UCLA aux États-Unis. Son parcours professionnel l’a conduit de Abbott et Amgen en France à des responsabilités régionales chez Sanofi Pasteur, avant de rejoindre son entreprise pharmaceutique actuelle, où il est responsable marketing FSA. Nous allons revenir avec lui sur les choix qui ont orienté sa trajectoire, les étapes clés de son évolution et les enseignements qu’il tire de son expérience entre formation en santé et management stratégique en Afrique et à l’international.Bonne écoute.',
      titre: "Oser l'Élite : Dr Jules N’GUESSAN",
      duree: '1:24:00',
      categorie: "Oser l'Élite",
    },
  ])

  const [videoActive, setVideoActive] = useState<VideoItem>(videos[0])

  return (
    <section className='w-full bg-[#111] text-white py-14 my-12 border-y-4 border-red-600 antialiased'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* En-tête de la section Vidéo */}
        <div className='border-b border-gray-800 pb-4 mb-8 flex items-center justify-center md:justify-between gap-4'>
          <div className='flex items-center gap-4'>
            {/* EMPLACEMENT DU LOGO DU MÉDIA / DE LA CHAÎNE */}
            <Link
              href='https://www.youtube.com/@mian_media'
              target='_blank'
              rel='noopener noreferrer'
              className='relative w-12 h-12 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-lg hover:scale-105 hover:bg-red-700 transition-all duration-300 group/logo'
            >
              {/* Remplacez '/images/logo-mian-tv.png' par le chemin exact de votre logo carré */}
              <Image
                src={LogoMianTv}
                alt='Logo Mian TV'
                fill
                className='object-cover group-hover/logo:opacity-90'
                sizes='48px'
              />
            </Link>

            <div>
              <h2 className='text-lg md:text-2xl font-black font-serif tracking-tight uppercase text-white'>
                MIAN TV
              </h2>
            </div>
          </div>

          <Link
            href='https://www.youtube.com/@mian_media'
            target='_blank'
            rel='noopener noreferrer'
            className='hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors group'
          >
            <span>Chaîne YouTube</span>
            <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
          </Link>
        </div>

        {/* Grille Principale asymétrique */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* LECTEUR PRINCIPAL (7/12) */}
          <div className='order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between'>
            <div className='space-y-4'>
              <div className='relative aspect-[4/3] sm:aspect-video bg-black border border-gray-800 rounded-xs overflow-hidden'>
                <iframe
                  src={`https://www.youtube.com/embed/${videoActive.id}?autoplay=0&rel=0`}
                  title={videoActive.titre}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='absolute inset-0 w-full h-full border-0'
                />
              </div>

              <div className='space-y-2'>
                <span className='inline-block text-[10px] font-black bg-red-600 px-2 py-0.5 uppercase tracking-widest rounded-xs'>
                  {videoActive.categorie}
                </span>
                <h3 className='text-xl md:text-2xl font-bold font-serif leading-tight tracking-tight text-white'>
                  {videoActive.titre}
                </h3>
                {videoActive.description && (
                  <p className='text-gray-400 text-sm leading-relaxed font-normal'>
                    {videoActive.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* LISTE DES VIDÉOS SECONDAIRES (5/12) */}
          <div className='order-1 lg:order-2 lg:col-span-5 flex flex-col pt-6 lg:pt-0 lg:pl-6'>
            <h4 className='text-[11px] font-black uppercase text-gray-500 tracking-wider mb-3'>
              Dernières vidéos
            </h4>

            <div
              className='
        flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none overscroll-x-contain pb-2 -mx-4 px-4
        lg:flex-col lg:gap-0 lg:overflow-x-visible lg:snap-none lg:mx-0 lg:px-0 lg:pb-0 lg:divide-y lg:divide-gray-800/60 lg:max-h-[420px] lg:overflow-y-auto lg:pr-2 lg:scrollbar-thin lg:scrollbar-thumb-gray-800
      '
            >
              {videos.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => setVideoActive(vid)}
                  className={`
            shrink-0 w-[220px] sm:w-[260px] lg:w-full
            snap-start
            text-left py-3.5 flex gap-4 items-center group transition-all rounded-xs
            ${
              videoActive.id === vid.id
                ? 'bg-neutral-900/80 border-l-4 border-red-600 pl-3 -mx-2 pr-2'
                : 'hover:bg-neutral-900/30'
            }
          `}
                >
                  <div className='relative w-24 aspect-video bg-gray-800 shrink-0 border border-gray-700/50 flex items-center justify-center overflow-hidden rounded-xs'>
                    <Image
                      src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                      alt={vid.titre}
                      fill
                      unoptimized
                      className={`object-cover w-full h-full transition-opacity duration-300 ${
                        videoActive.id === vid.id
                          ? 'opacity-80'
                          : 'opacity-40 group-hover:opacity-70'
                      }`}
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                      <Play
                        className={`w-4 h-4 transition-transform duration-300 ${
                          videoActive.id === vid.id
                            ? 'text-red-500 scale-110'
                            : 'text-white group-hover:scale-110'
                        }`}
                        fill='currentColor'
                      />
                    </div>
                    <span className='absolute bottom-1 right-1 bg-black/80 text-[9px] px-1 rounded-xs font-mono font-bold text-gray-300'>
                      {vid.duree}
                    </span>
                  </div>

                  <div className='flex-1 min-w-0 space-y-1'>
                    <span className='text-[9px] font-bold text-gray-500 uppercase tracking-wider block'>
                      {vid.categorie}
                    </span>
                    <h5
                      className={`text-xs md:text-sm font-bold font-serif leading-snug line-clamp-2 transition-colors ${
                        videoActive.id === vid.id
                          ? 'text-red-500'
                          : 'text-gray-200 group-hover:text-white'
                      }`}
                    >
                      {vid.titre}
                    </h5>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
