import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedSlot } from "../Types";

type ReservationState = {
  selectedSlots: SelectedSlot[];
};

const initialState: ReservationState = {
  selectedSlots: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action: PayloadAction<SelectedSlot>) => {
      const reservationIndex = state.selectedSlots.findIndex(
        (slot) => slot.companyId === action.payload.companyId
      );

      if (reservationIndex !== -1) {
        state.selectedSlots[reservationIndex] = action.payload;
        return;
      }

      state.selectedSlots.push(action.payload);
    },
    removeReservation: (state, action: PayloadAction<number>) => {
      state.selectedSlots = state.selectedSlots.filter(
        (slot) => slot.companyId !== action.payload
      );
    },
  },
});

export const { setReservation, removeReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
