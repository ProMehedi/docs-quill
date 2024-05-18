'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

const UploadButton = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && setIsOpen(v)}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Upload PDF</h2>
          <Button>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
