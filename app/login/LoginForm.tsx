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

export default function LoginForm() {
  //const router = useRouter();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        //router.push("/helloWorld");
        console.log("yahari");
      }
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
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    </form>
  );
}
