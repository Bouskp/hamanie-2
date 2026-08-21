'use client'

import { useState, FormEvent } from 'react'

export default function NewsletterPage() {
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Appel à votre route d'API Next.js
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Une erreur est survenue. Veuillez réessayer.')
      }

      setStatus('success')
      setEmail('')
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(
        error.message || "Impossible de s'abonner pour le moment.",
      )
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md text-center'>
        <h1 className='text-3xl font-extrabold text-red-500 tracking-tight sm:text-4xl'>
          Restez informé ! 📬
        </h1>
        <p className='mt-3 text-lg text-gray-600'>
          Rejoignez notre newsletter pour recevoir les derniers articles de
          notre blog WordPress directement dans votre boîte mail.
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100'>
          {status === 'success' ? (
            <div className='rounded-md bg-green-50 p-4 text-center'>
              <p className='text-sm font-medium text-green-800'>
                🎉 Merci ! Votre inscription a bien été prise en compte.
                Vérifiez votre boîte de réception.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Adresse e-mail
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    placeholder='vous@exemple.com'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-gray-900 disabled:bg-gray-100'
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className='rounded-md p-4'>
                  <p className='text-sm text-red-500'>{errorMessage}</p>
                </div>
              )}

              <div>
                <button
                  type='submit'
                  disabled={status === 'loading'}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 transition-colors cursor-pointer'
                >
                  {status === 'loading'
                    ? 'Inscription en cours...'
                    : "S'abonner à la newsletter"}
                </button>
              </div>
            </form>
          )}

          <p className='mt-4 text-xs text-center text-gray-500'>
            Nous respectons votre vie privée. Pas de spam, désinscription en 1
            clic.
          </p>
        </div>
      </div>
    </div>
  )
}
