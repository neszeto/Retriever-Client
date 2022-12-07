import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPatientById } from "../../managers/PatientManager"
import { getPatientRecords } from "../../managers/RecordManager"
import "./PatientChart.css"

export const PatientChart = () => {
   const { patientId } = useParams()

   const [patient, setPatient] = useState({})
   const [record, setRecord] = useState([])


   useEffect(
    () => {
        getPatientById(patientId).then(patient=> setPatient(patient))
        getPatientRecords(patientId).then(records=> setRecord(records))
    }, []
   )

    
   return <section className="whole_page">
        <section className="pet_header_information">
            <div>{patient?.name}</div>
            <div>{patient?.breed} Sex:{patient?.sex} Age:{patient?.age}yo Weight:{patient?.weight}lbs Color:{patient?.color} Owner:{patient?.owner?.name}</div>  
        </section>
        <section className="patient_chart_and_summary">
            <section className="patient_charts">
                {
                    record.map(rec=>{
                        return <>
                        <section className="record_date">{rec.date}</section>
                        <section className="medical_record">
                            <div>Dr. {rec.doctor.first_name} {rec.doctor.last_name}</div>
                            <div>Presenting Complaint: {rec.presenting_complaint}</div>
                            <section className="SOAP">
                                <div>Subjective: {rec.subjective}</div>
                                <div>Objective: {rec.objective}</div>
                                <div>Assessment: {rec.assessment}</div>
                                <div>Plan: {rec.plan}</div>
                            </section>
                            <section className="record_tags">
                                <div>Medication: {rec.medications_on_record.map(med=>{
                                    return <div>{med.medication.name}</div>
                                })}</div>
                                <div>Diagnosis: {rec.diagnosis.diagnosis}</div>

                            </section>

                        </section>
                        </>
                    })
                }
            </section>
            <section className="patient_summary">

            </section>

        </section>
    </section>
}