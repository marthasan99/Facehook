import { useState } from "react";
import CommentIcon from "../../assets/icons/comment.svg";
import LikeFilledIcon from "../../assets/icons/like-filled-hand.svg";
import LikeIcon from "../../assets/icons/like.svg";
import ShareIcon from "../../assets/icons/share.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const PostAction = ({ post, commentCount }) => {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(
    post?.likes?.includes(auth?.user?.id) || false
  );
  const { api } = useAxios();
  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );
      if (response.status === 200) {
        setLiked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  return (
    <>
      <div class="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        {/* Like Button */}
        <button
          class="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
          onClick={handleLike}
        >
          <img src={liked ? LikeFilledIcon : LikeIcon} alt="Like" />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>

        {/* Comment Button */}
        <button class="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src={CommentIcon} alt="Comment" />
          <span>Comment({commentCount ?? 0})</span>
        </button>

        {/* Share Button */}
        <button class="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src={ShareIcon} alt="Share" />
          <span>Share</span>
        </button>
      </div>
    </>
  );
};

export default PostAction;
