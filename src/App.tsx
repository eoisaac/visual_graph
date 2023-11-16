import { CircleNode } from '@/components/circle-node'
import '@/styles/globals.css'
import React from 'react'
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { neutral } from 'tailwindcss/colors'

const NODE_TYPES = { circleNode: CircleNode }

const INITIAL_NODES = [
  {
    id: '1',
    type: 'circleNode',
    position: { x: 250, y: 250 },
  },
  {
    id: '2',
    type: 'circleNode',
    position: { x: 500, y: 250 },
  },
  {
    id: '3',
    type: 'circleNode',
    position: { x: 750, y: 250 },
  },
  {
    id: '4',
    type: 'circleNode',
    position: { x: 1000, y: 250 },
  },
] as Node[]

const INITIAL_EDGES = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
  },
  {
    id: 'e3-4',
    source: '4',
    target: '2',
  },
] as Edge[]

export const App = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <main className="w-screen h-screen bg-neutral-950">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={INITIAL_NODES}
        edges={INITIAL_EDGES}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
      >
        <Background color={neutral[500]} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </main>
  )
}
