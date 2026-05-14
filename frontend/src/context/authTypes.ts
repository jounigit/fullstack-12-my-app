import type { User } from '../types';

// User type definition
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   avatar?: string;
// }

// Auth context type with all necessary methods
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}