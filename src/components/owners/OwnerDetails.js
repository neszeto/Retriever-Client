import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOwnerById, updateOwner } from "../../managers/OwnerManager"
import "./OwnerDetails.css"



export const OwnerDetails = () => {
    const { ownerId } = useParams()
 
    const [currentOwner, setCurrent] = useState({})
    const [revealForm, setReveal] = useState(false)
    
    let navigate = useNavigate()
    const fetchOwner = () => {
        getOwnerById(ownerId).then(owner=>setCurrent(owner))
    }

    useEffect(
        () => {
            fetchOwner()
            
        }, []
    )

    const changeOwnerState = (domEvent) => {
        const newEvent = Object.assign({}, currentOwner)
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrent(newEvent)
    }

    const saveOwnerInfo = (evt) => {
        evt.preventDefault()
        
        setReveal(false)

        const ownerInfo = {
            name: currentOwner.name,
            phoneNumber: currentOwner.phone_number,
            email: currentOwner.email,
            address: currentOwner.address
        }
        updateOwner(ownerInfo, ownerId)
       
    }



return <section className="whole_owner_page">
    <section className="Owner_info">
        <div className="owner_name">{currentOwner.name}<button className="owner_edit_button" onClick={()=>setReveal(true)}><i class="fa-solid fa-pen-to-square fa-lg"></i></button></div>
        <div className="owner_sub_info"><b>Phone:</b> {currentOwner.phone_number}</div>
        <div className="owner_sub_info"><b>Email:</b> {currentOwner.email}</div>
        <div className="owner_sub_info"><b>Address:</b> {currentOwner.address}</div>
    </section>
    
    {
        revealForm
        ? <div className="edit_owner_form">
             <section>
                <div className="owner_header">
                    <label className="form_headers" htmlFor="owner_name">Name: </label>
                    <input className="form_input_owner" required autoFocus type="text" onChange = {changeOwnerState} name="name" value={currentOwner.name}/>
                </div>
                <div className="owner_header">
                    <label className="form_headers" htmlFor="owner_phone">Phone Number: </label>
                    <input className="form_input_owner" required autoFocus type="text" onChange = {changeOwnerState} name="phone_number" value={currentOwner.phone_number}/>
                </div>
            </section>
            <section>
                <div className="owner_header">
                    <label className="form_headers" htmlFor="owner_email">Email: </label>
                    <input className="form_input_owner" required autoFocus type="text" onChange = {changeOwnerState} name="email" value={currentOwner.email}/>
                </div>
                <div className="owner_header">
                    <label className="form_headers" htmlFor="owner_address">Address: </label>
                    <input className="form_input_owner" required autoFocus type="text" onChange = {changeOwnerState} name="address" value={currentOwner.address}/>
                </div>
            </section>
            <section className="save_button_container">
            <button className="owner_save_button"onClick={(evt)=>saveOwnerInfo(evt)}>Save</button>
            </section>

        </div>
        : ""
    }
    
</section>
}