"use client";

import React, { useEffect, useState } from "react";
import { UserInfo } from "../_components/user-info";
import { useSession } from "next-auth/react";

const ClientPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <UserInfo label="Client component" user={user} />;
  }

  return <div>Please log in to view this content.</div>;
};

export default ClientPage;
