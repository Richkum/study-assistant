// import react from "react";
// import { View, Text } from "react-native";
// import { LogoutButton } from "@/components/auth/LogoutButton";

// export default function Chat() {
//   return (
//     <View className="flex-1 items-center justify-center">
//       <Text>Congrats you are now logged in</Text>
//       <LogoutButton />
//     </View>
//   );
// }

import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { mockConversations } from "@/app/utils/mockData";
import { format } from "date-fns";

export default function ChatHistory() {
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof mockConversations)[0] }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200 dark:border-gray-700"
      onPress={() =>
        router.push({
          pathname: "./(conversation)/[id]",
          params: { id: item.id },
        })
      }
    >
      <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {item.title}
      </Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-2" numberOfLines={1}>
        {item.lastMessage}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-500">
        {format(new Date(item.timestamp), "MMM d, yyyy h:mm a")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Chat History
        </Text>
      </View>
      <FlatList
        data={mockConversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
    </SafeAreaView>
  );
}
