import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import Retriever from "../assets/trees.jpeg"
import "./Login.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()
    

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("re_token", JSON.stringify(res))
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return <>
    <section className="link--register">
        <button className="register_button" onClick={() => navigate("/register")}>REGISTER</button>
    </section>
    <div className="image_signin">
        <img className="retriever_image" src={Retriever} />
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="title_login">
                        <div className="dog_icon"><i class="fa-solid fa-dog fa-xl"></i></div>
                        <div className="signin_name">Retriever</div>
                        <div className="signin_tag">Veterinary Software</div>
                        <section className="username_password">
                            <div className="login_input_username">
                                <label className="user_icon" htmlFor="inputUsername"> <i class="fa-solid fa-user fa-sm"></i> </label>
                                <input ref={username} type="username" id="username" className="login_input" placeholder="Username" required autoFocus />
                            </div>
                            <div>
                                <label className="user_icon" htmlFor="inputPassword"> <i class="fa-solid fa-key fa-sm"></i> </label>
                                <input ref={password} type="password" id="password" className="login_input" placeholder="Password" required />
                            </div>
                        </section>
                    </div>
                    <div className="sign_in_button_container">
                        <div style={{
                            textAlign: "center"
                        }}>
                            <button className="signin_button" type="submit">SIGN IN</button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </div>
    </>
}