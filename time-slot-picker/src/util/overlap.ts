import dayjs from "dayjs";
import { TimeSlot } from "../Types";

export const doTimeSlotsOverlap = (slot1: TimeSlot, slot2: TimeSlot) => {
  const slot1Start = dayjs(slot1.start_time);
  const slot1End = dayjs(slot1.end_time);
  const slot2Start = dayjs(slot2.start_time);
  const slot2End = dayjs(slot2.end_time);

  return slot1Start.isBefore(slot2End) && slot1End.isAfter(slot2Start);
};
