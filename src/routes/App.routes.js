import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../pages/layouts/AppLayout";
import Login from "../pages/auth/Login";
import Home from "../components/home/Home";
import Doctor from "../components/doctors/Doctor";
import Schedule from "../components/schedules/Schedule";
import AppointmentList from "../components/appointments/subComponents/AppointmentList";
import Prescription from "../components/prescriptions/Prescription";
import NoticeBoard from "../components/notices/NoticeBoard";
import Profile from "../components/profile/Profile";
import Patient from "../components/patients/Patient";
import Bed from "../components/beds/Bed";
import Message from "../components/messages/Message";
import HospitalActivities from "../components/hospitals/HospitalActivities";
import PatientQueue from "../components/patients/subComponents/PatientQueue";
import VisitPatient from "../components/patients/subComponents/VisitPatient";


const LoginElement = () => <Login />;

const DashboardElement = () => (
    <AppLayout>
        <Home />
    </AppLayout>
);

const DoctorElement = () => (
    <AppLayout>
        <Doctor />
    </AppLayout>
);

const PatientElement = () => (
    <AppLayout>
        <Patient />
    </AppLayout>
);

const PatientQueueElement = () => (
    <AppLayout>
        <PatientQueue />
    </AppLayout>
)

const PatientQueueVisitElement = () => (
    <AppLayout>
        <VisitPatient />
    </AppLayout>
)

const ScheduleElement = () => (
    <AppLayout>
        <Schedule />
    </AppLayout>
);

const AppointmentElement = () => (
    <AppLayout>
        <AppointmentList />
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


const App = () => {
    return (
        <React.Fragment>
            <Routes>
                
                <Route>
                    <Route path="/login" element={<LoginElement />} />
                </Route>

                <Route>
                    <Route path="/" element={<DashboardElement />} />
                    <Route path="/doctor" element={<DoctorElement />} />

                    <Route path="/patients" element={<PatientElement />} />
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
                </Route>

            </Routes>
        </React.Fragment>
    );
};

export default App;
