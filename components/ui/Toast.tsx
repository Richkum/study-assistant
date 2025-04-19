import React, { useEffect } from "react";
import { Animated, Text, View } from "react-native";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  visible,
  onHide,
}) => {
  const opacity = new Animated.Value(0);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-primary dark:bg-primary-dark";
      case "error":
        return "bg-red-500 dark:bg-red-600";
      default:
        return "bg-gray-800 dark:bg-gray-200";
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onHide());
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{ opacity }}
      className={`absolute bottom-96 left-4 right-4 ${getBackgroundColor()} p-4 rounded-xl`}
    >
      <Text className="text-white dark:text-text-dark text-center font-medium">
        {message}
      </Text>
    </Animated.View>
  );
};
