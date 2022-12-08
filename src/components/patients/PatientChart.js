import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPatientById } from "../../managers/PatientManager"
import { getPatientRecords } from "../../managers/RecordManager"
import "./PatientChart.css"

export const PatientChart = () => {
   const { patientId } = useParams()

   const [patient, setPatient] = useState({})
   const [record, setRecord] = useState([])

   let navigate = useNavigate()

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
            <section className="sub_header_button">
                <div>Patient Chart</div>
                <button onClick={()=> navigate(`/add_new_record/patient/${patientId}`)}>Add New Medical Record</button>
            </section>
            <section className="patient_chart_and_summary">
            {
            record.length === 0
            ? <div>This patient has no medical charts to show</div> 
            : <section className="patient_charts">
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
                                    return <div>{med.medication.name} </div>
                                })}</div>
                                <div>Diagnosis: {rec.diagnosis.diagnosis}</div>
                                {
                                    rec.my_record
                                    ? <button className="Enable_Edit">Edit</button>
                                    : <button className="Disable_Edit">Edit</button>
                                }
                            </section>

                        </section>
                        </>
                    })
                }
                </section>
            }
                
                <section className="patient_summary">
                    <div>Patient Summary</div>
                    <div>Problem List</div>
                    <div>
                        {
                            record.map(rec=> {
                                return <div>{rec.diagnosis.diagnosis}</div>
                            })
                        }
                    </div>
                    <div>Medications</div>
                    <div>
                        {
                            record.map(rec=> {
                                return <div>{rec.medications_on_record.map(med=>{
                                    return <div>{med.medication.name}</div>})}
                                    </div>
                            })
                        }
                    </div>
                </section>

            </section>
        </section>
    
}