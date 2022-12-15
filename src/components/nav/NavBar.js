import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { getLoggedInUser } from "../../managers/UsersManager"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    const [loggedinUser, setUser] = useState({})

    useEffect(
        () => {
            getLoggedInUser().then((user)=> setUser(user))
        },[]
    )

   

    return (
        <>
            <ul className="navbar">
            {
                (localStorage.getItem("re_token") !== null) 
                ?
                <>  
                    <div>
                        <div>Logged In As: Dr. {loggedinUser[0]?.first_name} {loggedinUser[0]?.last_name}</div>
                    </div>
                    <li className="nav-item">
                        <Link style={{textDecoration: 'none'}} className="nav-item" to='/'>Patient List</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item"
                            onClick={() => {
                                localStorage.removeItem("re_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li>
                </> 
                : ""
            }            
            </ul>
            <Outlet/>
        </>
    )
}