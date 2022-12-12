import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getPatients } from "../../managers/PatientManager"
import "./PatientList.css"



export const PatientList = () => {
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFiltered] = useState([])
    const [search, setSearch] = useState("")
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
                setFiltered(filteredPatients)
            }

        }, [search]
    )
    
    useEffect(
        () => {
            if (canineRadio) {
                const canineFilter = patients.filter(patient => patient.species.species === "Canine")
                setFiltered(canineFilter)
            }
            
        }, [canineRadio]
    )

    useEffect(
        () => {
            if (felineRadio) {
                const felineFilter = patients.filter(patient => patient.species.species === "Feline")
                setFiltered(felineFilter)
            }
            
        }, [felineRadio]
    )

    useEffect(
        () => {
            if (bothRadio) {
                setFiltered(filteredPatients)
            }
        
        }, [bothRadio]
    )
    

    return <>
        <button onClick = {() => {navigate(`/newPatientForm`)}}>Add New Patient</button>
        <section className="all_filters">
            <section className="search_inputs">
                <label className="search" htmlFor="search_terms">Search </label>
                <input 
                onChange={
                    (evt) => {setSearch(evt.target.value)}
                }type="text" name="search_terms" className="input_field" placeholder="search by client or patient"/>
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
                <div>Patient</div>
                <div>Patient Information</div>
                <div>Species</div>
                <div>Owner</div>
                <div>Status</div>
            </section>
            <section className="patients">
                {
                    filteredPatients.map(patient => {
                        return <>
                        <Link style={{textDecoration: 'none'}} to={`/patient/${patient.id}`}>{patient.name}</Link>
                        <div>{patient.age} yo, {patient.sex === "Male" ? "MN" : "FS"}, {patient.breed}</div>
                        <div>{patient.species.species}</div>
                        <Link style={{textDecoration: 'none'}} to={`/owner/${patient.owner.id}`}>{patient.owner.name}</Link>
                        <div>{patient.deceased ? "deceased" : "active"}</div>
                        </>
                    })
                }
            </section>
        </section>
        </>
    
    
}

