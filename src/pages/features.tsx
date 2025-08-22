"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, BadgeCheck, Trash2, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Secure Blockchain Storage",
    description: "Prescriptions are immutably stored on the blockchain, ensuring tamper-proof records and ultimate security.",
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-primary" />,
    title: "Verified Pharmacy Onboarding",
    description: "Only licensed and verified pharmacies can join our network, guaranteeing authenticity and patient safety.",
  },
  {
    icon: <Trash2 className="w-10 h-10 text-primary" />,
    title: "Waste Disposal Compliance",
    description: "Track and manage the disposal of controlled substances, ensuring full compliance with environmental regulations.",
  },
  {
    icon: <Lock className="w-10 h-10 text-primary" />,
    title: "Patient Data Privacy",
    description: "Patient confidentiality is paramount. Our system is built with robust privacy controls from the ground up.",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="features" className="py-12 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose <span className="text-blue-600 font-bold">Prescripto?</span></h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our platform is built on a foundation of security, trust, and innovation to revolutionize the prescription process.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="text-center flex flex-col items-center p-6 border-2 border-transparent hover:border-primary/50 transition-colors duration-300 shadow-lg hover:shadow-primary/20 bg-card h-full">
                <CardHeader className="p-0 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                </CardHeader>
                <CardTitle className="mb-2 text-xl font-headline">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
