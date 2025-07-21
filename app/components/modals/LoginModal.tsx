"use client";

import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
  const loginModal = useLoginModal();

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
      label="Login"
      content={content}
      isOpen={loginModal.isOpen}
      closeModal={loginModal.closeModal}
    />
  );
};
export default LoginModal;
