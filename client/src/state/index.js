import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  viewPostUser: null,
  userChatList: [],
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      console.log("dispatch");
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },

    setViewPostUser: (state, action) => {
      state.viewPostUser = action.payload.viewPostUser;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.currentUser;
    },
    setUserChatList: (state, action) => {
      state.userChatList = action.payload.userChatList;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setViewPostUser,
  setCurrentUser,
  setUserChatList,
} = authSlice.actions;

export default authSlice.reducer;
