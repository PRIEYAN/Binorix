"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TypingEffect from "@/components/ui/typingeffect";

// const DynamicHero3D = dynamic(() => import("./hero-3d").then((mod) => mod.Hero3D), {
//   ssr: false,
// });

export default function Hero() {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative py-20 md:py-32 bg-background overflow-hidden flex items-center justify-center text-center"
    >
      <div className="container px-4 mx-auto z-10 relative">
        <div className="max-w-3xl mx-auto">
          <TypingEffect
            text="Zyypher"
            speed={80}
            className="text-6xl font-bold text-red-500"
          />
          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            A seamless and secure system for managing digital prescriptions, connecting hospitals, pharmacies, and patients in one unified platform.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#onboarding">Get started for free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}