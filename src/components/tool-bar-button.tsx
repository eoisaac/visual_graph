import { Button, ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ToolBarButtonProps {
  onClick?: () => void
  icon: JSX.Element
  label: string
  variant?: ButtonProps['variant']
}

export const ToolBarButton = ({
  onClick,
  icon,
  label,
  variant = 'ghost',
}: ToolBarButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="w-12"
            size="icon"
            variant={variant}
            onClick={onClick}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
