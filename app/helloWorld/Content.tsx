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

  //

  return (
    <div className="tw-bg-gray-100 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
      <div className="tw-max-w-lg tw-mx-auto tw-p-8">
        <div className="tw-bg-white tw-rounded-lg tw-shadow-xl tw-p-8">
          <h1 className="tw-text-4xl tw-font-bold tw-mb-8 tw-text-center">
            Hello, World!
          </h1>
          <p className="tw-text-lg tw-text-gray-700 tw-mb-12 tw-text-center">
            This is a simple "Hello, World!
          </p>
          <div className="tw-flex tw-justify-center">
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
