import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'

const Page = () => {
  const router = useRouter()

  const searchparams = useSearchParams()
  const origin = searchparams.get('origin')

  const { data } = trpc.test.useQuery()
  console.log(data)

  return <div>Page</div>
}

export default Page
