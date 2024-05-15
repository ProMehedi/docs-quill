'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'

const Page = () => {
  const router = useRouter()

  const searchparams = useSearchParams()
  const origin = searchparams.get('origin')

  const { data, isLoading, isSuccess } = trpc.authCallback.useQuery()
  console.log(isSuccess)

  return <div>Page</div>
}

export default Page
