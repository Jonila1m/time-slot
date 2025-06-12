import { useSelector } from "react-redux"
import { Company as CompanyType } from "../Types"
import TimeSlot from "./TimeSlot"
import { RootState } from "../store"
import dayjs from "dayjs"

type CompanyProps = {
    company: CompanyType
}

const Company = ({ company }: CompanyProps) => {
    const selectedSlot = useSelector((state: RootState) => state.reservation.selectedSlots.find(slot => slot.companyId === company.id))

    return (
        <div key={company.id} style={{ marginBottom: '2rem' }}>
            <h2>{company.name}</h2>

            <h5>{dayjs(selectedSlot?.slot.start_time).format("DD-MM-YYYY hh:mm")} - {dayjs(selectedSlot?.slot.end_time).format("DD-MM-YYYY hh:mm")}</h5>

            {company.time_slots.map((slot) => <TimeSlot key={`${slot.start_time}-${slot.end_time}-${company.id}`} slot={slot} companyId={company.id} />)}
        </div>
    )

}

export default Company