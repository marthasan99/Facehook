import { useReducer } from "react";
import { PostContext } from "../context";
import { PostReducer, initialState } from "../reducers/PostReducer";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
