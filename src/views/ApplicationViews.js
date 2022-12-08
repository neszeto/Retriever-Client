import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { NewPatientForm } from "../components/patients/NewPatientForm"
import { PatientChart } from "../components/patients/PatientChart"
import { PatientList } from "../components/patients/PatientList"
import { NewPatientRecord } from "../components/records/NewPatientRecord"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                <Route path="/" element={<PatientList />} />
                <Route path="/newPatientForm" element={<NewPatientForm />} />
                <Route path="/Patient/:patientId" element={<PatientChart />} />
                <Route path="add_new_record/patient/:patientId" element={<NewPatientRecord />} />
                
                
            </Route>
        </Routes>
    </>
}