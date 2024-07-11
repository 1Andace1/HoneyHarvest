// import NavBar from './components/ui/NavBar'
import { Outlet } from "react-router-dom";
import Navbar from "./widgets/Navbar/Navbar";
import ChatPage from './pages/ChatPage'

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <ChatPage/>
    </>
  );
}
