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
import { SquarePlus } from "lucide-react";
import DayPicker from "../../components/dashboard/DayPicker";

export default function TypographyPage() {
  const router = useRouter();
  return (
    <section className="container h-screen">
      <section className="container flex flex-col items-left justify-left p-10">
        <div className="flex flex-row items-center text-2xl gap-2 font-extrabold mb-10">
          <SquarePlus/>
          <h1 className="font-extrabold text-2xl text-blue-600">Add Doctors to Hospital Network</h1>
        </div>
        <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register your Hospital Doctor!</CardTitle>
        <CardDescription className="pt-2">
          Enter below details to onboard doctors to your Network!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className=" pb-2">Enter Doctor Name</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                required
              />
              <Label htmlFor="reg-number" className="pt-2 pb-2">Enter Medical Practicioner No</Label>
              <Input
                id="reg-number"
                type="number"
                placeholder="39939XXXXX"
                required
              />
              <Label htmlFor="reg-year" className="pt-2 pb-2">Enter Doctor Mob No</Label>
              <Input
                id="reg-year"
                type="number"
                placeholder="1986"
                required
              />
              <Label htmlFor="reg-year" className="pt-2 pb-2">Enter Doctor Mail ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="ragavi@preiyan.com"
                required
              />
              <Label htmlFor="reg-year" className="pt-2 pb-2">Enter Doctor Specialization Areas</Label>
              <Input
                id="hospital-name"
                type="text"
                placeholder="Eg. General, Orthology etc."
              />
              <DayPicker/>
              <Label htmlFor="email" className="pt-2 pb-2">Enter Doctor New Password</Label>
              <Input
                id="email"
                type="password"
                placeholder="********"
                required
              />
              <Label htmlFor="email" className="pt-2 pb-2">Confirm Doctor Password</Label>
              <Input
                id="email"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={() => alert("Doctor Added Successfully")}>
          Register Doctor
        </Button>
      </CardFooter>
    </Card>
    </section>
    </section>
  )
}
