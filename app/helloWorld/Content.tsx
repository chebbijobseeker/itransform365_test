"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, getSession, useSession } from "next-auth/react";

import LoadingPage from "./LoadingPage";
import useStore from "../stores/store";
import LoadingButton from "../components/LoadingButton";

export default function Content() {
  const router = useRouter();
  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logging out
    await signOut();
    router.push("/");
  };

  if (status === "unauthenticated") {
    router.push("/login");
    return <LoadingPage />;
  }

  if (loading || status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Hello, World!</h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            This is a simple "Hello, World!
          </p>
          <div className="flex justify-center">
            <LoadingButton
              buttonText="Logout"
              isLoading={loading}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
