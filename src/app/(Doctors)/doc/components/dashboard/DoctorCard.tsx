"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export type Doctor = {
  name: string;
  nmrNumber: string;
  email: string;
  PhoneNumber: string;
  specialization: string;
  availability: string;
};

type DoctorCardProps = {
  doctor: Doctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <p className="font-bold text-1.5xl">Doctor Name: {doctor.name}</p>
        <CardDescription>
          Medical Practitioner No: {doctor.nmrNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-1">
            <p className="mb-2">Email: {doctor.email}</p>
            <p className="mb-2">Contact No: {doctor.PhoneNumber}</p>
            <p className="mb-2">Specialist: {doctor.specialization}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex flex-wrap bg-blue-500 p-4 rounded-md">
          <p className="font-medium text-white">Available Days : {doctor.availability}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
