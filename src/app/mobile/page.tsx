"use client";
import React from "react";
import Image from 'next/image';
import Head from 'next/head';
import mobile from "../../assets/mobile.svg";

export default function PatientAppDownload() {
  return (
    <>
      <Head>
        <title>Download Prescripto App</title>
        <meta name="description" content="Get prescriptions, buy medicines, and manage your health in one app." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-white to-blue-300 flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-red-500">
              Download Prescripto <br />
              <span className="text-blue-600 decoration-4 mt-6">Prescriptions on Blockchain</span>
            </h1>
            <p className="text-xl md:text-xl mb-8 text-black">
              Get prescriptions, buy medicines, and track your health from one app.
            </p>
            <a
              href="#"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold px-6 py-3 rounded-md transition"
            >
              Download Prescripto App
            </a>
          </div>
          
          <div className="flex justify-center md:justify-end p-10">
            <Image
              src={mobile}
              alt="Prescripto App Screenshot"
              width={650}
              height={850}
            />
          </div>
        </div>
      </div>
    </>
  );
}
