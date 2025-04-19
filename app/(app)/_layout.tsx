// import { Stack } from "expo-router";
// import { ThemeProvider } from "@/context/ThemeContext";
// import { AuthProvider } from "@/providers/AuthProvider";
// import "../../app/global.css";
// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <Stack>
//           <Stack.Screen name="home" options={{ headerShown: false }} />
//           <Stack.Screen name="chat" options={{ headerShown: false }} />
//           <Stack.Screen name="settings" options={{ headerShown: false }} />
//         </Stack>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e2e8f0",
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
        },
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              size={24}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#94a3b8",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#94a3b8",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#94a3b8",
        }}
      />
    </Tabs>
  );
}
