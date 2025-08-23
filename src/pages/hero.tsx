"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Stethoscope, Heart, Shield, Activity } from "lucide-react";
import TypingEffect from "@/components/ui/typingeffect";

export default function Hero() {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden flex items-center justify-center text-center min-h-screen"
    >
      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M36 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-12-8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container px-4 mx-auto z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Floating Medical Icons */}
          <div className="absolute -top-20 -left-20 text-blue-200">
            <motion.div variants={floatingVariants} initial="initial" animate="animate">
              <Stethoscope size={60} />
            </motion.div>
          </div>
          <div className="absolute -top-10 -right-20 text-blue-200">
            <motion.div 
              variants={floatingVariants} 
              initial="initial" 
              animate="animate"
              transition={{ delay: 1 }}
            >
              <Heart size={50} />
            </motion.div>
          </div>
          <div className="absolute top-1/2 -left-16 text-blue-200">
            <motion.div 
              variants={floatingVariants} 
              initial="initial" 
              animate="animate"
              transition={{ delay: 2 }}
            >
              <Shield size={40} />
            </motion.div>
          </div>
          <div className="absolute top-1/3 -right-16 text-blue-200">
            <motion.div 
              variants={floatingVariants} 
              initial="initial" 
              animate="animate"
              transition={{ delay: 3 }}
            >
              <Activity size={45} />
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TypingEffect
              text="Biinorix"
              speed={120}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent drop-shadow-lg"
            />
          </motion.div>

          <motion.div
            className="mb-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-2">
              🏥 Digital Healthcare Revolution
            </h2>
          </motion.div>

          <motion.p
            className="mt-6 text-lg text-gray-600 text-center max-w-2xl mx-auto"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            Digital prescription management connecting hospitals, pharmacies, and patients.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
          >
            <motion.div variants={pulseVariants} initial="initial" animate="animate">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-full"
              >
                <Link href="#onboarding">
                  Get Started for Free
                </Link>
              </Button>
            </motion.div>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </motion.div>


        </div>
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-100/50"></div>
        
        {/* Animated Medical Cross */}
        <motion.div 
          className="absolute top-20 left-1/4 w-16 h-16 text-blue-200/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8h-2V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
          </svg>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
        
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-blue-400/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
}