"use client";

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import Categories from "../addproperty/Categories";
import CustomButton from "../forms/CustomButton";

const AddPropertyModal = () => {
  //
  // States
  const [datacategory, setDataCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const addPropertyModal = useAddPropertyModal();
  //
  //
  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose Category</h2>
          <Categories
            dataCategory={datacategory}
            setCategory={(category) => setCategory(category)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : (
        <p>Step 2</p>
      )}
    </>
  );

  return (
    <>
      <Modal
        isOpen={addPropertyModal.isOpen}
        closeModal={addPropertyModal.closeModal}
        label="Add Property"
        content={content}
      />
    </>
  );
};

export default AddPropertyModal;
