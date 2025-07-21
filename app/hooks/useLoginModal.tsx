import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useLoginModal;
