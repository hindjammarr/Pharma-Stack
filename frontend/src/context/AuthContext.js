import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "@/services/api";
import { useNavigate } from "react-router-dom";

/**
 * AuthContext responsibilities:
 * - store current user and token
 * - provide login, signup, logout helpers
 * - persist token in localStorage
 */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { _id, name, email, role }
  const [token, setToken] = useState(() => localStorage.getItem("pharmacy_token"));
  const [loading, setLoading] = useState(Boolean(token)); // if token present, try restore
  const navigate = useNavigate();

  // Set axios header whenever token changes
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem("pharmacy_token", token);
    } else {
      setAuthToken(null);
      localStorage.removeItem("pharmacy_token");
    }
  }, [token]);

  // Try to restore user from token (if backend has me endpoint). If not, backend login returns user.
  useEffect(() => {
    const restore = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // Option A: if backend provides /auth/me to get current user
        const { data } = await api.get("/auth/me"); // optional: implement on backend
        setUser(data.user);
      } catch (err) {
        // if /auth/me isn't available or token invalid, we'll just clear token
        console.warn("Could not restore session:", err?.response?.data || err.message);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []); // run once on mount

  const login = async (email, password, remember = false) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data?.token) {
      setToken(data.token);
      setUser(data.user || null);
      if (!remember) {
        // if not remember, keep in memory but we already store in localStorage by default.
        // For HttpOnly cookie approach, adjust backend to set cookie and don't store token.
      }
      return data;
    }
    throw new Error("Login failed");
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    if (data?.token) {
      setToken(data.token);
      setUser(data.user || null);
      return data;
    }
    throw new Error("Signup failed");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
