export const createMedicalRecord= (event, id) => {
    return fetch(`http://localhost:8000/medicalRecords?patient=${id}`, {
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

export const createMedicalRecordMedication= (event) => {
    return fetch("http://localhost:8000/medicalrecordmedications", {
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

export const getPatientRecords = (id) => {
    return fetch(`http://localhost:8000/medicalRecords?patient=${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        }
    })
        .then(response => response.json())
}