export interface IProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface IBasketProduct extends IProduct {
    productId: number;
    userId: number;
    quantity: number;
    currentPrice: number;
    currentDiscountRatio: number;
    commentUser: string;
    totalBasketPrice: number;
    deliveryAddress: string;
    estimatedDate: string; 
  }
  
  export interface IUser {
    id: number;
  }