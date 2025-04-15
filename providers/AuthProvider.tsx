import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import supabase from "@/app/utils/supabaseClient";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  initialized: false,
  signOut: async () => {},
});

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "index",
  "(auth)/signin",
  "(auth)/signup",
  "(auth)/forgot-password",
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  // Helper function to check if current route is public
  const isPublicRoute = (segments: string[]) => {
    const currentRoute = segments.join("/");
    return PUBLIC_ROUTES.some((route) => currentRoute.includes(route));
  };

  useEffect(() => {
    // Initialize auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === "SIGNED_OUT") {
        router.replace("/");
      } else if (event === "SIGNED_IN") {
        router.replace("/(app)/home");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (!initialized) return;

    const currentRoute = segments.join("/");

    // Allow access to public routes regardless of auth state
    if (isPublicRoute(segments)) {
      return;
    }

    // Protected route checks
    if (!user && !isPublicRoute(segments)) {
      // If user is not authenticated and tries to access a protected route
      router.replace("/");
    }
  }, [user, initialized, segments]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace("/");
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, initialized, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
