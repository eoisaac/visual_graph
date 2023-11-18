import { Matrix } from '@/@types/app'
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
import { getGraphMatrix } from '@/utils/graph-matrix'
import { Dropzone, ExtFile } from '@dropzone-ui/react'
import { FileText, UploadSimple } from '@phosphor-icons/react'
import React from 'react'
import { neutral } from 'tailwindcss/colors'
import { LoadingIndicator } from './loading-indicator'
import { ToolBarButton } from './tool-bar-button'
import { useToast } from './ui/use-toast'

export interface FileImportDialogProps {
  onImport: (matrix: Matrix) => void
}

export const FileImportDialog = ({ onImport }: FileImportDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [files, setFiles] = React.useState<ExtFile[]>([])

  const { toast } = useToast()

  const handleOpenChange = (open: boolean) => setIsOpen(open)
  const handleClose = () => setIsOpen(false)

  const updateFiles = (files: ExtFile[]) => {
    const isTxt = files.every((file) => file.type === 'text/plain')

    if (files.length > 1) {
      return toast({
        title: 'Too many files',
        description: 'Only one file can be imported at a time.',
        variant: 'destructive',
      })
    }

    if (!isTxt) {
      return toast({
        title: 'Invalid file type',
        description: 'Only .txt files are accepted.',
        variant: 'destructive',
      })
    }
    setFiles(files)
  }

  const clearFiles = () => setFiles([])

  const handleGenerate = async () => {
    if (files.length === 0) {
      return toast({
        title: 'No file selected',
        description: 'Please select a file to import.',
        variant: 'destructive',
      })
    }

    const file = files[0]
    if (!file.file) {
      return toast({
        title: 'Invalid file',
        description: 'Please select a valid file to import.',
        variant: 'destructive',
      })
    }

    try {
      setIsLoading(true)
      const { isValid, message, matrix } = await getGraphMatrix(file.file)

      if (!isValid || !matrix) {
        return toast({
          title: 'Invalid file format',
          description: message,
          variant: 'destructive',
        })
      }

      if (matrix) {
        onImport(matrix)
        clearFiles()
        handleClose()
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolBarButton
          label="Import File"
          variant="default"
          icon={<UploadSimple />}
        />
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
          maxFiles={1}
          behaviour="replace"
          onChange={updateFiles}
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
          <Button onClick={handleGenerate}>
            {isLoading && <LoadingIndicator className="mr-2" />}
            <span>Generate</span>
          </Button>
        </DialogFooter>
      </DialogContent>

      <DialogOverlay />
    </Dialog>
  )
}
