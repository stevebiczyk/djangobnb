import { create } from "zustand";

interface AddPropertyModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useAddPropertyModal = create<AddPropertyModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useAddPropertyModal;
