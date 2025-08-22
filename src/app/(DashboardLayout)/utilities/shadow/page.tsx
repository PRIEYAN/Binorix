"use client";
import { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { DoctorCard, Doctor } from "@/app/(Doctors)/doc/components/dashboard/DoctorCard";
import { useJwt } from "@/hooks/jwt";

export default function Shadow() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { payload, error } = useJwt("doctor");

  useEffect(() => {
    if (!payload?.name) return; 

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        console.log("Fetching doctors for hospital:", payload.name);

        const response = await fetch(
          "http://localhost:5050/hospital/core/getDoctorDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({ name: payload.name }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw response data:", data);

        const doctorsArray = Array.isArray(data.DoctorDetails)
          ? data.DoctorDetails
          : data.DoctorDetails
          ? [data.DoctorDetails]
          : [];

        console.log("Processed doctors array:", doctorsArray);
        setDoctors(doctorsArray);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [payload]); // ✅ Run again when payload changes

  if (error) return <p>Error: {error}</p>;

  return (
    <PageContainer title="Shadow" description="this is Shadow">
      <h1 className="mb-5 font-extrabold text-2xl text-blue-600">
        Manage your Hospital Doctors
      </h1>

      {loading ? (
        <p className="text-center">Loading doctor details...</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-red-500">
          No doctors found for this hospital. {payload?.name}
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2">
          {doctors.map((doctor, idx) => (
            <DoctorCard key={idx} doctor={doctor} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}