import supabase from "./supabaseClient";
import { AuthResponse } from "@supabase/supabase-js";

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export async function signUpUser({
  email,
  password,
  fullName,
}: SignUpData): Promise<AuthResponse> {
  console.log("Starting signup process for:", email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
    throw error;
  }

  console.log("Signup successful, user:", data.user?.id);
  return { data, error };
}

export async function signInUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  console.log("Attempting signin for:", email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Signin error:", error.message);
    throw error;
  }

  console.log("Signin successful, user:", data.user?.id);
  return { data, error };
}

// Get current session
export const getCurrentSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
  return session;
};

// Get current user
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
  return user;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
  return true;
};
