import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoctorById, updateDoctor } from "../../managers/DoctorManager"
import "./EditDoctors.css"

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
    return <section className="whole_edit_doctor">
        <div>Edit Doctor Profile <i class="fa-solid fa-angles-right fa-sm"></i></div>
        <div className="image_bio_edit">
            <div className="doctor_upload_preview">
                <div className="doctor_image_preview_header">Image Preview: </div>
                <img src={doctor.image_url} width="200px"/>
                <button className="doctor_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
            </div>
            <div className="bio_header">
                <label className="form_bio" htmlFor="bio">Veterinarian Bio</label>
                <textarea value={doctor.bio} id="bio" className="text_bio_doctor"  onChange={(evt) => {
                                    const copy = structuredClone(doctor)
                                    copy.bio = evt.target.value
                                    setDoctor(copy)
                                }}/>
            </div>
        </div>
        <div>
            <label className="form_deactivate" htmlFor="active">Deactivate Profile
                <input onChange = {() => {
                {
                    deactivate
                    ? setDeactivate(false)
                    : setDeactivate(true)
                }
            } } id="active" type="checkbox"/>
            </label>
        </div>
        <div className="update_doctor_button_container">
            <button className="update_doctor_button" onClick={onUpdate}>Update</button>
        </div>

    </section>

}