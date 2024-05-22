import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
} from "react";
import * as api from "../pages/api/index";
import { useMutation } from "@tanstack/react-query";
import { Role, User } from "@/types";
import { jwtDecode } from "jwt-decode";

const JWT_TOKEN_KEY = "jwtToken";
//@ts-ignore
const AuthContext = createContext();

export interface AuthContextValue {
  token: string | null;
  user: User | null;
  role: Role | null;
  error: Error | null;
  ready: boolean;
  loading: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem(JWT_TOKEN_KEY) : ""
  );
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (token) {
      api.setAuthToken(token);
      const data: any = jwtDecode(token);
      setUser(data);
      setRole(data.role);
      setIsAuthed(true);
      setReady(true);
    }
  }, [token]);

  const setSession = useCallback(
    (
      token: string,
      user: { id: number; email: string; role: Role; companyId: number }
    ) => {
      setToken(token);
      setUser(user);
      setRole(user.role);
      localStorage.setItem(JWT_TOKEN_KEY, token);
    },
    []
  );

  const loginMutation = useMutation({
    mutationFn: (loginData: { email: string; password: string }) => {
      return api.post("/api/user/login", loginData);
    },
  });

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { token, user } = await loginMutation.mutateAsync({
          email,
          password,
        });

        setSession(token, user);
        api.setAuthToken(token);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [loginMutation, setSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthed(false);
    setReady(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      role,
      error: loginMutation.error as Error | null,
      ready,
      loading: loginMutation.isPending,
      isAuthed,
      login,
      logout,
    }),
    [
      token,
      user,
      role,
      loginMutation.error,
      ready,
      loginMutation.isPending,
      isAuthed,
      login,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
