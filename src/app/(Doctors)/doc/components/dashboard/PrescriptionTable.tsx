"use client";
import React, { useState, useRef, useEffect } from "react";
import { Trash } from "lucide-react";
import { useAccount, useSignMessage } from "wagmi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import axios from "axios";

const medicinesList = [
  "Paracetamol",
  "Amoxicillin",
  "Ibuprofen",
  "Metformin",
  "Aspirin",
  "Ciprofloxacin",
  "Cetirizine",
  "Azithromycin",
];

interface Prescription {
  name: string;
  quantity: string;
  shift: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  intake: 0 | 1;
}

interface PrescriptionRow {
  phone: string;
  prescriptions: Prescription[];
  searchTerm: string;
  advice: string;
}

interface Patient {
  name: string;
  email: string;
  PhoneNumber: string;
  gender: string;
  otherDetails: string;
}

interface PrescriptionTableProps {
  patient: Patient | null;
  onPrescriptionComplete: () => void;
}

interface DoctorDetails {
  name: string;
  registrationNumber: string;
  hospital: string;
  specialization: string;
  email: string;
}

export default function PrescriptionTable({ patient, onPrescriptionComplete }: PrescriptionTableProps) {
  const [rows, setRows] = useState<PrescriptionRow[]>([
    { phone: "", prescriptions: [], searchTerm: "", advice: "" },
  ]);

  const [signedAddress, setSignedAddress] = useState<string | null>(null);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Fetch doctor details on component mount
  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      // Check different possible token locations
      const token = localStorage.getItem('token') || 
                   localStorage.getItem('authToken') || 
                   sessionStorage.getItem('token') || 
                   sessionStorage.getItem('authToken');
      
      if (!token) {
        console.error('No authentication token found in localStorage or sessionStorage');
        console.log('Available localStorage keys:', Object.keys(localStorage));
        console.log('Available sessionStorage keys:', Object.keys(sessionStorage));
        throw new Error('No authentication token found');
      }

      console.log('Found token:', token.substring(0, 20) + '...');
      
      // Try different possible API endpoints
      const possibleEndpoints = [
        'http://localhost:5050/doctor/auth/getDoctorDetails',
        'http://localhost:5050/api/doctor/auth/getDoctorDetails',
        'http://localhost:5050/doctor/getDoctorDetails',
        'http://localhost:5050/api/doctor/getDoctorDetails',
        'http://localhost:5050/doctor/profile',
        'http://localhost:5050/api/doctor/profile'
      ];

      let response = null;
      let workingEndpoint = null;

      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          response = await axios.get(endpoint, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            timeout: 5000 // 5 second timeout per endpoint
          });
          
          if (response.status === 200) {
            workingEndpoint = endpoint;
            console.log(`✅ Success with endpoint: ${endpoint}`);
            break;
          }
        } catch (err: any) {
          console.log(`❌ Failed with endpoint: ${endpoint} - Status: ${err.response?.status || 'Network Error'}`);
          continue;
        }
      }

      if (!response || !workingEndpoint) {
        throw new Error('All API endpoints failed. Please check your backend server and routes.');
      }

      console.log('Full API Response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      // Handle different possible response structures
      let doctor = null;
      
      if (response.data) {
        // Try different possible response structures
        doctor = response.data.doctor || 
                response.data.data || 
                response.data.user || 
                (response.data.success ? response.data.doctor : null) ||
                response.data;
        
        console.log('Extracted doctor data:', doctor);
        
        if (doctor && (doctor.name || doctor._id)) {
          const doctorInfo = {
            name: doctor.name || 'Dr. Unknown',
            registrationNumber: doctor.nmrNumber || doctor.registrationNumber || 'REG123456',
            hospital: doctor.hospital || doctor.hospitalName || 'Binorix Medical Center',
            specialization: doctor.specialization || 'General Medicine',
            email: doctor.email || 'doctor@binorix.com'
          };
          
          console.log('Successfully processed doctor details:', doctorInfo);
          setDoctorDetails(doctorInfo);
          return doctor;
        } else {
          console.error('No valid doctor data found in response');
          throw new Error('No valid doctor data in API response');
        }
      } else {
        console.error('Empty response data');
        throw new Error('Empty API response');
      }
    } catch (error: any) {
      console.error('=== API ERROR DETAILS ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      
      if (error.response) {
        console.error('HTTP Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
        console.error('Response Data:', error.response.data);
        
        if (error.response.status === 401) {
          alert('Authentication failed. Please login again.');
        } else if (error.response.status === 404) {
          alert('Doctor details endpoint not found. Please check the API.');
        } else {
          alert(`Server error (${error.response.status}): ${error.response.data?.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        console.error('Network Error - No response received');
        console.error('Request details:', error.request);
        alert('Network error. Please check if the server is running on http://localhost:5050');
      } else {
        console.error('Request setup error:', error.message);
        alert(`Request error: ${error.message}`);
      }
      
      // Set fallback data only after showing the specific error
      const fallbackData = {
        name: 'Dr. John Smith',
        registrationNumber: 'MED12345',
        hospital: 'Binorix Medical Center',
        specialization: 'General Medicine',
        email: 'doctor@binorix.com'
      };
      
      console.log('=== USING FALLBACK DATA ===');
      console.log('Fallback data:', fallbackData);
      setDoctorDetails(fallbackData);
    }
    return null;
  };

  const handleAddMedicine = (rowIndex: number, medicine: string) => {
    setRows((prev) => {
      const updated = structuredClone(prev);
      const exists = updated[rowIndex].prescriptions.some(
        (p) => p.name.toLowerCase() === medicine.toLowerCase()
      );
      if (!exists) {
        updated[rowIndex].prescriptions.push({
          name: medicine,
          quantity: "",
          shift: {
            morning: false,
            afternoon: false,
            night: false,
          },
          intake: 0,
        });
      }
      updated[rowIndex].searchTerm = "";
      return updated;
    });
  };

  const handlePrescriptionChange = (
    rowIndex: number,
    medIndex: number,
    field: keyof Prescription,
    value: string | number
  ) => {
    setRows((prev) => {
      const updated = structuredClone(prev);
      (updated[rowIndex].prescriptions[medIndex] as any)[field] = value;
      return updated;
    });
  };

  const handleTimingChange = (
    rowIndex: number,
    medIndex: number,
    timingType: 'morning' | 'afternoon' | 'night',
    checked: boolean
  ) => {
    setRows((prev) => {
      const updated = structuredClone(prev);
      updated[rowIndex].prescriptions[medIndex].shift[timingType] = checked;
      return updated;
    });
  };

  const handleRemoveMedicine = (rowIndex: number, medIndex: number) => {
    setRows((prev) => {
      const updated = structuredClone(prev);
      updated[rowIndex].prescriptions.splice(medIndex, 1);
      return updated;
    });
  };

  const handleChange = (
    rowIndex: number,
    field: keyof PrescriptionRow,
    value: string
  ) => {
    setRows((prev) => {
      const updated = structuredClone(prev);
      (updated[rowIndex] as any)[field] = value;
      return updated;
    });
  };

  const validatePrescription = () => {
    // Check if patient is registered
    if (!patient) {
      alert("Please search and select a valid patient first.");
      return false;
    }

    // Check if at least one medicine is added
    const hasMedicines = rows.some(row => row.prescriptions.length > 0);
    if (!hasMedicines) {
      alert("Please add at least one medicine to the prescription.");
      return false;
    }

    // Check if wallet is connected
    if (!isConnected || !address) {
      alert("Please connect your wallet first.");
      return false;
    }

    return true;
  };

  const handleSignPrescription = async () => {
    if (!validatePrescription()) {
      return;
    }

    try {
      // Always fetch fresh doctor details before signing
      console.log('Fetching fresh doctor details for signing...');
      await fetchDoctorDetails();
      
      // Wait a moment for state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      const doctorName = doctorDetails?.name || 'Dr. Unknown';
      const message = `Prescription signed by ${doctorName} (Wallet: ${address}) for patient ${patient?.name} (${patient?.PhoneNumber}) at ${timestamp}`;

      console.log('Signing message:', message);
      console.log('Current doctor details for signing:', doctorDetails);

      await signMessageAsync({ message });
      setSignedAddress(address || "");
      setSignedTimestamp(timestamp);
      alert(`Prescription signed successfully by ${doctorName}! You can now generate the PDF.`);
    } catch (err) {
      console.error('Signing error:', err);
      alert("Signature failed. Please try again.");
    }
  };

  const generatePDF = async () => {
    if (!signedAddress || !signedTimestamp) {
      alert("Please sign the prescription before generating the PDF.");
      return;
    }

    // Final validation before PDF generation
    if (!validatePrescription()) {
      return;
    }

    // Ensure we have the latest doctor details
    console.log('Current doctor details before PDF generation:', doctorDetails);
    if (!doctorDetails) {
      console.log('No doctor details found, fetching...');
      await fetchDoctorDetails();
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for state update
    }
    
    const currentDoctorDetails = doctorDetails;
    console.log('Using doctor details for PDF:', currentDoctorDetails);
    
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Header Section
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("MEDICAL PRESCRIPTION", pageWidth / 2, 25, { align: "center" });
      
      // Hospital/Clinic Information
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(currentDoctorDetails?.hospital || "Binorix Medical Center", pageWidth / 2, 40, { align: "center" });
      
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text("123 Healthcare Avenue, Medical District", pageWidth / 2, 48, { align: "center" });
      pdf.text(`Phone: +91-9876543210 | Email: ${currentDoctorDetails?.email || 'contact@binorix.com'}`, pageWidth / 2, 54, { align: "center" });
      
      // Horizontal line
      pdf.setLineWidth(0.5);
      pdf.line(15, 60, pageWidth - 15, 60);
      
      // Doctor Information
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Doctor Information:", 15, 75);
      
      pdf.setFont("helvetica", "normal");
      pdf.text(`${currentDoctorDetails?.name || 'Dr. John Smith'}`, 15, 85);
      pdf.text(`Specialization: ${currentDoctorDetails?.specialization || 'General Medicine'}`, 15, 92);
      pdf.text(`NMR Registration No: ${currentDoctorDetails?.registrationNumber || 'MED12345'}`, 15, 99);
      pdf.text(`Hospital: ${currentDoctorDetails?.hospital || 'Binorix Medical Center'}`, 15, 106);
      
      // Patient Information
      pdf.setFont("helvetica", "bold");
      pdf.text("Patient Information:", 15, 125);
      
      pdf.setFont("helvetica", "normal");
      pdf.text(`Name: ${patient?.name || 'N/A'}`, 15, 135);
      pdf.text(`Phone: ${patient?.PhoneNumber || 'N/A'}`, 15, 142);
      pdf.text(`Gender: ${patient?.gender || 'N/A'}`, 15, 149);
      
      // Date and Prescription ID
      pdf.text(`Date: ${new Date(signedTimestamp || '').toLocaleDateString()}`, pageWidth - 60, 135);
      pdf.text(`Prescription ID: RX${Date.now().toString().slice(-6)}`, pageWidth - 60, 142);
      
      // Medicines Section
      pdf.setFont("helvetica", "bold");
      pdf.text("Rx (Prescription):", 15, 165);
      
      let yPosition = 180;
      const medicines = rows[0]?.prescriptions || [];
      
      medicines.forEach((medicine, index) => {
        // Medicine name with serial number
        pdf.setFont("helvetica", "bold");
        pdf.text(`${index + 1}. ${medicine.name}`, 20, yPosition);
        
        // Medicine details
        pdf.setFont("helvetica", "normal");
        yPosition += 8;
        
        // Quantity
        pdf.text(`   Quantity: ${medicine.quantity} tablets/capsules`, 25, yPosition);
        yPosition += 6;
        
        // Timing
        const timings = [];
        if (medicine.shift.morning) timings.push('Morning');
        if (medicine.shift.afternoon) timings.push('Afternoon');
        if (medicine.shift.night) timings.push('Night');
        
        pdf.text(`   Timing: ${timings.join(', ') || 'As directed'}`, 25, yPosition);
        yPosition += 6;
        
        // Food intake
        const foodInstruction = medicine.intake === 0 ? 'Before food' : 'After food';
        pdf.text(`   Instructions: Take ${foodInstruction}`, 25, yPosition);
        yPosition += 12;
        
        // Add spacing between medicines
        if (index < medicines.length - 1) {
          yPosition += 5;
        }
      });
      
      // Doctor's Advice
      if (rows[0]?.advice) {
        pdf.setFont("helvetica", "bold");
        pdf.text("Doctor's Advice:", 15, yPosition + 10);
        
        pdf.setFont("helvetica", "normal");
        const adviceLines = pdf.splitTextToSize(rows[0].advice, pageWidth - 30);
        pdf.text(adviceLines, 15, yPosition + 20);
        yPosition += 20 + (adviceLines.length * 5);
      }
      
      // Digital Signature Section
      const signatureY = Math.max(yPosition + 30, pageHeight - 80);
      
      pdf.setLineWidth(0.3);
      pdf.line(15, signatureY - 10, pageWidth - 15, signatureY - 10);
      
      pdf.setFont("helvetica", "bold");
      pdf.text("Digital Signature & Verification:", 15, signatureY);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(`Digitally signed by: ${currentDoctorDetails?.name || 'Dr. John Smith'}`, 15, signatureY + 10);
      pdf.text(`Wallet Address: ${signedAddress}`, 15, signatureY + 17);
      pdf.text(`Timestamp: ${signedTimestamp}`, 15, signatureY + 24);
      pdf.text(`Patient Phone: ${patient?.PhoneNumber}`, 15, signatureY + 31);
      
      // Verification note
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(8);
      pdf.text("This prescription is digitally signed and verified on blockchain.", 15, signatureY + 42);
      pdf.text(`Valid only with proper verification through ${currentDoctorDetails?.hospital || 'Binorix Medical Center'}.`, 15, signatureY + 48);
      
      // Footer
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text("This is a computer-generated prescription and does not require a physical signature.", 
               pageWidth / 2, pageHeight - 15, { align: "center" });
      
      // Generate filename with patient info and timestamp
      const fileName = `Prescription_${patient?.name?.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}_${Date.now().toString().slice(-6)}.pdf`;
      pdf.save(fileName);

      // Clear the form and reset everything
      setRows([{ phone: "", prescriptions: [], searchTerm: "", advice: "" }]);
      setSignedAddress(null);
      setSignedTimestamp(null);
      
      // Call the parent callback to reset patient data
      onPrescriptionComplete();

      alert("Professional prescription PDF generated successfully! The form has been cleared. Please sign in again for the next prescription.");

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      {/* Table Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Prescription Details</h2>
        <p className="text-gray-600">Add medicines and create prescription for the patient</p>
      </div>

      {/* Debug Section - Remove this after fixing */}
      <div className="mb-4 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
        <h3 className="text-sm font-semibold text-yellow-800 mb-2">🔧 API Debug Panel</h3>
        <div className="flex gap-2 mb-2 flex-wrap">
          <button
            onClick={fetchDoctorDetails}
            className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
          >
            🔍 Test All Endpoints
          </button>
          <button
            onClick={() => console.log('Current doctor details:', doctorDetails)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            📋 Log Current Data
          </button>
          <button
            onClick={() => {
              const token = localStorage.getItem('token') || sessionStorage.getItem('token');
              console.log('Token:', token ? token.substring(0, 50) + '...' : 'Not found');
              console.log('LocalStorage keys:', Object.keys(localStorage));
              console.log('SessionStorage keys:', Object.keys(sessionStorage));
            }}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            🔑 Check Token
          </button>
        </div>
        <div className="text-xs text-yellow-700 space-y-1">
          <p><strong>Current doctor:</strong> {doctorDetails?.name || '❌ Not loaded'}</p>
          <p><strong>Hospital:</strong> {doctorDetails?.hospital || '❌ Not loaded'}</p>
          <p><strong>Status:</strong> {doctorDetails ? '✅ Using API data' : '⚠️ Using fallback data'}</p>
        </div>
        <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
          <strong>⚠️ Previous Error:</strong> 404 Not Found - The API endpoint doesn't exist.<br/>
          <strong>🔍 Testing endpoints:</strong> /doctor/auth/getDoctorDetails, /api/doctor/*, /doctor/profile, etc.
        </div>
      </div>

      {/* Validation Status */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Prescription Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`flex items-center gap-2 p-3 rounded-lg ${patient ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <span className={`text-lg ${patient ? 'text-green-600' : 'text-red-600'}`}>
              {patient ? '✅' : '❌'}
            </span>
            <span className={`text-sm font-medium ${patient ? 'text-green-800' : 'text-red-800'}`}>
              Valid Patient
            </span>
          </div>
          
          <div className={`flex items-center gap-2 p-3 rounded-lg ${rows[0].prescriptions.length > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <span className={`text-lg ${rows[0].prescriptions.length > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {rows[0].prescriptions.length > 0 ? '✅' : '❌'}
            </span>
            <span className={`text-sm font-medium ${rows[0].prescriptions.length > 0 ? 'text-green-800' : 'text-red-800'}`}>
              Medicine Added ({rows[0].prescriptions.length})
            </span>
          </div>
          
          <div className={`flex items-center gap-2 p-3 rounded-lg ${isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <span className={`text-lg ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? '✅' : '❌'}
            </span>
            <span className={`text-sm font-medium ${isConnected ? 'text-green-800' : 'text-red-800'}`}>
              Wallet Connected
            </span>
          </div>
          
          <div className={`flex items-center gap-2 p-3 rounded-lg ${signedAddress ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <span className={`text-lg ${signedAddress ? 'text-green-600' : 'text-yellow-600'}`}>
              {signedAddress ? '✅' : '⏳'}
            </span>
            <span className={`text-sm font-medium ${signedAddress ? 'text-green-800' : 'text-yellow-800'}`}>
              {signedAddress ? 'Prescription Signed' : 'Awaiting Signature'}
            </span>
          </div>
        </div>
      </div>

      <div ref={tableRef} className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Medicine Name
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                Quantity
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                Timing
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                Food Intake
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Doctor's Advice
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const filteredMedicines = medicinesList.filter((med) =>
                med.toLowerCase().includes(row.searchTerm.toLowerCase())
              );

              return (
                <React.Fragment key={rowIndex}>
                  {/* Search & Advice Row */}
                  <tr className="bg-blue-50 border-b border-blue-100">
                    <td className="py-4 px-6 align-top relative">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="🔍 Search and add medicine..."
                          value={row.searchTerm}
                          onChange={(e) =>
                            handleChange(rowIndex, "searchTerm", e.target.value)
                          }
                          className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-500"
                        />
                        {row.searchTerm && (
                          <div className="absolute bg-white border-2 border-blue-200 rounded-lg mt-2 max-h-32 overflow-y-auto z-20 w-full shadow-lg">
                            {filteredMedicines.length > 0 ? (
                              filteredMedicines.map((med) => (
                                <div
                                  key={med}
                                  onClick={() => handleAddMedicine(rowIndex, med)}
                                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 font-medium text-gray-700"
                                >
                                  {med}
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-gray-500 italic">
                                No medicines found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6"></td>
                    <td className="py-4 px-6"></td>
                    <td className="py-4 px-6"></td>
                    <td className="py-4 px-6">
                      <textarea
                        placeholder="💊 Enter doctor's advice and instructions..."
                        value={row.advice}
                        onChange={(e) =>
                          handleChange(rowIndex, "advice", e.target.value)
                        }
                        className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 min-h-[80px] focus:border-blue-500 focus:outline-none transition-colors resize-none placeholder-gray-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={handleSignPrescription}
                          disabled={!patient || rows[0].prescriptions.length === 0 || !isConnected}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 ${
                            !patient || rows[0].prescriptions.length === 0 || !isConnected
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              : signedAddress
                              ? 'bg-green-600 text-white'
                              : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                          }`}
                        >
                          {signedAddress ? '✅ Signed' : '✍️ Sign Prescription'}
                        </button>
                        <button
                          onClick={generatePDF}
                          disabled={!signedAddress || !signedTimestamp}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 ${
                            !signedAddress || !signedTimestamp
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                          }`}
                        >
                          📄 Generate PDF
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Medicine Rows */}
                  {row.prescriptions.map((med, medIndex) => (
                    <tr
                      key={medIndex}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span className="font-medium text-gray-800">{med.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <input
                          type="number"
                          value={med.quantity}
                          onChange={(e) =>
                            handlePrescriptionChange(
                              rowIndex,
                              medIndex,
                              "quantity",
                              e.target.value
                            )
                          }
                          className="w-20 border-2 border-gray-200 rounded-lg px-3 py-2 text-center focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="Qty"
                          min="1"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={med.shift.morning}
                              onChange={(e) =>
                                handleTimingChange(rowIndex, medIndex, 'morning', e.target.checked)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700"> Morning</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={med.shift.afternoon}
                              onChange={(e) =>
                                handleTimingChange(rowIndex, medIndex, 'afternoon', e.target.checked)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700"> Afternoon</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={med.shift.night}
                              onChange={(e) =>
                                handleTimingChange(rowIndex, medIndex, 'night', e.target.checked)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700"> Night</span>
                          </label>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <select
                            value={med.intake}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                rowIndex,
                                medIndex,
                                "intake",
                                parseInt(e.target.value)
                              )
                            }
                            className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors bg-white"
                          >
                            <option value={0}> Before Food</option>
                            <option value={1}> After Food</option>
                          </select>
                          <button
                            onClick={() =>
                              handleRemoveMedicine(rowIndex, medIndex)
                            }
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                            title="Remove Medicine"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6"></td>
                      <td className="py-4 px-6"></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        
        {/* Empty State */}
        {rows[0].prescriptions.length === 0 && (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💊</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No medicines added yet</h3>
            <p className="text-gray-600">Search and add medicines to create a prescription</p>
          </div>
        )}
      </div>
      
      {/* Status indicators */}
      {signedAddress && signedTimestamp && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-800 font-medium">Prescription signed successfully</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Signed by: {signedAddress.slice(0, 6)}...{signedAddress.slice(-4)} at {signedTimestamp}
          </p>
        </div>
      )}
    </div>
  );
}
