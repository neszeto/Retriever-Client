export const getPatientRecords = (id) => {
    return fetch(`http://localhost:8000/medicalRecords?patient=${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        }
    })
        .then(response => response.json())
}