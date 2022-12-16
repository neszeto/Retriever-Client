import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoctorById, updateDoctor } from "../../managers/DoctorManager"
import { getUsers } from "../../managers/UsersManager"

export const EditDoctors = () => {
    const { doctorId } = useParams()
    let navigate = useNavigate()

    const [doctor, setDoctor] = useState([])
    const [deactivate, setDeactivate] = useState(true)

    useEffect(
        () => {
        
            getDoctorById(doctorId).then(doctor=>setDoctor(doctor))
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
            const copy = structuredClone(doctor)
            copy.image_url = result.info.url
            setDoctor(copy)
        }})
        widget.open()
      }

    const onUpdate = () => {
        const updatedDoctor = {
            imageUrl: doctor.image_url,
            bio: doctor.bio,
            active: deactivate
        }
        updateDoctor(updatedDoctor, doctorId)
        .then(()=>navigate(`/doctors`))
        
    }
    return <>
        <div>Edit Doctor Profile</div>
        <fieldset>
            <div className="upload_preview">
                <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                <div>Image Preview: </div>
                <img src={doctor.image_url} width="100px"/>
            </div>
            <label className="form_bio" htmlFor="bio">Veterinarian Bio</label>
            <textarea value={doctor.bio} id="bio" className="text_bio"  onChange={(evt) => {
                                const copy = structuredClone(doctor)
                                copy.bio = evt.target.value
                                setDoctor(copy)
                            }}/>
            <label className="form_active" htmlFor="active">Deactivate Profile
                <input onChange = {() => {
                {
                    deactivate
                    ? setDeactivate(false)
                    : setDeactivate(true)
                }
            } } id="active" type="checkbox"/>
            </label>
        </fieldset>
        <button onClick={onUpdate}>Update</button>

    </>

}