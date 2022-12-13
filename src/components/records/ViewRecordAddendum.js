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
    </section>
    <section>
        <div>{currentRecord?.record_addendums?.map(addendum=>{return <section><div className="addendum-section">{addendum.addendum}</div><div>This addendum was created on {addendum.created_on}</div></section>})}</div>
        
    </section>
    <button onClick={()=>navigate(`/Patient/${currentRecord.patient}`)}>back</button>
    </>
}