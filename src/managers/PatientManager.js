import { getToken } from "./AuthManager"





export const getPatients = () => {
    return fetch("http://localhost:8000/patients", {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const createPatient= (event) => {
    return fetch("http://localhost:8000/patients", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(event)
     })
        .then(response => response.json())
}

export const getPatientById = (id) => {
    return fetch(`http://localhost:8000/patients/${id}`, {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())

}

export const updatePatient= (event, id) => {
    return fetch(`http://localhost:8000/patients/${id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(event)
     })
        
}