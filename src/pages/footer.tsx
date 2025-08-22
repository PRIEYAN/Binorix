import Link from "next/link";
import React from "react";
export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-bold text-xl font-headline text-blue-600">Prescripto</span>
          </div>
          <nav className="flex space-x-6 text-muted-foreground mb-4 md:mb-0">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Prescripto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
