"use server";

import { apiResponseSchema, loginSchema } from "@/schemas/loginSchem";
import axios from "axios";
import { redirect } from "next/navigation";
import { LoginUserSchema } from "../login/page";
import { cookies } from "next/headers";

export async function signIn(formData: LoginUserSchema) {
  try {
    const cookieStore = await cookies();
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    // const validatedResponse = apiResponseSchema.parse(response.data);

    const token = response.data.token;

    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    redirect("/administrador");
  } catch (error) {
    return error;
  }
}
