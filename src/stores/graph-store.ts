/* eslint-disable @typescript-eslint/no-explicit-any */
import { Matrix } from '@/@types/app'
import { ReactFlowJsonObject } from 'reactflow'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GraphState {
  matrix: Matrix
  setMatrix: (matrix: Matrix) => void

  flow: ReactFlowJsonObject<any, any> | null
  setFlow: (rfInstance: ReactFlowJsonObject<any, any>) => void
}

export const useGraphStore = create<GraphState>()(
  devtools(
    persist(
      (set) => ({
        matrix: [],
        setMatrix: (matrix) => set({ matrix }),

        flow: null,
        setFlow: (flow) => set({ flow }),
      }),
      {
        name: 'visual_graph',
        getStorage: () => localStorage,
        version: 1,
      },
    ),
  ),
)
