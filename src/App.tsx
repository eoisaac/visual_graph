import { Matrix } from '@/@types/app'
import { CircleNode } from '@/components/circle-node'
import { DefaultEdge } from '@/components/default-edge'
import { FileImportDialog } from '@/components/file-import-dialog'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import React from 'react'
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { neutral } from 'tailwindcss/colors'

const NODE_TYPES = { circleNode: CircleNode }
const EDGE_TYPES = { defaultEdge: DefaultEdge }

interface Graph {
  nodes: Node[]
  edges: Edge[]
}

const generateGraph = (matrix: Matrix): Graph => {
  const nodes = matrix.map((_, index) => {
    const cIndex = index + 1
    const RADIUS = 130
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
      if (weight !== 0 && colIndex > rowIndex) {
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

export const App = () => {
  const [matrix, setMatrix] = React.useState<Matrix | null>(null)
  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const handleSetMatrix = (matrix: Matrix) => setMatrix(matrix)

  React.useEffect(() => {
    if (!matrix) return
    const { nodes, edges } = generateGraph(matrix)
    setNodes(nodes)
    setEdges(edges)
  }, [matrix, setNodes, setEdges])

  const onConnectEdge = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <main className="w-screen h-screen bg-background relative">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onConnect={onConnectEdge}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'defaultEdge',
        }}
      >
        <div className="absolute top-16 right-16 z-30">
          <FileImportDialog onImport={handleSetMatrix} />
        </div>

        <Background color={neutral[500]} />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
      <Toaster />
    </main>
  )
}
