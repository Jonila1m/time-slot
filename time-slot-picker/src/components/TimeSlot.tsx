import { useDispatch, useSelector } from "react-redux"
import { TimeSlot as TimeSlotType } from "../Types"
import { RootState } from "../store"
import { setReservation, removeReservation } from "../store/reservationSlice"
import { doTimeSlotsOverlap } from "../util/overlap"
import { useDateFormatting } from "../hooks/useDateFormatting"

type TimeSlotProps = {
    slot: TimeSlotType
    companyId: number
}

const TimeSlot = ({ slot, companyId }: TimeSlotProps) => {
    const selectedSlots = useSelector((state: RootState) => state.reservation.selectedSlots)
    const dispatch = useDispatch()
    const { formatTime } = useDateFormatting()

    const isSelected = selectedSlots.some(
        (selectedSlot) =>
            selectedSlot.companyId === companyId &&
            selectedSlot.slot.start_time === slot.start_time &&
            selectedSlot.slot.end_time === slot.end_time
    );

    const isOverlapping = selectedSlots.some((selectedSlot) => {
        return (
            selectedSlot.companyId !== companyId &&
            doTimeSlotsOverlap(selectedSlot.slot, slot)
        );
    });

    const handleClick = () => {
        if (isOverlapping) return;

        if (isSelected) {
            dispatch(removeReservation(companyId));
        } else {
            dispatch(setReservation({ companyId, slot }));
        }
    };

    const getSlotStyle = () => {
        let backgroundColor = 'lightgreen';
        let cursor = 'pointer';
        let opacity = 1;

        if (isSelected) {
            backgroundColor = 'lightblue';
        }
        else if (isOverlapping) {
            backgroundColor = 'lightgray';
            cursor = 'not-allowed';
            opacity = 0.5;
        }
        return { backgroundColor, cursor, opacity };
    };

    return (
        <div
            onClick={handleClick}
            style={{
                ...getSlotStyle(),
                margin: '4px 0',
                padding: '8px',
                border: '1px solid black',
                borderRadius: '4px'
            }}
        >
            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
        </div>
    );

}

export default TimeSlot