import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // ? это я 
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import { ChakraProvider, theme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import  theme  from "./tools/theme.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
 