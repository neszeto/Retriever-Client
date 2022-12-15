import { getToken } from "./AuthManager"

export const createDiagnosis= (event) => {
    return fetch("http://localhost:8000/diagnoses", {
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