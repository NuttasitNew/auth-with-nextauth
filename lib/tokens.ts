import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  console.log("existingToken from generatePassword:", existingToken);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  console.log("token from passwordResetToken", token);
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;

  console.log("passwordResetToken:", passwordResetToken.token);
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expired = new Date(new Date().getTime() + 3600 * 1000); // 1hour from now

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expired,
    },
  });
  return verificationToken;
};
