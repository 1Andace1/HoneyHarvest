import {
  PayloadAction,
  SerializedError,
  Slice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";
import { AuthState, ProductState } from "./states";
import { IInputsProducts, IProducts, IUser } from "../../types/stateTypes";

export type UserAction = PayloadAction<
  IUser,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: "fulfilled";
  },
  never
>;

export type RejectedAction = PayloadAction<
  unknown,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | ({
        rejectedWithValue: false;
      } & object)
  ),
  SerializedError
>;

export type AuthSlice = Slice<
  AuthState,
  SliceCaseReducers<AuthState>,
  string,
  string,
  SliceSelectors<AuthState>
>;

export type ProductAction = PayloadAction<
  IProducts[],
  string,
  {
    arg: void | IInputsProducts;
    requestId: string;
    requestStatus: "fulfilled";
  },
  never
>;

export type RejectedActionProduct = PayloadAction<
  unknown,
  string,
  {
    arg: void | IInputsProducts | number;
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
  },
  SerializedError
>;

export type ProductSlice = Slice<
  ProductState,
  SliceCaseReducers<ProductState>,
  string,
  string,
  SliceSelectors<ProductState>
>;
