import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import supabase from "@/app/utils/supabaseClient";
import { LoadingSpinner } from "@/components/ui/Loading";
import { Toast } from "@/components/ui/Toast";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });
  const router = useRouter();

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ visible: true, message, type });
  };

  const handleSendCode = async () => {
    if (!email) {
      showToast("Please enter your email address", "error");
      return;
    }

    try {
      setLoading(true);

      // Check if user exists using signIn attempt
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // This prevents creating a new user
        },
      });

      if (
        signInError?.message?.includes("Email not confirmed") ||
        signInError?.message?.includes("User not found")
      ) {
        showToast("No account found with this email address", "error");
        return;
      }

      // Generate and send verification code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Store code in Supabase
      const { error } = await supabase.from("verification_codes").insert({
        email,
        code: verificationCode,
        expires_at: new Date(Date.now() + 15 * 60000), // 15 minutes expiry
      });

      if (error) throw error;

      // Here you would typically send the code via email
      // For now, we'll just show it (DEVELOPMENT ONLY!)
      console.log("Verification code:", verificationCode);

      showToast("Verification code sent successfully!", "success");
      setShowVerificationModal(true);
    } catch (error: any) {
      showToast(error.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      showToast("Please enter the verification code", "error");
      return;
    }

    try {
      setLoading(true);

      // Verify the code
      const { data, error } = await supabase
        .from("verification_codes")
        .select()
        .eq("email", email)
        .eq("code", code)
        .gt("expires_at", new Date().toISOString())
        .eq("used", false)
        .single();

      if (error || !data) {
        showToast("Invalid or expired code", "error");
        return;
      }

      // Mark code as used
      await supabase
        .from("verification_codes")
        .update({ used: true })
        .eq("id", data.id);

      // Show password reset form
      setShowVerificationModal(false);
      router.push({
        pathname: "/(auth)/reset-password",
        params: { email },
      });
    } catch (error: any) {
      showToast(error.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg dark:bg-bg-dark">
      <View className="flex-1 p-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Text className="text-primary dark:text-primary-dark text-lg">
            ← Back
          </Text>
        </TouchableOpacity>

        <Text className="text-3xl font-bold mb-8 text-text dark:text-text-dark">
          Reset Password
        </Text>

        <View className="flex flex-col gap-4 space-y-4">
          <View>
            <Text className="text-sm mb-1 text-text dark:text-text-dark">
              Email
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Enter your email"
                className="bg-bg dark:bg-bg-dark p-4 pl-12 rounded-xl text-text dark:text-text-dark border "
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <Ionicons
                name="mail-outline"
                size={24}
                color="#94a3b8"
                style={{ position: "absolute", left: 16, top: 16 }}
              />
            </View>
          </View>

          <TouchableOpacity
            className={`bg-primary dark:bg-primary-dark rounded-xl py-4 ${
              loading ? "opacity-70" : ""
            }`}
            onPress={handleSendCode}
            disabled={loading}
          >
            {loading && (
              <View className="absolute inset-0 bg-bg/50 dark:bg-bg-dark/50 z-50 flex justify-center items-center">
                <LoadingSpinner
                  size="large"
                  containerClassName="flex justify-center items-center"
                />
              </View>
            )}

            <Text className="text-center text-lg font-semibold text-white">
              Send Reset Code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verification Code Modal */}
        <Modal
          visible={showVerificationModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[90%] max-w-sm">
              <Text className="text-xl font-bold mb-4 text-text dark:text-text-dark">
                Enter Verification Code
              </Text>

              <TextInput
                placeholder="Enter 6-digit code"
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl text-text dark:text-text-dark mb-4"
                keyboardType="number-pad"
                maxLength={6}
                value={code}
                onChangeText={setCode}
              />

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-xl py-3"
                  onPress={() => setShowVerificationModal(false)}
                >
                  <Text className="text-center text-text dark:text-text-dark">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-primary dark:bg-primary-dark rounded-xl py-3"
                  onPress={handleVerifyCode}
                  disabled={loading}
                >
                  {loading && (
                    <View className="absolute inset-0 bg-bg/50 dark:bg-bg-dark/50 z-50 flex justify-center items-center">
                      <LoadingSpinner
                        size="large"
                        containerClassName="flex justify-center items-center"
                      />
                    </View>
                  )}
                  <Text className="text-center text-white dark:text-white">
                    Verify
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      </View>
    </SafeAreaView>
  );
}
