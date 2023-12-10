import {
  FileImportDialog,
  FileImportDialogProps,
} from '@/components/file-import-dialog'
import { useTheme } from '@/hooks/use-theme'
import { useGraphStore } from '@/stores/graph-store'
import {
  ArrowCounterClockwise,
  CrosshairSimple,
  Graph,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Moon,
  Sun,
} from '@phosphor-icons/react'
import { useReactFlow } from 'reactflow'
import { ToolBarButton } from './tool-bar-button'

interface ToolBarProps extends FileImportDialogProps {
  onKruskal: () => void
  onReset: () => void
}

export const ToolBar = ({ onImport, onKruskal, onReset }: ToolBarProps) => {
  const { zoomIn, zoomOut, setCenter } = useReactFlow()
  const { isDark, toggleTheme } = useTheme()

  const { hasSpanningTree, totalWeight } = useGraphStore()

  const DURATION = 800

  const handleZoomIn = () => zoomIn({ duration: DURATION })
  const handleZoomOut = () => zoomOut({ duration: DURATION })
  const handleSetCenter = () => setCenter(0, 0, { duration: DURATION })

  const handleToggleTheme = () => toggleTheme()

  return (
    <div
      className="fixed bottom-8 md:bottom-16 bg-background/80 rounded-lg border
      border-border w-full max-w-xs inset-x-0 mx-auto p-2 flex
      justify-between gap-2 shadow-md backdrop-blur-sm z-50"
    >
      {hasSpanningTree && (
        <div
          className="fixed -top-14  inset-x-0 flex items-center w-max mx-auto 
              py-1 px-3 gap-2 shadow-md backdrop-blur-sm bg-background/80 rounded-lg border
            border-border animate-in slide-in-from-bottom duration-300 z-40"
        >
          <p className="text-sm text-muted-foreground">Total weight</p>
          <p className="text-lg font-bold">{totalWeight}</p>
        </div>
      )}

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
      <ToolBarButton
        label={hasSpanningTree ? 'Reset' : 'Minimum spanning tree'}
        icon={hasSpanningTree ? <ArrowCounterClockwise /> : <Graph />}
        onClick={hasSpanningTree ? onReset : onKruskal}
      />
    </div>
  )
}
