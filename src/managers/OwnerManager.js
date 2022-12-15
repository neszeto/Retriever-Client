import { getToken } from "./AuthManager"

export const createOwner = (event) => {
    return fetch("http://localhost:8000/owners", {
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

export const getOwnerById = (id) => {
    return fetch(`http://localhost:8000/owners/${id}`, {
        headers:{
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateOwner = (event, id) => {
    return fetch(`http://localhost:8000/owners/${id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(event)
     })
       
}
