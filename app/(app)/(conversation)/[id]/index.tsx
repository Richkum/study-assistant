import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { mockConversations } from "@/app/utils/mockData";
import { nanoid } from "nanoid";

export default function Conversation() {
  const { id, initialQuery } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(() => {
    const conversation = mockConversations.find((c) => c.id === id);
    return conversation?.messages || [];
  });
  const [newMessage, setNewMessage] = useState(
    typeof initialQuery === "string" ? initialQuery : ""
  );
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend();
    }
  }, []);

  const handleSend = () => {
    if (typeof newMessage !== "string" || !newMessage.trim()) return;

    const userMessage = {
      id: nanoid(),
      content: newMessage,
      sender: "user" as const,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Mock AI response
    setTimeout(() => {
      const aiMessage = {
        id: nanoid(),
        content: `This is a mock response to: ${newMessage}`,
        sender: "assistant" as const,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2563eb" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
          Conversation
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        className="flex-1 px-4"
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View
            className={`my-2 max-w-[80%] ${
              item.sender === "user"
                ? "self-end bg-blue-500"
                : "self-start bg-gray-200 dark:bg-gray-700"
            } rounded-2xl p-3`}
          >
            <Text
              className={
                item.sender === "user"
                  ? "text-white"
                  : "text-gray-900 dark:text-white"
              }
            >
              {item.content}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="border-t border-gray-200 dark:border-gray-700"
      >
        <View className="flex-row items-center p-4">
          <TextInput
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mr-2 text-gray-900 dark:text-white"
            placeholder="Type a message..."
            placeholderTextColor="#94a3b8"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity onPress={handleSend} disabled={!newMessage.trim()}>
            <Ionicons
              name="send"
              size={24}
              color={newMessage.trim() ? "#2563eb" : "#94a3b8"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
