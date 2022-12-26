import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPatientById, updatePatient } from "../../managers/PatientManager"
import { getSpecies } from "../../managers/SpeciesManager"
import "./PatientDetails.css"



export const PatientDetails = () => {
    const { patientId } = useParams()
    const [currentDetails, setCurrentDetails] = useState({})
    const [species, setSpecies] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            getPatientById(patientId).then(patient=>setCurrentDetails(patient))
            getSpecies().then((species)=>setSpecies(species))
        }, []
    )


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
            const copy = structuredClone(currentDetails)
            copy.image_url = result.info.url
            setCurrentDetails(copy)
        }})
        widget.open()
      }

    const changeState = (domEvent) => {
        const newEvent = Object.assign({}, currentDetails)
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentDetails(newEvent)
    }

    const updatePatientDetails = (evt) => {
        evt.preventDefault()

        const updatedDetails = {
            name: currentDetails.name,
            breed: currentDetails.breed,
            age: currentDetails.age,
            color: currentDetails.color,
            weight: currentDetails.weight,
            sex: currentDetails.sex,
            speciesId: parseInt(currentDetails.species.id),
            image_url: currentDetails.image_url,
            deceased: currentDetails.deceased
        }
        updatePatient(updatedDetails, patientId)
        .then(
            () => {
                navigate(`/Patient/${patientId}`)
            }
        )

    }

    return <div className="whole_edit_pet_page">
        <button className="back_to_chart" onClick={()=>navigate(`/Patient/${patientId}`)}><i class="fa-solid fa-arrow-left-long"></i> Patient Chart</button>
        <div className="Edit_patient_form"><b>Edit Patient Details <i class="fa-solid fa-angles-right fa-sm"></i></b>
            <div className = "Pet_info">
                <section className="pet_input">
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_name">Name: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeState} name = "name" value={currentDetails.name}/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Breed: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeState} name = "breed" value={currentDetails.breed}/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Age: </label>
                        <div className="line_units">
                            <input className="form_input_num" required autoFocus type="number" onChange = {changeState} name = "age" value={currentDetails.age}/> years 
                        </div>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Color: </label>
                        <input className="form_input" required autoFocus type="text" onChange = {changeState} name = "color" value={currentDetails.color}/>
                    </div>
                    <div className="line">
                        <label className="form_headers" htmlFor="owner_email">Weight: </label>
                        <div className="line_units">
                            <input className="form_input_num" required autoFocus type="number" onChange = {changeState} name = "weight" value={currentDetails.weight}/> lbs
                        </div>
                    </div>
                </section>
            
                <section>
                    <div className="line_select">
                        <input type="radio" id="male" name="sex" onChange = {changeState} value="Male" checked={currentDetails.sex === "Male" ? "yes" : ""}/>
                        <label for="male">Male</label>
                        <input className="female_input" type="radio" id="female" name="sex" onChange = {changeState} value="Female" checked={currentDetails.sex === "Female" ? "yes" : ""}/>
                        <label for="female">Female</label>
                    </div>
                    <div className="line">

                        <select id="species" className="form_select" onChange = {changeState} name = "speciesId">
                            <option value="">{currentDetails?.species?.species}</option>
                            {
                                species.map(species => <option value={species.id} key={species.id}>{species.species}</option>)
                            }
                        </select>
                    </div>
                    <div className="upload_preview">
                        <button className="form_upload_button" value={currentDetails.image_url} onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        <div className="image_preview">Image Preview: </div>
                        <img className="image_pet" src={currentDetails.image_url} width="100px"/>
                    </div>
                </section>
            </div>
            <div className="deceased">
                <label className="form_deceased" htmlFor="deceased">Deceased
                <input id="deceased" type="checkbox" checked={currentDetails.deceased? "yes" : ""} onChange = {() => {
                                const copy = structuredClone(currentDetails)
                                {
                                    currentDetails.deceased 
                                    ? copy.deceased = false 
                                    : copy.deceased = true
                                }
                                setCurrentDetails(copy)
                            } } value={currentDetails.deceased}/>
                </label>
            </div>
        </div>
        <button className="update_pet_button" onClick={(evt)=>updatePatientDetails(evt)}>Update</button>
        
    </div>
    
}