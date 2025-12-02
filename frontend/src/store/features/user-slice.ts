import type { IDoctor } from "../types/doctor.types";
import type { IPatient } from "../types/patient.types";
import { createSlice } from "@reduxjs/toolkit";

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
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setIsAuthenticated, setLoading, setUser } = userSlice.actions;
