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
  shift: "Day" | "Afternoon" | "Night";
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
          shift: "Day",
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
    <div>
      <div ref={tableRef} className="overflow-x-auto mt-6 relative">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Prescription List</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Shift</th>
              <th className="py-3 px-4 text-left">Intake</th>
              <th className="py-3 px-4 text-left">Any Advice</th>
              <th className="py-3 px-4 text-left">Actions</th>
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
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-4 align-top relative">
                      <input
                        type="text"
                        placeholder="Search medicine..."
                        value={row.searchTerm}
                        onChange={(e) =>
                          handleChange(rowIndex, "searchTerm", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1"
                      />
                      {row.searchTerm && (
                        <div className="absolute bg-white border border-gray-300 rounded mt-1 max-h-28 overflow-y-auto z-20 w-full shadow">
                          {filteredMedicines.length > 0 ? (
                            filteredMedicines.map((med) => (
                              <div
                                key={med}
                                onClick={() => handleAddMedicine(rowIndex, med)}
                                className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                              >
                                {med}
                              </div>
                            ))
                          ) : (
                            <div className="px-2 py-1 text-gray-500 italic">
                              No medicines found
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="py-2 px-4">
                      <textarea
                        placeholder="Enter advice..."
                        value={row.advice}
                        onChange={(e) =>
                          handleChange(rowIndex, "advice", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 min-h-[60px]"
                      />
                    </td>
                    <td className="py-2 px-4 flex flex-col gap-2">
                      <button
                        onClick={handleSignPrescription}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Sign Prescription
                      </button>
                      <button
                        onClick={generatePDF}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Generate PDF
                      </button>
                    </td>
                  </tr>

                  {/* Medicine Rows */}
                  {row.prescriptions.map((med, medIndex) => (
                    <tr
                      key={medIndex}
                      className="border-t border-gray-100 bg-gray-50"
                    >
                      <td className="py-2 px-4">{med.name}</td>
                      <td className="py-2 px-4">
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
                          className="w-20 border rounded px-2 py-1"
                          placeholder="Qty"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <select
                          value={med.shift}
                          onChange={(e) =>
                            handlePrescriptionChange(
                              rowIndex,
                              medIndex,
                              "shift",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option>Day</option>
                          <option>Afternoon</option>
                          <option>Night</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 flex flex-row gap-2 justify-center items-center">
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
                          className="border rounded px-2 py-1"
                        >
                          <option value={0}>Before Food</option>
                          <option value={1}>After Food</option>
                        </select>
                        <button
                          onClick={() =>
                            handleRemoveMedicine(rowIndex, medIndex)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
