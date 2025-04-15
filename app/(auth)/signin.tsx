import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSpinner } from "@/components/ui/Loading";
import supabase from "../utils/supabaseClient";
import { validateEmail, validatePassword } from "../utils/validation";

interface ValidationErrors {
  email: string | null;
  password: string | null;
}

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({
    email: null,
    password: null,
  });

  const validateForm = (): boolean => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          Alert.alert(
            "Authentication Failed",
            "The email or password you entered is incorrect. Please try again."
          );
        } else {
          throw error;
        }
        return;
      }

      router.push("/(app)/home");
    } catch (error: any) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg dark:bg-bg-dark">
      <StatusBar />
      {loading && (
        <View className="absolute inset-0 bg-bg/50 dark:bg-bg-dark/50 z-50 flex justify-center items-center">
          <LoadingSpinner
            size="large"
            containerClassName="flex justify-center items-center"
          />
        </View>
      )}

      <View className="flex-1 p-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Text className="text-primary dark:text-primary-dark text-lg">
            ← Back
          </Text>
        </TouchableOpacity>

        <Text className="text-3xl font-bold mb-8 text-text dark:text-text-dark">
          Sign In
        </Text>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-sm mb-1 text-text dark:text-text-dark">
              Email
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Enter your email"
                className={`bg-bg dark:bg-bg-dark p-4 pl-12 rounded-xl text-text dark:text-text-dark border ${
                  errors.email
                    ? "border-danger dark:border-danger-dark"
                    : "border-border dark:border-border-dark"
                }`}
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  setErrors({ ...errors, email: null });
                }}
              />
              <Ionicons
                name="mail-outline"
                size={24}
                color="#94a3b8"
                style={{ position: "absolute", left: 16, top: 16 }}
              />
            </View>
            {errors.email && (
              <Text className="text-danger dark:text-danger-dark text-sm mt-1">
                {errors.email}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-sm mb-1 text-text dark:text-text-dark">
              Password
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                className={`bg-bg dark:bg-bg-dark p-4 rounded-xl text-text dark:text-text-dark border ${
                  errors.password
                    ? "border-danger dark:border-danger-dark"
                    : "border-border dark:border-border-dark"
                } pr-12`}
                placeholderTextColor="#94a3b8"
                value={formData.password}
                onChangeText={(text) => {
                  setFormData({ ...formData, password: text });
                  setErrors({ ...errors, password: null });
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 16, top: 16 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-danger dark:text-danger-dark text-sm mt-1">
                {errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="self-end"
            onPress={() => router.push("./forgot-password")}
          >
            <Text className="text-primary dark:text-primary-dark">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={`bg-primary dark:bg-primary-dark rounded-xl py-4 w-full mb-4 ${
            loading ? "opacity-70" : ""
          }`}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text className="text-white font-semibold text-center text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-text dark:text-text-dark">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("./signup")}>
            <Text className="text-primary dark:text-primary-dark">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
