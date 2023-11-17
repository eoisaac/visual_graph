import { Matrix } from '@/@types/app'
import { CircleNode } from '@/components/circle-node'
import { FileImportDialog } from '@/components/file-import-dialog'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import React from 'react'
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
  Edge,
  Node,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { neutral } from 'tailwindcss/colors'

const NODE_TYPES = { circleNode: CircleNode }

const INITIAL_EDGES = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'straight',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
  {
    id: 'e3-1',
    source: '3',
    target: '1',
    type: 'straight',
    sourceHandle: 'bottom',
    targetHandle: 'left',
  },
  {
    id: 'e4-1',
    source: '4',
    target: '1',
    type: 'straight',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
  {
    id: 'e4-3',
    source: '4',
    target: '3',
    type: 'straight',
    data: { label: '4 -> 3' },
    sourceHandle: 'top',
    targetHandle: 'bottom',
  },
] as Edge[]

const generateNodesFromMatrix = (matrix: Matrix): Node[] => {
  return matrix.map((_, index) => {
    const x = index * 150 + 50
    const y = index * 150 + 50

    return {
      id: (index + 1).toString(),
      type: 'circleNode',
      data: { label: (index + 1).toString() },
      position: { x, y },
    }
  })
}

export const App = () => {
  const [matrix, setMatrix] = React.useState<Matrix>([[]])
  const [nodes, setNodes] = useNodesState([])
  // const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const handleSetMatrix = (matrix: Matrix) => setMatrix(matrix)

  React.useEffect(() => {
    if (matrix.length === 0) return
    const nodes = generateNodesFromMatrix(matrix)
    setNodes(nodes)
  }, [matrix, setNodes])

  // const onConnect = React.useCallback(
  //   (params: Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // )

  return (
    <main className="w-screen h-screen bg-background relative">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        // onConnect={onConnect}
        // onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'straight',
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
