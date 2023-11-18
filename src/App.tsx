import { Matrix } from '@/@types/app'
import { CircleNode } from '@/components/circle-node'
import { DefaultEdge } from '@/components/default-edge'
import { ToolBar } from '@/components/tool-bar'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { generateGraph } from '@/utils/generate-graph'
import { IconContext } from '@phosphor-icons/react'
import React from 'react'
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { neutral } from 'tailwindcss/colors'

const NODE_TYPES = { circleNode: CircleNode }
const EDGE_TYPES = { defaultEdge: DefaultEdge }

export const App = () => {
  const [matrix, setMatrix] = React.useState<Matrix | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
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
    <IconContext.Provider value={{ size: 18 }}>
      <main className="w-screen h-screen bg-background relative">
        <ReactFlow
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          nodes={nodes}
          edges={edges}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{ type: 'defaultEdge' }}
          onConnect={onConnectEdge}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          fitView
        >
          <ToolBar onImport={handleSetMatrix} />
          <Background color={neutral[500]} />
        </ReactFlow>
        <Toaster />
      </main>
    </IconContext.Provider>
  )
}
