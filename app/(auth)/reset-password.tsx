import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSpinner } from "@/components/ui/Loading";
import supabase from "@/app/utils/supabaseClient";
import { validatePassword, validatePasswordsMatch } from "../utils/validation";
import { Toast } from "@/components/ui/Toast";

interface ValidationErrors {
  newPassword: string | null;
  confirmPassword: string | null;
}

export default function ResetPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({
    newPassword: null,
    confirmPassword: null,
  });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ visible: true, message, type });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      newPassword: validatePassword(formData.newPassword),
      confirmPassword: validatePasswordsMatch(
        formData.newPassword,
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) throw error;

      showToast("Password has been reset successfully", "success");
      setTimeout(() => {
        router.replace("/(auth)/signin");
      }, 2000);
    } catch (error: any) {
      showToast(error.message || "An error occurred", "error");
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
          Create New Password
        </Text>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-sm mb-1 text-text dark:text-text-dark">
              New Password
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
                className={`bg-bg dark:bg-bg-dark p-4 rounded-xl text-text dark:text-text-dark border ${
                  errors.newPassword
                    ? "border-danger dark:border-danger-dark"
                    : "border-border dark:border-border-dark"
                } pr-12`}
                placeholderTextColor="#94a3b8"
                value={formData.newPassword}
                onChangeText={(text) => {
                  setFormData({ ...formData, newPassword: text });
                  setErrors({ ...errors, newPassword: null });
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 16, top: 16 }}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword && (
              <Text className="text-danger dark:text-danger-dark text-sm mt-1">
                {errors.newPassword}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-sm mb-1 text-text dark:text-text-dark">
              Confirm New Password
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                className={`bg-bg dark:bg-bg-dark p-4 rounded-xl text-text dark:text-text-dark border ${
                  errors.confirmPassword
                    ? "border-danger dark:border-danger-dark"
                    : "border-border dark:border-border-dark"
                } pr-12`}
                placeholderTextColor="#94a3b8"
                value={formData.confirmPassword}
                onChangeText={(text) => {
                  setFormData({ ...formData, confirmPassword: text });
                  setErrors({ ...errors, confirmPassword: null });
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 16, top: 16 }}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text className="text-danger dark:text-danger-dark text-sm mt-1">
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className={`bg-primary dark:bg-primary-dark rounded-xl py-4 w-full ${
              loading ? "opacity-70" : ""
            }`}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-center text-lg">
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-0 left-0 right-0">
          <Toast
            visible={toast.visible}
            message={toast.message}
            type={toast.type}
            onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
