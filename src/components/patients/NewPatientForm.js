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
    <section className="whole_new_pet_form">
        <div><b>Owner's Information <i class="fa-solid fa-angles-right fa-sm"></i></b>
            <div className = "Owner_info">
                <section className="owner_input">
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_name">Name: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="name"/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Email: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="email"/>
                    </div>
                
                </section>
                <section className="owner_input">
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_phone">Phone Number: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="phoneNumber"/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_address">Address: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeOwnerState} name="address"/>
                    </div>
                </section>
            </div>
        </div>
        <div><b>Pet's Information <i class="fa-solid fa-angles-right fa-sm"></i></b>
            <div className = "Pet_info">
                <section className="pet_input">
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_name">Name: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changePetState} name = "name"/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Breed: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changePetState} name = "breed"/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Age: </label>
                        <div className="line_units">
                            <input className="form_input_num" required autoFocus type="number" onChange = {changePetState} name = "age"/> years 
                        </div>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Color: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changePetState} name = "color"/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Weight: </label>
                        <div className="line_units">
                            <input className="form_input_num" required autoFocus type="number" onChange = {changePetState} name = "weight"/> lbs
                        </div>
                    </div>
                </section>
                <section>
                    <div className="line_select">
                        <input type="radio" id="male" name="sex" onChange = {changePetState} value="Male"/>
                        <label for="male">Male</label>
                        <input className="female_input" type="radio" id="female" name="sex" onChange = {changePetState} value="Female"/>
                        <label for="female">Female</label>
                    </div>
                    <div className="line">
                        <select id="species" className="form_select" onChange = {changePetState} name = "speciesId">
                            <option value="">Select Species</option>
                            {
                                species.map(species => <option value={species.id} key={species.id}>{species.species}</option>)
                            }
                        </select>
                    </div>
                    <div className="upload_preview">
                        <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        <div className="image_preview">Image Preview: </div>
                        <img className="image_pet" src={pet.image} width="100px"/>
                    </div>  
                </section>
            </div>
        </div>
    
    </section>
    <button className="add_patient_button" onClick = {Submit}>Add Patient</button>
    </>
}