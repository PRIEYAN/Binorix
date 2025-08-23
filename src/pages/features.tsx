"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, BadgeCheck, Trash2, Lock, Zap, Clock, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Secure Storage",
    description: "Prescriptions stored securely on blockchain technology.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-white" />,
    title: "Verified Pharmacies",
    description: "Only licensed pharmacies can access the network.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: <Lock className="w-8 h-8 text-white" />,
    title: "Privacy Protected",
    description: "Patient data is encrypted and kept confidential.",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Fast Processing",
    description: "Quick prescription verification and dispensing.",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8,
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
    <section id="features" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Medical Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-13.8-11.2-25-25-25S0 36.2 0 50s11.2 25 25 25 25-11.2 25-25zm-25-15c8.3 0 15 6.7 15 15s-6.7 15-15 15-15-6.7-15-15 6.7-15 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            whileHover={{ scale: 1.1, rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Binorix?
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Key features that make digital prescriptions simple and secure.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="text-center p-6 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="p-0 mb-4">
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-md mb-4 mx-auto`}>
                    {feature.icon}
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardDescription className="text-gray-600 text-sm">
                  {feature.description}
                </CardDescription>
              </Card>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
