'use client'
import React from 'react'
import { Ghost } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'

import UploadButton from './UploadButton'
import { trpc } from '~/app/_trpc/client'

const Dashboard = () => {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>My Files</h1>

        <UploadButton />
      </div>

      {files && files.length > 0 ? (
        <div>Hello</div>
      ) : isLoading ? (
        <Skeleton className='my-2' count={3} height={100} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='text-zinc-800' size={30} />
          <h3 className='font-semibold text-xl'>Pretty empty around here</h3>
          <p>Let's upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
