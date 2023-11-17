import { CircleNode } from '@/components/circle-node'
import { FileImportDialog } from '@/components/file-import-dialog'
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
} from 'reactflow'
import 'reactflow/dist/style.css'
import { neutral } from 'tailwindcss/colors'
import { Toaster } from './components/ui/toaster'

const NODE_TYPES = { circleNode: CircleNode }

const INITIAL_NODES = [
  {
    id: '1',
    type: 'circleNode',
    data: { label: '1' },
    position: { x: 250, y: 250 },
  },
  {
    id: '2',
    type: 'circleNode',
    data: { label: '2' },
    position: { x: 500, y: 150 },
  },
  {
    id: '3',
    type: 'circleNode',
    data: { label: '3' },
    position: { x: 150, y: 50 },
  },
  {
    id: '4',
    type: 'circleNode',
    data: { label: '4' },
    position: { x: 50, y: 400 },
  },
] as Node[]

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
    sourceHandle: 'top',
    targetHandle: 'bottom',
  },
] as Edge[]

export const App = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <main className="w-screen h-screen bg-background relative">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={INITIAL_NODES}
        edges={INITIAL_EDGES}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'straight',
        }}
      >
        <div className="absolute top-16 right-16 z-30">
          <FileImportDialog />
        </div>

        <Background color={neutral[500]} />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
      <Toaster />
    </main>
  )
}
