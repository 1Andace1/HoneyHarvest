import { IInputs, IUser } from "../types/stateTypes";

export const InputsState: IInputs = {
  username: "",
  email:  "",
  password:  "",
  profilePhoto:  null, // добавила: поле profilePhoto
  userCity:  "", // добавила: Добавлено поле userCity
  telephone:  "", // добавила: Добавлено поле telephone
  location: ""
  }

export const UserState: IUser = {
  profilePhoto: '',
  id:0,
  username:'',
  email: '',
  isAdmin: false,
  password: '',
  createdAt: '',
  updatedAt: ''

}