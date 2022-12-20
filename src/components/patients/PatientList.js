import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getPatients } from "../../managers/PatientManager"
import "./PatientList.css"



export const PatientList = () => {
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [search2, setSearch2] = useState("")
    const [canineRadio, setCanine] = useState(false)
    const [felineRadio, setFeline] = useState(false)
    const [bothRadio, setBoth] = useState(false)

    let navigate = useNavigate()

    useEffect(
        () => {
            getPatients().then((patients)=> {
                setPatients(patients)
                setFiltered(patients)})
        }, []
    )

    useEffect(
        () => {
            if (search) {
                const searched = patients.filter(patient=>patient.name.toLowerCase().startsWith(search.toLowerCase()) || patient.owner.name.toLowerCase().startsWith(search.toLowerCase()))
                setFiltered(searched)
                
            }
    
            else {
                setFiltered(patients)
            }

        }, [search]
    )

    useEffect(
        () => {
            if (search2) {
                let searchterm = patients.filter(patient=> patient.records_for_patient.find(rec=>rec?.diagnosis?.diagnosis.toLowerCase().startsWith(search2.toLowerCase()))|| patient.records_for_patient.find(rec=>rec?.medications.find(med=>med.name.toLowerCase().startsWith(search2.toLowerCase())))) 
                setFiltered(searchterm)
                
            }
    
            else {
                setFiltered(patients)
            }

        }, [search2]
    )
       
    
    
    useEffect(
        () => {
            if (canineRadio) {
                const canineFilter = patients.filter(patient => patient.species.species === "Canine")
                setFiltered(canineFilter)
                setFeline(false)
                setBoth(false)
            }
            
        }, [canineRadio]
    )

    useEffect(
        () => {
            if (felineRadio) {
                const felineFilter = patients.filter(patient => patient.species.species === "Feline")
                setFiltered(felineFilter)
                setCanine(false)
                setBoth(false)
            }
            
        }, [felineRadio]
    )

    useEffect(
        () => {
            if (bothRadio) {
                setFiltered(patients)
                setCanine(false)
                setFeline(false)
            }
        
        }, [bothRadio]
    )
    

    return <section className="whole-list-page">
        <section className="new_patient_button">
            <button onClick = {() => {navigate(`/newPatientForm`)}}>Add New Patient</button>
        </section>
        <section className="all_filters">
            <section className="search_inputs">
                <label className="search" htmlFor="search_terms">🔍 </label>
                <input 
                onChange={
                    (evt) => {setSearch2(evt.target.value)}
                }type="text" name="search_terms" className="search_input_field" placeholder=" search by diagnosis or medication..."/>
            
                <label className="search" htmlFor="search_terms"></label>
                <input 
                onChange={
                    (evt) => {setSearch(evt.target.value)}
                }type="text" name="search_terms" className="search_input_field" placeholder=" search by client or patient..."/>
            </section>
            <section className="radio_buttons">
                <input onClick = {() => setCanine(!canineRadio)}type="radio" id="canine" name="radio_buttons" />
                <label for="canine">Canine</label>
                <input onClick = {() => setFeline(!felineRadio)}type="radio" id="feline" name="radio_buttons" />
                <label for="feline">Feline</label>
                <input onClick = {() => setBoth(!bothRadio)}type="radio" id="both" name="radio_buttons" />
                <label for="both">Both</label>
            </section>
        </section>
        <section className="Patient_List">
            <section className="Patient_List_Headers">
                <div className="header">Patient</div>
                <div className="header">Patient Information</div>
                <div className="header">Species</div>
                <div className="header">Owner</div>
                <div className="header">Status</div>
            </section>
            <section className="patients">
                {
                    filteredPatients?.map(patient => {
                        return <>
                        <Link className="patient" style={{textDecoration: 'none'}} to={`/patient/${patient?.id}`}>{patient?.name}</Link>
                        <div className="patient">{patient?.age} yo, {patient?.sex === "Male" ? "MN" : "FS"}, {patient?.breed}</div>
                        <div className="patient">{patient?.species?.species}</div>
                        <Link className="patient"style={{textDecoration: 'none'}} to={`/owner/${patient?.owner?.id}`}>{patient?.owner?.name}</Link>
                        <div className="patient">{patient?.deceased ? "deceased" : "active"}</div>
                        </>
                    })
                }
            </section>
        </section>
        </section>
    
    
}

/**/