import { useState } from "react";
import { actions } from "../../actions";
import CheckIcon from "../../assets/icons/check.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";
const Bio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const [bio, setBio] = useState(state?.user?.bio || "");
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing((prev) => !prev);
  };
  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
        setEditing(false);
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
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {editing ? (
            <textarea
              value={bio}
              rows={4}
              cols={55}
              onChange={(e) => setBio(e.target.value)}
              className="w-full resize-none border border-gray-300 p-2 rounded-lg"
            />
          ) : (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio || "This user has not set a bio yet."}
            </p>
          )}
        </div>
        {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
        {editing ? (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleBioEdit}
          >
            <img src={CheckIcon} alt="Check" />
          </button>
        ) : (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleEditClick}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        )}
      </div>
    </>
  );
};

export default Bio;
