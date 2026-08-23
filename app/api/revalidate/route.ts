import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: { secret?: string; slug?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { message: 'Corps de requête invalide' },
      { status: 400 },
    )
  }

  const { secret, slug } = body

  if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Secret invalide' }, { status: 401 })
  }

  if (!slug) {
    return NextResponse.json({ message: 'Slug manquant' }, { status: 400 })
  }

  revalidateTag(`post-${slug}`, 'max')
  revalidateTag('posts', 'max')

  return NextResponse.json({ revalidated: true, slug })
}
