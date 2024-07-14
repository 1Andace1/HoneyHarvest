export interface IInputs {
    username?: string,
    email: string,
    password: string,
    profilePhoto?: File | null; // добавила: поле profilePhoto
    userCity?: string; // добавила: Добавлено поле userCity
    telephone?: string; // добавила: Добавлено поле telephone
  }

export interface IUser {
    isAdmin: boolean;
    profilePhoto: string | undefined; 
    id: number,
    username: string,
    email: string,
    password: string,
    // profilePhoto?: File | null; // добавила: поле profilePhoto
    userCity?: string; // добавила: Добавлено поле userCity
    telephone?: string; // добавила: Добавлено поле telephone
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
}

export interface IInputsProductsString {
  title: string,
  priceString: string,
  discountRatioString: string,
  category: string,
  sort: string,
  description: string,
  yearOfHarvestString: string,
  availableQuantityString: string,
  picture: string,
  location: string,
}

export interface IProducts extends IInputsProducts {
  id: number,
  starsRating: number,
  createdAt: string,
  updatedAt: string,
}
export interface IProductsSlice {
  data: IProducts,
}

