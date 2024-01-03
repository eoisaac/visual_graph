import { Matrix } from '@/@types/app'
import { Edge, Node } from 'reactflow'

export interface Graph {
  nodes: Node[]
  edges: Edge[]
}

export const generateGraph = (
  matrix: Matrix,
  isKruskal: boolean = false,
): Graph => {
  const totalNodes = matrix.length

  const nodes = matrix.map((_, index) => {
    const cIndex = index + 1 // index começa em 0, mas os vértices começam em 1
    const RADIUS = 20 * totalNodes // aumenta o raio do círculo de acordo com o número de vértices
    const xCoord = Math.cos((cIndex / matrix.length) * 2 * Math.PI) * RADIUS // Distribui os vértices em um círculo, eixo x
    const yCoord = Math.sin((cIndex / matrix.length) * 2 * Math.PI) * RADIUS  // Distribui os vértices em um círculo, eixo y

    return {
      id: `node-${cIndex}`, // id do vértice
      type: 'circleNode', // tipo do vértice
      position: { x: xCoord, y: yCoord }, // posição do vértice
      data: { label: String(cIndex), isKruskal }, // label do vértice e se é um vértice do algoritmo de Kruskal
    }
  })

  const edges: Edge[] = []
  matrix.forEach((row, rowIndex) => {
    row.forEach((weight, colIndex) => {
      const isValidEdge = weight !== 0 && colIndex > rowIndex // previne laços e arestas duplicadas
      if (isValidEdge) {
        edges.push({
          id: `edge-${rowIndex}-${colIndex}`, // id da aresta
          source: `node-${rowIndex + 1}`, // vértice de origem
          target: `node-${colIndex + 1}`, // vértice de destino
          data: { label: String(weight), isKruskal }, // label da aresta e se é uma aresta do algoritmo de Kruskal
        })
      }
    })
  })

  return { nodes, edges }
}
