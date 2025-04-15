import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  containerClassName?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "small",
  containerClassName = "flex-1 justify-center items-center",
}) => {
  return (
    <View className={containerClassName}>
      <ActivityIndicator
        size={size}
        className=" text-primary dark:text-primary-dark"
      />
    </View>
  );
};
