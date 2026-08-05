'use client'

import { HelpCircle, Mail, ShieldCheck } from 'lucide-react'

export default function FaqEntreprise() {
  const faqs = [
    {
      question: 'Quelle est la ligne éditoriale de notre média ?',
      reponse:
        "Nous proposons un journalisme de fond axé sur l'analyse politique, le décryptage macroéconomique et les grands reportages terrain. Notre objectif est de fournir des clés de lecture fiables et indépendantes sur les dynamiques du continent africain.",
    },
    {
      question:
        'À quelle fréquence vos éditions papier et numériques sont-elles publiées ?',
      reponse:
        "Notre flux d'actualités numériques est mis à jour en continu 24h/24. Nos magazines thématiques, grands formats et dossiers d'enquêtes exclusifs paraissent quant à eux chaque mois sur notre kiosque en ligne.",
    },
    {
      question: 'Comment sont protégées mes données sur le site?',
      reponse:
        "Toutes les transactions effectuées sur notre plateforme sont 100% sécurisées via un protocole de chiffrement SSL de bout en bout. Nous respectons strictement le RGPD et aucune de vos informations personnelles n'est revendue à des tiers.",
    },
    {
      question: 'Comment contacter la rédaction ou soumettre un sujet ?',
      reponse:
        "Pour soumettre un communiqué de presse, une tribune ou contacter un membre de notre équipe éditoriale, vous pouvez nous écrire directement par e-mail à l'adresse suivante : infos@mianmedia.com.",
    },
  ]

  return (
    <section className='w-full bg-white py-16  border-t border-gray-200'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* En-tête de la FAQ */}
        <div className='border-b-4 border-black pb-4'>
          <div className='flex items-center gap-2 mb-1.5'></div>
          <h2 className='text-3xl md:text-4xl font-extrabold font-serif tracking-tighter uppercase text-gray-900'>
            Foire Aux Questions
          </h2>
          <p className='text-gray-500 text-base  font-serif'>
            Tout ce que vous devez savoir sur notre fonctionnement, nos valeurs
            et nos engagements éditoriaux.
          </p>
        </div>

        {/* Liste des accordéons natifs (Style Presse) */}
        <div className='divide-y divide-gray-200 border-b border-gray-200'>
          {faqs.map((faq, index) => (
            <details
              key={index}
              className='group py-5 outline-none cursor-pointer [&_summary::-webkit-details-marker]:hidden'
            >
              {/* Le titre de la question cliquable */}
              <summary className='flex items-center justify-between gap-4 list-none text-base font-bold text-gray-900 hover:text-red-600 transition-colors'>
                <span className='font-serif leading-snug'>{faq.question}</span>

                {/* Icône de bascule dynamique (+ / -) */}
                <span className='relative w-4 h-4 shrink-0 text-gray-400 group-hover:text-red-600 transition-colors'>
                  <span className='absolute inset-0 w-full h-0.5 bg-current top-1/2 -translate-y-1/2'></span>
                  <span className='absolute inset-0 h-full w-0.5 bg-current left-1/2 -translate-x-1/2 group-open:scale-y-0 transition-transform duration-200'></span>
                </span>
              </summary>

              {/* Le contenu de la réponse révélé au clic */}
              <div className='mt-3 text-base text-gray-600 leading-relaxed max-w-3xl pr-6 font-sans select-text'>
                <p>{faq.reponse}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Pied de section d'aide rapide */}
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='bg-gray-50 border border-gray-100 p-4 flex items-start gap-3 rounded-none'>
            <Mail className='w-5 h-5 text-red-600 shrink-0 mt-0.5' />
            <div>
              <h4 className='text-xs font-black uppercase text-gray-900'>
                Une autre question ?
              </h4>
              <p className='text-xs text-gray-500 mt-1'>
                Notre support abonnés vous répond sous 24h via notre formulaire.
              </p>
            </div>
          </div>
          <div className='bg-gray-50 border border-gray-100 p-4 flex items-start gap-3 rounded-none'>
            <ShieldCheck className='w-5 h-5 text-emerald-600 shrink-0 mt-0.5' />
            <div>
              <h4 className='text-xs font-black uppercase text-gray-900'>
                Indépendance garantie
              </h4>
              <p className='text-xs text-gray-500 mt-1'>
                Média détenu à 100% par sa société éditrice, sans aucun groupe
                industriel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
