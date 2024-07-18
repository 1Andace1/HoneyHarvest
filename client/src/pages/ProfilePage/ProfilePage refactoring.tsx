import { useAppSelector } from '../../redux/hooks'; // ^ new добавила useAppDispatch
import { useState, ChangeEvent } from 'react';
import { Container, Box, Grid, useDisclosure, Flex } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
// import dayjs from 'dayjs'; //  для отрисовки красиво даты
import 'dayjs/locale/ru'; // для отрисовки красиво даты Импорт русской локали для dayjs
import { useDispatch } from 'react-redux'; // Импортируйте useDispatch, если используете Redux
import { updateUser } from '../../redux/slices/authSlice'; // импорт action для обновления пользователя
import EditProfileModal from './profile_components/EditProfileModal';
import WeatherForecast from '../../components/WeatherForecast NEW/WeatherForecast';
import MyCalendar from '../../components/CalendarCard/CalendarCard';
import Achievements from './profile_components/Achievements';
// import localizedFormat from 'dayjs/plugin/localizedFormat'; //   для отрисовки красиво даты
import UserProfilePage from './profile_components/UserProfilePage';
import OrdersPageComponent from './profile_components/OrdersPageComponent'; // новое имя компонента, чтобы избежать конфликта с переменной
// dayjs.extend(localizedFormat); //  для отрисовки красиво даты
// dayjs.locale('ru'); //  для отрисовки красиво даты
import styles from './ProfilePage.module.css';

// const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;
// const { VITE_API }: ImportMeta['env'] = import.meta.env;

interface FormData {
  username: string;
  email: string;
  telephone: string;
  userCity: string;
  password: string;
  profilePhoto: File | null;
}

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   telephone: string;
//   userCity: string;
// }

