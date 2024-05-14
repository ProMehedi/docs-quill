'use client'

import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '~/app/_trpc/client'
import { httpBatchLink } from '@trpc/client'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryclient] = React.useState(() => new QueryClient())
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: '/api/trpc' })],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryclient}>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
