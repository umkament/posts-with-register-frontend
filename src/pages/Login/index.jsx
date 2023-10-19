import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchAuth, isAuthSelector} from "../../redux/slices/auth.slice";
import {Navigate} from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    setError
  } = useForm({
    defaultValues: {
      email: '1newmail@mail.ru',
      password: '1234'
    },
     mode: 'onChange'
  })

  const onSubmit = async (values)=>{
    const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      return alert('Не удалось авторизоваться!')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  useEffect(() => {

  }, []);

  if (isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
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
                fullWidth
                type="submit"
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
