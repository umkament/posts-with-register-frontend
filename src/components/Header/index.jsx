import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isAuthSelector, logout} from "../../redux/slices/auth.slice";

export const Header = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  const onClickLogout = () => {
    if(window.confirm('Are you shure you want to log out?'))
    dispatch(logout())
    window.localStorage.removeItem('token')
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>UMKAMENT</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="outlined" color='success'>Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} color="success">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button  color='success'>Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outlined" color='success'>Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
