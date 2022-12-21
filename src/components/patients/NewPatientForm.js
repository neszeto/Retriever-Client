import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createOwner } from "../../managers/OwnerManager"
import { createPatient } from "../../managers/PatientManager"
import { getSpecies } from "../../managers/SpeciesManager"

import "./NewPatientForm.css"


export const NewPatientForm = () => {
    let navigate = useNavigate()
    const [species, setSpecies] = useState([])
    const [owner, setOwner] = useState(
        {
            name: "",
            phoneNumber: "",
            email: "",
            address: ""
        }
    )
    const [pet, setPet] = useState(
        {
            name: "",
            breed: "",
            age: "",
            color: "",
            weight: "",
            sex: "",
            speciesId: 0, 
            image: ""

        }
    )

    useEffect(
        () => {
            getSpecies().then((species)=>setSpecies(species))
        }, []
    )

    const Submit = (event) => {
        event.preventDefault()

        const createdOwner = {
            name: owner.name,
            phoneNumber: owner.phoneNumber,
            email: owner.email,
            address: owner.address
        }

        createOwner(createdOwner)
        .then(
            (newlyCreatedOwner) => {
                const createdPet = {
                    name: pet.name,
                    breed: pet.breed,
                    age: pet.age,
                    color: pet.color,
                    weight: pet.weight,
                    sex: pet.sex,
                    speciesId: parseInt(pet.speciesId),
                    ownerId: newlyCreatedOwner.id,
                    image: pet.image
                }
                return createPatient(createdPet)
                
            }
        )
        .then(
            () => {
                navigate('/')
            }
        )
        
    }
    
    const showWidget = (event) => {
        event.preventDefault()
    
        let widget = window.cloudinary.createUploadWidget(
            { 
            cloudName: `pupdates`,
            uploadPreset: `pup_uploads`
            },
        (error, result) => {
          if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(pet)
            copy.image = result.info.url
            setPet(copy)
        }})
        widget.open()
      }
    
    const changeOwnerState = (domEvent) => {
        const newEvent = Object.assign({}, owner)
        newEvent[domEvent.target.name] = domEvent.target.value
        setOwner(newEvent)
    }

    const changePetState = (domEvent) => {
        const newEvent = Object.assign({}, pet)
        newEvent[domEvent.target.name] = domEvent.target.value
        setPet(newEvent)
    }
    
    return <>
    <fieldset className = "Owner_info">Owner's Information 
        <section>
            <label className="form_headers" htmlFor="owner_name">Name: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="name"/>
            <label className="form_headers" htmlFor="owner_email">Email: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="email"/>
        </section>
        <section>
            <label className="form_headers" htmlFor="owner_phone">Phone Number: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="phoneNumber"/>
            <label className="form_headers" htmlFor="owner_address">Address: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="address"/>
        </section>
    </fieldset>
    <fieldset className = "Pet_info">Pet's Information
        <section>
            <label className="form_headers" htmlFor="owner_name">Name: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changePetState} name = "name"/>
            <label className="form_headers" htmlFor="owner_email">Breed: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changePetState} name = "breed"/>
            <label className="form_headers" htmlFor="owner_email">Age: </label>
            <input className="form_input" required autoFocus type="number" onChange = {changePetState} name = "age"/> years 
            <label className="form_headers" htmlFor="owner_email">Color: </label>
            <input className="form_input" required autoFocus type="text" onChange = {changePetState} name = "color"/>
            <label className="form_headers" htmlFor="owner_email">Weight: </label>
            <input className="form_input" required autoFocus type="number" onChange = {changePetState} name = "weight"/> lbs
        </section>
        <section>
            <input type="radio" id="male" name="sex" onChange = {changePetState} value="Male"/>
            <label for="male">Male</label>
            <input type="radio" id="female" name="sex" onChange = {changePetState} value="Female"/>
            <label for="female">Female</label>
            <select id="species" className="form_input" onChange = {changePetState} name = "speciesId">
                <option value="">Select Species</option>
                {
                    species.map(species => <option value={species.id} key={species.id}>{species.species}</option>)
                }
            </select>
            <div className="upload_preview">
                <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                <div>Image Preview: </div>
                <img src={pet.image} width="100px"/>
            </div>
        </section>
    </fieldset>
    <button onClick = {Submit}>Add Patient</button>
    </>
}