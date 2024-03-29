export const loginUser = (user) => {
    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
       
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }
  
  export const registerUser = (user) => {
    return fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }

  export const getToken = () => {
    let tokenObject = localStorage.getItem("re_token")
    let parsedToken = JSON.parse(tokenObject)
    let token = parsedToken.token
    return token
  }

  export const isStaff = () => {
    let tokenObject = localStorage.getItem("re_token")
    let parsedToken = JSON.parse(tokenObject)
    let staff = parsedToken.staff
    return staff
  }

