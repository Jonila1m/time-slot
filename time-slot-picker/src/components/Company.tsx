import { Company as CompanyType } from "../Types"
import TimeSlot from "./TimeSlot"
import SelectedSlot from "./SelectedSlot";

type CompanyProps = {
    company: CompanyType
}

const Company = ({ company }: CompanyProps) => {

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
                        minHeight: '2.5rem',
                        marginBottom: '1rem',
                        padding: '0.5rem'
                    }}>

                    <SelectedSlot companyId={company.id} />
                </div>

                <div>
                    {company.time_slots.map((slot) => (
                        <TimeSlot
                            key={`${slot.start_time}-${slot.end_time}-${company.id}`}
                            slot={slot}
                            companyId={company.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Company



