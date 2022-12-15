import { getToken } from "./AuthManager"

export const getSpecies = () => {
    return fetch("http://localhost:8000/species", {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}


