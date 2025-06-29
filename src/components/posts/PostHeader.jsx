import { useState } from "react";
import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../../utils";

const PostHeader = ({ post }) => {
  const { avatarUrl } = useAvatar(post);
  const [showAction, setShowAction] = useState(false);

  const handleActionToggle = () => {
    setShowAction((prev) => !prev);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        {/* author info */}
        <div className="flex items-center gap-3">
          <img
            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px] w-[58px] h-[58px]"
            src={avatarUrl}
            alt={`Avatar of ${post?.author?.name || "User"}`}
          />
          <div>
            <h6 className="text-lg lg:text-xl">
              {post?.author?.name || "User"}
            </h6>
            <div className="flex items-center gap-1.5">
              <img src={TimeIcon} alt="time" />
              <span className="text-sm text-gray-400 lg:text-base">
                {getDateDifferenceFromNow(post?.createAt)}
              </span>
            </div>
          </div>
        </div>
        {/* author info ends */}

        {/* action dot */}
        <div className="relative">
          <button>
            <img
              src={ThreeDotsIcon}
              alt="3dots of Action"
              onClick={handleActionToggle}
            />
          </button>

          {/* Action Menus Popup */}

          {showAction && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
        {/* action dot ends */}
      </header>
    </>
  );
};

export default PostHeader;
