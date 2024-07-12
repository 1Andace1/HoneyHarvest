import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // ? это я 
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ChakraProvider, theme } from "@chakra-ui/react";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
        <div
    style={{width: '100%', height: '50px', backgroundColor: 'black'}}
    >
      ПРИВЕТ!
    </div>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
 