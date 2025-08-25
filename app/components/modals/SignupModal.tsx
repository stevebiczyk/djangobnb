"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import Modal from "./Modal";
import apiService from "@/app/services/apiService";

const SignupModal = () => {
  const router = useRouter();
  const { isOpen, closeModal } = useSignupModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Tiny helper to turn common API error shapes into string[]
  const toErrorList = (val: unknown): string[] => {
    if (!val) return [];
    if (typeof val === "string") return [val];
    if (Array.isArray(val))
      return val.filter((x): x is string => typeof x === "string");
    if (typeof val === "object") {
      return Object.values(val as Record<string, unknown>).flatMap(toErrorList);
    }
    return [];
  };

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const payload = {
      email,
      password,
      confirm_password: confirmPassword,
    };

    try {
      const res = await apiService.post("/auth/signup", payload);

      if (res?.access) {
        closeModal();
        router.push("/login");
        return;
      }

      const errs = toErrorList(res);
      setErrors(errs.length ? errs : ["Sign up failed. Please try again."]);
    } catch (err: any) {
      const errs = toErrorList(err?.body ?? err?.message);
      setErrors(errs.length ? errs : ["Network error. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      <form onSubmit={submitSignup} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-5 bg-red-400 text-white rounded-xl opacity-80"
            >
              {error}
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={() => {}} />
      </form>
    </>
  );

  // const content = (
  //   <form onSubmit={submitSignup} className="space-y-4">
  //     <input
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       placeholder="Your e-mail address"
  //       type="email"
  //       required
  //       className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
  //     />
  //     <input
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //       placeholder="Your password"
  //       type="password"
  //       required
  //       className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
  //     />
  //     <input
  //       value={confirmPassword}
  //       onChange={(e) => setConfirmPassword(e.target.value)}
  //       placeholder="Repeat password"
  //       type="password"
  //       required
  //       className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
  //     />

  //     {errors.map((msg, i) => (
  //       <div
  //         key={i}
  //         className="p-4 bg-red-500/90 text-white rounded-xl"
  //         role="alert"
  //       >
  //         {msg}
  //       </div>
  //     ))}

  //     <button
  //       type="submit"
  //       disabled={loading}
  //       className="w-full h-[48px] rounded-xl border border-gray-300 disabled:opacity-60"
  //     >
  //       {loading ? "Submitting..." : "Submit"}
  //     </button>
  //   </form>
  // );

  return (
    <Modal
      label="Sign Up"
      content={content}
      isOpen={isOpen}
      closeModal={closeModal}
    />
  );
};

export default SignupModal;
