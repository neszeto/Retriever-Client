export const getPatients = () => {
    return fetch("http://localhost:8000/patients", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
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
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        },
        body: JSON.stringify(event)
     })
        .then(response => response.json())
}