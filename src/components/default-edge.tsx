import { cn } from '@/lib/utils'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from 'reactflow'
import { emerald, neutral } from 'tailwindcss/colors'

export const DefaultEdge = (props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY } = props

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: props.data.isKruskal ? 3 : 2,
          stroke: props.data.isKruskal ? emerald[400] : neutral[500],
        }}
      />
      <EdgeLabelRenderer>
        <span
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className={cn(
            'w-6 h-6 rounded-full bg-muted text-muted-foreground text-center shadow-md',
            { 'bg-emerald-700 text-white': props.data.isKruskal },
          )}
        >
          {props.data.label}
        </span>
      </EdgeLabelRenderer>
    </>
  )
}
