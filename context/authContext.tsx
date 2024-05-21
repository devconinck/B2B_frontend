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
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Company, Role, User } from "@/types";

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
  const [role, setRole] = useState(null);

  useEffect(() => {
    api.setAuthToken(token!!);
    setIsAuthed(Boolean(token));
    setReady(true);
    console.log(user);
  }, [token, user]);

  const setSession = useCallback(
    (
      token: string,
      user: { id: number, email: string, role: Role, companyId: number }
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
      console.log("login");
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
    setToken(null);
    setUser(null);
    setRole(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
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
