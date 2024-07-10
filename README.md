# Honey


Интересно. Я попробовала закомментировать весь этот файл, и ничего не поменялось: // import { extendTheme } from '@chakra-ui/react';

// const theme = extendTheme({
//   styles: {
//     global: {
//       body: {
//         bg: '#1e1f23',
//         color: '#f8f9fb',   
//       },
//       a: {
//         color: '#f8f9fb',
//         _hover: {
//           textDecoration: 'underline',
//         },
//       },
//       h1: {
//         color: '#f8f9fb',
//       },
//       h2: {
//         color: '#f8f9fb',
//       },
   
//     },
//   },
// });

// export default theme;
. То есть этот файл не влияет на что то глобально со стилями. Давай я тебе отправлю  побольше файлов, может ты поймешь взаимосвзяь, что НЕПОНЯТНЫМ НЕПРОГНОЗИРУЕМВЫМ образом влияет на глобальные стили и страницу профиля. ВОТ КОДЫ СТРАНИЦ: import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
{
  "name": "client",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "client",
      "version": "0.0.0",
      "dependencies": {
        "@chakra-ui/react": "^2.8.2",
        "@emotion/react": "^11.11.4",
        "@emotion/styled": "^11.11.5",
        "@reduxjs/toolkit": "^2.2.6",
        "axios": "^1.7.2",
        "dotenv": "^16.4.5",
        "framer-motion": "^11.2.12",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-redux": "^9.1.2",
        "react-router-dom": "^6.24.0"
      },
      "devDependencies": {
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@typescript-eslint/eslint-plugin": "^7.13.1",
        "@typescript-eslint/parser": "^7.13.1",
        "@vitejs/plugin-react": "^4.3.1",
        "eslint": "^8.57.0",
        "eslint-plugin-react-hooks": "^4.6.2",
        "eslint-plugin-react-refresh": "^0.4.7",
        "typescript": "^5.2.2",
        "vite": "^5.3.1"
      }
    },
    "node_modules/@ampproject/remapping": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
      "integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
      "dev": true,
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.24.7.tgz",
      "integrity": "sha512-BcYH1CVJBO9tvyIZ2jVeXgSIMvGZ2FDRvDdOIVQyuklNKSsx+eppDEBq/g47Ayw+RqNFE+URvOShmf+f/qwAlA==",
      "dependencies": {
        "@babel/highlight": "^7.24.7",
        "picocolors": "^1.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.24.7.tgz",
      "integrity": "sha512-qJzAIcv03PyaWqxRgO4mSU3lihncDT296vnyuE2O8uA4w3UHWI4S3hgeZd1L8W1Bft40w9JxJ2b412iDUFFRhw==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.24.7.tgz",
      "integrity": "sha512-nykK+LEK86ahTkX/3TgauT0ikKoNCfKHEaZYTUVupJdTLzGNvrblu4u6fa7DhZONAltdf8e662t/abY8idrd/g==",
      "dev": true,
      "dependencies": {
        "@ampproject/remapping": "^2.2.0",
        "@babel/code-frame": "^7.24.7",
        "@babel/generator": "^7.24.7",
        "@babel/helper-compilation-targets": "^7.24.7",
        "@babel/helper-module-transforms": "^7.24.7",
        "@babel/helpers": "^7.24.7",
        "@babel/parser": "^7.24.7",
        "@babel/template": "^7.24.7",
        "@babel/traverse": "^7.24.7",
        "@babel/types": "^7.24.7",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
итд 
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Honey Harvest</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
/// <reference types="vite/client" />
/// <reference types="vite/client" />
// import NavBar from './components/ui/NavBar'
import { Outlet } from "react-router-dom";
import Navbar from "./widgets/Navbar/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ChakraProvider, theme } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
 ДАЛЕЕ ВОТ ФАЙЛ: :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #ffffff;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 200vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #e6e6e6;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

. Еслия  его комментиировала, то все совсем вездестановилось чернымю. import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Root from "./Root";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Main from "./components/Main/Main";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Page404 from "./components/Page404/Page404"; // добавила: импорт компонента 404 страницы
import { useAppSelector } from "./redux/hooks";
import Basket from "./pages/basket/basket";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import CatalogPage from "./pages/Catalog/CatalogPage";


function App() {
  const { user } = useAppSelector((state) => state.authSlice);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          // element: user?.id !== 0 ? <Main /> : <Navigate to="/signup" />,
          element:  <Main /> 
        },
        {
          path: "/signin",
          element: <SigninPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/profile",
          element:
            user?.id !== 0 ? <ProfilePage user={user} /> : <Navigate to="/" />,
        },
        {
          path: "/basket",
          element: <Basket />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/catalog",
          element: <CatalogPage />,
        },
        {
          path: "*", // ловушка для всех остальных маршрутов
          element: <Page404 />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
ЕСТЬ ЕЩЕ ТАКОЙ ФАЙЛ: #root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  margin-top: 70px;
  background-color: rgb(255, 255, 255)
}
background-color: white;

body {
   height: 100vh;
   
}

.card {
  padding: 2em;
 
}

.read-the-docs {
  color: #888;
 
}
 . ПРи его комментирование цвета остаются везде черные, но просто все отображение и верствка текста прилипают к левой стороне страницы.import { Link } from "react-router-dom";
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
.wrapper {
  background-image: url('pictures/black-patterned-texture-431613736816.jpg');
  position: absolute;
  top: 0px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  left: 0;
  background-color: rgb(84, 78, 78);
}

.left, .right {
  display: flex;
  justify-content: space-between;
  
  margin: 30px
}

a {
  color: rgb(255, 255, 255);
  font-size: 20px;
  margin: 10px;
}

a:hover,
a:focus {
  color: #ffffff;
} ЧТО ДУМАЕШЬ? ОТВЕТЬ НА РУССКОМ. Прямо полтергейст какой то