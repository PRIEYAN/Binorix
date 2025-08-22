"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "../components/icons/logo";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About us" },
  { href: "#demo", label: "Product Demo" },
  { href: "#hospitals", label: "Hospitals" },
  { href: "#patients", label: "Patients" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-extrabold text-3xl font-headline text-blue-600">Zypher</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-m font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex p-7">
          <Button asChild onClick={()=>"/contact"}>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col space-y-4">
                <Link href="#home" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-bold">Prescripto</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
