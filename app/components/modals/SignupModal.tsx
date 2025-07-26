"use client";

import useSignupModal from "@/app/hooks/useSignupModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {
  const signupModal = useSignupModal();

  const content = (
    <>
      <form className="space-y-4">
        <input
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Repeat password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <div className="p-5 bg-red-400 text-white rounded-xl opacity-80">
          The error message
        </div>
        <CustomButton
          label="Submit"
          onClick={() => {
            console.log("Form submitted");
          }}
        />
      </form>
    </>
  );
  return (
    <Modal
      label="Sign Up"
      content={content}
      isOpen={signupModal.isOpen}
      closeModal={signupModal.closeModal}
    />
  );
};
export default SignupModal;
