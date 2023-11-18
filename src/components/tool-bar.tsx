import {
  FileImportDialog,
  FileImportDialogProps,
} from '@/components/file-import-dialog'
import { useTheme } from '@/hooks/use-theme'
import {
  CrosshairSimple,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Moon,
  Sun,
} from '@phosphor-icons/react'
import { useReactFlow } from 'reactflow'
import { ToolBarButton } from './tool-bar-button'

export const ToolBar = ({ onImport }: FileImportDialogProps) => {
  const { zoomIn, zoomOut, setCenter } = useReactFlow()
  const { isDark, toggleTheme } = useTheme()

  const DURATION = 800

  const handleZoomIn = () => zoomIn({ duration: DURATION })
  const handleZoomOut = () => zoomOut({ duration: DURATION })
  const handleSetCenter = () => setCenter(0, 0, { duration: DURATION })

  const handleToggleTheme = () => toggleTheme()

  return (
    <div
      className="fixed bottom-8 md:bottom-16 bg-background/80 rounded-lg border
      border-border w-full max-w-xs z-30 inset-x-0 mx-auto p-2 flex
      justify-between gap-2 shadow-md backdrop-blur-sm"
    >
      <FileImportDialog onImport={onImport} />
      <ToolBarButton
        label="Zoom in"
        icon={<MagnifyingGlassPlus />}
        onClick={handleZoomIn}
      />
      <ToolBarButton
        label="Zoom out"
        icon={<MagnifyingGlassMinus />}
        onClick={handleZoomOut}
      />
      <ToolBarButton
        label="Center"
        icon={<CrosshairSimple />}
        onClick={handleSetCenter}
      />
      <ToolBarButton
        label={isDark ? 'Light mode' : 'Dark mode'}
        icon={isDark ? <Sun /> : <Moon />}
        onClick={handleToggleTheme}
      />
    </div>
  )
}
