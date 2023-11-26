import { Matrix } from '@/@types/app'

const createGraph = (verticesCount: number): Matrix => {
  return Array.from({ length: verticesCount }, () =>
    Array(verticesCount).fill(0),
  )
}

const addEdge = (graph: Matrix, u: number, v: number, weight: number) => {
  graph[u][v] = weight
  graph[v][u] = weight
}

const find = (parentArray: number[], i: number): number => {
  return parentArray[i] === i ? i : find(parentArray, parentArray[i])
}

const union = (
  parentArray: number[],
  rankArray: number[],
  x: number,
  y: number,
) => {
  const rootX = find(parentArray, x)
  const rootY = find(parentArray, y)

  if (rankArray[rootX] < rankArray[rootY]) {
    parentArray[rootX] = rootY
  } else if (rankArray[rootX] > rankArray[rootY]) {
    parentArray[rootY] = rootX
  } else {
    parentArray[rootX] = rootY
    rankArray[rootY] += 1
  }
}

export const kruskal = (adjacencyMatrix: Matrix): Matrix => {
  const numVertices = adjacencyMatrix.length
  const edges: Matrix = adjacencyMatrix
    .flatMap((row, i) =>
      row
        .slice(i + 1)
        .map((weight, j) => (weight !== 0 ? [i, i + 1 + j, weight] : [])),
    )
    .sort((a, b) => a[2] - b[2])

  const result: Matrix = []
  const parent: number[] = Array.from({ length: numVertices }, (_, i) => i)
  const rank: number[] = Array(numVertices).fill(0)

  let selectedEdges = 0

  edges.every(([u, v, weight]) => {
    const rootU = find(parent, u)
    const rootV = find(parent, v)

    if (rootU !== rootV) {
      result.push([u, v, weight])
      selectedEdges++
      union(parent, rank, rootU, rootV)
    }

    return selectedEdges < numVertices - 1
  })

  const resultMatrix: Matrix = result.reduce((graph, [u, v, weight]) => {
    addEdge(graph, u, v, weight)
    return graph
  }, createGraph(numVertices))

  return resultMatrix
}
