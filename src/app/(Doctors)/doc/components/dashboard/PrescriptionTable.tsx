"use client";
import React, { useState, useRef } from "react";
import { Trash } from "lucide-react";
import { useAccount, useSignMessage } from "wagmi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";

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

export default function PrescriptionTable() {
  const [rows, setRows] = useState<PrescriptionRow[]>([
    { phone: "", prescriptions: [], searchTerm: "", advice: "" },
  ]);

  const [signedAddress, setSignedAddress] = useState<string | null>(null);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

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

  const handleSignPrescription = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first.");
      return;
    }

    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const message = `Prescription signed by ${address} at ${timestamp}`;

    try {
      await signMessageAsync({ message });
      setSignedAddress(address);
      setSignedTimestamp(timestamp);
      alert("Prescription signed successfully!");
    } catch (err) {
      console.error(err);
      alert("Signature failed.");
    }
  };

  const generatePDF = async () => {
    if (!signedAddress || !signedTimestamp) {
      alert("Please sign the prescription before generating the PDF.");
      return;
    }

    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Prescription table
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Add signature details at bottom
    pdf.setFontSize(12);
    pdf.text(`Signed by: ${signedAddress}`, 10, pdfHeight + 10);
    pdf.text(`Timestamp: ${signedTimestamp}`, 10, pdfHeight + 16);

    pdf.save("prescription.pdf");
  };

  return (
    <div className="mt-8">
      {/* Table Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Prescription Details</h2>
        <p className="text-gray-600">Add medicines and create prescription for the patient</p>
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
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          ✍️ Sign Prescription
                        </button>
                        <button
                          onClick={generatePDF}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
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
                            <span className="text-sm font-medium text-gray-700">🌅 Morning</span>
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
                            <span className="text-sm font-medium text-gray-700">☀️ Afternoon</span>
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
                            <span className="text-sm font-medium text-gray-700">🌙 Night</span>
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
                            <option value={0}>🍽️ Before Food</option>
                            <option value={1}>🥘 After Food</option>
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
