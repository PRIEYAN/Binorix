"use client";
import React, { useState, useEffect } from "react";
import { Activity, Clock, CheckCircle, AlertCircle, XCircle, Building2 } from "lucide-react";
import axios from "axios";

interface LivePrescription {
  _id: string;
  doctorWallet: string;
  patientWallet: string;
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
  status: "pending" | "processing" | "ready" | "completed" | "cancelled";
  prescrptionID: string;
  CreatedDate: string;
  updatedDate: string;
  __v: number;
}


const getStatusIcon = (status: LivePrescription['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'processing':
      return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
    case 'ready':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: LivePrescription['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ready':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'completed':
      return 'bg-green-200 text-green-900 border-green-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatTiming = (timing: LivePrescription['medicines'][0]['timing']) => {
  const times = [];
  if (timing.morning) times.push(' Morning');
  if (timing.afternoon) times.push(' Afternoon');
  if (timing.night) times.push(' Night');
  return times.join(', ') || 'Not specified';
};

export default function LivePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<LivePrescription[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.post('http://localhost:5050/doctor/prescription/getPrescriptionDetails', { token });

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
    fetchPrescriptions();
  }, []);

  // Simulate live updates and refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
      // Refresh data every 30 seconds
      if (Date.now() % 30000 < 1000) {
        fetchPrescriptions();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-center py-12">
          <Activity className="w-8 h-8 text-blue-500 animate-spin mr-3" />
          <span className="text-lg text-gray-600">Loading live prescriptions...</span>
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
            onClick={fetchPrescriptions}
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
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-red-400'} transition-all duration-300 ${isLive ? 'animate-pulse' : ''}`}></div>
          <h2 className="text-2xl font-bold text-gray-800">Live Prescriptions</h2>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Activity className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
          <span>Real-time updates</span>
        </div>
        <button
          onClick={fetchPrescriptions}
          className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>
      <p className="text-gray-600 mb-6">Monitor prescription status and pharmacy processing in real-time</p>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
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
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-600">{prescription.prescrptionID}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(prescription.CreatedDate).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    ) : null}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{prescription.patient.name}</span>
                          <span className="text-sm text-gray-600">{prescription.patient.PhoneNumber}</span>
                          <span className="text-xs text-gray-500">{prescription.patient.email}</span>
                        </div>
                      </td>
                    ) : null}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
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
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription.status)}`}>
                            {getStatusIcon(prescription.status)}
                            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
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
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No live prescriptions</h3>
            <p className="text-gray-600">Prescriptions will appear here as they are processed by pharmacies</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border-2 bg-blue-100 text-blue-800 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Currently Processing</p>
              <p className="text-2xl font-bold">{prescriptions.length}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 bg-green-50 text-green-800 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Active Patients</p>
              <p className="text-2xl font-bold">{new Set(prescriptions.map(p => p.patient.name)).size}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
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
