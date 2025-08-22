'use client';
import { useEffect,useState } from "react";
import SearchPatient from "../dashboard/Searchpatient";
import PatientDetails from "../dashboard/PatientDetails";
import PrescriptionTable from "../dashboard/PrescriptionTable";

interface Patient {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  issues: string;
}

export default function MobileNumberSearch() {
    const [status, setStatus] = useState<string>("");
    const [patient, setPatient] = useState<Patient | null>(null);

  return(
    <>
     <SearchPatient/>
     <PatientDetails status={status} patient={patient} />
     <PrescriptionTable/>
    </>
  );
}