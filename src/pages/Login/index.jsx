import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchAuth, isAuthSelector} from "../../redux/slices/auth.slice";
import {Navigate} from "react-router-dom";

export const Login = () => {
 


  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
     mode: 'onChange'
  })

  const onSubmit = async (values)=>{
    setIsLoading(true); // Устанавливаем isLoading в true перед отправкой запроса
    try {
      const data = await dispatch(fetchAuth(values));
      if (!data.payload) {
        alert("Не удалось авторизоваться!");
      } else if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Произошла ошибка при отправке запроса!");
    } finally {
      setIsLoading(false); // Возвращаем isLoading в false после получения ответа
    }
  }

  if (isAuth) {
    return <Navigate to='/'/>
  }
  console.log('isLoading:', isLoading);
  return (
    <Paper classes={{ root: styles.root }} elevation={4}>
      {isLoading && <CircularProgress color="success"/>}
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
           className={styles.field}
           label="E-Mail"
           error={Boolean(errors.email?.message)}
           helperText={errors.email?.message}
           fullWidth
           {...register('email', {required: 'Укажите почту'})}
           type='email'
        />
        <TextField className={styles.field}
                   label="Пароль"
                   fullWidth
                   error={Boolean(errors.email?.message)}
                   helperText={errors.password?.message}
                   {...register('password', {required: 'Укажите пароль'})}
        />
        <Button size="large"
                variant="contained"
                color='success'
                fullWidth
                type="submit"
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
