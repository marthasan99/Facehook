import { useState } from "react";
import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostEntry from "./postEntry";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="card mt-6 lg:mt-8">
        <PostEntry 
          editPost={post} 
          onCreate={handleEditComplete}
        />
      </article>
    );
  }

  return (
    <>
      <article className="card mt-6 lg:mt-8">
        <PostHeader post={post} onEdit={handleEdit} />
        <PostBody poster={post?.image} content={post?.content || post?.body} />
        <PostAction post={post} commentCount={post?.comments?.length} />
        <PostComments post={post} />
      </article>
    </>
  );
};

export default PostCard;
