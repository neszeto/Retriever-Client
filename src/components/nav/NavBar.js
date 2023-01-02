import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { isStaff } from "../../managers/AuthManager"
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
        <section className="entire_nav">
            <div className="retriever">Retriever | <i className="tag">Veterinary Software</i></div>
            <ul className="navbar">
            {
                (localStorage.getItem("re_token") !== null) 
                ?
                <>  
                    <div>
                        {
                            isStaff()
                            ? <div className="logged_in_user">
                                <div className="doctor_greeting">Welcome, {loggedinUser[0]?.first_name} {loggedinUser[0]?.last_name}</div>
                                <div class="topnav" id="myTopnav">
                                        <div class="dropdown">
                                            <button class="dropbtn"><i class="fa-solid fa-circle-chevron-down"></i>
                                            </button>
                                            <div class="dropdown-content">
                                                <Link style={{textDecoration: 'none'}} className="nav-item" to='/doctors'><i class="fa-solid fa-user-doctor fa-xs"></i> Doctors</Link>
                                                <Link style={{textDecoration: 'none'}} className="nav-item" to='/'><i class="fa-solid fa-paw fa-xs"></i> Patients</Link>
                                                <Link className="nav-item" to='/login'
                                                        onClick={() => {
                                                            localStorage.removeItem("re_token")
                                                        }}
                                                    >Logout</Link>    
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            : <div className="logged_in_user">
                                <div className="doctor_greeting">Welcome, Dr. {loggedinUser[0]?.first_name} {loggedinUser[0]?.last_name}</div>
                               
                                <img className="nav_image" src={loggedinUser[0]?.users_that_are_doctors[0]?.image_url} />
                                <div class="topnav" id="myTopnav">
                                    <div class="dropdown">
                                        <button class="dropbtn"><i class="fa-solid fa-sort-down"></i>
                                        </button>
                                        <div class="dropdown-content">
                                            <Link style={{textDecoration: 'none'}} className="nav-item" to='/'><i class="fa-solid fa-paw fa-xs"></i> Patients</Link>
                                            <Link className="nav-item" to='/login'
                                                    onClick={() => {
                                                        localStorage.removeItem("re_token")
                                                    }}
                                                >Logout</Link>
                                            
                                        </div>
                                    </div>    
                                </div> 
                            </div>
                        }
                        
                    </div>
                    
                </> 
                : ""
            }            
            </ul>
            <Outlet/>
        </section>
    )
}