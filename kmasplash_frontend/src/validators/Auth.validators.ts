import { z } from "zod";
const REGEXP_PASSWORD_RULE: string | RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

const passwordSchema = z
  .string()
  .min(6, { message: "Must be 6 or more characters long" })
  .max(30, { message: "Must be 30 or less characters long" })
  .regex(REGEXP_PASSWORD_RULE, {
    message: "Must contain lowercase, uppercase, digit and special character",
  });

/// sign In
export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Invalid Email" })
    .email({ message: "Invalid Email" }),
  password: passwordSchema,
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;
// sign up

export const SignUpFormSchema = SignInFormSchema.extend({
  fullName: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(50, { message: "Must be 50 or less characters long" })
    .regex(/^[\p{L}\s\p{Lo}]+$/u, "Invalid name format"),
});

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const UpdateAuthSchema = z.object({
  fullName: z.optional(z.string()),
  avatar: z.optional(z.string()),
  bio: z.optional(z.string()),
  userName: z.optional(
    z
      .string()
      .min(2)
      .max(30)
      .regex(/[\w\d_]+$/, {
        message: "Username can only contain letters, numbers, and underscores!",
      }),
  ),
  portfolio: z.optional(z.string()),
  facebookId: z.optional(z.string()),
  instagramId: z.optional(z.string()),
  location: z.optional(z.string()),
});
export type UpdateAuthFormData = z.infer<typeof UpdateAuthSchema>;

export const ChangePasswordFormSchema = z
  .object({
    password: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "Mat khau khong khop",
      path: ["confirmPassword"],
    },
  );
// .refine(
//   (data) => {
//     // const pattern = new RegExp(REGEXP_PASSWORD_RULE);

//     return pattern.test(data.newPassword);
//   },
//   {
//     message: "Mat khuan phai co 8 ky tu",
//     path: ["newPassword"],
//   },
// );

export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;
