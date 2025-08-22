import Image from 'next/image';
import Head from 'next/head';
import React from 'react';

export default function PatientAppDownload() {
  return (
    <>
      <Head>
        <title>Download Prescripto App</title>
        <meta name="description" content="Get prescriptions, buy medicines, and manage your health in one app." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              highest quality <br />
              <span className="text-yellow-400 underline decoration-4">healthcare access</span><br />
              at your fingertips.
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Get prescriptions, buy medicines, and track your health from one app.
            </p>
            <a
              href="https://your-app-store-link.com"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold px-6 py-3 rounded-md transition"
            >
              Download Prescripto App
            </a>
          </div>

          
          <div className="flex justify-center md:justify-end">
            <Image
              src="/your-app-screenshot.png"
              alt="Prescripto App Screenshot"
              width={400}
              height={600}
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
