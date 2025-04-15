import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { LoadingSpinner } from "@/components/ui/Loading";

export default function GoogleAuth() {
  const router = useRouter();

  useEffect(() => {
    // The auth state change listener in AuthProvider handles the redirect
    router.replace("/(app)/home");
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-bg dark:bg-bg-dark">
      <LoadingSpinner size="large" />
    </View>
  );
}
