import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(context ? "Logged In" : "Logged Out");
  return context;
};

export default useAuth;
