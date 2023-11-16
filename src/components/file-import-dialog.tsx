import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Dropzone, ExtFile, ValidateFileResponse } from '@dropzone-ui/react'
import { FileText } from '@phosphor-icons/react'
import React from 'react'
import { neutral } from 'tailwindcss/colors'
import { useToast } from './ui/use-toast'

export const FileImportDialog = () => {
  const [files, setFiles] = React.useState<ExtFile[]>([])
  const { toast } = useToast()

  const updateFiles = (files: ExtFile[]) => setFiles([files[1]])
  const clearFiles = () => setFiles([])
  const validateFileImport = (file: File): ValidateFileResponse => {
    const isTxt = file.type === 'text/plain'

    if (!isTxt) {
      toast({
        title: 'Invalid file type',
        description: 'Only .txt files are accepted.',
        variant: 'destructive',
      })
      return { valid: false }
    }

    return { valid: true }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Import File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import File</DialogTitle>
          <DialogDescription className="text-neutral-300 text-sm">
            Import a .txt file containing a graph matrix
          </DialogDescription>
        </DialogHeader>

        <Dropzone
          value={files}
          header={false}
          footer={false}
          multiple={false}
          maxFiles={2}
          onChange={updateFiles}
          validator={validateFileImport}
          accept="text/plain"
          label="Drag and drop a file here or click to browse"
          color={neutral[600]}
          style={{ fontSize: '0.875rem', color: neutral[400] }}
        >
          {files.map((file) => (
            <div key={file.id} className="flex flex-col items-center">
              <FileText key={file.id} className="w-12 h-12" weight="thin" />
              <span className="text-xs">{file.name}</span>
            </div>
          ))}
        </Dropzone>

        <DialogFooter>
          <DialogClose onClick={clearFiles} asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Generate</Button>
        </DialogFooter>
      </DialogContent>

      <DialogOverlay />
    </Dialog>
  )
}
