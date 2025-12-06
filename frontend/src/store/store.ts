import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";
import { userApi } from "./api/user-api";
import { patientApi } from "./api/patient-api";
import { doctorApi } from "./api/doctor-api";
import { appointmentApi } from "./api/appointment-api";
import { adminApi } from "./api/admin-api";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      patientApi.middleware,
      doctorApi.middleware,
      appointmentApi.middleware,
      adminApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
