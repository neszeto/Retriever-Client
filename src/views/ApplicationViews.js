import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { OwnerDetails } from "../components/owners/OwnerDetails"
import { NewPatientForm } from "../components/patients/NewPatientForm"
import { PatientChart } from "../components/patients/PatientChart"
import { PatientDetails } from "../components/patients/PatientDetails"
import { PatientList } from "../components/patients/PatientList"
import { NewPatientRecord } from "../components/records/NewPatientRecord"
import { Addendum } from "../components/records/EditRecordAddendum"
import { Authorized } from "./Authorized"
import { ViewAddendum } from "../components/records/ViewRecordAddendum"
import { NavBar } from "../components/nav/NavBar"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                <Route path="/" element={<NavBar />}>
                    <Route index element={<PatientList />} />
                    <Route path="/newPatientForm" element={<NewPatientForm />} />
                    <Route path="/Patient/:patientId" element={<PatientChart />} />
                    <Route path="add_new_record/patient/:patientId" element={<NewPatientRecord />} />
                    <Route path="/patient/:patientId/details" element={<PatientDetails/>} />
                    <Route path="/owner/:ownerId" element={<OwnerDetails />} />
                    <Route path="/edit_record/:recordId" element={<Addendum />} />
                    <Route path="/view_record/:recordId" element={<ViewAddendum />} />
                </Route>

              
            
            </Route>
        </Routes>
    </>
}