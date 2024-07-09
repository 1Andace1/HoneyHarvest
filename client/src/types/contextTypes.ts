// import { IBook, IInputs, IUser } from "./stateTypes";
import { IInputs, IUser } from "./stateTypes";

export interface IContext {
  inputs: IInputs,
  setInputs: React.Dispatch<React.SetStateAction<IInputs>>,
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  error: string, 
  setError: React.Dispatch<React.SetStateAction<string>>,
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  // submitHandler: (type: string, event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  submitHandler: (type: "signin" | "signup", event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // logoutHandler: (() => void)
  logoutHandler: () => void; // объявление типа для logoutHandler
}

// export interface IBookContext {
//     books: IBook[],
//     setBooks: React.Dispatch<React.SetStateAction<IBook[]>>,
// }    

// export interface IOneBookContext {
//   book: IBook,
// }    
