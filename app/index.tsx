import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/providers/AuthProvider";
import { LoadingSpinner } from "@/components/ui/Loading";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import supabase from "./utils/supabaseClient";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();
  const { user, initialized } = useAuth();
  const [loading, setLoading] = useState(false);

  // Checking authentication status and redirect if needed
  useEffect(() => {
    if (initialized && user) {
      router.replace("/(app)/home");
    }
  }, [user, initialized]);

  // Handle navigation
  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  const handleSignIn = () => {
    router.push("/(auth)/signin");
  };

  // Creating the redirect URL
  const redirectUrl = makeRedirectUri({
    scheme: "myapp",
    path: "google-auth",
  });
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      Alert.alert(
        "Authentication Error",
        error.message || "Failed to sign in with Google"
      );
    } finally {
      setLoading(false);
    }
  };

  // If not initialized, you might show a loading state
  if (!initialized) {
    return (
      <SafeAreaView className="flex-1 bg-bg dark:bg-bg-dark">
        <View className="flex-1 justify-center items-center">
          <LoadingSpinner size="large" />
        </View>
      </SafeAreaView>
    );
  }

  // Only render the landing page if user is not authenticated
  if (user) return null;

  return (
    <SafeAreaView className="flex-1 bg-bg dark:bg-bg-dark">
      <StatusBar backgroundColor="transparent" translucent />
      {/* Background Gradient */}
      <LinearGradient
        colors={["#2563eb", "#4f46e5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute top-0 left-0 right-0 h-72"
        style={{ zIndex: 0 }}
      />

      {/* Content Container */}
      <View className="flex-1 z-10">
        {/* Header */}
        <View className="p-6 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-white">AI S A S A</Text>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center gap-5 px-4">
          {/* Hero Section */}
          <View className="items-center mt-4">
            <View className="items-center px-4 bg-white dark:bg-bg-dark rounded-2xl p-6 mx-2 shadow-md">
              <Text className="text-3xl font-bold text-text dark:text-text-dark text-center mb-4">
                Welcome to AI S A S A
              </Text>
              <Text className="text-text dark:text-text-dark text-center opacity-70 text-lg mb-4">
                Discover the best learning guidiance and assistance for you and
                get those grades up!
              </Text>
            </View>
          </View>

          {/* CTA Buttons */}
          <View className="space-y-4 mb-8 px-4 w-full">
            <TouchableOpacity
              className="bg-primary dark:bg-primary-dark rounded-xl py-4 w-full shadow-md"
              onPress={handleGetStarted}
            >
              <Text className="text-white font-semibold text-center text-lg">
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-transparent border-2 border-primary dark:border-primary-dark rounded-xl py-4 w-full"
              onPress={handleSignIn}
            >
              <Text className="text-primary dark:text-primary-dark font-semibold text-center text-lg">
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`bg-white dark:bg-bg-dark flex-row justify-center items-center rounded-xl py-4 w-full shadow-md ${
                loading ? "opacity-70" : ""
              }`}
              onPress={handleGoogleAuth}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" />
              ) : (
                <>
                  <Image
                    source={require("@/assets/images/google-logo.png")}
                    className="w-5 h-5 mr-2"
                  />
                  <Text className="text-text dark:text-text-dark font-semibold text-center text-lg ml-2">
                    Continue with Google
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
