"use client";
import React from "react";
import { motion } from "framer-motion";
import { Play, Monitor, Smartphone, Users, ArrowRight } from "lucide-react";

export default function Demo() {
  return (
    <section id="demo" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Medical Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm-15-9c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            <Play className="w-10 h-10 text-white ml-1" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            See{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Binorix
            </span>{" "}
            in Action
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
            Watch a quick demo to understand how our platform simplifies prescription management for everyone involved in the healthcare ecosystem.
          </p>

          {/* Demo Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Demo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real Features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>3 Min Demo</span>
            </div>
          </div>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Video Frame */}
            <div className="absolute inset-4 bg-white rounded-xl shadow-lg overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full rounded-xl object-cover"
              >
                <source src="https://res.cloudinary.com/dolgceego/video/upload/saas-demo_xqwolb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-lg opacity-80" />
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg opacity-80" />
            <div className="absolute -bottom-3 -left-5 w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full shadow-lg opacity-80" />
            <div className="absolute -bottom-4 -right-4 w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-lg opacity-80" />
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="text-center group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Dashboard Overview</h3>
            <p className="text-gray-600 text-sm">See how doctors manage prescriptions with our intuitive dashboard interface</p>
          </motion.div>

          <motion.div 
            className="text-center group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Experience</h3>
            <p className="text-gray-600 text-sm">Discover how patients access their prescriptions on mobile devices</p>
          </motion.div>

          <motion.div 
            className="text-center group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Multi-User Flow</h3>
            <p className="text-gray-600 text-sm">Watch seamless collaboration between hospitals, pharmacies, and patients</p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play className="w-6 h-6 text-blue-600" />
            </motion.div>
            <span className="text-blue-800 font-semibold text-lg">Ready to see more? Schedule a personalized demo</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-6 h-6 text-blue-600" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
