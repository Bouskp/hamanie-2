'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email soumis :', email)
    // Ajoutez ici votre logique API (ex: Mailchimp, Brevo, ou endpoint WordPress)
  }

  return (
    <Card className='bg-primary/5 border-primary/20 shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-bold'>Restez informé</CardTitle>
        <p className='text-xs text-muted-foreground leading-relaxed'>
          Recevez nos analyses techniques directement dans votre boîte mail.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-3'>
          <Input
            type='email'
            placeholder='votre@adresse.com'
            className='bg-background rounded-xl'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type='submit' className='w-full rounded-xl'>
            S'abonner
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
