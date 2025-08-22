"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import hospitals from "../assets/hospitals.jpg"
import pharmacy from "../assets/pharmacy.jpg";
import patient from "../assets/patients.jpg";
import doctor from "../assets/doctors.jpg";
import medical from "../assets/medical.jpg"
import service from "../assets/service.jpg"

import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router=useRouter();
  return (
    <section id="onboarding" className="py-6 sm:py-9 bg-secondary">
      <div className="container mx-auto px-4">
        <h1 className="font-extrabold text-2xl md:text-3xl pb-6 text-center">Join with Prescripto now!</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="p-0">
              <Image src={hospitals} width={600} height={400} alt="Hospital staff using dashboard" className="w-full h-auto" data-ai-hint="medical professional" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-headline">Hospitals & Clinics</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Access our powerful SaaS dashboard to manage prescriptions, streamline workflows, and enhance security.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push("/hospital")}>
                Get Started as Hospital
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="p-0">
              <Image src={pharmacy} width={600} height={400} alt="Hospital staff using dashboard" className="w-full h-auto" data-ai-hint="medical professional" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-headline">Pharmacy</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Our powerful SaaS allows you to manage prescriptions, streamline workflows, and enhance security.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push("/pharmacyregistration")}>
                Get Started as Pharmacy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
             <CardHeader className="p-0">
             <Image src={medical} width={600} height={400} alt="Hospital staff using dashboard" className="w-full h-auto" data-ai-hint="medical laboratory" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-headline">Laboratory</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Take control of your prescriptions with our secure mobile app. Access your history and connect with pharmacies.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push("/mobile")}>
                Get Started as Laboratory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
             <CardHeader className="p-0">
              <Image src={doctor} width={600} height={400} alt="Patient using a mobile app" className="w-full h-auto" data-ai-hint="patient phone" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-headline">Doctors</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Take control of your prescriptions with our secure mobile app. Access your history and connect with pharmacies.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push("/doctor")}>
                Get Started as Doctors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
             <CardHeader className="p-0">
              <Image src={patient} width={600} height={400} alt="Patient using a mobile app" className="w-full h-auto" data-ai-hint="patient phone" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-headline">Patients</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Take control of your prescriptions with our secure mobile app. Access your history and connect with pharmacies.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push("/mobile")}>
                Get Started as Patients
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
             <CardHeader className="p-0">
              <Image src={service} width={600} height={400} alt="Patient using a mobile app" className="w-full h-auto" data-ai-hint="patient phone" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-headline">Medical Services</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Take control of your prescriptions with our secure mobile app. Access your history and connect with pharmacies.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push("/mobile")}>
                Avail your Medical Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
