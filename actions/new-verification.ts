"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expired) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }
  const exsitingUser = await getUserByEmail(existingToken.email);

  if (!exsitingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: exsitingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email Verified!" };
};
