import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

interface ThemeContextProps {
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <View className={`${isDark ? "dark" : ""} flex-1`}>
        <StatusBar style={isDark ? "light" : "dark"} />
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
