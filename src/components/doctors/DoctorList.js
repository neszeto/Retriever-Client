import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { activateDoctor } from "../../managers/DoctorManager"
import { getUsers } from "../../managers/UsersManager"


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
            <div>Active Veterinarians</div>
            {
                users.map(user=>{
                    if (user?.is_staff === false && user?.users_that_are_doctors[0]?.active === true) {
                        return <>
                            <section>
                                <img className="image" src={user.users_that_are_doctors[0].image_url} width="300px" alt=""></img>
                                <div>Dr. {user?.first_name} {user?.last_name}</div>
                                </section>
                            <section>
                                <div>{user?.users_that_are_doctors[0]?.bio}</div>
                            </section>
                            <button onClick={()=>navigate(`/doctors/${user.users_that_are_doctors[0].id}/edit`)}>edit</button>
                           
                        </>
                    }
                })
            }
           
        </section>
        <section>
            <div>Inactive Veterinarians</div>
            {
                users.map(user=>{
                    if (user?.is_staff === false && user?.users_that_are_doctors[0]?.active === false) {
                        return <>
                            <section>
                                <img className="image" src={user.users_that_are_doctors[0].image_url} width="300px" alt=""></img>
                                <div>Dr. {user?.first_name} {user?.last_name}</div>
                                </section>
                            <section>
                                <div>{user?.users_that_are_doctors[0]?.bio}</div>
                            </section>
                            <button onClick={()=>activate(user.users_that_are_doctors[0].id)}>Activate</button>
                        </>
                    }
                })
            }
        </section>
    </section>
}

