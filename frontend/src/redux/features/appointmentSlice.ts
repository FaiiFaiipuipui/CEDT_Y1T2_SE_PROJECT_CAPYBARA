import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppointmentItem } from "interface";

type AppointmentState = {
  appointmentItems: AppointmentItem[];
};

const initialState: AppointmentState = { appointmentItems: [] };

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<AppointmentItem>) => {
      state.appointmentItems.push(action.payload);
    },
    removeAppointment: (state, action: PayloadAction<AppointmentItem>) => {
      const remainItems = state.appointmentItems.filter((obj) => {
        return (
          obj.campground !== action.payload.campground ||
          obj.user !== action.payload.user ||
          obj.apptDate !== action.payload.apptDate
        );
      });
      state.appointmentItems = remainItems;
    },
  },
});

export const { addAppointment, removeAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
