import { create } from "zustand"

type rentModalStore = {
    isOpen: boolean
    onOpen: ()=> void
    onClose: ()=> void
    onToggle: ()=> void
}

export const useRentModal = create<rentModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
