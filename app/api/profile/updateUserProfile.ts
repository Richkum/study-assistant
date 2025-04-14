import supabase from "@/app/utils/supabaseClient";

const updateUserProfile = async (updates: {
  full_name?: string;
  education_level?: string;
  study_preferences?: object;
}) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", (await supabase.auth.getUser()).data?.user?.id);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return data;
};

export default updateUserProfile;
