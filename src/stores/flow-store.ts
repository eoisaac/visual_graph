/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactFlowJsonObject } from 'reactflow'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FlowState {
  flow: ReactFlowJsonObject<any, any> | null
  setFlow: (rfInstance: ReactFlowJsonObject<any, any>) => void
}

export const useFlowStore = create<FlowState>()(
  devtools(
    persist(
      (set) => ({
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
