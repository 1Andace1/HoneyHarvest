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
    // profilePhoto?: File | null; // добавила: поле profilePhoto
    userCity?: string; // добавила: Добавлено поле userCity
    telephone?: string; // добавила: Добавлено поле telephone
    createdAt: string,
    updatedAt: string
}

export interface IType {
    type: string;
    inputs: {
      email: string;
      password: string;
      [key: string]: any;
    };
  }

export interface Message {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface IInputsProduct {
  title: string,
  price: number,
  discountRatio: number,
  category: string,
  sort: string,
  description: string,
  yearOfHarvest: number,
  availableQuantity: number,
  picture: File | null,
  location: string,
}

export interface IInputsProductString {
  id: number,
  title: string,
  priceString: string,
  discountRatioString: string,
  category: string,
  sort: string,
  description: string,
  yearOfHarvestString: string,
  availableQuantityString: string,
  picture: File | null,
  location: string,
}

export type IInputsProductStringWithoutPicture = Omit<IInputsProductString, 'picture'>
 
export interface IProduct {
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
  id: number,
  starsRating: number,
  createdAt: string,
  updatedAt: string,
}

export interface IProductsSlice {
  data: IProduct,
}

export interface IInputsComment {
  text: string,
  productId: number,
  userId: number,
}

export interface IComment extends IInputsComment {
  id: number,
  userId: number,
  isVerified: boolean,
  likesQuantity: number,
  createdAt: string,
  updatedAt: string,
  User: { userId: number, username: string},
}

export interface ICommentSlice {
  data: IComment,
}
