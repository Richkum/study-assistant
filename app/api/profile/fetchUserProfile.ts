import supabase from "@/app/utils/supabaseClient";

const fetchUserProfile = async () => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }

  return data;
};

export default fetchUserProfile;
