"use client";

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import React from "react";

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();

  const bnbYourHome = () => {
    if (userId) {
      addPropertyModal.openModal();
    } else {
      loginModal.openModal();
    }
  };
  return (
    <div
      onClick={bnbYourHome}
      className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
    >
      Djangobnb your home
    </div>
  );
};

export default AddPropertyButton;
