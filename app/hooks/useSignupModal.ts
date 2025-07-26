import { create } from "zustand";

interface SignupModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useSignupModal = create<SignupModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useSignupModal;
