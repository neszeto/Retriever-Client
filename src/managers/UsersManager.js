export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        }
    })
        .then(response => response.json())
}

export const getLoggedInUser = () => {
    return fetch("http://localhost:8000/users?loggedin=true", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("re_token")}`
        }
    })
        .then(response => response.json())
}