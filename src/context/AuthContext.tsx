"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [authData, setAuthData] = useState<{ token: string; user: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      setAuthData(JSON.parse(saved));
    }
  }, []);

  const login = (tokenValue: string, user: string) => {
    const data = { token: tokenValue, user };
    setAuthData(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
