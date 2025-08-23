import React from "react";
import { User, Mail, Phone, Venus, Stethoscope } from "lucide-react";

interface Patient {
  name: string;
  email: string;
  PhoneNumber: string;
  gender: string;
  address: string;
}

interface PatientDetailsProps {
  status: string;
  patient: Patient | null;
}

export default function PatientDetails({ status, patient }: PatientDetailsProps) {
  if (!patient) {
    if (status === 'error') {
      return (
        <div className="w-full mx-auto mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600 text-center">Patient not found. Please check the mobile number and try again.</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="w-full mx-auto mt-6 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Details</h2>
      <div className="flex p-6 flex-row justify-start items-center">
        <div className="flex flex-row gap-4 items-start justify-center pr-4 border-r border-gray-300">
            <div className="flex flex-row gap-4 items-center">
                <User className="text-blue-600" size={28} />
                <span className="font-semibold text-gray-800">{patient.name}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Mail className="text-blue-600" size={28} />
                <span className="font-semibold text-gray-700">{patient.email}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Phone className="text-blue-600" size={28} />
                <span className="font-semibold text-gray-700">{patient.PhoneNumber}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Venus className="text-blue-600" size={28} />
                <span className="font-semibold text-gray-700">{patient.gender}</span>
            </div>
            <div className="flex flex-row gap-4 items-center justify-start">
                <Stethoscope className="text-blue-600" size={28} />
                <span className="font-semibold text-gray-700">{patient.address}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
