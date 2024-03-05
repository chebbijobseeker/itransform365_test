"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  type RegisterValidationSchema,
  registerValidationSchema,
} from "./registerValidationSchema";
import axios from "axios";
import { useState } from "react";
import LoadingButton from "../components/LoadingButton";
import { signIn } from "next-auth/react";
import useStore from "../stores/store";
//import registerUser from "../actions/register";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: "itransform@gmail.com",
      fullName: "fullname",
      password: "password",
      confirmPassword: "password",
    },
  });

  const onSubmit: SubmitHandler<RegisterValidationSchema> = async (
    data: RegisterValidationSchema
  ) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/register", data);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log({ result });
      setUser(result);
      setLoading(false);
      router.push("/helloWorld");
    } catch (error) {
      // Handle errors, such as network issues or server errors
      setLoading(false);
      console.error("Error registering user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="tw-max-w-md tw-mx-auto tw-mt-8"
    >
      <div className="tw-mb-6">
        <label
          htmlFor="fullName"
          className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight tw-focus:tw-outline-none tw-focus:tw-shadow-outline"
          placeholder="Enter your full name"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="tw-text-red-500 tw-text-xs tw-italic">
            {errors.fullName.message}
          </p>
        )}
      </div>
      <div className="tw-mb-6">
        <label
          htmlFor="email"
          className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight tw-focus:tw-outline-none tw-focus:tw-shadow-outline"
          placeholder="Enter your email address"
          {...register("email")}
        />
        {errors.email && (
          <p className="tw-text-red-500 tw-text-xs tw-italic">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="tw-mb-6">
        <label
          htmlFor="password"
          className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight tw-focus:tw-outline-none tw-focus:tw-shadow-outline"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="tw-text-red-500 tw-text-xs tw-italic">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="tw-mb-6">
        <label
          htmlFor="confirmPassword"
          className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm_password"
          className="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight tw-focus:tw-outline-none tw-focus:tw-shadow-outline"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="tw-text-red-500 tw-text-xs tw-italic">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <LoadingButton
        buttonText="register"
        isLoading={loading}
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      ></LoadingButton>
    </form>
  );
}
