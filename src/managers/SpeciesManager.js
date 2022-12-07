export const getSpecies = () => {
    return fetch("http://localhost:8000/species", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        }
    })
        .then(response => response.json())
}


