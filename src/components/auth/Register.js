import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Register.css"


export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const [isStaff, setIsStaff] = useState(false)
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "is_staff": isStaff
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("re_token", JSON.stringify(res))
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="whole_register_form" style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <div className="register_input">
                    <label className="register_header" htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control-register" placeholder="First name" required autoFocus />
                </div>
                <div className="register_input">
                    <label className="register_header" htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control-register" placeholder="Last name" required />
                </div>
                <div className="register_input">
                    <label className="register_header" htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control-register" placeholder="Username" required />
                </div>
                <div className="register_input">
                    <label className="register_header" htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control-register" placeholder="Password" required />
                </div>
                <div className="register_input">
                    <label className="register_header" htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control-register" placeholder="Verify password" required />
                </div>
                <div className="register_input">
                    <label className="register_header" htmlFor="verifyPassword"> Email </label>
                    <input ref={email} name="email" className="form-control-register" placeholder="Email" />
                </div>
                <div className="hospital_manager" >
                    <label className="form_manager" htmlFor="manager">Hospital Manager
                        <input onChange = {() => {
                        const copy = structuredClone(isStaff)
                        {
                            isStaff
                            ? setIsStaff(false)
                            : setIsStaff(true)
                        }
                    } } id="manager" type="checkbox" onSubmit={handleRegister}/>
                    </label>
                </div>
                <button className="register_newuser_button" type="submit">Register</button>
            </form>
            <section className="link--register">
                Already registered? <Link className="register_login_link" to="/login">Login</Link>
            </section>
        </main>
    )
}