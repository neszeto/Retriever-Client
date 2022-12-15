import { getToken } from "./AuthManager"

export const createAddendum= (event) => {
    return fetch(`http://localhost:8000/addendums`, {
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

export const deleteAddendum= (id) => {
    return fetch(`http://localhost:8000/addendums/${id}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${getToken()}`
        },
       
     })
}


