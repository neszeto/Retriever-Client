import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOwnerById, updateOwner } from "../../managers/OwnerManager"




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



return <>
    <section className="Owner_info">
        <div>{currentOwner.name}</div>
        <div>Phone: {currentOwner.phone_number}</div>
        <div>Email: {currentOwner.email}</div>
        <div>Address: {currentOwner.address}</div>
    </section>
    <button onClick={()=>setReveal(true)}>Edit</button>
    {
        revealForm
        ? <fieldset>
             <section>
                <label className="form_headers" htmlFor="owner_name">Name: </label>
                <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="name" value={currentOwner.name}/>
                <label className="form_headers" htmlFor="owner_email">Email: </label>
                <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="email" value={currentOwner.email}/>
            </section>
            <section>
                <label className="form_headers" htmlFor="owner_phone">Phone Number: </label>
                <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="phone_number" value={currentOwner.phone_number}/>
                <label className="form_headers" htmlFor="owner_address">Address: </label>
                <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="address" value={currentOwner.address}/>
            </section>
            <button onClick={(evt)=>saveOwnerInfo(evt)}>Save</button>

        </fieldset>
        : ""
    }
    <button onClick={()=>{navigate(`/`)}}>back</button>
</>
}