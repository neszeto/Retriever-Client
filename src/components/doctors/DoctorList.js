import { useEffect, useState } from "react"
import { getUsers } from "../../managers/UsersManager"


export const Doctors = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            getUsers().then(users=>setUsers(users))

        }, []
    )
    return <div>hello</div>
}