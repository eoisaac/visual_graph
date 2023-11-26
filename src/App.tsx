import { Canvas } from '@/components/canvas'
import { kruskal } from '@/utils/kruskal'
import React from 'react'
import { ReactFlowProvider } from 'reactflow'

export const App = () => {
  React.useEffect(() => {
    // const matrizAdjacencia: number[][] = [
    //   [0, 8, 3, 7],
    //   [8, 0, 0, 12],
    //   [3, 0, 0, 6],
    //   [7, 12, 6, 0],
    // ]

    const matrizAdjacencia: number[][] = [
      [0, 10, 6, 5],
      [10, 0, 0, 15],
      [6, 0, 0, 4],
      [5, 15, 4, 0],
    ]
    const arvoreGeradoraMinima = kruskal(matrizAdjacencia)
    console.log(arvoreGeradoraMinima)
  }, [])

  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  )
}
