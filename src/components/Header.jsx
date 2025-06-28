import { Link } from "react-router-dom";
import HomeImage from "../assets/icons/home.svg";
import NotificationImage from "../assets/icons/notification.svg";
import AvatarImage from "../assets/images/avatars/avatar_1.png";
import LogoImage from "../assets/images/logo.svg";
import Logout from "./auth/Logout";

import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";

const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <Link to="/">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={LogoImage}
            />
          </Link>
          {/* nav links  */}

          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src={HomeImage} alt="Home" />
              Home
            </Link>
            <button className="icon-btn">
              <img src={NotificationImage} alt="Notification" />
            </button>
            <Logout />

            <Link to="/me" className="flex-center !ml-8 gap-3">
              <span className="text-lg font-medium lg:text-xl">
                {user?.firstName + " " + user?.lastName}
              </span>
              <img
                className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full w-8 h-8"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                  user?.avatar || AvatarImage
                }`}
                alt={user?.firstName + " " + user?.lastName}
              />
            </Link>
          </div>
          {/* nav links ends */}
        </div>
      </nav>
    </>
  );
};

export default Header;
