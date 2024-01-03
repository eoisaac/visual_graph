import { Matrix } from '@/@types/app'

// Função para criar uma matriz de adjacência com um número específico de vértices
const createGraph = (verticesCount: number): Matrix => {
  return Array.from({ length: verticesCount }, () =>
    Array(verticesCount).fill(0),
  ) // cria uma matriz de adjacência preenchida com zeros
}

// conversão de matriz de adjacência para lista de adjacência
const addEdge = (graph: Matrix, u: number, v: number, weight: number) => {
  graph[u][v] = weight // adiciona a aresta na matriz de adjacência
  graph[v][u] = weight // adiciona a aresta na matriz de adjacência
}

// Função para encontrar o representante (pai) de um conjunto
const find = (parentArray: number[], i: number): number => {
  return parentArray[i] === i ? i : find(parentArray, parentArray[i]) // busca recursiva pelo pai do vértice
}

// Função para unir dois conjuntos em um único conjunto, usando como critério a altura da árvore
const union = (
  parentArray: number[],
  rankArray: number[],
  x: number,
  y: number,
) => {
  const rootX = find(parentArray, x) // busca o pai do vértice x
  const rootY = find(parentArray, y) // busca o pai do vértice y

  // Ajuda a manter a árvore mais baixa possível
  if (rankArray[rootX] < rankArray[rootY]) {
    // se a altura da árvore de x for menor que a de y, x é filho de y
    parentArray[rootX] = rootY // x é filho de y
  } else if (rankArray[rootX] > rankArray[rootY]) {
    // se a altura da árvore de x for maior que a de y, y é filho de x
    parentArray[rootY] = rootX // y é filho de x
  } else {
    // se a altura da árvore de x for igual a de y, x é filho de y e a altura da árvore de y aumenta em 1
    parentArray[rootX] = rootY // x é filho de y
    rankArray[rootY] += 1 // a altura da árvore de y aumenta em 1
  }
}

interface KruskalResult {
  tree: Matrix
  totalWeight: number
}

// Função principal que implementa o algoritmo de Kruskal para encontrar a árvore geradora mínima
export const kruskal = (adjacencyMatrix: Matrix): KruskalResult => {
  const numVertices = adjacencyMatrix.length // número de vértices do grafo, que é igual ao número de linhas da matriz de adjacência
  // Cria uma lista de arestas ordenadas por peso, a partir da matriz de adjacência
  const edges: Matrix = adjacencyMatrix
    .flatMap(
      // transforma a matriz de adjacência em uma lista de arestas
      (row, i) =>
        row
          .slice(i + 1) // remove os elementos da diagonal principal e os elementos à esquerda dela
          .map((weight, j) => (weight !== 0 ? [i, i + 1 + j, weight] : [])), // cria uma aresta com o peso da matriz de adjacência
    )
    .sort((a, b) => a[2] - b[2]) // ordena as arestas pelo peso

  const result: Matrix = []
  const parent: number[] = Array.from({ length: numVertices }, (_, i) => i)
  const rank: number[] = Array(numVertices).fill(0)

  let selectedEdges = 0

  // Itera sobre todas as arestas ordenadas e aplica o algoritmo de Kruskal
  edges.every(([u, v, weight]) => {
    const rootU = find(parent, u) // busca o pai do vértice u
    const rootV = find(parent, v) // busca o pai do vértice v
    // Verifica se a adição da aresta cria um ciclo no grafo
    if (rootU !== rootV) {
      // se os pais forem diferentes, não há ciclo então a aresta é adicionada na árvore geradora mínima
      result.push([u, v, weight]) // adiciona a aresta na árvore geradora mínima
      selectedEdges++ // incrementa o número de arestas selecionadas
      union(parent, rank, rootU, rootV) // une os conjuntos de u e v
    }

    // Retorna true se o número de arestas selecionadas for menor que o número de vértices - 1
    return selectedEdges < numVertices - 1 // se o número de arestas selecionadas for menor que o número de vértices - 1, continua
  })

  // Cria a matriz de adjacência da árvore geradora mínima a partir das arestas selecionadas
  const resultMatrix: Matrix = result.reduce((graph, [u, v, weight]) => {
    // cria uma matriz de adjacência a partir da árvore geradora mínima
    addEdge(graph, u, v, weight) // adiciona a aresta na matriz de adjacência
    return graph
  }, createGraph(numVertices)) // cria uma matriz de adjacência preenchida com zeros

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const totalWeight = result.reduce((acc, [_, __, weight]) => acc + weight, 0) // soma os pesos das arestas da árvore geradora mínima

  return { tree: resultMatrix, totalWeight } // retorna a árvore geradora mínima e o peso total dela
}
