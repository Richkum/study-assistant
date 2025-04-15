import supabase from "@/app/utils/supabaseClient";

const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    throw new Error(`Google login failed: ${error.message}`);
  }

  return data; // Contains session and user info
};

export default loginWithGoogle;
