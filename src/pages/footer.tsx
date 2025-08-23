"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Heart, Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "#features" },
        { name: "About Us", href: "#about" },
        { name: "Demo", href: "#demo" },
        { name: "Pricing", href: "#pricing" },
      ]
    },
    {
      title: "For Healthcare",
      links: [
        { name: "Hospitals", href: "#hospitals" },
        { name: "Doctors", href: "/doctor" },
        { name: "Pharmacies", href: "/pharmacyregistration" },
        { name: "Patients", href: "/mobile" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "System Status", href: "#" },
        { name: "Contact Support", href: "#contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "HIPAA Compliance", href: "#" },
        { name: "Security", href: "#" },
      ]
    },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "support@binorix.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+1 (555) 123-4567" },
    { icon: <MapPin className="w-4 h-4" />, text: "San Francisco, CA" },
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "#", name: "GitHub" },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm-15-9c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl font-headline">Binorix</span>
                  <span className="text-blue-200 text-sm">Healthcare Platform</span>
                </div>
              </div>
              
              <p className="text-blue-100 text-base leading-relaxed mb-6 max-w-md">
                Revolutionizing healthcare with secure, blockchain-powered digital prescription management. 
                Connecting hospitals, pharmacies, and patients in one unified platform.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-blue-100">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-blue-100">FDA Approved</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-blue-100">
                    <div className="text-blue-300">{item.icon}</div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <p className="text-blue-200 text-sm">
                &copy; {new Date().getFullYear()} Binorix Healthcare Platform. All rights reserved.
              </p>
              <p className="text-blue-300 text-xs mt-1">
                Empowering healthcare professionals worldwide with secure digital prescriptions.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group"
                  aria-label={social.name}
                >
                  <div className="text-blue-200 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* Floating Medical Elements */}
      <div className="absolute top-10 right-10 text-blue-700/20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8h-2V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
          </svg>
        </motion.div>
      </div>
    </footer>
  );
}
