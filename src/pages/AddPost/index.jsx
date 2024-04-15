import React, {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../redux/slices/auth.slice";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {instance} from "../../axios";

export const AddPost = () => {

  const isAuth = useSelector(isAuthSelector)
  const [text, setText] = React.useState('');
  const [title, setTitile] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setLoading] = useState(false)
  const inputFileRef = useRef(null)
  const navigate = useNavigate()
  const {id} = useParams()
  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    console.log(event.target.files)
    try {
      const formData = new FormData()
      const file= event.target.files[0]
      formData.append('image', file)
      const {data} = await instance.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('ошибка при загрузке файла')
    }
  };


  //новый вариант, на данный момент не работающий
  // const handleChangeFile = async (event) => {
  //   try {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //
  //     reader.onloadend = function() {
  //       const imageData = reader.result; // Получаем base64 строку изображения
  //       console.log(imageData); // Убедитесь, что данные изображения выводятся корректно в консоль
  //       // Здесь отправляем imageData на бэкенд
  //     };
  //
  //     reader.readAsDataURL(file);
  //   } catch (err) {
  //     console.warn(err);
  //     alert('Ошибка при загрузке файла');
  //   }
  // };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async ()=>{
    try {
      setLoading(true)
      const fields = {
        title,
        tags: tags.split(','),
        text,
        imageUrl
      }
      const {data} = isEditing
         ? await instance.patch(`/posts/${id}`, fields)
         : await instance.post('/posts', fields)

      const _id = isEditing ? id : data._id

      navigate(`/posts/${_id}`)
    } catch (err) {
      console.warn(err)
      alert('ошибка при создании статьи')

    }
  }

  useEffect(() => {
    if (id) {
      instance.get(`/posts/${id}`)
         .then(({data})=>{
        setTitile(data.title)
        setText(data.text)
        setTags(data.tags.join(','))
        setImageUrl(data.imageUrl)
      })
         .catch((err)=>{
        console.warn(err)
           alert('ошибка при получении данных статьи')
      })
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/login'/>
  }
  console.log(imageUrl)
  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined"
              size="large"
              onClick={()=>inputFileRef.current.click()}
      >
        Загрузить превью
      </Button>
      <input type="file"
             onChange={handleChangeFile}
             hidden
             ref={inputFileRef}
      />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_BLOG_API}/${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e=> setTitile(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }}
                 variant="standard"
                 placeholder="Тэги"
                 value={tags}
                 onChange={e=> setTags(e.target.value )}
                 fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
