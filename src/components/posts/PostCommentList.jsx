import ProfileIcon from "../../assets/icons/profile.svg";
const PostCommentList = ({ comments }) => {
  return (
    <>
      <div className="space-y-4  pl-2 lg:pl-3">
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex items-center gap-3 pt-4 border-b border-lighter-dark pb-2"
              >
                <img
                  className="max-w-6 max-h-6 rounded-full"
                  src={
                    comment?.author?.avatar
                      ? `${import.meta.env.VITE_SERVER_BASE_URL}/${
                          comment.author.avatar
                        }`
                      : ProfileIcon
                  }
                  alt="avatar"
                />
                <div>
                  <div className="flex gap-1 text-xs lg:text-sm">
                    <span>{comment.author?.name || "Anonymous"}: </span>
                    <span>{comment?.comment}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="pt-4 text-gray-400 text-sm">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </>
  );
};

export default PostCommentList;
