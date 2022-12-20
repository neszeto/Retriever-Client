import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createAddendum, deleteAddendum } from "../../managers/AddendumManager"
import { deleteMedicalRecord, getMedicalRecordById } from "../../managers/MedicalRecordManager"
import "./EditRecordAddendum.css"


export const Addendum = () => {
    const { recordId } = useParams()
    let navigate = useNavigate()
    const [currentRecord, setCurrentRecord] = useState({})
    const [addendum, setAddendum] = useState(
        {
            medicalrecordId: 0,
            addendum: ""
        }
        )
    const [addAddendum, setAdd] = useState(false)

    useEffect(
        () => {
            getRecordsWithAddendums(recordId)
        }, []
    )

    const getRecordsWithAddendums = (recordId) => {
        getMedicalRecordById(recordId).then(record => setCurrentRecord(record))
    }

    const saveAddendum = (evt) => {
        evt.preventDefault()

        setAdd(false)

        const newAddendum = {
            medicalRecordId: recordId,
            addendum: addendum.addendum
        }
        createAddendum(newAddendum)
        .then(
            () => getRecordsWithAddendums(recordId)
        )


    }

    const deleteRecord = (id) => {
        deleteMedicalRecord(id)
        .then(()=> getRecordsWithAddendums(recordId))
        .then(()=> navigate(`/Patient/${currentRecord.patient}`))
    }
   

    return <>
        <div className="back_button">
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
                        return <div>{med?.medication?.name} </div>
                    })
                    }
                </div>
                <div><b>Diagnosis:</b> {currentRecord?.diagnosis?.diagnosis}</div>
            </section>
            <div className="delete_record">
                <button className="record_delete_button"onClick={()=> deleteRecord(currentRecord.id)}><i class="fa-solid fa-trash-can fa-xl"></i></button>
            </div>
        </section>
        <section className="Addendums">
            <div>{currentRecord?.record_addendums?.map(addendum=>{
                return <section className="single_addendum">
                        <div>This addendum was created on {addendum.created_on}</div>
                        <div className="addendum-section">{addendum.addendum}</div>
                        <div className="delete_addendum">
                            <button className="addendum_delete_button" onClick={()=> deleteAddendum(addendum.id).then(()=> getRecordsWithAddendums(recordId))}><i class="fa-solid fa-trash-can fa-xl"></i></button>
                        </div>
                    </section>
                })}
            </div>   
        </section>
        <section>
            { 
                addAddendum
                ?<fieldset className="Addendum_form">
                <label className="addendum-add" htmlFor="addendum">Addendum</label>
                <textarea id="addendum" className="addendum-input" name="addendum" onChange={
                        (evt) => {
                            const copy = structuredClone(addendum)
                            copy.addendum = evt.target.value
                            setAddendum(copy)
                        }
                    }/>
                    <div className="save_addendum_button">
                        <button onClick={(evt)=>saveAddendum(evt)}>Save</button>
                    </div>
                </fieldset>
                : ""
                
            }
        </section>
        <div className="add_addendum_button">
            <button onClick={()=>setAdd(true)}><i class="fa-solid fa-plus fa-xl"></i></button>
        </div>
    </>
}