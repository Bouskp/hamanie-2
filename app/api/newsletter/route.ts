import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    console.log(email)

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    // ICI : Connectez votre outil de newsletter (Brevo, Mailchimp, Resend, Loop...)
    // Exemple fictif d'envoi vers une API externe :
    /*
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    await fetch('https://resend.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unscribed: false }),
    });
    */

    // Pour le moment, on simule une réussite immédiate
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
