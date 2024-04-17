import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post, TagsBlock, CommentsBlock } from '../components';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../redux/slices/post.slice";

export const Home = () => {
  const dispatch = useDispatch()
  const {posts, tags} = useSelector(state => state.posts)
  const userData = useSelector(state => state.auth.data)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, []);

  console.log(posts)
  console.log(tags)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) =>
             isPostsLoading
                ? <Post key={index} isLoading={true}/>
                : <Post
              id={item._id}
              title={item.title}
              imageUrl={item.imageUrl ? item.imageUrl : ''}
              //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={item.user}
              createdAt={item.createdAt}
              viewsCount={item.viewsCount}
              commentsCount={3}
              tags={item.tags}
              isEditable={userData?._id === item.user._id}
            />
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'data:image/jpeg;base64,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',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrPCn6DOJbSWRnQb4Ub9_kkE2_w7dRZxsDA&s',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
