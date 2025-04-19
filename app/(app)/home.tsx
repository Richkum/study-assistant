import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { nanoid } from "nanoid";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;

    // Create new conversation ID
    const newConversationId = nanoid();

    // Navigate to new conversation
    router.push({
      pathname: "./(conversation)/[id]",
      params: {
        id: newConversationId,
        initialQuery: query.trim(),
      },
    });
    setQuery("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <StatusBar />
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 px-4 pt-4">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Study Assistant
              </Text>
              <Text className="text-base text-gray-600 dark:text-gray-400 mt-2">
                Your personal AI-powered study companion
              </Text>
            </View>

            {/* Quick Actions */}
            <View className="flex-row justify-between mb-8">
              <TouchableOpacity
                className="flex-1 mr-2 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl"
                onPress={() => router.push("/chat")}
              >
                <Ionicons name="time-outline" size={24} color="#2563eb" />
                <Text className="text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  Previous Chats
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 ml-2 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl"
                onPress={() => router.push("/settings")}
              >
                <Ionicons name="settings-outline" size={24} color="#2563eb" />
                <Text className="text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  Settings
                </Text>
              </TouchableOpacity>
            </View>

            {/* Main Chat Input Section */}
            <View className="flex-1 justify-center px-4">
              <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Start a New Study Session
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Ask a question or describe what you'd like to learn
                </Text>

                <View className="relative">
                  <TextInput
                    className="bg-white dark:bg-gray-700 px-4 py-3 rounded-xl text-gray-900 dark:text-white pr-12 border border-gray-200 dark:border-gray-600"
                    placeholder="Type your question..."
                    placeholderTextColor="#94a3b8"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="send"
                    multiline
                    maxLength={500}
                  />
                  <TouchableOpacity
                    className="absolute right-2 top-2 p-2"
                    onPress={handleSubmit}
                    disabled={!query.trim()}
                  >
                    <Ionicons
                      name="send"
                      size={20}
                      color={query.trim() ? "#2563eb" : "#94a3b8"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Example Prompts */}
                <View className="mt-6">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Try asking:
                  </Text>
                  <View className="space-y-2">
                    {[
                      "Explain quantum computing in simple terms",
                      "Help me prepare for my history exam",
                      "How does photosynthesis work?",
                    ].map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                        onPress={() => setQuery(suggestion)}
                      >
                        <Text className="text-gray-700 dark:text-gray-300">
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
