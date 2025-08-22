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
import { useRouter } from "next/navigation"
import Link from "next/link";
import React from "react";
import Header from "@/pages/header";

export default function AccountRecovery() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [showOtp, setShowOtp] = React.useState(false);
    const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
    const [error, setError] = React.useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setError("");
    };

    const handleSendOtp = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) {
        setError("Email is required");
        setShowOtp(false);
        return;
      }
      setShowOtp(true);
      setError("");
    };

    const handleOtpChange = (idx: number, value: string) => {
      if (!/^[0-9]?$/.test(value)) return;
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < 5) {
        const next = document.getElementById(`otp-${idx + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    };

    const handleVerify = (e: React.FormEvent) => {
      e.preventDefault();
      alert("OTP Verified: " + otp.join(""));
      router.push("/hospital");
    };

    return (
      <section className="container h-screen">
        <Header/>
        <section className="containet flex flex-col items-center justify-center p-10">
            <div className="mb-10">
              <h1 className="font-bold text-3xl">Have a Happy Journey with <span className="text-blue-600">Prescripto 👋
                  </span></h1>
          </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Recover your Account</CardTitle>
          <CardDescription className="pt-2">
            Enter your email below to recover your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={showOtp ? handleVerify : handleSendOtp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ragavi@preiyan.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={showOtp}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                {!showOtp && (
                  <Button type="submit" className="w-full mt-4">
                    Send OTP
                  </Button>
                )}
                {showOtp && (
                  <div className="flex flex-col gap-4 mt-1">
                    <CardDescription className="pt-2">An OTP was sent to the above Mail ID.</CardDescription>
                    <p>Enter your OTP</p>
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, idx) => (
                        <Input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className="w-10 text-center text-lg"
                          value={digit}
                          onChange={e => handleOtpChange(idx, e.target.value)}
                        />
                      ))}
                    </div>
                    <Button type="submit" className="w-full mt-2">
                      Verify
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <CardDescription className="pt-2">
            An OTP will be sent your registered Mail id for Account Recovery
          </CardDescription>
        </CardFooter>
      </Card>
        </section>
      </section>
    )
}
