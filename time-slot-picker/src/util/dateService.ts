import dayjs from "dayjs";
import utc from "dayjs/plugin/timezone";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { TimeSlot } from "../Types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export const getFormattedDate = (date: string, format: string = "LLL") =>
  dayjs(date).format(format);

export const checkIfTimeSlotsOverlap = (
  slot1: TimeSlot,
  slot2: TimeSlot
): boolean => {
  const slot1Start = dayjs(slot1.start_time);
  const slot1End = dayjs(slot1.end_time);
  const slot2Start = dayjs(slot2.start_time);
  const slot2End = dayjs(slot2.end_time);

  return slot1Start.isBefore(slot2End) && slot1End.isAfter(slot2Start);
};
