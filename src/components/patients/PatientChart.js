import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { isStaff } from "../../managers/AuthManager"
import { getPatientRecords } from "../../managers/MedicalRecordManager"
import { getPatientById } from "../../managers/PatientManager"

import "./PatientChart.css"

export const PatientChart = () => {
   const { patientId } = useParams()

   const [patient, setPatient] = useState({})
   const [record, setRecord] = useState([])
   const [filteredRecord, setFiltered] = useState([])

   let navigate = useNavigate()

   useEffect(
    () => {
        getPatientById(patientId).then(patient=> setPatient(patient))
        getPatientRecords(patientId).then(records=> setRecord(records))
        getPatientRecords(patientId).then(records=> setFiltered(records))
    }, []
   )
    
   let uniqueDiagnoses = []
   let duplicateDiagnoses = []

   let uniqueMedications = []
   let duplicateMedications = []

   const filterDiagnosis = (diagnosis) => {
        const filteredRecords = record.filter(rec=>rec.diagnosis.diagnosis === diagnosis)
        setFiltered(filteredRecords)
   }

   const filterMedication = (medication) => {
        const filteredRecords = record.filter(rec=>rec.medications_on_record.find(med=>med.medication.name === medication))
        setFiltered(filteredRecords)
   }
    
    return <section className="whole_page">
            <section className="pet_header_information">
                <div className="image_name_breed">
                    <img className="image" src={patient.image_url} width="110px" height="110px" alt=""></img>
                    <div className="patientName">
                        <Link style={{textDecoration: 'none'}} to={`/patient/${patientId}/details`}>{patient?.name}</Link>
                        <div>{patient?.deceased ? "(deceased)": ""}</div>
                        <div><span>&#8594;</span><i>{patient?.species?.species}</i></div>
                    </div>
                </div>
                <div className="patientInfo">
                    <div className="info_line">{patient?.breed}</div>
                    <div className="info_line">Sex: {patient?.sex}</div>
                    <div className="info_line">Age: {patient?.age}yo</div>
                    <div className="info_line">Weight: {patient?.weight}lbs</div>
                    <div className="info_line">Color: {patient?.color}</div>
                    <div className="info_line">Owner: <Link style={{textDecoration: 'none'}} to={`/owner/${patient?.owner?.id}`}>{patient?.owner?.name}</Link></div>
                </div>
            </section>
            <div className="patient-chart">Patient Chart</div>
            <section className="sub_header_button">
                
                {
                    isStaff()
                    ? ""
                    : <button className="add_new" onClick={()=> navigate(`/add_new_record/patient/${patientId}`)}>Add New Medical Record</button>
                }
                <button className="view_all"onClick={()=>{setFiltered(record)}}>View All Medical Records</button>
            </section>
            <section className="patient_chart_and_summary">
            {
            record.length === 0
            ? <div>This patient has no medical charts to show</div> 
            : <section className="patient_charts">
                {
                    filteredRecord.map(rec=>{
                        return <section className="record_date">
                            <section className="date">{rec.date}</section>
                            <section className="medical_record">
                                <div className="doctor"><b>Dr. {rec.doctor.first_name} {rec.doctor.last_name}</b></div>
                                <div>
                                    {   
                                        rec.record_addendums.length === 0
                                        ? ""
                                        : <Link className="addendum" style={{textDecoration: 'none'}} to={rec.my_record ? `/edit_record/${rec.id}` : `/view_record/${rec.id}` }>View {rec.addendum_count} {rec.addendum_count === 1 ? "Addendum" : "Addendums"}</Link>

                                    }
                                </div>
                                <div className="complaint"><b>Presenting Complaint:</b> {rec.presenting_complaint}</div>
                                <section className="SOAP">
                                    <div className="SO">
                                        <div className="section">
                                            <div><b>Subjective:</b></div>
                                            <div className="bullet_point">{rec.subjective}</div>
                                        </div>
                                        <div className="section">
                                            <div><b>Objective:</b></div>
                                            <div className="bullet_point">{rec.objective}</div>
                                        </div>
                                    </div>
                                    <div className="SO">
                                        <div>
                                            <div><b>Assessment:</b></div>
                                            <div className="bullet_point">{rec.assessment}</div>
                                        </div>
                                        <div>
                                            <div><b>Plan:</b></div>
                                            <div className="bullet_point">{rec.plan}</div>
                                        </div>
                                    </div>
                                </section>
                                <section className="record_tags">
                                    <div className="medication-tags">
                                        <div><b>Medication: </b></div> 
                                        {
                                        rec.medications_on_record.map(med=>{
                                            return <div className="bullet_point">{med.medication.name} </div>
                                                
                                        })
                                        }
                                    </div>
                                    <div><b>Diagnosis:</b> {rec.diagnosis.diagnosis}</div>
                                </section>
                                    {
                                        rec.my_record
                                        ? <div className="edit_button">
                                            <button className="Enable_Edit" onClick={() => navigate(`/edit_record/${rec.id}`)}>Edit</button>
                                        </div>
                                        : ""
                                    }

                            </section>
                        </section>
                    })
                }
                </section>
            }
                
                <section className="patient_summary">
                    <div className="patient_summary_header">Patient Summary</div>
                    <div className="patient_summary_sub_headers"><b>Problem List</b></div>
                    <div>
                        {
                           
                            record.map(rec=> {
                                if (!uniqueDiagnoses.includes(rec.diagnosis.diagnosis)) {
                                    uniqueDiagnoses.push(rec.diagnosis.diagnosis)
                                }
                                else {
                                    duplicateDiagnoses.push(rec.diagnosis.diagnosis)
                                }
                                }
                            )
                            
                        }
                    
                        {
                            uniqueDiagnoses.map(diagnosis => {
                                return <div className="all_summary_filters">
                                    <button className="summary_filter"onClick={()=>filterDiagnosis(diagnosis)}>{diagnosis}</button>
                                    </div>
                            })
                        }
                    </div>
                    <div className="patient_summary_sub_headers"><b>Medications</b></div>
                    <div>
                        {
                            record.map(rec=> {
                                return <div>{rec.medications_on_record.map(med=>{
                                    if (!uniqueMedications.includes(med.medication.name)) {
                                        uniqueMedications.push(med.medication.name)
                                    }
                                    else {
                                        duplicateMedications.push(med.medication.name)
                                    }
                                    })}
                                    </div>
                            })
                        }
                        {
                            uniqueMedications.map(medication => {
                                return <div className="all_summary_filters">
                                    <button className="summary_filter" onClick={()=>filterMedication(medication)}>{medication}</button>
                                    </div>
                            })
                        }
                    </div>
                </section>

            </section>
        </section>
    
}