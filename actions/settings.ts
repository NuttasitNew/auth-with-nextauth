"use server";

import * as z from "zod";

import { unstable_update } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user?.id || "");

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    if (values.password && values.newPassword && dbUser.password) {
      const passwordMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );

      if (!passwordMatch) {
        return { error: "Incorrect password!" };
      }

      const hashedPassword = await bcrypt.hash(values.newPassword, 10);
      values.password = hashedPassword;
      values.newPassword = undefined;
    }

    return { success: " Verification Token" };
  }
  const updateUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
      role: updateUser.role,
    },
  });

  return { success: "Settings Updated!" };
};
