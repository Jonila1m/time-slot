import { useDispatch, useSelector } from "react-redux"
import { TimeSlot as TimeSlotType } from "../Types"
import { RootState } from "../store"
import dayjs from "dayjs"
import { setReservation, removeReservation } from "../store/reservationSlice"
import { getFormattedDate } from "../util/date"

type TimeSlotProps = {
    slot: TimeSlotType
    companyId: number
    selectedSlot?: TimeSlotType
}

const TimeSlot = ({ slot, companyId }: TimeSlotProps) => {
    const selectedSlots = useSelector((state: RootState) => state.reservation.selectedSlots)
    const dispatch = useDispatch()

    const isSelected = selectedSlots.some(
        (selectedSlot) =>
            selectedSlot.companyId === companyId &&
            selectedSlot.slot.start_time === slot.start_time &&
            selectedSlot.slot.end_time === slot.end_time
    );

    const isOverlapping = selectedSlots.some((selectedSlot) => {
        if (selectedSlot.companyId !== companyId) {
            const selectedStart = dayjs(selectedSlot.slot.start_time)
            const selectedEnd = dayjs(selectedSlot.slot.end_time)
            const slotStart = dayjs(slot.start_time)
            const slotEnd = dayjs(slot.end_time)

            return selectedStart.isBefore(slotEnd) && selectedEnd.isAfter(slotStart)
        }
        return false
    })

    return (() => {
        let backgroundColor
        let cursor
        let opacity

        if (isSelected) {
            backgroundColor = 'lightblue'
        } else if (isOverlapping) {
            backgroundColor = 'lightgray'
        } else {
            backgroundColor = 'lightgreen'
        }

        if (isOverlapping) {
            cursor = 'not-allowed'
            opacity = 0.5
        } else {
            cursor = 'pointer'
            opacity = 1
        }

        const handleClick = () => {
            if (isOverlapping) return

            if (isSelected) {
                dispatch(removeReservation(companyId))
            } else {
                dispatch(setReservation({ companyId, slot }))
            }
        };

        return (
            <div
                onClick={handleClick}
                style={{
                    margin: '4px 0',
                    padding: '8px',
                    backgroundColor,
                    border: '1px solid black',
                    borderRadius: '4px',
                    cursor,
                    opacity
                }}
            >
                {getFormattedDate(slot.start_time)} - {getFormattedDate(slot.end_time)}
            </div>
        );
    })();
};

export default TimeSlot
