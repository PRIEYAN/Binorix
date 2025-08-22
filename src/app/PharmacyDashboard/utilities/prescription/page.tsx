"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import PillToggle from "../../components/ToggleButton";

type Prescription = {
    patientName: string;
    prescription: string;
    doctorName: string;
    doctorWalletId: string;
    paymentStatus: "completed" | "pending";
    prescriptionStatus: "fulfilled" | "pending";
};

const mockData: Prescription[] = [
    {
        patientName: "Alice Smith",
        prescription: "Paracetamol 500mg",
        doctorName: "Dr. John Doe",
        doctorWalletId: "0x1234abcd5678efgh",
        paymentStatus: "completed",
        prescriptionStatus: "fulfilled",
    },
    {
        patientName: "Bob Johnson",
        prescription: "Amoxicillin 250mg",
        doctorName: "Dr. Emily Rose",
        doctorWalletId: "0x9a8b7c6d5e4f3a2b",
        paymentStatus: "pending",
        prescriptionStatus: "pending",
    },
];

export default function PrescriptionTable() {
    const [data, setData] = useState(mockData);

    const handleSign = (index: number) => {
        console.log(`Signing wallet for patient: ${data[index].patientName}`);
        // logic for signing wallet goes here
    };

    const togglePaymentStatus = (index: number) => {
        const updatedData = [...data];
        updatedData[index].paymentStatus =
            updatedData[index].paymentStatus === "completed" ? "pending" : "completed";
        setData(updatedData);
    };

    const togglePrescriptionStatus = (index: number) => {
        const updatedData = [...data];
        updatedData[index].prescriptionStatus =
            updatedData[index].prescriptionStatus === "fulfilled" ? "pending" : "fulfilled";
        setData(updatedData);
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-6 text-left text-blue-700">
                    Live Prescription Records
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-300">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">S.No</th>
                                <th className="px-4 py-2 text-left">Patient Name</th>
                                <th className="px-4 py-2 text-left">Prescription</th>
                                <th className="px-4 py-2 text-left">Doctor Name</th>
                                <th className="px-4 py-2 text-left">Doctor Wallet ID</th>
                                <th className="px-4 py-2 text-left">Payment Status</th>
                                <th className="px-4 py-2 text-left">Prescription Status</th>
                                <th className="px-4 py-2 text-left">Sign Wallet</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {/* Serial Number */}
                                    <td className="px-4 py-2">{index + 1}</td>

                                    <td className="px-4 py-2">{item.patientName}</td>
                                    <td className="px-4 py-2">{item.prescription}</td>
                                    <td className="px-4 py-2">{item.doctorName}</td>
                                    <td className="px-4 py-2 text-sm break-all">
                                        {item.doctorWalletId}
                                    </td>

                                    {/* Payment Status Toggle */}
                                    <td className="px-4 py-2">
                                        <PillToggle
                                            options={["Bending", "Completed"]}
                                            onChange={() => togglePrescriptionStatus(index)}
                                        />
                                    </td>

                                    <td className="px-4 py-2">
                                        <PillToggle
                                            options={["Bending", "Fullfilled"]}
                                            onChange={() => togglePaymentStatus(index)}
                                        />
                                    </td>

                                    {/* Sign Wallet */}
                                    <td className="px-4 py-2">
                                        <Button
                                            onClick={() => handleSign(index)}
                                            className="bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Sign
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
