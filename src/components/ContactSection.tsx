
import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin,
} from "lucide-react";

export default function ContactSection() {
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "benhankins.work@gmail.com", 
      href: "mailto:benhankins.work@gmail.com" 
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(228) 327-1082", 
      href: "tel:+12283271082" 
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Orleans, LA", 
      href: null
    }
  ];

  

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Want to Connect?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {`Ready to transform your infrastructure? Let's discuss how we can build 
              scalable, reliable solutions that drive your business forward.`}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F4F1DE] rounded-lg flex items-center justify-center"> 
                          <info.icon className="w-6 h-6 text-[#3D405B]" /> 
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{info.label}</p>
                          {info.href ? (
                            <a 
                              href={info.href}
                              className="text-slate-600 hover:text-[#E07A5F] transition-colors" 
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-slate-600">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
