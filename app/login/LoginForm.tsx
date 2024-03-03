"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  type LoginValidationSchema,
  loginValidationSchema,
} from "./loginValidationSchema";
import { useRouter } from "next/navigation";
import useStore from "../stores/store";
import { useState } from "react";
import LoadingButton from "../components/LoadingButton";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "itransform@gmail.com",
      password: "password",
    },
  });

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (data) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setServerError(true);
        console.error("Login failed:", result.error);
      } else {
        setUser(result);
        router.push("/helloWorld");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          className="shadow-sm form-control"
          id="email"
          placeholder="Enter your email address"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
          className="shadow-sm form-control"
          id="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <LoadingButton buttonText="Login" isLoading={loading} />
      {serverError && (
        <p className="text-red-500 text-xs mt-4">Wrong email or password</p>
      )}
    </form>
  );
}
