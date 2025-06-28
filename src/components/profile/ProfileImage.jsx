import useProfile from "../../hooks/useProfile";

import { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploadRef = useRef(null);

  const handleImageUploadClick = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();

      for (const file of fileUploadRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error,
      });
    }
  };

  return (
    <>
      <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <img
          className="max-w-full rounded-full w-40 h-40"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
          alt={`${state?.user?.firstName} ${state?.user?.lastName}`}
        />

        <form>
          <button
            className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            type="submit"
            onClick={handleImageUploadClick}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input type="file" ref={fileUploadRef} className="hidden" />
        </form>
      </div>
    </>
  );
};

export default ProfileImage;
