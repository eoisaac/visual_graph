import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from 'reactflow'

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
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <span
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="w-6 h-6 rounded-full bg-muted text-muted-foreground 
        text-center"
        >
          {props.data.label}
        </span>
      </EdgeLabelRenderer>
    </>
  )
}
