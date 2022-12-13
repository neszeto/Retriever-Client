import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createAddendum, deleteAddendum } from "../../managers/AddendumManager"
import { deleteMedicalRecord, getMedicalRecordById } from "../../managers/MedicalRecordManager"

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
    <section className="medical_record">
        <div>Dr. {currentRecord?.doctor?.first_name} {currentRecord?.doctor?.last_name}</div>
        <div>Presenting Complaint: {currentRecord?.presenting_complaint}</div>
        <section className="SOAP">
            <div>Subjective: {currentRecord?.subjective}</div>
            <div>Objective: {currentRecord?.objective}</div>
            <div>Assessment: {currentRecord?.assessment}</div>
            <div>Plan: {currentRecord?.plan}</div>
        </section>
        <section className="record_tags">
            <div>Medication: {currentRecord?.medications_on_record?.map(med=>{
                return <div>{med?.medication?.name} </div>
            })}</div>
            <div>Diagnosis: {currentRecord?.diagnosis?.diagnosis}</div>
        </section>
        <button onClick={()=> deleteRecord(currentRecord.id)}>Delete Record</button>
    </section>
    <section>
        <div>{currentRecord?.record_addendums?.map(addendum=>{
            return <section>
                <div className="addendum-section">{addendum.addendum}</div>
                <div>This addendum was created on {addendum.created_on}</div>
                <button onClick={()=> deleteAddendum(addendum.id).then(()=> getRecordsWithAddendums(recordId))}>Delete</button>
                </section>
            })}
        </div>
       
            { 
            addAddendum
            ?<fieldset>
            <label className="addendum-add" htmlFor="addendum">Addendum</label>
            <textarea id="addendum" className="addendum-input" name="addendum" onChange={
                    (evt) => {
                        const copy = structuredClone(addendum)
                        copy.addendum = evt.target.value
                        setAddendum(copy)
                    }
                }/>
                <button onClick={(evt)=>saveAddendum(evt)}>Save</button>
            </fieldset>
            : ""
            
            }   
        
    </section>
    <button onClick={()=>setAdd(true)}>Add Addendum</button>
    <button onClick={()=>navigate(`/Patient/${currentRecord.patient}`)}>back</button>
    </>
}