import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
  const {data} = await instance.get('/posts')
  return data
   }
)

export const fetchTags = createAsyncThunk('posts/fetchTags', async ()=>{
     const {data} = await instance.get('/tags')
     return data
   }
)

export const removePost = createAsyncThunk('posts/removePost', async (id)=>
   await instance.delete(`/posts/${id}`)

)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      items: [],
      status: 'loading'
    },
    tags: {
      items: [],
      status: 'loading'
    }
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder
       // получение постов
       .addCase(fetchPosts.pending, (state)=>{
         state.posts.items = []
         state.posts.status = 'loading'
       })
       .addCase(fetchPosts.fulfilled, (state, action)=>{
         state.posts.items = action.payload
         state.posts.status = 'loaded'
       })
       .addCase(fetchPosts.rejected, (state, action)=>{
         state.posts.items = []
         state.posts.status = 'error'
       })
       // получение тегов
       .addCase(fetchTags.pending, (state)=>{
         state.tags.items = []
         state.tags.status = 'loading'
       })
       .addCase(fetchTags.fulfilled, (state, action)=>{
         state.tags.items = action.payload
         state.tags.status = 'loaded'
       })
       .addCase(fetchTags.rejected, (state, action)=>{
         state.tags.items = []
         state.tags.status = 'error'
       })
    // удаление поста
       .addCase(removePost.pending, (state, action)=>{
         state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
       })
  }
})

export const postsReducer = postsSlice.reducer