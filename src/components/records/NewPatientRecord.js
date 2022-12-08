import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsers } from "../../managers/UsersManager"




export const NewPatientRecord = () => {
    const { patientId } = useParams()
    
    const [doctors, setDoctors] = useState()

    useEffect(
        () => {
            getUsers().then((users)=>setDoctors(users))
        }, []
    )
    
   return <fieldset>
        <div>New Medical Record for </div>
        <section className="Record_form">
            <label className="form_headers" htmlFor="doctor">Medical Record Written By: </label>
            <select id="doctor" className="form_select">
                <option value="">Select Doctor</option>
                {
                    doctors.map(doctor => <option value={doctor.id} key={doctor.id}>{doctor.first_name} {doctor.last_name}</option>)
                }
            </select>
        </section>
        </fieldset>

}