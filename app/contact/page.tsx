import { Shield, Users, Radio, Award } from 'lucide-react'

export const metadata = {
  title: 'À propos de nous | Notre Média',
  description:
    'Découvrez l’histoire, les valeurs et les engagements éditoriaux de notre rédaction indépendante.',
}

export default function AProposPage() {
  const chiffresCles = [
    { valeur: '20+', libelle: 'Pays couverts en Afrique' },
    { valeur: '50+', libelle: 'Journalistes & correspondants' },
    { valeur: '24h/24', libelle: 'Flux d’actualité en continu' },
    { valeur: '1M+', libelle: 'Lecteurs mensuels uniques' },
  ]

  const nosPiliers = [
    {
      icone: <Shield className='w-6 h-6 text-red-600 stroke-[2]' />,
      titre: 'Indépendance absolue',
      description:
        "Libre de toute influence politique ou financière, notre ligne éditoriale est guidée par l'exactitude des faits et l'intérêt public.",
    },
    {
      icone: <Users className='w-6 h-6 text-red-600 stroke-[2]' />,
      titre: 'Réseau de correspondants',
      description:
        "Nous croyons en l'information brute. Nos envoyés spéciaux et analystes locaux valident chaque information directement depuis le terrain.",
    },
    {
      icone: <Radio className='w-6 h-6 text-red-600 stroke-[2]' />,
      titre: 'Analyse de fond',
      description:
        'Nous fuyons le sensationnalisme pour privilégier le décryptage macroéconomique, les enquêtes de long cours et les grands formats.',
    },
  ]

  return (
    <main className='bg-[#fcfcfc] min-h-screen font-sans antialiased text-gray-900 py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* 1. MANIFESTE & HISTOIRE */}
        <section className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b-4 border-black pb-12 mb-12'>
          {/* Bloc d'accroche gauche */}
          <div className='lg:col-span-5'>
            <span className='text-[10px] font-black tracking-widest text-red-600 uppercase block mb-2'>
              Qui sommes-nous
            </span>
            <h1 className='text-4xl md:text-5xl font-black font-serif tracking-tighter uppercase text-gray-900 leading-none'>
              Éclairer le présent, anticiper l’avenir.
            </h1>
          </div>

          {/* Bloc de texte éditorial droite */}
          <div className='lg:col-span-7 text-gray-600 text-base md:text-lg leading-relaxed font-serif space-y-6'>
            <p className='font-bold text-gray-900'>
              Fondé avec l'ambition de proposer un regard neuf et rigoureux sur
              les dynamiques continentales, notre média s'impose comme la
              plateforme de référence pour les décideurs, analystes et citoyens.
            </p>
            <p>
              Chaque jour, notre rédaction se mobilise pour transformer le flux
              complexe de l'actualité en analyses claires et exploitables. Nous
              couvrons les transformations politiques, les mutations économiques
              et les grands mouvements sociétaux avec un souci constant d'équité
              et d'objectivité.
            </p>
          </div>
        </section>

        {/* 2. LE BANDEAU DES CHIFFRES CLÉS */}
        <section className='bg-black text-white p-8 md:p-12 mb-16 rounded-none shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y divide-gray-800 lg:divide-y-0 lg:divide-x divide-gray-800'>
          {chiffresCles.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center ${idx >= 2 ? 'pt-6 lg:pt-0' : ''}`}
            >
              <span className='text-4xl md:text-5xl font-black font-serif tracking-tight text-red-500'>
                {item.valeur}
              </span>
              <span className='text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-2 block px-2'>
                {item.libelle}
              </span>
            </div>
          ))}
        </section>

        {/* 3. NOS PILIERS ÉDITORIAUX */}
        <section className='space-y-8'>
          <div className='border-b border-gray-200 pb-3'>
            <h2 className='text-xs font-black uppercase tracking-widest text-gray-400'>
              Nos engagements
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {nosPiliers.map((pilier, idx) => (
              <div
                key={idx}
                className='bg-white border border-gray-200/80 p-6 rounded-none shadow-sm flex flex-col justify-between'
              >
                <div>
                  <div className='mb-4 inline-block bg-gray-50 p-2.5 border border-gray-100'>
                    {pilier.icone}
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 font-serif mb-2 leading-tight'>
                    {pilier.titre}
                  </h3>
                  <p className='text-gray-500 text-xs md:text-sm leading-relaxed'>
                    {pilier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. BLOC RECONNAISSANCE ETHIQUE */}
        <footer className='mt-16 bg-gray-50 border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between'>
          <div className='flex items-center gap-3 text-left'>
            <Award className='w-8 h-8 text-emerald-600 shrink-0' />
            <div>
              <h4 className='text-xs font-black uppercase text-gray-900'>
                Journalisme certifié
              </h4>
              <p className='text-xs text-gray-400 mt-0.5 leading-tight'>
                Membre actif du conseil international pour la déontologie de la
                presse écrite.
              </p>
            </div>
          </div>
          <div className='text-xs font-bold text-gray-500 font-serif'>
            Édition Rédactionnelle 2026
          </div>
        </footer>
      </div>
    </main>
  )
}
