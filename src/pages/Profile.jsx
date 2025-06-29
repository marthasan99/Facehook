import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch({ type: actions.profile.DATA_FETCH_ERROR, error });
      }
    };
    fetchProfile();
  }, [dispatch, api, auth?.user?.id]);
  if (state?.loading) {
    return <div className="">Fetching your profile data...</div>;
  }
  if (state?.error) {
    return (
      <div className="">Error fetching profile: {state?.error.message}</div>
    );
  }
  return (
    <>
      <main class="mx-auto max-w-[1020px] py-8">
        <div class="container">
          <ProfileInfo />
          <MyPosts />
        </div>
      </main>
    </>
  );
};

export default Profile;
