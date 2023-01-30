import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  msg: string;
  token: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: true,
  msg: "authorized",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    editItem(state: IAuthState, action: PayloadAction<string>) {
      // state.isAuthenticated.push(action.payload);
    },
  },
});

export const { editItem } = todoSlice.actions;
export default todoSlice.reducer;
