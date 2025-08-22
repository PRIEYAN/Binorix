"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link";
import Header from "@/pages/header";
import { useState } from "react";
import axios from "axios";


interface FormData {
  email: string;
  password: string;
}

export default function AccountRecovery() {
  const router = useRouter();

   const [formData, setFormData] = useState<FormData>({
          email: "",
          password: "",
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


      try{
        const requestData = {
            email: formData.email,
            password: formData.password
        };

        const response = await axios.post(
            "http://localhost:5050/pharmacy/auth/login", 
            requestData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
      }

        setSuccess("Login successful!");
        setLoading(false);
        setFormData({
                email: "",
                password: ""
            });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/pharmacyDashboard");
        }, 1000);
      }catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.message || "Login failed!");
            } else if (axios.isAxiosError(error) && error.request) {
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
      <section className="containet flex flex-col items-center justify-center p-10">
          <div className="mb-10">
            <h1 className="font-bold text-3xl">Login to <span className="text-blue-600">Prescripto 👋
                </span></h1>
        </div>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
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
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ragavi@preiyan.com"
                value={formData.email}
                onChange={handleInputChange}
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
                placeholder=""
                value={formData.password}
                onChange={handleInputChange} 
                required  />
            </div>
          </div>
          <div className="mt-6">
              <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
              >
                  {loading ? "Logging in..." : "Login"}
              </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
        <div className="mt-5 flex flex-row items-center">
            <p>Don't have an account?</p>
            <Link href="/pharmacyregistration/register" className="text-blue-600 pl-2">Register Now</Link>
        </div>
      </CardFooter>
    </Card>
      </section>
    </section>
  )
}
