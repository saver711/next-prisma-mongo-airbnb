import { create } from "zustand"

type loginModalStore = {
    isOpen: boolean
    onOpen: ()=> void
    onClose: ()=> void
    onToggle: ()=> void
}

export const useLoginModal = create<loginModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
