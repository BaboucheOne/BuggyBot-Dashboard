import React, { createContext, useState, useContext, ReactNode } from "react";
import Cookies from "js-cookie";
import { COOKIES_TOKEN_KEY } from "../config/constant";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!Cookies.get(COOKIES_TOKEN_KEY));

  const login = () => {
    setIsLoggedIn(true);
  }
  const logout = () => {
    Cookies.remove(COOKIES_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
  {children}
  </AuthContext.Provider>
);
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
