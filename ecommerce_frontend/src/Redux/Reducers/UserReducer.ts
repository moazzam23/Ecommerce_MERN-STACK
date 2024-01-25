import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USERInitialState } from "../../Types/userreducer-Type";
import { USER } from "../../Types/Types";

const initialState: USERInitialState = {
  user: null,
  loading: true,
};

export const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    UserExist: (state, action: PayloadAction<USER>) => {
      state.loading = false;
      state.user = action.payload;
    },
    UserNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { UserExist, UserNotExist } = UserReducer.actions;
