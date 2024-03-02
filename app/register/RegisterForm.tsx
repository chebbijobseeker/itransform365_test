"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  type RegisterValidationSchema,
  registerValidationSchema,
} from "./registerValidationSchema";
import axios from "axios";
//import registerUser from "../actions/register";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: "email@email.em",
      fullName: "full name",
      password: "password",
      confirmPassword: "password",
    },
  });

  const onSubmit: SubmitHandler<RegisterValidationSchema> = async (
    data: RegisterValidationSchema
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      console.log(response.data);
    } catch (error) {
      // Handle errors, such as network issues or server errors
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
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
}
