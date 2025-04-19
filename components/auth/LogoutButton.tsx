import React, { useState } from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { LoadingSpinner } from "@/components/ui/Loading";

export function LogoutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      className={`bg-primary dark:bg-primary-dark rounded-xl py-4 px-6 ${
        loading ? "opacity-70" : ""
      }`}
      disabled={loading}
    >
      {loading ? (
        <View className="absolute inset-0 bg-bg/50 dark:bg-bg-dark/50 z-50 flex justify-center items-center">
          <LoadingSpinner
            size="large"
            containerClassName="flex justify-center items-center"
          />
        </View>
      ) : (
        <Text className="text-white font-semibold text-center">Sign Out</Text>
      )}
    </TouchableOpacity>
  );
}
