import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchRegistration, isAuthSelector} from "../../redux/slices/auth.slice";
import {useForm} from "react-hook-form";

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: 'Пупкин Пуп',
      email: 'test1234@mail.ru',
      password: '1234'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values)=>{
    const data = await dispatch(fetchRegistration(values))
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField className={styles.field}
                 label="Полное имя"
                 fullWidth
                 error={Boolean(errors.fullName?.message)}
                 helperText={errors.fullName?.message}
                 {...register('fullName', {required: 'Укажите полное имя'})}
      />
      <TextField className={styles.field}
                 label="E-Mail"
                 fullWidth
                 error={Boolean(errors.email?.message)}
                 helperText={errors.email?.message}
                 {...register('email', {required: 'Укажите email'})}
      />
      <TextField className={styles.field}
                 label="Пароль"
                 fullWidth
                 error={Boolean(errors.password?.message)}
                 helperText={errors.password?.message}
                 {...register('password', {required: 'Укажите пароль'})}
      />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
