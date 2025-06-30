import { useState } from "react";
import ProfileIcon from "../../assets/icons/profile.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import PostCommentList from "./PostCommentList";

const PostComments = ({ post }) => {
  const [toggleComments, setToggleComments] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");
  const { api } = useAxios();
  const { auth } = useAuth();

  const handleToggleComments = () => {
    setToggleComments((prev) => !prev);
  };

  const profileImage = auth?.user?.avatar
    ? `${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`
    : ProfileIcon;

  const addComment = async (e) => {
    const keyCode = event.keyCode;
    if (keyCode === 13 && comment.trim() !== "") {
      e.preventDefault();
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );
        if (response.status === 200) {
          setComments(response.data.comments);
          setComment("");
          console.log("Comment added successfully:", response.data.comments);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };
  return (
    <>
      <div>
        {/* comment filter button */}
        <div className="mt-4">
          <button
            className="text-gray-300 max-md:text-sm"
            onClick={handleToggleComments}
          >
            All Comment ▾
          </button>
        </div>
      </div>
      <div>
        {toggleComments && <PostCommentList comments={comments} />}
        {/* comment input box */}
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-6 max-h-6 rounded-full lg:max-h-6 lg:max-w-6 w-6 h-6 ml-2 mt-2"
            src={profileImage}
            alt="avatar"
          />

          <div className="flex-1 pt-4 pb-2 ">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighter-dark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => addComment(e)}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        {/* comment input box */}
      </div>
    </>
  );
};

export default PostComments;
