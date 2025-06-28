import { useContext } from "react";
import { ProfileContext } from "../context";

const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};

export default useProfile;
