import { AsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { IInputsProducts, IProducts } from "../../types/stateTypes";
import { AxiosResponse } from "axios";

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state: IProducts;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

//   export type NewProduct = AsyncThunk<IProducts, IInputsProducts, AsyncThunkConfig>
export type GetProducts = AsyncThunk<IProducts[], void, AsyncThunkConfig>;

export type NewProduct = AsyncThunk<
  AxiosResponse<number, number>,
  IInputsProducts,
  AsyncThunkConfig
>;

export type DelProduct = AsyncThunk<number | void, number, AsyncThunkConfig>;

export type UpdateProduct = AsyncThunk<
  AxiosResponse<number, number>,
  IInputsProducts,
  AsyncThunkConfig
>;
