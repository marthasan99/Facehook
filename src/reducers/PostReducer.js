import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING:
      return { ...state, loading: true };
    case actions.post.DATA_FETCHED:
      return { ...state, loading: false, posts: action.data };
    case actions.post.DATA_FETCH_ERROR:
      return { ...state, loading: false, error: action.error };
    // case actions.post.DATA_EDITED:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) =>
    //       post.id === action.payload.id ? action.payload : post
    //     ),
    //   };
    // case actions.post.POST_DELETED:
    //   return {
    //     ...state,
    //     posts: state.posts.filter((post) => post.id !== action.payload),
    //   };
    // case actions.post.POST_LIKED:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) =>
    //       post.id === action.payload.id
    //         ? { ...post, likes: post.likes + 1 }
    //         : post
    //     ),
    //   };
    // case actions.post.POST_COMMENTED:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) =>
    //       post.id === action.payload.postId
    //         ? { ...post, comments: [...post.comments, action.payload.comment] }
    //         : post
    //     ),
    //   };
    default:
      return state;
  }
};

export { initialState, PostReducer };
