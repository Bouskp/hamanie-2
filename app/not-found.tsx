import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <div>
        <h1>404 - Page non trouvée</h1>
        <p>Désolé, la page que vous recherchez n'existe pas.</p>
        <Link href='/'>Retour à l'accueil</Link>
      </div>
    </section>
  )
}
