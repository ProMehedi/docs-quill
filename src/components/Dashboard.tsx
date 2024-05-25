'use client'
import React from 'react'
import Link from 'next/link'
import { Ghost, Loader2, MessageSquare, Plus, Trash } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import { format } from 'date-fns'

import UploadButton from './UploadButton'
import { trpc } from '~/app/_trpc/client'

const Dashboard = () => {
  const [currentlyDel, setCurrentlyDel] = React.useState<string | null>(null)

  const utils = trpc.useUtils()
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate: ({ id }) => setCurrentlyDel(id),
    onSettled: () => setCurrentlyDel(null),
  })

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>My Files</h1>

        <UploadButton />
      </div>

      {files && files.length > 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg border border-blue-50 hover:border-blue-100'
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className='flex flex-col gap-2'
                >
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-4'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium text-zinc-900'>
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='px-6 mt-4 flex justify-between place-items-center py-2 gap-6 text-xs text-zinc-500'>
                  <div className='flex items-center gap-2'>
                    <Plus size={16} />
                    {format(new Date(file.createdAt), 'MMM dd, yyyy')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <MessageSquare size={16} />
                    mocked
                  </div>

                  <button
                    title='Delete file'
                    type='button'
                    className='text-destructive hover:text-red-700 transition'
                    onClick={() => deleteFile({ id: file.id })}
                  >
                    {currentlyDel === file.id ? (
                      <Loader2 className='animate-spin' size={16} />
                    ) : (
                      <Trash size={16} />
                    )}
                  </button>
                </div>
              </li>
            ))}
        </ul>
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
