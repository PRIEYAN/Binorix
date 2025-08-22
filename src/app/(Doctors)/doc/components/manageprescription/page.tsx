"use client";
import React, { useState, useMemo, useEffect } from "react";
import { History, Calendar, Filter, CheckCircle, Building2, Search, AlertCircle, Activity } from "lucide-react";
import axios from "axios";

interface PastPrescription {
  _id: string;
  doctor: {
    name: string;
    nmrNumber: string;
    specialization: string;
    email: string;
    hospitalName: string;
    hospital: string;
  };
  patient: {
    name: string;
    PhoneNumber: string;
    email: string;
    gender: string;
  };
  medicines: {
    _id: string;
    name: string;
    quantity: string;
    timing: {
      morning: boolean;
      afternoon: boolean;
      night: boolean;
    };
    foodIntake: "Before Food" | "After Food";
    instructions: string;
  }[];
  advice: string;
  status: "completed";
  prescrptionID: string;
  CreatedDate: string;
  updatedDate: string;
  __v: number;
}

const formatTiming = (timing: PastPrescription['medicines'][0]['timing']) => {
  const times = [];
  if (timing.morning) times.push(' Morning');
  if (timing.afternoon) times.push(' Afternoon');
  if (timing.night) times.push(' Night');
  return times.join(', ') || 'Not specified';
};

export default function PastPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<PastPrescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch completed prescriptions from API
  const fetchCompletedPrescriptions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.post('http://localhost:5050/doctor/prescription/completedPrescription', { token });

      if (response.status === 200) {
        console.log('API Response:', response.data);
        
        // Check if response contains a message indicating no prescriptions
        if (response.data && response.data.message && response.data.message.includes('No prescriptions found')) {
          setPrescriptions([]);
          setError(null);
        }
        // Handle the new response structure with message and prescriptions array
        else if (response.data && response.data.message === 'Prescriptions fetched successfully' && Array.isArray(response.data.prescriptions)) {
          setPrescriptions(response.data.prescriptions);
          setError(null);
        }
        // Fallback: Check if response.data is directly an array
        else if (Array.isArray(response.data)) {
          setPrescriptions(response.data);
          setError(null);
        } else {
          console.log('No prescriptions data found, setting empty array');
          setPrescriptions([]);
          setError(null);
        }
      } else {
        throw new Error('Failed to fetch prescriptions');
      }
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
      setError(error.response?.data?.message || error.message || 'Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch prescriptions on component mount
  useEffect(() => {
    fetchCompletedPrescriptions();
  }, []);



  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-center py-12">
          <Activity className="w-8 h-8 text-blue-500 animate-spin mr-3" />
          <span className="text-lg text-gray-600">Loading past prescriptions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Prescriptions</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCompletedPrescriptions}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <History className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Past Prescriptions</h2>
        </div>
        <button
          onClick={fetchCompletedPrescriptions}
          className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>
      <p className="text-gray-600 mb-6">View and manage completed prescription history</p>



      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-green-600 to-green-700">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Prescription ID
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Patient Details
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Medicine Details
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Timing
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Food Intake
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Doctor's Advice
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <React.Fragment key={prescription._id}>
                {prescription.medicines.map((medicine, medIndex) => (
                  <tr
                    key={`${prescription._id}-${medIndex}`}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Prescription ID - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col">
                          <span className="font-bold text-green-600">{prescription.prescrptionID}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(prescription.CreatedDate).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    ) : null}

                    {/* Patient Details - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{prescription.patient.name}</span>
                          <span className="text-sm text-gray-600">{prescription.patient.PhoneNumber}</span>
                          <span className="text-xs text-gray-500">{prescription.patient.email}</span>
                        </div>
                      </td>
                    ) : null}

                    {/* Medicine Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{medicine.name}</span>
                          <span className="text-sm text-gray-600">Qty: {medicine.quantity}</span>
                          {medicine.instructions && (
                            <span className="text-xs text-gray-500 mt-1">{medicine.instructions}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Timing */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{formatTiming(medicine.timing)}</span>
                    </td>

                    {/* Food Intake */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">
                        {medicine.foodIntake === 'Before Food' ? ' Before Food' : ' After Food'}
                      </span>
                    </td>

                    {/* Doctor's Advice - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <span className="text-sm text-gray-700">{prescription.advice}</span>
                      </td>
                    ) : null}

                    {/* Status - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 text-center align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col items-center gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Completed
                          </div>
                          <span className="text-xs text-gray-500">
                            Updated: {new Date(prescription.updatedDate).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {prescriptions.length === 0 && (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <History className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No past prescriptions found</h3>
            <p className="text-gray-600">Completed prescriptions will appear here</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border-2 bg-green-100 text-green-800 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Completed</p>
              <p className="text-2xl font-bold">{prescriptions.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 bg-blue-50 text-blue-800 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Patients</p>
              <p className="text-2xl font-bold">{new Set(prescriptions.map(p => p.patient.name)).size}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 bg-purple-50 text-purple-800 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Medicines</p>
              <p className="text-2xl font-bold">{prescriptions.reduce((total, p) => total + p.medicines.length, 0)}</p>
            </div>
            <Building2 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}