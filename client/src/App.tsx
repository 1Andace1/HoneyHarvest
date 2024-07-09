import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import Root from './Root';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Main from './components/Main/Main';
import ProfilePage from './pages/profile/profile';
import Page404 from './components/Page404/Page404'; // добавила: импорт компонента 404 страницы

import { useAppSelector } from './redux/hooks';
import Basket from './pages/basket/basket';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

function App() {
  const { user } = useAppSelector((state) => state.authSlice);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: user?.id !== 0 ? <Main /> : <Navigate to="/signup" />,
        },
        {
          path: '/signin',
          element: <SigninPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        {
          path: '/profile',
          element:
            user?.id !== 0 ? <ProfilePage user={user} /> : <Navigate to="/" />,
        },
        {
          path: '/basket',
          element: <Basket />,
        },
        {
          path: '/checkout',
          element: <CheckoutPage />,
        },
        {
          path: '*', // ловушка для всех остальных маршрутов
          element: <Page404 />, 
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
