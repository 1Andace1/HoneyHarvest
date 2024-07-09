import { useEffect, useState } from 'react';
import styles from './AuthForm.module.css';
import { Input, Button, useDisclosure } from '@chakra-ui/react';
import { AuthFormProps } from '../../types/propsTypes';
import { IInputs } from '../../types/stateTypes';
import { InputsState } from '../initState';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/thunkActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ErrorModal from '../ErrorModal';

const { VITE_API } = import.meta.env;

export default function AuthForm({
  title,
  type = 'signin',
}: AuthFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<IInputs>(InputsState);
  const { user } = useAppSelector((state) => state.authSlice);
  const [error, setError] = useState<string>('');
  // const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null); // либо null, либо объектом типа File (втсроен в JS) = берем из <input type="file">.
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
     // добавлено: обработка изменения фото профиля
    if (e.target.name === "profilePhoto" && e.target.files) {
      setProfilePhoto(e.target.files[0]);
    } else {
    setInputs(
      (prev: IInputs): IInputs => ({ ...prev, [e.target.name]: e.target.value })
    );
  }
};

  const showErrorModal = (errorText: string): void => {
    setError(errorText);
    onOpen();
  };

  const closeErrorModal = (): void => {
    setError('');
    onClose();
  };

  const submitHandler = async (
    type: string,
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
       
      // добавлено: создание formData и добавление фото профиля
      const  dataToSend = { ...inputs, profilePhoto };
      console.log(" dataToSend",  dataToSend);


try {
 // добавлено: вызов Thunk-действия addUser с использованием dispatch
 // dispatch(addUser({ type, inputs: dataToSend })) = вызов thunk-действия addUser с параметрами type и inputs = ответ промисс
 // unwrap() - это метод из Redux Toolkit = получает промисс или выбрасывает ошибку, если промисс отклонен
 await dispatch(addUser({ type, inputs: dataToSend })).unwrap(); 
 navigate("/");
  }
  // useEffect(() => {
  //   user?.id !== 0 ? navigate('/') : null;
  // }, [user]);
 catch (error) {
  showErrorModal("Авторизация не завершена. Пожалуйста, проверьте свои учетные данные");
  console.error(error);
}
}
useEffect(() => {
  if (user?.id !== 0) navigate('/');
}, [user]);

  return (
    <>
      <form onSubmit={(e) => submitHandler(type, e)} className={styles.wrapper}>
        <h3 className={styles.head}>{title}</h3>
        <div className={styles.inputs}>
          {type === 'signin' && (
            <>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email || ''}
                placeholder="Эл.почта"
                required
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password || ''}
                placeholder="Пароль"
                required
              />
            </>
          )}
          {type === 'signup' && (
            <>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="username"
                value={inputs?.username || ''}
                placeholder="Имя пользователя"
                required
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email || ''}
                placeholder="Эл.почта"
                required
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password || ''}
                placeholder="Пароль"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="userCity"
                name="userCity"
                value={inputs?.userCity || ''}
                placeholder="Город"
              />
                          <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="file"
              name="profilePhoto"
              accept="image/*"
            />
                 <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="telephone"
                name="telephone"
                value={inputs?.telephone || ''}
                placeholder="Номер телефона"
              />
            </>
          )}
        </div>
        <div className={styles.btns}>
          {type === 'signin' && (
            <Button type="submit" colorScheme="blue">
              Вход
            </Button>
          )}
          {type === 'signup' && (
            <Button type="submit" colorScheme="blue">
              Регистрация
            </Button>
          )}
        </div>
      </form>
      <div style={{ maxWidth: '500px' }}>
        <ErrorModal isOpen={isOpen} onClose={closeErrorModal} error={error} />
        </div>
    </>
  );
}