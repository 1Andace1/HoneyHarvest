import { AsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { IInputsProduct, IInputsProductStringWithoutPicture, IProduct } from "../../types/stateTypes";
import { AxiosResponse } from "axios";

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  // state: ProductState;
  state: IProduct[];
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta: {
    requestId: string
    requestStatus: "pending"
  }
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta: {
    requestId: string
    requestStatus: "fulfilled"
  }
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta: {
    requestId: string
    rejectedWithValue: false
    requestStatus: "rejected"
    aborted: false
    condition: false
  }
};

// export type GetProducts = AsyncThunk<ProductState, void, AsyncThunkConfig>;
export type GetProducts = AsyncThunk<IProduct[], void, AsyncThunkConfig>;

export type NewProduct = AsyncThunk<
  AxiosResponse<number, number>,
  IInputsProduct,
  AsyncThunkConfig
>;

export type DelProduct = AsyncThunk<number | void, number, AsyncThunkConfig>;

export type UpdateProduct = AsyncThunk<
  AxiosResponse<number, number>,
  IInputsProductStringWithoutPicture,
  AsyncThunkConfig
>;
