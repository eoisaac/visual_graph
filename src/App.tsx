import { Canvas } from '@/components/canvas'
import { ReactFlowProvider } from 'reactflow'

export const App = () => {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  )
}
