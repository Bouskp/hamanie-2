'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

interface MarketData {
  symbol: string
  name: string
  index: number
  changePercent: number
}

export default function StockTicker() {
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchMarketData = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/market-data')
      if (!res.ok) throw new Error('Erreur de communication API')

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setMarkets(data)
    } catch (err) {
      console.error('Erreur StockTicker :', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
    // Rafraîchissement automatique toutes les heures
    const interval = setInterval(fetchMarketData, 3600000)
    return () => clearInterval(interval)
  }, [])

  if (loading && markets.length === 0) {
    return (
      <div className='w-full bg-gray-950 text-gray-500 py-2 border-b border-gray-900 text-xs text-center font-mono'>
        Chargement des indices boursiers africains...
      </div>
    )
  }

  if (error && markets.length === 0) {
    return (
      <div className='w-full bg-gray-950 text-red-400 py-2 border-b border-gray-900 text-xs text-center font-mono'>
        Flux financier indisponible temporairement.
      </div>
    )
  }

  // Tripler le tableau permet un effet de boucle infinie parfaitement fluide
  const duplicatedMarkets = [...markets, ...markets, ...markets]

  return (
    <div className='w-full bg-gray-950 text-white py-2 border-b border-gray-900 text-[11px] md:text-xs font-mono select-none overflow-hidden h-9 flex items-center'>
      {/* 🛠️ Injection des règles CSS d'animation et de pause au survol */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes globalMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
        .ticker-wrap:hover .ticker-content {
          animation-play-state: paused !important;
        }
      `,
        }}
      />

      <div className='container max-w-7xl mx-auto flex items-center justify-between w-full px-4 relative ticker-wrap'>
        <div className='w-full overflow-hidden relative flex items-center'>
          {/* Ombres de fondu sur les bords gauche et droite */}
          <div className='absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-950 to-transparent z-10' />
          <div className='absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-950 to-transparent z-10' />

          {/* ⚡ Le ruban défile désormais partout grâce à l'animation globale forcée */}
          <div
            className='flex flex-row items-center whitespace-nowrap ticker-content'
            style={{
              width: 'max-content',
              display: 'flex',
              flexDirection: 'row',
              gap: '4rem', // Grand espace entre chaque élément
              animation: 'globalMarquee 30s linear infinite', // 30 secondes pour un mouvement fluide et élégant sur grand écran
            }}
          >
            {duplicatedMarkets.map((market, index) => {
              const currentChangePercent = market?.changePercent || 0
              const isPositive = currentChangePercent >= 0

              return (
                <div
                  key={`${market.symbol}-${index}`}
                  className='flex items-center'
                  style={{ gap: '0.5rem' }}
                >
                  {/* Symbole (ex: BRVMAG) */}
                  <span className='font-sans font-black text-gray-400 uppercase tracking-wider'>
                    {market?.symbol}
                  </span>

                  {/* Nom complet */}
                  <span className='text-gray-300 font-medium hidden sm:inline'>
                    ({market?.name})
                  </span>

                  {/* Valeur de l'indice */}
                  <span className='font-bold'>
                    {(market?.index || 0).toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>

                  {/* Pourcentage de variation */}
                  <span
                    className={`flex items-center font-bold px-1 rounded-sm ${
                      isPositive
                        ? 'text-emerald-400 bg-emerald-950/20'
                        : 'text-red-400 bg-red-950/20'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className='h-3 w-3 mr-0.5 flex-shrink-0' />
                    ) : (
                      <TrendingDown className='h-3 w-3 mr-0.5 flex-shrink-0' />
                    )}
                    {isPositive ? '+' : ''}
                    {currentChangePercent.toFixed(2)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bouton d'actualisation (Visible sur ordinateur pour forcer l'appel API) */}
        <button
          onClick={fetchMarketData}
          disabled={loading}
          title='Actualiser les cours'
          className='hidden lg:flex text-gray-500 hover:text-white transition-colors pl-4 border-l border-gray-800 ml-6 items-center justify-center flex-shrink-0 z-20'
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
          />
        </button>
      </div>
    </div>
  )
}
