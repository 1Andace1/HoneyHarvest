
import { useAppSelector } from "../../redux/hooks";

function Main(): JSX.Element {
  
  const { user } = useAppSelector((state) => state.authSlice);

  return (
    <>
     <h2>Это Главная, тут карточки</h2>
    </>
  );
}

export default Main;
