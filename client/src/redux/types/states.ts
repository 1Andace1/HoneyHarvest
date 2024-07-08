import { IUser } from "../../types/stateTypes"

export type AuthState = {
    user: IUser,
    loading: boolean,
    error: object
}