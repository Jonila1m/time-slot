import { useSelector } from "react-redux"
import { Company as CompanyType } from "../Types"
import TimeSlot from "./TimeSlot"
import { RootState } from "../store"
import { getFormattedDate } from "../util/date"

type CompanyProps = {
    company: CompanyType
}

const Company = ({ company }: CompanyProps) => {
    const selectedSlot = useSelector((state: RootState) =>
        state.reservation.selectedSlots.find(slot => slot.companyId === company.id))

    return (
        <div key={company.id}
            style={{
                marginBottom: '2rem',
                padding: '1rem',
                borderRadius: '8px',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',

            }}>
            <div>
                <h2>{company.name}</h2>

                <div
                    style={{
                        minHeight: '1.5rem',
                        marginBottom: '1rem',
                        padding: '0.5rem'
                    }}>
                    {selectedSlot && (
                        <h5 style={{ margin: 0, fontWeight: 'normal' }}>
                            Selected Slot:{" "}
                            {getFormattedDate(selectedSlot.slot.start_time)} - {getFormattedDate(selectedSlot.slot.end_time)}
                        </h5>
                    )}
                </div>

                <div>
                    {company.time_slots.map((slot) => (
                        <TimeSlot
                            key={`${slot.start_time}-${slot.end_time}-${company.id}`}
                            slot={slot}
                            companyId={company.id}
                            selectedSlot={selectedSlot?.slot}

                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Company