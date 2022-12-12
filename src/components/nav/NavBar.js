import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="nav-item">
                <Link style={{textDecoration: 'none'}} className="nav-item" to='/'>Patient List</Link>
            </li>
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