"use client";
import React from "react";
export default function Demo() {
  return (
    <section id="demo" className="py-12 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">See <span className="text-blue-700 font-bold">Prescripto</span> in Action</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Watch a quick demo to understand how our platform simplifies prescription management for everyone involved.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <iframe
              title="Prescripto Demo Video"
              src="https://player.cloudinary.com/embed/?cloud_name=dolgceego&public_id=saas-demo_xqwolb&profile=cld-default"
              width="1080"
              height="1080" 
              allow="autoPlay;fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
