"use client";
import React, { useState, useMemo } from "react";
import { History, Calendar, Filter, CheckCircle, Building2, Search } from "lucide-react";

interface PastPrescription {
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
  pharmacyName: string;
  status: "completed";
  prescribedAt: string;
  completedAt: string;
}

const samplePastPrescriptions: PastPrescription[] = [
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
    pharmacyName: "HealthPlus Pharmacy",
    status: "completed",
    prescribedAt: "2024-01-10 10:30:00",
    completedAt: "2024-01-10 16:45:00"
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
    pharmacyName: "MediCare Central",
    status: "completed",
    prescribedAt: "2024-01-08 09:45:00",
    completedAt: "2024-01-08 14:20:00"
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
    pharmacyName: "QuickMeds Pharmacy",
    status: "completed",
    prescribedAt: "2024-01-05 08:20:00",
    completedAt: "2024-01-05 12:30:00"
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
    pharmacyName: "City Pharmacy",
    status: "completed",
    prescribedAt: "2024-01-03 15:30:00",
    completedAt: "2024-01-03 18:45:00"
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
    pharmacyName: "Wellness Pharmacy",
    status: "completed",
    prescribedAt: "2023-12-28 11:15:00",
    completedAt: "2023-12-28 17:20:00"
  }
];

const formatTiming = (timing: PastPrescription['medicines'][0]['timing']) => {
  const times = [];
  if (timing.morning) times.push('🌅 Morning');
  if (timing.afternoon) times.push('☀️ Afternoon');
  if (timing.night) times.push('🌙 Night');
  return times.join(', ') || 'Not specified';
};

export default function PastPrescriptions() {
  const [prescriptions] = useState<PastPrescription[]>(samplePastPrescriptions);
  const [filterType, setFilterType] = useState<'today' | 'week' | 'month' | 'custom'>('month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrescriptions = useMemo(() => {
    let filtered = prescriptions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(prescription => 
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (filterType) {
      case 'today':
        filtered = filtered.filter(prescription => {
          const prescribedDate = new Date(prescription.prescribedAt);
          const prescribedDay = new Date(prescribedDate.getFullYear(), prescribedDate.getMonth(), prescribedDate.getDate());
          return prescribedDay.getTime() === today.getTime();
        });
        break;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(prescription => {
          const prescribedDate = new Date(prescription.prescribedAt);
          return prescribedDate >= weekAgo && prescribedDate <= now;
        });
        break;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter(prescription => {
          const prescribedDate = new Date(prescription.prescribedAt);
          return prescribedDate >= monthAgo && prescribedDate <= now;
        });
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          const startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          endDate.setHours(23, 59, 59, 999); // Include the entire end date
          filtered = filtered.filter(prescription => {
            const prescribedDate = new Date(prescription.prescribedAt);
            return prescribedDate >= startDate && prescribedDate <= endDate;
          });
        }
        break;
    }

    return filtered.sort((a, b) => new Date(b.prescribedAt).getTime() - new Date(a.prescribedAt).getTime());
  }, [prescriptions, filterType, customStartDate, customEndDate, searchTerm]);

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <History className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-800">Past Prescriptions</h2>
        </div>
      </div>
      <p className="text-gray-600 mb-6">View and manage your completed prescription history</p>

      {/* Filters */}
      <div className="mb-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by patient name, prescription ID, or pharmacy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
            <div className="flex gap-2">
              {[
                { key: 'today', label: 'Today' },
                { key: 'week', label: 'This Week' },
                { key: 'month', label: 'This Month' },
                { key: 'custom', label: 'Custom' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilterType(key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterType === key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Date Range */}
        {filterType === 'custom' && (
          <div className="mt-4 flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">From:</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">To:</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>All prescriptions completed</span>
        </div>
      </div>

      {/* Table */}
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
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Pharmacy Name
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription, index) => (
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
                            Prescribed: {new Date(prescription.prescribedAt).toLocaleString()}
                          </span>
                          <span className="text-xs text-green-600">
                            Completed: {new Date(prescription.completedAt).toLocaleString()}
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
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
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

                    {/* Pharmacy Name - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-800">{prescription.pharmacyName}</span>
                        </div>
                      </td>
                    ) : null}

                    {/* Status - only show on first medicine row */}
                    {medIndex === 0 ? (
                      <td className="py-4 px-6 text-center align-top" rowSpan={prescription.medicines.length}>
                        <div className="flex flex-col items-center gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border bg-green-200 text-green-900 border-green-300">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Completed
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(prescription.completedAt).toLocaleDateString()}
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
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No past prescriptions found</h3>
            <p className="text-gray-600">
              {searchTerm || filterType === 'custom' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Your completed prescriptions will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Total Completed</p>
              <p className="text-2xl font-bold text-green-900">{filteredPrescriptions.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Unique Patients</p>
              <p className="text-2xl font-bold text-blue-900">
                {new Set(filteredPrescriptions.map(p => p.patientName)).size}
              </p>
            </div>
            <History className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Total Medicines</p>
              <p className="text-2xl font-bold text-purple-900">
                {filteredPrescriptions.reduce((total, p) => total + p.medicines.length, 0)}
              </p>
            </div>
            <Building2 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800">Pharmacies</p>
              <p className="text-2xl font-bold text-orange-900">
                {new Set(filteredPrescriptions.map(p => p.pharmacyName)).size}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
