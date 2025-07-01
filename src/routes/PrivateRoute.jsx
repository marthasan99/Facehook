import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Add a small delay to allow auth to initialize from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

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
