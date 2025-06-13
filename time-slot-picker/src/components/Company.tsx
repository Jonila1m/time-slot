import { useSelector } from "react-redux"
import { Company as CompanyType } from "../Types"
import TimeSlot from "./TimeSlot"
import { RootState } from "../store"
import { getFormattedDate } from "../util/date"

type CompanyProps = {
    company: CompanyType
}

const Company = ({ company }: CompanyProps) => {
    const selectedSlot = useSelector((state: RootState) => state.reservation.selectedSlots.find(slot => slot.companyId === company.id))

    return (
        <div key={company.id} style={{ marginBottom: '2rem' }}>
            <h2>{company.name}</h2>

            {selectedSlot && (
                <h5>
                    {getFormattedDate(selectedSlot.slot.start_time)} - {getFormattedDate(selectedSlot.slot.end_time)}
                </h5>
            )}

            {company.time_slots.map((slot) => <TimeSlot key={`${slot.start_time}-${slot.end_time}-${company.id}`} slot={slot} companyId={company.id} />)}
        </div>
    )

}

export default Company