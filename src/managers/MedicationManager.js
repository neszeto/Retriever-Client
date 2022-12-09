export const getMedications = () => {
    return fetch("http://localhost:8000/medications", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
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
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        },
        body: JSON.stringify(event)
     })
        .then(response => response.json())
}