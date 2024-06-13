"use client";

import { currentUser } from "@/lib/auth";
import React from "react";
import { UserInfo } from "../_components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo label="Client component" user={user} />;
};

export default ClientPage;
