import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  config: {
    endpoint: string | null,
    origin?: boolean
  }
}

type Actions = {
  saveConfig: (config: State['config']) => void
}


export const useConfigStore = create(
  persist<State & Actions>(
    (set, get) => ({
      config: {
        endpoint: null,
        origin: false
      },
      saveConfig: (config) => set(({
        config: {
          ...get().config,
          ...config
        }
      })),
    }),
    {
      name: 'config',
      storage: createJSONStorage<State & Actions>(() => localStorage),
    }
  )
)