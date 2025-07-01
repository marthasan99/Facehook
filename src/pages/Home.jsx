import { useEffect } from "react";
import { actions } from "../actions/index.js";
import NewPost from "../components/posts/NewPost.jsx";
import PostList from "../components/posts/PostsList.jsx";
import useAxios from "../hooks/useAxios.js";
import usePost from "../hooks/usePost.js";

const Home = () => {
  const { state, dispatch } = usePost();
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
  }, [api, dispatch]);

  const sortedPosts =
    state.posts?.sort((a, b) => {
      return (
        new Date(b.createAt || b.createdAt) -
        new Date(a.createAt || a.createdAt)
      );
    }) || [];

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
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <NewPost />
          <PostList posts={sortedPosts} />
        </div>
      </main>
    </>
  );
};

export default Home;
