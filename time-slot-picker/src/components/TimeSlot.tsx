import { useDispatch, useSelector } from "react-redux";
import { TimeSlot as TimeSlotType } from "../Types";
import { RootState } from "../store";
import dayjs from "dayjs"
import { setReservation } from "../store/reservationSlice";
import { getFormattedDate } from "../util/date";

type TimeSlotProps = {
    slot: TimeSlotType
    companyId: number
}

const TimeSlot = ({ slot, companyId }: TimeSlotProps) => {
    const selectedSlots = useSelector((state: RootState) => state.reservation.selectedSlots);
    const dispatch = useDispatch()

    const isSelected = selectedSlots.some(selectedSlot => {
        if (selectedSlot.companyId === companyId && selectedSlot.slot.start_time === slot.start_time && selectedSlot.slot.end_time === slot.end_time) {
            return true;
        }
        return false;
    })


    const isOverlapping = selectedSlots.some(selectedSlot => {
        if (selectedSlot.companyId !== companyId) {
            const selectedStart = dayjs(selectedSlot.slot.start_time);
            const selectedEnd = dayjs(selectedSlot.slot.end_time);
            const slotStart = dayjs(slot.start_time);
            const slotEnd = dayjs(slot.end_time);

            return (selectedStart.isBefore(slotEnd) && selectedEnd.isAfter(slotStart));
        }

        return false
    })

    return (
        <div
            onClick={() => !isOverlapping && dispatch(setReservation({ companyId, slot }))}
            style={{
                margin: '4px 0',
                padding: '8px',
                backgroundColor:
                    isSelected
                        ? 'lightblue'
                        : isOverlapping
                            ? 'lightgray'
                            : 'lightgreen',
                border: '1px solid black',
                borderRadius: '4px',
                cursor: isOverlapping ? 'not-allowed' : 'pointer',
                opacity: isOverlapping ? 0.5 : 1
            }}
        >
            {getFormattedDate(slot.start_time)} - {getFormattedDate(slot.end_time)}
        </div>
    )
}

export default TimeSlot