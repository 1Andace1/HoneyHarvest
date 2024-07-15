export interface IInputs {
    username?: string,
    email: string,
    password: string,
    profilePhoto?: File | null; // добавила: поле profilePhoto
    userCity?: string; // добавила: Добавлено поле userCity
    telephone?: string; // добавила: Добавлено поле telephone
    location:string;
  }

export interface IUser {
    profilePhoto: string | undefined;
    id: number,
    username: string,
    email: string,
    isAdmin: boolean,
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
export interface Message {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}


export interface IInputsProducts {
  title: string,
  price: number,
  discountRatio: number,
  category: string,
  sort: string,
  description: string,
  yearOfHarvest: number,
  availableQuantity: number,
  picture: string,
  location: string,
  starsRating: number,
}

export interface IProducts extends IInputsProducts {
  id: string,
  createdAt: string,
  updatedAt: string,
}


