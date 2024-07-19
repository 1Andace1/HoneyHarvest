import {
    ActionReducerMapBuilder,
    Draft,
    PayloadAction,
    createSlice,
  } from "@reduxjs/toolkit";
  import {
    CommentSlice,
    RejectedActionComment,
  } from "../types/reducers";
  import { CommentState } from "../types/states";
  import { IComment } from "../../types/stateTypes";
import { getAllComments, delComment, AddComment, UpdComment } from "../thunkActionsComment";
  
  const initialState: CommentState = { comments: [], loading: true, error: {} };
  
  const commentSlice: CommentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<CommentState>): void => {
      // получение всех комментариев:
      builder.addCase(getAllComments.pending, (state): void => {
        state.loading = true;
      });
      builder.addCase(
        getAllComments.fulfilled,
        (state, action): void => {
          state.comments = action.payload;
          state.loading = false;
        }
      );
      builder.addCase(
        getAllComments.rejected,
        (state: Draft<CommentState>, action: RejectedActionComment): void => {
          console.log("Ошибка получения комментариев", action.error);
          state.error = action.error;
          state.loading = false;
        }
      );
      // удаление одного комментария:
      builder.addCase(delComment.pending, (state: Draft<CommentState>): void => {
        state.loading = true;
      });
      builder.addCase(
        delComment.fulfilled,
        (
          state: Draft<CommentState>,
          action: PayloadAction<number | void>
        ): void => {
          state.comments = state.comments.filter(
            (el): boolean => Number(el.id) !== action.payload
          );
          state.loading = false;
        }
      );
      builder.addCase(
        delComment.rejected,
        (state: Draft<CommentState>, action: RejectedActionComment): void => {
          console.log("Ошибка удаления одного комментария", action.error);
          state.error = action.error;
          state.loading = false;
        }
      );
      // создание записи в каталоге:
      builder.addCase(AddComment.pending, (state: Draft<CommentState>): void => {
        state.loading = true;
      });
      builder.addCase(
        AddComment.fulfilled,
        (state: Draft<CommentState>, action): void => {
          // @ts-ignore
  console.log('В слайс приходит action.payload.data', action.payload.data);
  console.log('В слайс приходит action.payload', action.payload);
  console.log('В слайс приходит action', action);
  // @ts-ignore
  const { data } = action.payload
          state.comments.push(data);
          state.loading = false;
        }
      );
      builder.addCase(
        AddComment.rejected,
        (state: Draft<CommentState>, action: RejectedActionComment): void => {
          console.log("Ошибка создания комментария", action.error);
          state.error = action.error;
          state.loading = false;
        }
      );
  
      // изменение записи в каталоге:
      builder.addCase(UpdComment.pending, (state: Draft<CommentState>): void => {
        state.loading = true;
      });
      builder.addCase(
        UpdComment.fulfilled,
        (state: Draft<CommentState>, action): void => {
          // @ts-ignore
          const modifiedСard: IComment = action.payload.data
          state.comments = state.comments.filter(
            (el: Draft<IComment>): boolean => el.id !== modifiedСard.id
          );
          state.comments.push(modifiedСard)
          state.comments.sort((a: Draft<IComment>, b: Draft<IComment>) => a.id - b.id)
          state.loading = false;
        }
      );
      builder.addCase(
        UpdComment.rejected,
        (state: Draft<CommentState>, action: RejectedActionComment): void => {
          console.log("Ошибка изменения комментария", action.error);
          state.error = action.error;
          state.loading = false;
        }
      );
        
    },
  });
  
  export default commentSlice.reducer;
  