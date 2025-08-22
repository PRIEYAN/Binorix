import React from "react";
import Header from "@/pages/header";
import Hero from "@/pages/hero";
import UserCategories from "@/pages/user-categories";
import Features from "@/pages/features";
import Onboarding from "@/pages/onboarding";
import Demo from "@/pages/demo";
import Footer from "@/pages/footer";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero/>
        <UserCategories />
        <Features />
        <Onboarding />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
