import { useEffect, useReducer } from "react";
import { actions } from "../actions/index.js";
import PostList from "../components/posts/PostsList.jsx";
import useAxios from "../hooks/useAxios.js";
import { PostReducer, initialState } from "../reducers/PostReducer.js";

const Home = () => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error });
      }
    };
    fetchPosts();
  }, [api]);

  if (state.loading) {
    return <div className="">Fetching posts...</div>;
  }
  if (state.error) {
    return (
      <div className="">Error fetching posts: {state?.error?.message}</div>
    );
  }

  return (
    <>
      <PostList posts={state.posts} />
    </>
  );
};

export default Home;
