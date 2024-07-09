export interface IInputs {
    username?: string,
    email: string,
    password: string,
    profilePhoto?: File | null; // добавила: поле profilePhoto
    userCity?: string; // добавила: Добавлено поле userCity
    telephone?: string; // добавила: Добавлено поле telephone
  }

export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

// export interface IBook {
//     id: number,
//     title: string,
//     author: string,
//     pages: number,
//     createdAt: string,
//     updatedAt: string
// }

export interface IType {
    // inputs: IInputs
    type: string;
    inputs: {
      email: string;
      password: string;
      [key: string]: any;
    };
  }

// export type IBooks = IBook[]


