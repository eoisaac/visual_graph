import { Matrix } from '@/@types/app'
import { Edge, Node } from 'reactflow'

export interface Graph {
  nodes: Node[]
  edges: Edge[]
}

export const generateGraph = (matrix: Matrix): Graph => {
  const totalNodes = matrix.length

  const nodes = matrix.map((_, index) => {
    const cIndex = index + 1
    const RADIUS = 20 * totalNodes
    const xCoord = Math.cos((cIndex / matrix.length) * 2 * Math.PI) * RADIUS
    const yCoord = Math.sin((cIndex / matrix.length) * 2 * Math.PI) * RADIUS

    return {
      id: `node-${cIndex}`,
      type: 'circleNode',
      position: { x: xCoord, y: yCoord },
      data: { label: String(cIndex) },
    }
  })

  const edges: Edge[] = []
  matrix.forEach((row, rowIndex) => {
    row.forEach((weight, colIndex) => {
      const isValidEdge = weight !== 0 && colIndex > rowIndex // Prevent self-loops and duplicate edges
      if (isValidEdge) {
        edges.push({
          id: `edge-${rowIndex}-${colIndex}`,
          source: `node-${rowIndex + 1}`,
          target: `node-${colIndex + 1}`,
          data: { label: String(weight) },
        })
      }
    })
  })

  return { nodes, edges }
}
