import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../pages/layouts/AppLayout";
import Login from "../pages/auth/Login";
import Home from "../components/home/Home";
import Users from "../components/users/Users";
import Schedule from "../components/schedules/Schedule";
import Prescription from "../components/prescriptions/Prescription";
import NoticeBoard from "../components/notices/NoticeBoard";
import Profile from "../components/profile/Profile";
// import Patient from "../components/patients/Patient";
import Bed from "../components/beds/Bed";
import Message from "../components/messages/Message";
import HospitalActivities from "../components/hospitals/HospitalActivities";
import PatientQueue from "../components/patients/subComponents/PatientQueue";
import IPDVisitPatient from "../components/patients/subComponents/IPDVisitPatient";
import Appointment from "../components/appointments/Appointment";
import Blood from "../components/blood/Blood";
import Report from "../components/report/Report"
import Category from "../components/pharmacy/Category";
import Medicine from "../components/pharmacy/Medicine";
import Medication from "../components/pharmacy/Medication";
import AddMedication from "../components/pharmacy/medications/AddMedication";
import PatientModules from "../components/patients/PatientModules";
import Reception from "../components/patients/reception/Reception";

const LoginElement = () => <Login />;

const DashboardElement = () => (
    <AppLayout>
        <Home />
    </AppLayout>
);

const UsersElement = () => (
    <AppLayout>
        <Users />
    </AppLayout>
);

const PatientElement = () => (
    <AppLayout>
        <PatientModules />
        {/* <Patient /> */}
    </AppLayout>
);

const ReceptionElement = () => (
    <AppLayout>
        <Reception />
    </AppLayout>
)

const PatientQueueElement = () => (
    <AppLayout>
        <PatientQueue />
    </AppLayout>
)

// const PatientQueueVisitElement = () => (
//     <AppLayout>
//         <VisitPatient />
//     </AppLayout>
// )

const PatientQueueVisitElement = () => (
    <AppLayout>
        <IPDVisitPatient />
    </AppLayout>
)

const ScheduleElement = () => (
    <AppLayout>
        <Schedule />
    </AppLayout>
);

const AppointmentElement = () => (
    <AppLayout>
        <Appointment />
    </AppLayout>
);

const PrescriptionElement = () => (
    <AppLayout>
        <Prescription />
    </AppLayout>
);

const NoticeBoardElement = () => (
    <AppLayout>
        <NoticeBoard />
    </AppLayout>
);

const BedElement = () => (
    <AppLayout>
        <Bed />
    </AppLayout>
);

const HospitalElement = () => (
    <AppLayout>
        <HospitalActivities />
    </AppLayout>
)

const MessageElement = () => (
    <AppLayout>
        <Message />
    </AppLayout>
)

const ProfileElement = () => (
    <AppLayout>
        <Profile />
    </AppLayout>
);

const BloodElement = () => (
    <AppLayout>
        <Blood />
    </AppLayout>
);

const ReportElement = () => (
    <AppLayout>
        <Report />
    </AppLayout>
);

//pharmacy routes
const CategoryElement = () => (
    <AppLayout>
        <Category />
    </AppLayout>
);


const MedicineElement = () => (
    <AppLayout>
        <Medicine />
    </AppLayout>
);


const MedicationElement = () => (
    <AppLayout>
        <Medication />
    </AppLayout>
);

const EditMedicationElement = () => (
    <AppLayout>
        <AddMedication />
    </AppLayout>
);



const App = () => {
    return (
        <React.Fragment>
            <Routes>
                
                <Route>
                    <Route path="/login" element={<LoginElement />} />
                </Route>

                <Route>
                    <Route path="/" element={<DashboardElement />} />
                    <Route path="/users" element={<UsersElement />} />

                    <Route path="/patients" element={<PatientElement />} />
                    <Route path="/patients/reception" element={<ReceptionElement />} />

                    <Route path="/patients-queue" element={<PatientQueueElement />} />
                    <Route path="/patients-queue/:patientID" element={<PatientQueueVisitElement />} />

                    <Route path="/schedule" element={<ScheduleElement />} />
                    <Route path="/appointment" element={<AppointmentElement />} />
                    <Route path="/prescription" element={<PrescriptionElement />} />
                    <Route path="/notice-board" element={<NoticeBoardElement />} />
                    <Route path="/bed" element={<BedElement />} />
                    <Route path="/hospital-activities" element={<HospitalElement />} />
                    <Route path="/message" element={<MessageElement />} />
                    <Route path="/profile" element={<ProfileElement />} />
                    <Route path="/blood-bank" element={<BloodElement />} />
                    <Route path="/report" element={<ReportElement />} />

                    <Route path="/medicine-category" element={<CategoryElement />} />
                    <Route path="/manage-medicine" element={<MedicineElement />} />
                    <Route path="/medication" element={<MedicationElement />} />
                    <Route path="/medication/:prescriptionID" element={<EditMedicationElement />} />
                </Route>

            </Routes>
        </React.Fragment>
    );
};

export default App;
