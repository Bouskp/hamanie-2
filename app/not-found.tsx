import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='flex min-h-[80vh] flex-col items-center justify-center px-4 text-center'>
      <div className='space-y-4'>
        {/* Code d'erreur minimaliste */}
        <h1 className='font-serif text-8xl font-black tracking-tight text-red-600 md:text-9xl'>
          404
        </h1>

        {/* Message d'information */}
        <h2 className='font-serif text-2xl font-bold text-gray-900 dark:text-white md:text-3xl'>
          Page introuvable
        </h2>

        <p className='mx-auto max-w-md font-sans text-sm text-gray-500 dark:text-gray-400'>
          Désolé, la page que vous recherchez n'existe pas, a été déplacée ou
          est temporairement indisponible.
        </p>

        {/* Bouton de retour à l'accueil */}
        <div className='pt-6'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-xl bg-gray-950 px-6 py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100'
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
