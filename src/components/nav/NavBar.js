import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
        {
            (localStorage.getItem("re_token") !== null) ?
                <li className="nav-item">
                    <button className="nav-item"
                        onClick={() => {
                            localStorage.removeItem("re_token")
                            navigate('/login')
                        }}
                    >Logout</button>
                </li> : ""
        }        
        </ul>
    )
}