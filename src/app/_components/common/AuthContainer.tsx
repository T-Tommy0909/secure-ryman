"use client";

import { FC, useEffect } from "react";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const AuthContainer: FC<Props> = ({ children }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [user, router, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  return <>{!isLoading && user ? children : null}</>;
};
