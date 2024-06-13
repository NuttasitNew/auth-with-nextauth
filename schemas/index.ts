import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine((data) => !(data.password && !data.newPassword), {
    message: "New Password is Required!",
    path: ["newPassword"],
  })
  .refine((data) => !(data.newPassword && !data.password), {
    message: "Password is Required!",
    path: ["password"],
  });

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Min of 6 characters required" }),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is require",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Password is require",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  date: z.string(),
});
