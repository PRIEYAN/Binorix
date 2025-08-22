'use client';
import { useState } from "react";
import SearchPatient from "../dashboard/Searchpatient";
import PatientDetails from "../dashboard/PatientDetails";
import PrescriptionTable from "../dashboard/PrescriptionTable";

interface Patient {
  name: string;
  email: string;
  PhoneNumber: string;
  gender: string;
  otherDetails: string;
}

export default function MobileNumberSearch() {
    const [status, setStatus] = useState<string>("idle");
    const [patient, setPatient] = useState<Patient | null>(null);

    const handlePatientFound = (foundPatient: Patient) => {
        setStatus("success");
        setPatient(foundPatient);
    };

    const handlePatientNotFound = () => {
        setStatus("error");
        setPatient(null);
    };

    const handlePrescriptionComplete = () => {
        setStatus("idle");
        setPatient(null);
    };

  return(
    <>
     <SearchPatient 
        onPatientFound={handlePatientFound}
        onPatientNotFound={handlePatientNotFound}
     />
     <PatientDetails status={status} patient={patient} />
     <PrescriptionTable 
        patient={patient} 
        onPrescriptionComplete={handlePrescriptionComplete}
     />
    </>
  );
}
