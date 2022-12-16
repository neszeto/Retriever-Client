import { getToken } from "./AuthManager"

export const activateDoctor = (id) => {
    return fetch(`http://localhost:8000/doctors/${id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
        
     })
       
}

export const updateDoctor = (event, id) => {
    return fetch(`http://localhost:8000/doctors/${id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(event)
     })
       
}

export const getDoctorById = (id) => {
    return fetch(`http://localhost:8000/doctors/${id}`, {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())

}