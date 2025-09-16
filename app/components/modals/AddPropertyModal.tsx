"use client";

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import Categories from "../addproperty/Categories";
import CustomButton from "../forms/CustomButton";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
  const router = useRouter();

  //
  // States
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);

  //
  // Hooks
  const addPropertyModal = useAddPropertyModal();
  //
  //
  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];

      setDataImage(tmpImage);
    }
  };

  //
  // Submit
  const submitForm = async () => {
    console.log("Submit Form");

    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImage
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price", dataPrice);
      formData.append("bedrooms", dataBedrooms);
      formData.append("bathrooms", dataBathrooms);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.value);
      formData.append("image", dataImage);

      const response = await apiService.post(
        "/api/properties/create/",
        formData
      );

      if (response.success) {
        console.log("Property added successfully");
        router.push("/");

        addPropertyModal.closeModal();
      } else {
        console.error("Failed to add property");
      }
    } else {
      console.error("Please fill in all required fields");
    }
  };

  //
  // Content

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose Category</h2>
          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe your place</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
              ></textarea>
            </div>
          </div>

          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentStep(1)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
        </>
      ) : currentStep == 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Price per night</label>
              <input
                type="number"
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Number of guests</label>
              <input
                type="number"
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Number of bedrooms</label>
              <input
                type="number"
                value={dataBedrooms}
                onChange={(e) => setDataBedrooms(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Number of bathrooms</label>
              <input
                type="number"
                value={dataBathrooms}
                onChange={(e) => setDataBathrooms(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>

          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentStep(2)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>

          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>

          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentStep(3)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  alt="Uploaded Image"
                  src={URL.createObjectURL(dataImage)}
                  fill
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentStep(4)}
          />
          <CustomButton label="Submit" onClick={() => console.log("Submit")} />
        </>
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
