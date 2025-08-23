"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Hospital, Pill, Users, Stethoscope, FlaskConical, HeartHandshake, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import hospitals from "../assets/hospitals.jpg"
import pharmacy from "../assets/pharmacy.jpg";
import patient from "../assets/patients.jpg";
import doctor from "../assets/doctors.jpg";
import medical from "../assets/medical.jpg"
import service from "../assets/service.jpg"

import { useRouter } from "next/navigation";

const userTypes = [
  {
    title: "Hospitals & Clinics",
    description: "Access our powerful SaaS dashboard to manage prescriptions, streamline workflows, and enhance security with real-time analytics.",
    image: hospitals,
    icon: <Hospital className="w-8 h-8 text-white" />,
    route: "/hospital",
    gradient: "from-blue-500 to-blue-600",
    emoji: "🏥",
    features: ["Dashboard Analytics", "Multi-user Access", "Compliance Tools"],
  },
  {
    title: "Pharmacy",
    description: "Our powerful SaaS allows you to manage prescriptions, streamline workflows, and enhance security with automated dispensing.",
    image: pharmacy,
    icon: <Pill className="w-8 h-8 text-white" />,
    route: "/pharmacyregistration",
    gradient: "from-green-500 to-emerald-600",
    emoji: "💊",
    features: ["Inventory Management", "Prescription Verification", "Patient Safety"],
  },
  {
    title: "Laboratory",
    description: "Advanced laboratory management system with integrated test results, prescription coordination, and quality assurance.",
    image: medical,
    icon: <FlaskConical className="w-8 h-8 text-white" />,
    route: "/mobile",
    gradient: "from-purple-500 to-indigo-600",
    emoji: "🧪",
    features: ["Test Integration", "Result Tracking", "Quality Control"],
  },
  {
    title: "Doctors",
    description: "Comprehensive digital prescription platform with patient management, drug interaction checks, and clinical decision support.",
    image: doctor,
    icon: <Stethoscope className="w-8 h-8 text-white" />,
    route: "/doctor",
    gradient: "from-cyan-500 to-blue-500",
    emoji: "👨‍⚕️",
    features: ["E-Prescribing", "Patient History", "Drug Interactions"],
  },
  {
    title: "Patients",
    description: "Take control of your prescriptions with our secure mobile app. Access your history and connect with pharmacies seamlessly.",
    image: patient,
    icon: <Users className="w-8 h-8 text-white" />,
    route: "/mobile",
    gradient: "from-pink-500 to-rose-600",
    emoji: "👥",
    features: ["Prescription History", "Medication Reminders", "Pharmacy Finder"],
  },
  {
    title: "Medical Services",
    description: "Comprehensive medical service coordination platform with appointment scheduling, service tracking, and patient care management.",
    image: service,
    icon: <HeartHandshake className="w-8 h-8 text-white" />,
    route: "/mobile",
    gradient: "from-orange-500 to-red-500",
    emoji: "🏥",
    features: ["Service Coordination", "Appointment Booking", "Care Management"],
  },
];

export default function Onboarding() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="onboarding" className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Medical Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm-20-12c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-4">
            Join{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Binorix
            </span>{" "}
            now!
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
            Choose your role and start revolutionizing healthcare with our comprehensive digital prescription platform.
          </p>

        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.title}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group h-full">
                {/* Image Header */}
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={userType.image} 
                      width={600} 
                      height={400} 
                      alt={`${userType.title} dashboard`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Floating Icon */}
                    <motion.div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${userType.gradient} rounded-full flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {userType.icon}
                    </motion.div>


                    {/* Floating Emoji */}
                    <div className="absolute -top-2 -left-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      {userType.emoji}
                    </div>
                  </div>
            </CardHeader>

            <CardContent className="p-6">
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                    {userType.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    {userType.description}
              </CardDescription>

                  {/* Features List */}
                  <div className="space-y-2">
                    {userType.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${userType.gradient} rounded-full`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button 
                      size="lg" 
                      className={`w-full bg-gradient-to-r ${userType.gradient} text-white hover:shadow-xl transition-all duration-300 rounded-full font-semibold`}
                      onClick={() => router.push(userType.route)}
                    >
                      Get Started as {userType.title.split(' ')[0]}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
                  </motion.div>
            </CardFooter>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${userType.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200 shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartHandshake className="w-6 h-6 text-blue-600" />
            </motion.div>
            <span className="text-blue-800 font-semibold text-lg">Ready to transform healthcare together?</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-blue-600" />
            </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
