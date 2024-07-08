import React from 'react';
import { useAppSelector } from "../../redux/hooks";
import styles from './profile.module.css'; 

function Profile(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Профиль пользователя</h2>
      {user ? (
        <div>
          <p>Имя: {user.username}</p>
          <p>Email: {user.email}</p>
          <div className={styles.scoreContainer}>
            <p>Счет: {user.score}</p>
          </div>
          {}
        </div>
      ) : (
        <p>Пользователь не авторизован</p>
      )}
    </div>
  );
}

export default Profile;