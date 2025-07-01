import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  return auth?.authToken ? (
    <>
      <PostProvider>
        <ProfileProvider>
          <Header />
          <Outlet />
        </ProfileProvider>
      </PostProvider>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
