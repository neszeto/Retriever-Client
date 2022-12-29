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

    let subjectiveBulletPoints = currentRecord?.subjective?.split(". ")
    let objectiveBulletPoints = currentRecord?.objective?.split(". ")
    let assessmentBulletPoints = currentRecord?.assessment?.split(". ")
    let planBulletPoints = currentRecord?.plan?.split(". ")

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
                    <ul>
                        {
                            subjectiveBulletPoints?.map(point=><li>{point}</li>)
                        }
                    </ul>
                </div>
                <div className="section">
                    <div><b>Objective</b></div>
                    <ul>
                        {
                            objectiveBulletPoints?.map(point=><li>{point}</li>)
                        }
                    </ul>
                </div>
            </div>
            <div className="SO">
                <div>
                    <div><b>Assessment:</b></div>
                    <ul>
                        {
                            assessmentBulletPoints?.map(point=><li>{point}</li>)
                        }
                    </ul>
                </div>
                <div>
                    <div><b>Plan:</b></div>
                    <ul>
                        {
                            planBulletPoints?.map(point=><li>{point}</li>)
                        }
                    </ul>
                </div>
            </div>

        </section>
        <section className="record_tags">
            <div className="med_header_tags">
                    
                <div className="med_header"><b>Medication: </b></div> 
                    <div className="medication-tags">
                    {
                    currentRecord?.medications_on_record?.map(med=>{
                        return <mark className="mark_medication">{med?.medication?.name} </mark>
                    })
                    }
                </div>
            </div>
            <div className="diagnosis">
                <div><b>Diagnosis:</b></div>
                <div className="diagnosis_on_chart"><mark className="mark_diagnosis">{currentRecord?.diagnosis?.diagnosis}</mark></div>
            </div>
            
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