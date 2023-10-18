import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slices/post.slice";
import {authReducer} from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer
  }
})