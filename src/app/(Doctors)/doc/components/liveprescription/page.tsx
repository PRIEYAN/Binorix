"use client";
import React, { useState, useEffect } from "react";
import { Activity, Clock, CheckCircle, AlertCircle, XCircle, Building2 } from "lucide-react";

interface LivePrescription {
  id: string;
  patientName: string;
  patientPhone: string;
  medicines: {
    name: string;
    quantity: string;
    timing: {
      morning: boolean;
      afternoon: boolean;
      night: boolean;
    };
    intake: 0 | 1;
  }[];
  advice: string;
  status: "pending" | "processing" | "ready" | "completed" | "cancelled";
  prescribedAt: string;
  updatedAt: string;
}

const samplePrescriptions: LivePrescription[] = [
  {
    id: "RX001",
    patientName: "John Doe",
    patientPhone: "+91 9876543210",
    medicines: [
      {
        name: "Paracetamol",
        quantity: "10",
        timing: { morning: true, afternoon: false, night: true },
        intake: 1
      },
      {
        name: "Amoxicillin",
        quantity: "7",
        timing: { morning: true, afternoon: true, night: false },
        intake: 0
      }
    ],
    advice: "Take with plenty of water. Complete the full course.",
    status: "processing",
    prescribedAt: "2024-01-15 10:30:00",
    updatedAt: "2024-01-15 11:15:00"
  },
  {
    id: "RX002",
    patientName: "Sarah Wilson",
    patientPhone: "+91 9876543211",
    medicines: [
      {
        name: "Ibuprofen",
        quantity: "5",
        timing: { morning: false, afternoon: true, night: true },
        intake: 1
      }
    ],
    advice: "Take after meals. Avoid alcohol.",
    status: "processing",
    prescribedAt: "2024-01-15 09:45:00",
    updatedAt: "2024-01-15 12:00:00"
  },
  {
    id: "RX003",
    patientName: "Mike Johnson",
    patientPhone: "+91 9876543212",
    medicines: [
      {
        name: "Metformin",
        quantity: "30",
        timing: { morning: true, afternoon: false, night: true },
        intake: 0
      },
      {
        name: "Aspirin",
        quantity: "15",
        timing: { morning: true, afternoon: false, night: false },
        intake: 1
      }
    ],
    advice: "Monitor blood sugar levels daily.",
    status: "processing",
    prescribedAt: "2024-01-15 08:20:00",
    updatedAt: "2024-01-15 14:30:00"
  },
  {
    id: "RX004",
    patientName: "Emma Brown",
    patientPhone: "+91 9876543213",
    medicines: [
      {
        name: "Cetirizine",
        quantity: "10",
        timing: { morning: false, afternoon: false, night: true },
        intake: 1
      }
    ],
    advice: "Take before bedtime for allergies.",
    status: "processing",
    prescribedAt: "2024-01-15 15:30:00",
    updatedAt: "2024-01-15 16:45:00"
  },
  {
    id: "RX005",
    patientName: "David Lee",
    patientPhone: "+91 9876543214",
    medicines: [
      {
        name: "Azithromycin",
        quantity: "5",
        timing: { morning: true, afternoon: false, night: false },
        intake: 0
      },
      {
        name: "Ciprofloxacin",
        quantity: "7",
        timing: { morning: true, afternoon: false, night: true },
        intake: 1
      }
    ],
    advice: "Complete antibiotic course. Take probiotics.",
    status: "processing",
    prescribedAt: "2024-01-15 11:15:00",
    updatedAt: "2024-01-15 13:20:00"
  }
];

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
  if (timing.morning) times.push('🌅 Morning');
  if (timing.afternoon) times.push('☀️ Afternoon');
  if (timing.night) times.push('🌙 Night');
  return times.join(', ') || 'Not specified';
};

export default function LivePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<LivePrescription[]>(samplePrescriptions);
  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8">
      {/* Header with Live Animation */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-red-400'} transition-all duration-300 ${isLive ? 'animate-pulse' : ''}`}></div>
          <h2 className="text-2xl font-bold text-gray-800">Live Prescriptions</h2>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Activity className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
          <span>Real-time updates</span>
        </div>
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
              <React.Fragment key={prescription.id}>
                {prescription.medicines.map((medicine, medIndex) => (
                  <tr
                    key={`${prescription.id}-${medIndex}`}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Prescription ID - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-600">{prescription.id}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(prescription.prescribedAt).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    ) : null}

                    {/* Patient Details - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{prescription.patientName}</span>
                          <span className="text-sm text-gray-600">{prescription.patientPhone}</span>
                        </div>
                      </td>
                    ) : null}

                    {/* Medicine Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{medicine.name}</span>
                          <span className="text-sm text-gray-600">Qty: {medicine.quantity}</span>
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
                        {medicine.intake === 0 ? '🍽️ Before Food' : '🥘 After Food'}
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
                            Updated: {new Date(prescription.updatedAt).toLocaleTimeString()}
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
              <p className="text-2xl font-bold">{new Set(prescriptions.map(p => p.patientName)).size}</p>
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
