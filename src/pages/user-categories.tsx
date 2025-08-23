"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hospital, Store, Smartphone, Users, Stethoscope, Pill } from "lucide-react";
import { motion } from "framer-motion";

const userCategories = [
  {
    icon: <Hospital className="w-8 h-8 text-white" />,
    title: "Hospitals & Doctors",
    description: "Manage digital prescriptions with our secure dashboard.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: <Store className="w-8 h-8 text-white" />,
    title: "Pharmacies",
    description: "Verify and dispense medications safely and efficiently.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-white" />,
    title: "Patients",
    description: "Access your prescription history and connect with pharmacies.",
    gradient: "from-purple-500 to-indigo-600",
  },
];

export default function UserCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Medical Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm-10-6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            <Stethoscope className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Designed for Everyone in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Simple digital prescription management for healthcare professionals and patients.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {userCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group h-full">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl shadow-md`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardDescription className="text-gray-600 text-sm">
                  {category.description}
                </CardDescription>
              </Card>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
