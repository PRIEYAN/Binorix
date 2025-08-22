import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hospital, Store, Smartphone } from "lucide-react";

const userCategories = [
  {
    icon: <Hospital className="w-8 h-8 text-primary-foreground" />,
    title: "Hospitals & Doctors",
    description: "SaaS access to manage digital prescriptions seamlessly and securely.",
  },
  {
    icon: <Store className="w-8 h-8 text-primary-foreground" />,
    title: "Pharmacies",
    description: "Verified access to dispense medications with confidence and efficiency.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary-foreground" />,
    title: "Patients",
    description: "Mobile app access to your prescription history and medication reminders.",
  },
];

export default function UserCategories() {
  return (
    <section id="about" className="py-12 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Designed for Everyone in <span className="text-red-500 font-bold">Healthcare</span></h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Prescripto caters to the specific needs of each user group, creating a connected and efficient ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userCategories.map((category) => (
            <Card key={category.title} className="p-6 shadow-md border-transparent hover:border-primary/50 transition-colors duration-300 bg-card transform hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4 p-0">
                <div className="bg-primary p-3 rounded-lg">
                  {category.icon}
                </div>
                <CardTitle className="text-2xl font-headline">{category.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-4 text-muted-foreground">
                {category.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
