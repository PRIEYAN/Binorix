"use client";
import React, { useState } from "react";
import Image from "next/image";
import contact from "../../assets/contact.svg"

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const to = "mnprieyan@gmail.com";
    const mailSubject = subject || "Contact from website";
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      message,
    ];
    const mailBody = bodyLines.join("\n");
    const mailto = `mailto:${to}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailto;
  }

  return (
    <div className="min-h-screen flex bg-purple-50 text-gray-900 font-sans px-6 py-12">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center ml-10">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-10 ml-10 text-purple-600">Zypher</h1>

        {/* Contact Card */}
        <div className="bg-white rounded-lg shadow p-8 max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Us</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-purple-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-purple-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-purple-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-purple-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border border-purple-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <Image src={contact} alt="contact-us" />
      </div>
    </div>
  );
}
