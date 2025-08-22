'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PatientDetails from './PatientDetails'; 

interface PatientData {
  name: string;
  age: number;
  gender: string;
  mobile: string;
  address: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: PatientData;
}

export default function SearchPatient() {
  const [numberPart, setNumberPart] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handleSearch = async () => {
    setError(null);
    setSuccessMsg(null);
  
    if (!/^\d{10}$/.test(numberPart)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Send as JSON object, not plain string
      const response = await axios.post(
        'http://localhost:5050/doctor/prescription/getPatientDetails',
        { PhoneNumber: numberPart },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 200 || response.status === 201) {
        if (response.data?.patient) {
          const Patient = response.data?.patient;
          setSuccessMsg('Mobile number is registered with Zypher.');
          setPatientData(response.data.patient);
          console.log(response.data.patient);
        } else {
          setError(response.data?.message || 'Mobile number not found.');
          setPatientData(null);
        }
      } else {
        setError('Unexpected server response.');
      }
    } catch (err: any) {
      console.error('Axios error:', err);
      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${
            err.response.data?.message || 'Unknown error'
          }`
        );
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
      setPatientData(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-2 max-w-md w-full">
        <div>
            <h1 className="font-bold text-2xl pb-5">Generate New Prescriptions</h1>
            <p className="pb-3">Enter  Patient Mobile no to verify details</p>
        </div>
      <div className="flex items-center border border-white rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center px-5 bg-white-100 text-gray-700 font-medium select-none">
          +91
        </div>
        <div className="h-12 border-l-2 border-red-400"></div>

        <input
          type="tel"
          value={numberPart}
          onChange={(e) => setNumberPart(e.target.value.replace(/\D/g, ''))} // digits only
          className="flex-1 px-2 py-2 focus:outline-none text-gray-800"
          placeholder="Enter mobile number"
          maxLength={10}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin w-5 h-5 border-t-2 border-white rounded-full"></span>
          ) : (
            <Search size={20} />
          )}
        </motion.button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}
      
      <PatientDetails
  status={patientData ? 'success' : error ? 'error' : 'idle'}
  patient={patientData}
/>
    </div>
  );
}
