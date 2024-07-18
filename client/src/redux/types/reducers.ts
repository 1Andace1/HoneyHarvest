import {
  PayloadAction,
  SerializedError,
  Slice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";
import { AuthState, CommentState, ProductState } from "./states";
import { IComment, IInputsComment, IInputsProduct, IProduct, IUser } from "../../types/stateTypes";

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
  IProduct[],
  string,
  {
    arg: void | IInputsProduct;
    requestId: string;
    requestStatus: "fulfilled";
  },
  never
>;

export type RejectedActionProduct = PayloadAction<
  unknown, string, never, SerializedError
>;

export type ProductSlice = Slice<
  ProductState,
  SliceCaseReducers<ProductState>,
  string,
  string,
  SliceSelectors<ProductState>
>;








export type CommentAction = PayloadAction<
IComment[],
  string,
  {
    arg: void | IInputsComment;
    requestId: string;
    requestStatus: "fulfilled";
  },
  never
>;

export type RejectedActionComment = PayloadAction<
  unknown,
  string,
  {
    arg: void | IInputsComment | number;
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
  },
  SerializedError
>;

export type CommentSlice = Slice<
  CommentState,
  SliceCaseReducers<CommentState>,
  string,
  string,
  SliceSelectors<CommentState>
>;
