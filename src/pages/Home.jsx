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
        <Tab label="Статьи" />
        <Tab label="Пользователи" />
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
                  fullName: 'Frodo Baggins',
                  avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgc0hxD8EL2CUsCXcNqFaCO0yjHyg8tKuTdQ&s',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Умка Медвежатова',
                  avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrPCn6DOJbSWRnQb4Ub9_kkE2_w7dRZxsDA&s',
                },
                text: 'Данное приложение имитирует создание блога, ты можешь читать статьи, зарегистрированных пользователей, либо пройти регистрацию и стать автором.\n' +
                   'В правом верхнем углу, нажми кнопку “войти”, если ты уже зарегистрирован, либо перейди во вкладку “регистрации” и пройди ее, после чего у тебя появится возможность написать свою первую статью.',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
