import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createDiagnosis } from "../../managers/DiagnosisManager"
import { createMedicalRecord, createMedicalRecordMedication } from "../../managers/MedicalRecordManager"
import { createMedication, getMedications } from "../../managers/MedicationManager"
import { getPatientById } from "../../managers/PatientManager"
import { getUsers } from "../../managers/UsersManager"
import "./NewPatientRecord.css"


export const NewPatientRecord = () => {
    const { patientId } = useParams()
    let navigate = useNavigate()
    
    const [doctors, setDoctors] = useState()
    const [patient, setPatient] = useState()
    const [medications, setMedications] = useState()
    const [search, setSearch] = useState("")
    const [filteredMedications, setFiltered] = useState([])
    const [addedMeds, setAddedMeds] = useState(false)
    const [addButton, setAddButton] = useState(false)
    const [finalize, setFinalize] = useState(false)
  

    const patientMedications = useRef([])

    const [medicalRecord, setMedicalRecord] = useState(
        {
            doctorId: 0,
            presentingComplaint: "",
            subjective: "",
            objective: "",
            assessment: "",
            plan: "",
            date: "",
            diagnosisId: 0

        }
    )
    

    useEffect(
        () => {
            getUsers().then((users)=>setDoctors(users))
            getPatientById(patientId).then((patient)=> setPatient(patient))
            getMedications().then((medications)=> setMedications(medications))
        }, []
    )
    
    useEffect(
        () => {
            if (search) {
                const searched = medications.filter(med=>med.name.toLowerCase().startsWith(search.toLowerCase()))
                if (searched.length === 0 && search === "") {
                    setAddButton(false)
                }
                if (searched.length === 0 && search !== "") {
                    setAddButton(true)
                }
                
                else {
                    setFiltered(searched)
                    setAddButton(false)
                    

                }
                
            }
    
            else {
                setFiltered([])
            }

        }, [search]
    )

    const changeRecordState = (domEvent) => {
        const newEvent = Object.assign({}, medicalRecord)
        newEvent[domEvent.target.name] = domEvent.target.value
        setMedicalRecord(newEvent)
    }

    const AddMedicationButton = (evt) => {
        evt.preventDefault()
        const newMedication = {
            name: search
        }

        createMedication(newMedication)
        .then(
            (newlyMadeMedication) => {
                if (newlyMadeMedication.name) {
                    patientMedications.current.push(newlyMadeMedication)
                    setAddedMeds(!addedMeds)
                    
                }
                
            }
        )  
    }

    const FinalizeMedicalRecord = (evt) => {
        evt.preventDefault()

        const createdDiagnosis = {
            diagnosis: medicalRecord.diagnosis
        }
        createDiagnosis(createdDiagnosis)
        .then(
            (Diagnosis) => {
                const createdMedicalRecord = {
                    doctorId: parseInt(medicalRecord.doctorId),
                    presentingComplaint: medicalRecord.presentingComplaint,
                    subjective: medicalRecord.subjective,
                    objective: medicalRecord.objective,
                    assessment: medicalRecord.assessment,
                    plan: medicalRecord.plan,
                    date: medicalRecord.date,
                    diagnosisId: Diagnosis.id
                }
                return createMedicalRecord(createdMedicalRecord, patientId)
                .then(
                    (newlyCreatedRecord) => {
                        patientMedications.current.map(medication=> {
                             const recordMedication = {
                                medicalRecordId: newlyCreatedRecord.id,
                                medicationId: medication.id
                            }
                            return createMedicalRecordMedication(recordMedication)
                        })
                        
                    }
                )
            }
        )
        .then(
            () => { 
                navigate(`/Patient/${patientId}`) 
            }
        )
        
    }
    
   return <>
    <div>
        <button className="record_back_button" onClick={()=>navigate(`/Patient/${patientId}`)}><i class="fa-solid fa-arrow-left-long"></i> Patient Chart</button>
    </div>
   <section className="whole_record_form"> 
   <section>
    <section className="Record_form">
        <div>New Medical Record for <b>{patient?.name} <i class="fa-solid fa-angles-right fa-sm"></i></b></div>
        
            <div className="select_doctor">
                <label className="form_written_by" htmlFor="doctor">Medical Record Written By: </label>
                <select id="doctor" className="form_select" name="doctorId" onChange={changeRecordState}>
                    <option value="">Select Doctor</option>
                    {
                        doctors?.map(doctor => {
                            if (doctor.is_staff === false && doctor.users_that_are_doctors[0].active === true) {
                            return <option value={doctor?.id} key={doctor?.id}>Dr. {doctor?.first_name} {doctor?.last_name}</option>
                            }
                        })
                    }
                </select>
            </div>
        
            <div className="presenting_complaint">
                <label className="record_form_headers" htmlFor="presenting_complaint">Presenting Complaint </label>
                <input className="record_form_input" required autoFocus type="text" name="presentingComplaint" onChange={changeRecordState}/>
            </div>
            <label className="record_form_headers" htmlFor="subjective">Subjective</label>
            <textarea id="subjective" className="record_text_field" name="subjective" onChange={changeRecordState}/>
            <label className="record_form_headers" htmlFor="objective">Objective</label>
            <textarea id="objective" className="record_text_field" name="objective" onChange={changeRecordState}/>
            <label className="record_form_headers" htmlFor="assessment">Assessment</label>
            <textarea id="assessment" className="record_text_field" name="assessment" onChange={changeRecordState}/>
            <label className="record_form_headers" htmlFor="plan">Plan</label>
            <textarea id="plan" className="record_text_field" name="plan" onChange={changeRecordState}/>
            <div className="diagnosis_date">
                <div className="diagnosis_date_header">
                    <label className="record_form_headers" htmlFor="diagnosis">Diagnosis </label>
                    <input className="record_form_input" required autoFocus type="text" name="diagnosis" onChange={changeRecordState}/>
                </div>
                <div className="diagnosis_date_header">
                    <label className="record_form_headers" htmlFor="date">Appointment Date</label>
                    <input className="record_form_input" required autoFocus type="date" name="date" onChange={changeRecordState}/>
                </div>
            </div>
        </section>
        <section className="medication_search">
            <div className="search_meds_and_add_button">
                <label className="search_medication" htmlFor="search_medications"></label>
                <input onChange={
                        (evt) => {setSearch(evt.target.value)}
                    }type="text" name="search_medication" className="search_field" placeholder="search medications to add..."/>
                <div>
                    {
                        addButton
                        ? <button className="activated_add_button" onClick ={(evt)=>AddMedicationButton(evt)}>Add</button>
                        : <button className="deactivated_add_button">Add</button>
                    }
                </div>
            </div>
            <section className="added_and_searched_meds">
                <div className="searched_medications">
                    <div>{filteredMedications.map(medication=><button className="medication_button" onClick={
                        () => {
                            patientMedications.current.push(medication)
                            setAddedMeds(!addedMeds)
                            
                        }
                    }>{medication.name}</button>)}</div>
                </div>
                <div className="added_medications"><b>Patient Medications:</b>
                {
                    addedMeds || !addedMeds
                    ? <div className="medication_added_to_form">{patientMedications.current.map(medication=> <div className="med_added_to_record"><mark className="mark_record_med">{medication.name}</mark><button className="remove_med_button" onClick={
                        ()=>{
                            const index = patientMedications.current.findIndex(med => {
                                return med.id === medication.id;
                            })
                    
                            patientMedications.current.splice(index, 1)
                            setAddedMeds(!addedMeds)
                        }
                    }><i class="fa-regular fa-trash-can fa-xs"></i></button></div>)}</div>
                    : ""
                    
                }
                </div>
                
            </section>

        </section>
        </section>
        <div className="finalize_button_check">
            <button className="finalize_button" onClick={()=>setFinalize(true)}>Finalize</button>
            {
                finalize
                ? <section className="finalize_check">
                    <div className="double-check"><i>Finalized medical records cannot be altered. Are you sure you want to finalize?</i></div>
                    <button className="check_button" onClick={(evt)=>FinalizeMedicalRecord(evt)}>Yes</button>
                    <button className="check_button" onClick={()=>setFinalize(false)}>No</button>
                </section>
                : ""
            }
        </div>
    </section>
</>
        

}
