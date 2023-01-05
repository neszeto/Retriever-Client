# Retriever

### *Retriever is software that allows targeted retrieval of veterinary medical records*

## Application Overview
Most veterinary software systems are built in a way that makes retrieving targeted medical records tedious and time consuming. Retriever was designed to be an intuitive and targeted retrieval of medical records based on the needs of a practicing veterinarian. 

This project is my fullstack capstone, the culmination of a 6 month intensive full stack coding bootcamp. My goals were to explore the power of server side by incorporating complex logic on server side thereby lightening client side's responsibility, gain more experience with css by creating a website in dark mode without the use of bootstrapped components and create a seamless and intuitive user experience. 

## Features
* Doctors can create/edit/delete their own medical records and addendums
* Hospital managers can view/activate/deactivate doctor profiles
* All users can view all patient medical records, addendums, patient and owner information
* All users can edit/create new patients and owners
* All users can filter all patients by species, diagnosis, medication, patient and owner names.
* All users can filter all patient medical records by medication and diagnosis

## Technology Used
<img src="./README_images/cloudinary_logo_blue_0720.png" width="100px" />
<img src="./README_images/JavaScript.png" width="100px" height="35px"/>
<img src="./README_images/react.png" width="100px"height="35px"/>
<img src="./README_images/VSCode.png" width="100px"/>
<img src="./README_images/fontawesome.webp" width="100px"/>
<img src="./README_images/python.png" width="100px"/>
<img src="./README_images/django.png" width="100px"/>



## Running This Application

***Disclaimer:** This application uses mock authentication for demonstration purposes. As such, the login and registration are completely insecure and would not be implemented in a professional application.*

1.  Clone this repository and change to this directory in the terminal.
```
git clone git@github.com:neszeto/pupdates.git
cd pupdates
```
2. Start development server
```
npm install --save react-router-dom
npm start
```

3. Clone the api repository and connect JSON
```
git clone git@github.com:neszeto/pupdates-api.git
cd pupdates-api
json-server database.json -p 8088 -w
```

## Demo User Login
To view the application as a registered user, please sign in using the following email: **steve@gmail.com**

OR register and sign in as a new user 

## Demo
<a href="https://www.loom.com/share/1562df223d744ff09c7c28a156e7f367">![Demo](./README_images/demo.gif)</a>

## ERD
<img src="./README_images/ERD.png" />

### Created By Nora Szeto 
### View my <a href="https://www.linkedin.com/in/nora-szeto/" target="_blank">Linkedin</a>

