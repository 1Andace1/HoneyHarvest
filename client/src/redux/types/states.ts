import { IComment, IProducts, IUser } from "../../types/stateTypes"

export type AuthState = {
    user: IUser,
    loading: boolean,
    error: object
}

export type ProductState = {
    products: IProducts[],
    loading: boolean,
    error: object
}
export type CommentState = {
    comments: IComment[],
    loading: boolean,
    error: object
}

