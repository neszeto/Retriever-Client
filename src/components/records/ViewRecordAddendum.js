import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createAddendum } from "../../managers/AddendumManager"
import { getMedicalRecordById } from "../../managers/MedicalRecordManager"

export const ViewAddendum = () => {
    const { recordId } = useParams()
    const [currentRecord, setCurrentRecord] = useState({})
    let navigate = useNavigate()
   
  

    useEffect(
        () => {
            getRecordsWithAddendums(recordId)
        }, []
    )

    const getRecordsWithAddendums = (recordId) => {
        getMedicalRecordById(recordId).then(record => setCurrentRecord(record))
    }

    

    return <>
    <div className="back_button_container">
        <button onClick={()=>navigate(`/Patient/${currentRecord.patient}`)}><i class="fa-solid fa-arrow-left-long"></i> Patient Chart</button>
    </div>
    <section className="medical_record_edit">
        <div className="doctor">Dr. {currentRecord?.doctor?.first_name} {currentRecord?.doctor?.last_name}</div>
        <div className="complaint">Presenting Complaint: {currentRecord?.presenting_complaint}</div>
        <section className="SOAP">
            <div className="SO">
                <div className="section">
                    <div><b>Subjective:</b></div>
                    <div className="bullet_point">{currentRecord?.subjective}</div>
                </div>
                <div className="section">
                    <div><b>Objective</b></div>
                    <div className="bullet_point">{currentRecord?.objective}</div>
                </div>
            </div>
            <div className="SO">
                <div>
                    <div><b>Assessment:</b></div>
                    <div className="bullet_point">{currentRecord?.assessment}</div>
                </div>
                <div>
                    <div><b>Plan:</b></div>
                    <div className="bullet_point">{currentRecord?.plan}</div>
                </div>
            </div>

        </section>
        <section className="record_tags">
            <div className="medication-tags">
                <div><b>Medication: </b></div> 
                {
                currentRecord?.medications_on_record?.map(med=>{
                    return <div className="record_medications">{med?.medication?.name} </div>
                })
                }
            </div>
            <div><b>Diagnosis:</b> {currentRecord?.diagnosis?.diagnosis}</div>
        </section>
    </section>
    <section className="Addendums_view">
        <div>{currentRecord?.record_addendums?.map(addendum=>{
            return <section className="single_addendum">
                    <div>This addendum was created on {addendum.created_on}</div>
                    <div className="addendum-section">{addendum.addendum}</div>
                    
                </section>
            })}
        </div>   
    </section>

    </>
}