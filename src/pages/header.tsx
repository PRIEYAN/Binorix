"use client";
import React from "react";
import Link from "next/link";
import { Menu, X, Stethoscope, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home"},
  { href: "#about", label: "About us"},
  { href: "#demo", label: "Product Demo"},
  { href: "#hospitals", label: "Hospitals"},
  { href: "#patients", label: "Patients"},
  { href: "#contact", label: "Contact"},
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-blue-200/30 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 shadow-lg shadow-blue-100/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo with Medical Icon */}
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Stethoscope className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl md:text-3xl font-headline bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Binorix
            </span>
            <span className="text-xs text-blue-500 font-medium -mt-1">Healthcare Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="hidden md:flex">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/contact" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Contact us</span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-gradient-to-b from-blue-50 to-white">
              <div className="flex flex-col space-y-6 pt-6">
                {/* Mobile Logo */}
                <Link 
                  href="#home" 
                  className="flex items-center space-x-3 pb-4 border-b border-blue-200" 
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-blue-700">Binorix</span>
                    <span className="text-xs text-blue-500">Healthcare Platform</span>
                  </div>
                </Link>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile Contact Button */}
                <Button 
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg mt-4"
                >
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
