import { Matrix } from '@/@types/app'
import { CircleNode } from '@/components/circle-node'
import { DefaultEdge } from '@/components/default-edge'
import { ToolBar } from '@/components/tool-bar'
import { Toaster } from '@/components/ui/toaster'
import { useFlowStore } from '@/stores/flow-store'
import '@/styles/globals.css'
import { generateGraph } from '@/utils/generate-graph'
import { kruskal } from '@/utils/kruskal'
import { IconContext } from '@phosphor-icons/react'
import React from 'react'
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { neutral } from 'tailwindcss/colors'

const NODE_TYPES = { circleNode: CircleNode }
const EDGE_TYPES = { defaultEdge: DefaultEdge }

export const Canvas = () => {
  const [fileMatrix, setFileMatrix] = React.useState<Matrix | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const [rfInstance, setRfInstance] = React.useState<ReactFlowInstance | null>(
    null,
  )
  const { setViewport } = useReactFlow()
  const { flow, setFlow } = useFlowStore()

  React.useEffect(() => {
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      setViewport({ x, y, zoom })
    }
  }, [])

  React.useEffect(() => {
    if (rfInstance) {
      const obj = rfInstance.toObject()
      if (JSON.stringify(obj) === JSON.stringify(flow)) return
      setFlow(obj)
    }
  }, [nodes])

  const handleSetNodesAndEdges = (matrix: Matrix) => {
    const graph = generateGraph(matrix)
    setNodes(graph.nodes)
    setEdges(graph.edges)
    setFileMatrix(matrix)
  }

  const handleSetKruskalSpanningTree = () => {
    if (!fileMatrix) return

    const tree = kruskal(fileMatrix)
    const graph = generateGraph(tree, true)

    const updatedNodes = nodes.map((node) =>
      graph.nodes.find((n) => n.id === node.id)
        ? { ...node, data: { ...node.data, isKruskal: true } }
        : node,
    )
    const updatedEdges = edges.map((edge) =>
      graph.edges.find((e) => e.id === edge.id)
        ? { ...edge, data: { ...edge.data, isKruskal: true } }
        : edge,
    )
    setNodes(updatedNodes)
    setEdges(updatedEdges)
  }

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
          onInit={setRfInstance}
          fitView
        >
          <ToolBar
            onImport={handleSetNodesAndEdges}
            onKruskal={handleSetKruskalSpanningTree}
          />
          <Background color={neutral[500]} />
        </ReactFlow>
        <Toaster />
      </main>
    </IconContext.Provider>
  )
}
