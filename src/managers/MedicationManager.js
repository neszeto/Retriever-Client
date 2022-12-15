import { getToken } from "./AuthManager"

export const getMedications = () => {
    return fetch("http://localhost:8000/medications", {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const createMedication= (event) => {
    return fetch("http://localhost:8000/medications", {
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