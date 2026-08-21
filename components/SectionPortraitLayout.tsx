'use client'

import React from 'react'
import { User, ArrowUpRight, Bookmark, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatHtml } from '@/lib/utils'
import Image from 'next/image'

interface FocalPoint {
  x: string
  y: string
}

interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  featuredImage: string
  slug: string
  titre: string
  focalPoint: FocalPoint
}

export default function PortraitsGridBgLayout({ posts }: { posts: Post[] }) {
  return (
    <section className='bg-[#fcfbf9] text-zinc-900 py-4 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
          <Link
            href={'/rubrique/portraits-interviews'}
            className='group flex items-center gap-2'
          >
            <h2 className='font-condensed text-xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'>
              Portraits & Interviews
            </h2>
          </Link>

          {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
          <Link
            href={'/rubrique/portraits-interviews'}
            className='hidden text-gray-400 md:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider  hover:text-red-600 transition-colors group'
          >
            <span>Voir tout</span>
            <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
          </Link>
        </div>
        {/* Grille Responsive de cartes à fond photo */}
        <div className='relative w-full'>
          <div className='flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none overscroll-x-contain pb-4 -mx-4 px-4'>
            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className='min-w-[250px] w-[250px] sm:min-w-[250px] sm:w-[250px] aspect-[3/4] relative rounded-2xl overflow-hidden border border-gray-200/50 bg-gray-950 shadow-md group shrink-0 snap-start'
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes='(max-w-768px) 100vw, 33vw'
                    className='object-cover opacity-70 group-hover:scale-105 transition-transform duration-500 ease-out'
                    style={{
                      objectPosition: post.focalPoint
                        ? `${post.focalPoint.x} ${post.focalPoint.y}`
                        : '50% 50%',
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
                  <div className='absolute inset-x-0 bottom-0 p-6 space-y-2 flex flex-col justify-end text-white'>
                    <span className='font-condensed text-xs font-black uppercase tracking-widest text-red-500'>
                      {post.date}
                    </span>
                    <Link href={`/posts/${post.slug}`} className='block'>
                      <h3 className='font-serif text-sm sm:text-sm font-bold leading-snug group-hover:underline decoration-red-500 underline-offset-4 decoration-2'>
                        {formatHtml(post.title)}
                      </h3>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
