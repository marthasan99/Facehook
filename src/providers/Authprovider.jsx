import { useState, useEffect } from "react";
import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [auth, setAuth] = useState(() => {
    try {
      const savedAuth = localStorage.getItem("auth");
      return savedAuth ? JSON.parse(savedAuth) : null;
    } catch (error) {
      console.error("Error loading auth from localStorage:", error);
      return null;
    }
  });

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
