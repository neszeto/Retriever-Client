import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDoctorById } from "../../managers/DoctorManager"
import { getUsers } from "../../managers/UsersManager"

export const EditDoctors = () => {
    const { doctorId } = useParams()
    const [users, setUsers] = useState([])
    const [doctor, setDoctor] = useState([])

    useEffect(
        () => {
            getUsers().then(users=>setUsers(users))
            getDoctorById(doctorId).then(doctor=>setDoctor(doctor))
        }, []
    )




    return <>
        <div>Edit Doctor Profile</div>
        <fieldset>
            
        </fieldset>

    </>

}