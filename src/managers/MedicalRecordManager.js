import { getToken } from "./AuthManager"

export const createMedicalRecord= (event, id) => {
    return fetch(`http://localhost:8000/medicalRecords?patient=${id}`, {
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

export const createMedicalRecordMedication= (event) => {
    return fetch("http://localhost:8000/medicalrecordmedications", {
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

export const getPatientRecords = (id) => {
    return fetch(`http://localhost:8000/medicalRecords?patient=${id}`, {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getMedicalRecordById = (id) => {
    return fetch(`http://localhost:8000/medicalRecords/${id}`, {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const deleteMedicalRecord= (id) => {
    return fetch(`http://localhost:8000/medicalRecords/${id}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
       
     })
}