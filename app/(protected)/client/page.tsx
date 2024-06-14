"use client";

import React, { useEffect, useState } from "react";
import { UserInfo } from "@/app/(protected)/_components/user-info";
import { useSession } from "next-auth/react";

const ClientPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(true);

  console.log({ status });
  if (status === "unauthenticated") {
    window.location.reload();
  }

  useEffect(() => {
    if (status !== "loading" && status === "authenticated") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <UserInfo label="Client component" user={user} />;
  }
};

export default ClientPage;
