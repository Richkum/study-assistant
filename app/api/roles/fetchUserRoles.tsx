import supabase from "@/app/utils/supabaseClient";

const fetchUserRoles = async () => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", (await supabase.auth.getUser()).data?.user?.id);

  if (error) {
    throw new Error(`Failed to fetch user roles: ${error.message}`);
  }

  return data;
};

export default fetchUserRoles;
