import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SigninPage.module.css';

export default function SigninPage(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <AuthForm title='Войти' type='signin' />
    </div>
  );
}
