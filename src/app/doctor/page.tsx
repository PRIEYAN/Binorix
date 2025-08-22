"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/pages/header";
import Filter from "../(Doctors)/doc/components/Filter";
import axios from "axios";

export default function Doctor() {
  const router = useRouter();

  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5050/doctor/auth/login", {
        email,
        password,
        hospitalName,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setSuccess("Login successful!");
        setError("");
        // Optionally clear form fields or redirect after delay
        setTimeout(() => {
          router.push("/doc/medicaldashboard");
        }, 1000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container h-screen">
      <Header />
      <section className="container flex flex-col items-center justify-center p-10">
        <div className="mb-10">
          <h1 className="font-bold text-3xl">
            Have a Happy Journey with{" "}
            <span className="text-blue-600">Prescripto 👋</span>
          </h1>
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login - Doctor Account</CardTitle>
            <CardDescription className="pt-2">
              Enter your email below to login to your account
            </CardDescription>

            {/* Show error or success messages here */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-4">
                {success}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <div className="mb-4">
                    <div className="mb-3">
                      <Label>Select your Hospital</Label>
                    </div>
                    {/* Pass setHospitalName to Filter so it updates state */}
                    <Filter onHospitalSelect={(name: string) => setHospitalName(name)} />
                  </div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ragavi@preiyan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/hospital/account-recovery"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <CardFooter className="flex-col gap-2 mt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="mt-5 flex flex-row items-left justify-start">
                  <Link href="/hospital/register" className="text-blue-600 pl-2">
                    *Get your Login Credentials from Hospitals
                  </Link>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
