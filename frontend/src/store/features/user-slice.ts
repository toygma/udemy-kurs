import { createSlice } from "@reduxjs/toolkit";
import type { IDoctor } from "../types/doctor.types";
import type { IPatient } from "../types/patient.types";

interface AuthState {
  user: IDoctor | IPatient | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setLoading } = userSlice.actions;