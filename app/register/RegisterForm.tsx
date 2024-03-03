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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-6">
        <label
          htmlFor="fullName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your full name"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs italic">
            {errors.fullName.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email address"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm_password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
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
