import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  return auth?.authToken ? (
    <>
      <ProfileProvider>
        <Header />
        <Outlet />
      </ProfileProvider>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
