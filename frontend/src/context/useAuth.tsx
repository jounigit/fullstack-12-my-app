import { useContext } from "react";
import { type AuthContextType } from "./authTypes";
import { AuthContext } from "./AuthContext";

// Custom hook with type safety
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}