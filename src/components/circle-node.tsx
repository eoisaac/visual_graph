import { cn } from '@/lib/utils'
import { Handle, NodeProps, Position } from 'reactflow'

export const CircleNode = (props: NodeProps) => {
  return (
    <div
      className={cn(
        'w-10 h-10 rounded-full bg-primary grid place-items-center -m-2 shadow-md',
        { 'bg-emerald-500': props.data.kruskal },
      )}
    >
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="sr-only"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="sr-only"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="sr-only"
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="sr-only"
      />
      <span className="text-lg text-foreground font-medium ">
        {props.data.label}
      </span>
    </div>
  )
}
