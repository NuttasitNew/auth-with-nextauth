"use client";

import { logout } from "@/actions/logout";
import { signOut as nextAuthSignOut } from "next-auth/react";

const clearCacheAndSignOut = async () => {
  // Perform client-side cache clearing
  if ("caches" in window) {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      await caches.delete(cacheName);
    }
  }

  // Sign out using NextAuth
  nextAuthSignOut({ callbackUrl: "/auth/login" });
};

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return <span onClick={clearCacheAndSignOut}>{children}</span>;
};
