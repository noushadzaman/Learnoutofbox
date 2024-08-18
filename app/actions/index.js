"use server";

import { signIn } from "@/auth";
import { dbConnect } from "@/service/mongo";

export async function credentialLogin(formData) {
  await dbConnect();
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function doSocialLogin(formData) {
  await dbConnect();
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/courses" });
}
