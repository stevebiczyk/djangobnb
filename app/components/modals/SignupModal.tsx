// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import useSignupModal from "@/app/hooks/useSignupModal";
// import Modal from "./Modal";
// import CustomButton from "../forms/CustomButton";
// import apiService from "@/app/services/apiService";

// const SignupModal = () => {
//   //
//   // Variables
//   const router = useRouter();
//   const signupModal = useSignupModal();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState<string[]>([]);

//   // Submit Function
//   const submitSignup = async () => {
//     const formData = {
//       email: email,
//       password: password,
//       confirm_password: confirmPassword,
//     };

//     const response = await apiService.post("/auth/signup", formData);
//     if (response.access) {
//       signupModal.closeModal();
//       router.push("/login");
//     } else {
//       const tmpErrors: string[] = Object.values(response).map((error: any) => {
//         return error;
//       });

//       setErrors(tmpErrors);
//     }
//   };

//   const content = (
//     <>
//       <form action={submitSignup} className="space-y-4">
//         <input
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Your e-mail address"
//           type="email"
//           className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//         />
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Your password"
//           type="password"
//           className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//         />
//         <input
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Repeat password"
//           type="password"
//           className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
//         />

//         {errors.map((error, index) => {
//           return (
//             <div
//               key={`error_${index}`}
//               className="p-5 bg-red-400 text-white rounded-xl opacity-80"
//             >
//               {error}
//             </div>
//           );
//         })}

//         <CustomButton label="Submit" onClick={submitSignup} />
//       </form>
//     </>
//   );

//   return (
//     <Modal
//       label="Sign Up"
//       content={content}
//       isOpen={signupModal.isOpen}
//       closeModal={signupModal.closeModal}
//     />
//   );
// };
// export default SignupModal;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { on } from "events";

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal(); // { isOpen, openModal, closeModal }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const payload = {
        email,
        password,
        confirm_password: confirmPassword,
      };

      // assuming apiService.post exists and returns JSON
      const response = await apiService.post("/auth/signup", payload);

      if (response?.access) {
        signupModal.closeModal();
        router.push("/login");
        return;
      }

      // Flatten error messages safely
      const tmpErrors: string[] = Object.values(response ?? {}).flatMap(
        (err: unknown) => {
          if (typeof err === "string") return [err];
          if (Array.isArray(err))
            return err.filter((x) => typeof x === "string") as string[];
          return [];
        }
      );

      setErrors(
        tmpErrors.length ? tmpErrors : ["Sign up failed. Please try again."]
      );
    } catch (err: any) {
      setErrors([err?.message ?? "Something went wrong."]);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <form onSubmit={submitSignup} className="space-y-4">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your e-mail address"
        type="email"
        required
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
        required
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repeat password"
        type="password"
        required
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />

      {errors.map((error, index) => (
        <div
          key={index}
          className="p-5 bg-red-500 text-white rounded-xl/2 opacity-90"
          role="alert"
        >
          <p>{error}</p>
        </div>
      ))}

      {/* Prefer submit type over onClick */}
      <CustomButton
        label={loading ? "Submitting..." : "Submit"}
        type="submit"
        disabled={loading}
        onClick={() => {}}
      />
    </form>
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
