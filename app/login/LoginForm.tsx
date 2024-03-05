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
import { useState } from "react";
import LoadingButton from "../components/LoadingButton";

export default function LoginForm() {
  const router = useRouter();

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
      password: "test123456",
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
        router.push("/helloWorld");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="tw-max-w-md tw-mx-auto tw-mt-8"
    >
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email address"
          {...register("email")}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <LoadingButton buttonText="Login" isLoading={loading} />
      {serverError && (
        <p className="text-danger mt-4">Wrong email or password</p>
      )}
    </form>
  );
}
