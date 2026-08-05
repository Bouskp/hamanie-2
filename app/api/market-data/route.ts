import { NextResponse } from 'next/server'

const MOCK_AFRICAN_MARKETS = [
  {
    symbol: 'BRVMAG',
    name: 'BRVM Global (Abidjan)',
    index: 218.45,
    changePercent: 0.62,
  },
  {
    symbol: 'BRVM10',
    name: 'BRVM 10 (UEMOA)',
    index: 165.2,
    changePercent: -0.14,
  },
  {
    symbol: 'NGXASI',
    name: 'NGX All-Share (Lagos)',
    index: 98120.35,
    changePercent: 1.45,
  },
  {
    symbol: 'JSEMOS',
    name: 'JSE Top 40 (Johannesburg)',
    index: 74310.0,
    changePercent: -0.58,
  },
  {
    symbol: 'EGX30',
    name: 'EGX 30 (Le Caire)',
    index: 28450.15,
    changePercent: 0.89,
  },
  {
    symbol: 'GSEASI',
    name: 'GSE All-Share (Accra)',
    index: 3145.6,
    changePercent: 0.0,
  },
  {
    symbol: 'MASI',
    name: 'MASI (Casablanca)',
    index: 12980.4,
    changePercent: 0.31,
  },
]

export async function GET() {
  try {
    // Optionnel : On simule de légères fluctuations aléatoires de l'index pour animer l'interface
    const dynamicData = MOCK_AFRICAN_MARKETS.map((market) => {
      const variation = (Math.random() - 0.5) * (market.index * 0.002)
      const newIndex = market.index + variation
      const newPercent = market.changePercent + (Math.random() - 0.5) * 0.1

      return {
        ...market,
        index: parseFloat(newIndex.toFixed(2)),
        changePercent: parseFloat(newPercent.toFixed(2)),
      }
    })

    return NextResponse.json(dynamicData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du traitement des données' },
      { status: 500 },
    )
  }
}
