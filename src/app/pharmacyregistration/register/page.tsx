"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/pages/header";
import TypingEffect from "@/components/ui/typingeffect";
import { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  retailLicense: string;
  email: string;
  PhoneNumber: string;
  websiteLink: string;
  location: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
      name: "",
      retailLicense: "",
      email: "",
      PhoneNumber: "",
      websiteLink: "",
      location: "",
      password: "",
      confirmPassword: ""
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        name: formData.name,
        retailLicense: formData.retailLicense,
        email: formData.email,
        PhoneNumber: formData.PhoneNumber,
        websiteLink: formData.websiteLink,
        location: formData.location,
        password: formData.password
      };

      const response = await axios.post(
        "http://localhost:5050/pharmacy/auth/signin", 
        requestData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // Store the token from response
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setSuccess("Registration successful!");
      
      // Clear form
      setFormData({
        name: "",
        retailLicense: "",
        email: "",
        PhoneNumber: "",
        websiteLink: "",
        location: "",
        password: "",
        confirmPassword: ""
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/pharmacyregistration");
      }, 1000);

    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Registration failed!");
      } else if (error && typeof error === 'object' && 'request' in error) {
        setError("Network error! Please check if the server is running.");
      } else {
        setError("An unexpected error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container h-screen">
      <Header/>
      <section className="container flex flex-col items-center justify-center p-10">
        <div className="mb-10">
            <h1>
                <TypingEffect
                text="Welcome to "
                speed={80}
                className="font-bold text-3xl"
                />
                <span className="text-blue-600 text-3xl">Prescripto
                </span></h1>
        </div>
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register your Pharmacy with us!</CardTitle>
        <CardDescription className="pt-2">
          Enter the below details to onboard your Pharmacy with us!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className=" pb-2">Enter your Pharmacy Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Apollo Pharmacy"
                required
              />
              <Label htmlFor="retailLicense" className="pt-2 pb-2">Enter your Retail License Number</Label>
              <Input
                id="retailLicense"
                type="text"
                placeholder="39939XXXXX"
                value={formData.retailLicense}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="email" className="pt-2 pb-2">Enter your Mail id</Label>
              <Input
                id="email"
                type="email"
                placeholder="ragavi@preiyan.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="PhoneNumber" className="pt-2 pb-2">Enter your Contact Number</Label>
              <Input
                id="PhoneNumber"
                type="tel"
                placeholder="+91 98765XXXXX"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="websiteLink" className="pt-2 pb-2">Enter your Official Website (Optional)</Label>
              <Input
                id="websiteLink"
                type="url"
                placeholder="https://www.example.com or enter 'null'"
                value={formData.websiteLink}
                onChange={handleInputChange}
              />
              <Label htmlFor="location" className="pt-2 pb-2">Enter your Pharmacy Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Chennai, Tamil Nadu"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="password" className="pt-2 pb-2">Enter your New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="confirmPassword" className="pt-2 pb-2">Confirm your Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder=""
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="mt-5 flex flex-row ">
            <p>Already have an account?</p>
            <Link href="/pharmacy/login" className="text-blue-600 pl-2">Login Now</Link>
        </div>
      </CardFooter>
    </Card>
    </section>
    </section>
  )
}
