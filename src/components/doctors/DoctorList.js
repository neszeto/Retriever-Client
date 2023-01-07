import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { activateDoctor } from "../../managers/DoctorManager"
import { getUsers } from "../../managers/UsersManager"
import "./DoctorList.css"


export const Doctors = () => {
    let navigate = useNavigate()
    const [users, setUsers] = useState([])
  
    
    const getAllUsers = () => {
        getUsers().then(users=>setUsers(users))
    }
    useEffect(
        () => {
            getAllUsers()
        }, []
    )

    
    const activate =(doctorId) => {
        activateDoctor(doctorId)
        getAllUsers()
    }
       


    return <section className="all_doctors">
        <section>
            <div className="vets_header">Active Veterinarians</div>
            <div>
            {
                users.map(user=>{
                    if (user?.is_staff === false && user?.users_that_are_doctors[0]?.active === true) {
                        return <>
                        <section className="doctor_image_bio">
                            <section className="doctor_image_container">
                                <img className="doctor_image_active" src={user.users_that_are_doctors[0].image_url} alt=""></img>
                                <div className="doctor_name">Dr. {user?.first_name} {user?.last_name}</div>
                            </section>
                            <section className="doctor_bio_container">
                                <div>{user?.users_that_are_doctors[0]?.bio}</div>
                                <div className="doctor_edit_button_container">
                                    <button className="doctor_edit_button" onClick={()=>navigate(`/doctors/${user.users_that_are_doctors[0].id}/edit`)}><i class="fa-solid fa-pen-to-square fa-xl"></i></button>
                                </div>
                            </section>
                        </section>
                        </>
                    }
                })
            }
            </div>
           
        </section>
        <section>
            <div className="border_line_doctors"></div>
            {
                users.map(user=>{
                    if (user?.is_staff === false && user?.users_that_are_doctors[0]?.active === false) {
                        return <section className="all_inactive_section">
                        <div className="doctor_activate_button">
                            <button className="activate_button" onClick={()=>activate(user.users_that_are_doctors[0].id)}>Activate</button>
                        </div>
                        <section className="doctor_image_bio_inactive">
                            <section className="doctor_image_container">
                                <img className="doctor_image_inactive" src={user.users_that_are_doctors[0].image_url} width="300px" alt=""></img>
                                <div className="doctor_name">Dr. {user?.first_name} {user?.last_name}</div>
                            </section>
                            <section className="doctor_bio_container">
                                <div>{user?.users_that_are_doctors[0]?.bio}</div>
                            </section>
                        </section>
                    </section>
                    }
                })
            }
        </section>
    </section>
}

