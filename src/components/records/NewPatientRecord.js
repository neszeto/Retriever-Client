import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { getMedications } from "../../managers/MedicationManager"
import { getPatientById } from "../../managers/PatientManager"
import { getUsers } from "../../managers/UsersManager"
import "./NewPatientRecord.css"


export const NewPatientRecord = () => {
    const { patientId } = useParams()
    
    const [doctors, setDoctors] = useState()
    const [patient, setPatient] = useState()
    const [medications, setMedications] = useState()
    const [search, setSearch] = useState("")
    const [filteredMedications, setFiltered] = useState([])
    const [addedMeds, setAddedMeds] = useState(false)

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
                setFiltered(searched)
                
            }
    
            else {
                setFiltered([])
            }

        }, [search]
    )


    
    const patientMedications = useRef([])


   return <fieldset>
        <div>New Medical Record for {patient?.name}</div>
        <section className="Record_form">
            <label className="form_headers" htmlFor="doctor">Medical Record Written By: </label>
            <select id="doctor" className="form_select">
                <option value="">Select Doctor</option>
                {
                    doctors?.map(doctor => <option value={doctor?.id} key={doctor?.id}>Dr. {doctor?.first_name} {doctor?.last_name}</option>)
                }
            </select>
            <label className="form_headers" htmlFor="presenting_complaint">Presenting Complaint </label>
            <input className="form_input" required autoFocus type="text" name="presenting_complaint"/>
            <label className="form_headers" htmlFor="subjective">Subjective</label>
            <textarea id="subjective" className="text_field" name="subjective"/>
            <label className="form_headers" htmlFor="objective">Objective</label>
            <textarea id="objective" className="text_field" name="objective"/>
            <label className="form_headers" htmlFor="assessment">Assessment</label>
            <textarea id="assessment" className="text_field" name="assessment"/>
            <label className="form_headers" htmlFor="plan">Plan</label>
            <textarea id="plan" className="text_field" name="plan"/>
            <label className="form_headers" htmlFor="diagnosis">Diagnosis </label>
            <input className="form_input" required autoFocus type="text" name="diagnosis"/>
            <label className="form_headers" htmlFor="date">Appointment Date</label>
            <input className="form_input" required autoFocus type="date" name="date"/>
        </section>
        <section className="medication_search">
            <label className="search_medication" htmlFor="search_medications"></label>
            <input onChange={
                    (evt) => {setSearch(evt.target.value)}
                }type="text" name="search_medication" className="search_field" placeholder="search medication to add..."/>
            <button>Add</button>
            <section className="added_and_searched_meds">
                <div className="searched_medications">
                    <div>{filteredMedications.map(medication=><button onClick={
                        () => {
                            patientMedications.current.push(medication)
                            
                        
                        }
                    }>{medication.name}</button>)}</div>
                </div>
                <div className="added_medications">Patient Medications:   
                {
                    patientMedications.current.length === 0
                    ? ""
                    : <div>{patientMedications.current.map(medication=> <div>{medication.name}<button>remove</button></div>)}</div>
                    
                }
                </div>
                
            </section>

        </section>
        </fieldset>

}