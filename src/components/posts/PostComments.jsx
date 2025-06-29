import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentList from "./PostCommentList";

const PostComments = ({ post }) => {
  const [toggleComments, setToggleComments] = useState(false);
  const handleToggleComments = () => {
    setToggleComments((prev) => !prev);
  };

  const { avatarUrl } = useAvatar(post);
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
        {toggleComments && <PostCommentList comments={post?.comments} />}
        {/* comment input box */}
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-6 max-h-6 rounded-full lg:max-h-6 lg:max-w-6 w-6 h-6 ml-2 mt-2"
            src={avatarUrl}
            alt="avatar"
          />

          <div className="flex-1 pt-4 pb-2 ">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighter-dark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
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