function ProfilePag_refactoring(): JSX.Element {

  const { user } = useAppSelector((state) => state.authSlice );
   const dispatch = useDispatch();


   console.log('user====',user)
  const [formData, setFormData] = useState<FormData>({
    // состояние для режима редактирования профиля
    username: user?.username || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    userCity: user?.userCity || '',
    password: '',
    profilePhoto: null,
  });
  // const [isEditing, setIsEditing] = useState(false); // состояние для режима редактирования профиля
  // const [ordersData, setOrdersData] = useState([]); // new = изменено имя переменной на ordersData, чтобы избежать конфликта//  состояния для истории заказов

  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure для управления состоянием модального окна чакры для редактирования

  // useEffect(() => {
  //   fetchUserTotalSpent();
  //   fetchOrders();
  // }, []);

  // ~ fetchUserTotalSpent = Загрузка общей суммы, потраченной пользователем:
  // const fetchUserTotalSpent = async () => {
  //   if (!user) return;
  //   try {
  //     const response = await axiosInstance.get(
  //       `${VITE_API}/profile/purchase-history/${user.id}`
  //     );
  //     const { baskets } = response.data;
  //     setOrdersData(baskets); // сохраняем корзины пользователя для отображения истории покупок
  //   } catch (error) {
  //     console.error(
  //       'Ошибка при получении суммы потраченной пользователем:',
  //       error
  //     );
  //   }
  // };

  // ~  useEffect fetchOrders = Загрузка истории заказов пользователя
  // const fetchOrders = async () => {
  //   try {
  //     // получаем заказы пользователя с сервера
  //     const response = await axiosInstance.get(
  //       `${import.meta.env.VITE_API}/profile/orders/${user.id}`
  //     );
  //     setOrdersData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (user?.id) {
  //     fetchUserTotalSpent();
  //     fetchOrders();
  //   }
  // }, [user?.id]);

  // ~ useEffect isEditing = Инициализация формы редактирования == обновление  данные юзера после изменений
  // useEffect(() => {
  //   if (!isEditing) {
  //     setFormData({
  //       username: user?.username || '',
  //       email: user?.email || '',
  //       telephone: user?.telephone || '',
  //       userCity: user?.userCity || '',
  //       password: '',
  //       profilePhoto: null,
  //     });
  //   }
  //   if (user?.id) {
  //     fetchUserTotalSpent();
  //     fetchOrders();
  //   }
  // }, [isEditing, user]);

  // ~ обработчик изменения полей формы  профиля
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.target.name === 'profilePhoto' && target.files) {
      // eсли меняется фото профиля, сохраняем файл в состояние
      setFormData({ ...formData, profilePhoto: target.files[0] || null });
    } else {
      // иначе обновление соответствующего поле состояния
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // ~ обработчик отправки формы редактирования профиля
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // объект FormData для отправки данных формы на сервер
      const formDataObj = new FormData();
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
      formDataObj.append('telephone', formData.telephone);
      formDataObj.append('userCity', formData.userCity);
      if (formData.password) {
        formDataObj.append('password', formData.password);
      }
      if (formData.profilePhoto) {
        formDataObj.append('profilePhoto', formData.profilePhoto);
      }
      // отправка PUT запрос на сервер для обновления профиля
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/profile/users/${user.id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Обновляем состояние пользователя на клиенте (тк Сервер вмдит изменения, а клиент нет)
      const updatedUser = res.data.user;
      dispatch(updateUser(updatedUser)); // Замените на ваш метод обновления пользователя в redux или в другом state management
  // @ts-ignore
      setIsEditing(false);
      onClose();
    } catch (error) {
      // устанаввка ошибок в состоянии при неудаче
      console.log(error);
    }
  };

  return (
    <Container maxW="5300px" bg="#F0FFF4" className={styles.boxСontainer2}>
      <Flex
        maxW="5300px"
        direction="row"
        align="center"
        bg="#F0FFF4"
        className={styles.boxСontainer2}
      >
        <Flex
          maxW="5300px"
          flexWrap="wrap"
          bg="#F0FFF4"
          className={styles.boxСontainer2}
        >
          {/* Левая колонка */}
          <Box
            p={3}
            borderWidth={1}
            borderRadius="md"
            w="30%"
            bg="#F0FFF4"
            className={styles.boxСontainer2}
          >
            {/* {user && <UserProfilePage user={{ user, id: user.id.toString() }} onEdit={onOpen} />} */}
         {/* @ts-ignore */}
           <UserProfilePage user={user} onEdit={onOpen} />

          </Box>
          <Box
            p={3}
            borderWidth={1}
            borderRadius="md"
            w="30%"
            bg="#F0FFF4"
            className={styles.boxСontainer2}
          >
                     {/* @ts-ignore */}
            <Achievements userId={user.id} />
          </Box>
          <Box
            p={3}
            borderWidth={1}
            borderRadius="md"
            w="40%"
            bg="#F0FFF4"
            className={styles.boxСontainer2}
          >
            <MyCalendar />
          </Box>
          <Grid
            className={styles.boxСontainer2}
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            w="100%"
          >
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="#F0FFF4"
              className={styles.boxСontainer2}
            >
              <WeatherForecast />
            </Box>
          </Grid>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" w="100%">
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="#F0FFF4"
              className={styles.boxСontainer2}
            >
              
              <OrdersPageComponent
  user={user}
  // @ts-ignore
  userId={user.id}
  // orders={ordersData}
/>
            </Box>
          </Grid>
          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            w="100%"
          ></Grid>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(auto-fit, minmax(1000px, 1fr))" w="50%">
        {/* <Box
          p={4}
          borderWidth={1}
          borderRadius="md"
          bg="#F0FFF4"
          justifyContent="center"
          height="100vh"
        >
          <OrdersPageComponent
            user={user}
            userId={user.id}
            orders={ordersData}
          />
        </Box> */}
      </Grid>

      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
          // @ts-ignore
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default ProfilePag_refactoring;
