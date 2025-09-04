"use client";

import Image from "next/image";
import Modal from "./Modal";
import LoginModal from "./LoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

const AddPropertyModal = () => {
  const addPropertyModal = useAddPropertyModal();

  return (
    <>
      <Modal
        isOpen={addPropertyModal.isOpen}
        closeModal={addPropertyModal.closeModal}
        label="Add Property"
        content={<p>Add your property here</p>}
      />
    </>
  );
};

export default AddPropertyModal;
