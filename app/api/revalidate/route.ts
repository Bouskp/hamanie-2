import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import crypto from 'crypto'

function isValidSecret(
  provided: string | null,
  expected: string | undefined,
): boolean {
  if (!provided || !expected) return false

  const a = Buffer.from(provided)
  const b = Buffer.from(expected)

  if (a.length !== b.length) return false

  return crypto.timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')

    if (!isValidSecret(secret, process.env.MY_SECRET_REVALIDATE_TOKEN)) {
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 })
    }

    if (!slug) {
      return NextResponse.json({ message: 'Slug manquant' }, { status: 400 })
    }

    revalidateTag(`post-${slug}`, 'max')
    revalidateTag('posts', 'max')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Erreur lors de la revalidation' },
      { status: 500 },
    )
  }
}
