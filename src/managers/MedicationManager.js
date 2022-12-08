export const getMedications = () => {
    return fetch("http://localhost:8000/medications", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        }
    })
        .then(response => response.json())
}