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
                    <Link className="link_chart_pet" style={{textDecoration: 'none'}} to={`/patient/${patientId}/details`}>{patient?.name}</Link>
                    <img className="image" src={patient.image_url} width="150px" height="150px" alt=""></img>
                </div>
                <div className="patientInfo">
                <div className="deceased_patient">{patient?.deceased ? "(deceased)": ""}</div>
                    <div className="info_line">{patient?.species?.species} <i class="fa-solid fa-angles-right fa-xs"></i></div>
                    <div className="info_line"><b>Breed:</b> {patient?.breed}</div>
                    <div className="info_line"><b>Sex:</b> {patient?.sex}</div>
                    <div className="info_line"><b>Age:</b> {patient?.age} yo</div>
                    <div className="info_line"><b>Weight:</b> {patient?.weight} lbs</div>
                    <div className="info_line"><b>Color:</b> {patient?.color}</div>
                    <div className="info_line"><b>Owner:</b> <Link className="link_chart_owner" style={{textDecoration: 'none'}} to={`/owner/${patient?.owner?.id}`}>{patient?.owner?.name}</Link></div>
                </div>
            </section>
            <section className="border_line_container">
                <div className="border_line"></div>
            </section>
            <section className="patient_chart_section">
                <div className="patient-chart">Patient Chart</div>
                {
                    isStaff()
                    ? ""
                    : <button className="add_new" onClick={()=> navigate(`/add_new_record/patient/${patientId}`)}><i class="fa-solid fa-plus fa-lg"></i></button>
                    
                }
                <button className="view_all"onClick={()=>{setFiltered(record)}}>View All</button>
            </section>
            <section className="patient_chart_and_summary">
            {
            record.length === 0
            ? <div className="no_charts">This patient has no medical charts to show</div> 
            : <section className="patient_charts">
                {
                    filteredRecord.map(rec=>{
                        let subjectiveBulletPoints = rec.subjective.split(". ")
                        let objectiveBulletPoints = rec.objective.split(". ")
                        let assessmentBulletPoints = rec.assessment.split(". ")
                        let planBulletPoints = rec.plan.split(". ")

                        return <section className="record_date">
                            <section className="date">{rec.date}</section>
                            <section className="medical_record">
                                <div className="doctor"><b>Dr. {rec.doctor.first_name} {rec.doctor.last_name}</b></div>
                                <div>
                                    {   
                                        rec.record_addendums.length === 0
                                        ? ""
                                        : <Link className="addendum" style={{textDecoration: 'none'}} to={rec.my_record ? `/edit_record/${rec.id}` : `/view_record/${rec.id}` }>View {rec.addendum_count} {rec.addendum_count === 1 ? "Addendum " : "Addendums "}</Link>

                                    }
                                </div>
                                <div className="complaint"><b>Presenting Complaint:</b> {rec.presenting_complaint}</div>
                                <section className="SOAP">
                                    <div className="SO">
                                        <div className="section">
                                            <div><b>Subjective:</b></div>
                                            <ul>
                                            {
                                                subjectiveBulletPoints.map(point=><li>{point}</li>)
                                            }
                                            </ul>
                                        </div>
                                        <div className="section">
                                            <div><b>Objective:</b></div>
                                            <ul>
                                            {
                                                objectiveBulletPoints.map(point=><li>{point}</li>)
                                            }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="SO">
                                        <div>
                                            <div><b>Assessment:</b></div>
                                            <ul>
                                            {
                                                assessmentBulletPoints.map(point=><li>{point}</li>)
                                            }
                                            </ul>
                                        </div>
                                        <div>
                                            <div><b>Plan:</b></div>
                                            <ul>
                                            {
                                                planBulletPoints.map(point=><li>{point}</li>)
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
                                        rec.medications_on_record.map(med=>{
                                            return <mark className="mark_medication">{med.medication.name} </mark>
                                                
                                        })
                                        }
                                        </div>
                                    </div>

                                    <div className="diagnosis">
                                        <div><b>Diagnosis:</b></div>
                                        <div className="diagnosis_on_chart"><mark className="mark_diagnosis">{rec.diagnosis.diagnosis}</mark></div>
                                    </div>
                                   
                                </section>
                                    {
                                        rec.my_record
                                        ? <div className="edit_button">
                                            <button className="Enable_Edit" onClick={() => navigate(`/edit_record/${rec.id}`)}><i class="fa-solid fa-pen-to-square fa-xl"></i></button>
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
                                    <button className="summary_filter_problems"onClick={()=>filterDiagnosis(diagnosis)}>{diagnosis}</button>
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
                                    <button className="summary_filter_meds" onClick={()=>filterMedication(medication)}>{medication}</button>
                                    </div>
                            })
                        }
                    </div>
                </section>

            </section>
        </section>
    
}


