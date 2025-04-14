import supabase from "@/app/utils/supabaseClient";

const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "your-app-scheme://password-reset", // Update this to your app's deep link
  });

  if (error) {
    throw new Error(`Password reset failed: ${error.message}`);
  }

  return data;
};

export default resetPassword;
