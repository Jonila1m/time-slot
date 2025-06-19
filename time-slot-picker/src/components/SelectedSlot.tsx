import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useDateFormatting } from "../hooks/useDateFormatting"

type TProps = {
    companyId: number
};

const SelectedSlot = ({ companyId }: TProps) => {
    const selectedSlot = useSelector((state: RootState) =>
        state.reservation.selectedSlots.find((slot) => slot.companyId === companyId)
    );

    const { formatTime } = useDateFormatting();

    if (!selectedSlot) return null

    return (
        <h5 style={{ margin: 0, fontWeight: "normal" }}>
            {`Selected Slot ${formatTime(selectedSlot.slot.start_time)} - ${formatTime(selectedSlot.slot.end_time)}`}
        </h5>
    )
    //
}

export default SelectedSlot
