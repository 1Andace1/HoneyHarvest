import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/thunkActions";
import styles from "./Navbar.module.css";

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to="/">Главная</Link>
      </div>
      <div className={styles.right}>
        <Link to="/catalog"> Каталог</Link>
        <Link to="/basket"> Корзина</Link>
        {user?.id !== 0  ? (
          <>
            {/* <Link to="/profile">{user.username + ' профиль'}  Профиль2 </Link> */}
            <Link to="/profile"> Профиль </Link>
            <Link to="/signin" onClick={logoutHandler}>Выйти</Link>
          </>
        ) : (
          <>
            <Link to="/signin">Войти</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
