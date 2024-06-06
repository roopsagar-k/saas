"use server";
import { signIn } from "@/auth";

export const SignIn = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      redirectTo: "/home",
    });
  } catch (error) {
    throw error;
  }
};
