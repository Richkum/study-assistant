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
import {
  validateFullName,
  validateEmail,
  validatePassword,
} from "../utils/validation";

interface ValidationErrors {
  fullName: string | null;
  email: string | null;
  password: string | null;
}

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({
    fullName: null,
    email: null,
    password: null,
  });

  const validateForm = (): boolean => {
    const newErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed - No user data");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (signInError) throw signInError;

      router.push("./home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create account");
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
          Create Account
        </Text>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-sm mb-1 text-text dark:text-text-dark">
              Full Name
            </Text>
            <TextInput
              placeholder="Enter your full name"
              className={`bg-bg dark:bg-bg-dark p-4 rounded-xl text-text dark:text-text-dark border ${
                errors.fullName
                  ? "border-danger dark:border-danger-dark"
                  : "border-border dark:border-border-dark"
              }`}
              placeholderTextColor="#94a3b8"
              value={formData.fullName}
              onChangeText={(text) => {
                setFormData({ ...formData, fullName: text });
                setErrors({ ...errors, fullName: null });
              }}
            />
            {errors.fullName && (
              <Text className="text-danger dark:text-danger-dark text-sm mt-1">
                {errors.fullName}
              </Text>
            )}
          </View>

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
                placeholder="Create a strong password"
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
        </View>

        <TouchableOpacity
          className={`bg-primary dark:bg-primary-dark rounded-xl py-4 w-full mb-4 ${
            loading ? "opacity-70" : ""
          }`}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-white font-semibold text-center text-lg">
            Create Account
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-text dark:text-text-dark">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("./signin")}>
            <Text className="text-primary dark:text-primary-dark">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
