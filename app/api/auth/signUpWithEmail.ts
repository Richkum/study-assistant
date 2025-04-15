import supabase from "@/app/utils/supabaseClient";

const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string
) => {
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
    throw new Error(`Sign-up failed: ${error.message}`);
  }

  return data; // Contains user info
};

export default signUpWithEmail;
