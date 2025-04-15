import react from "react";
import { View, Text } from "react-native";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Congrats you are now logged in</Text>
      <LogoutButton />
    </View>
  );
}
