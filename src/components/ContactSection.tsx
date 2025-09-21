"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "benhankins.work@gmail.com", 
      href: "mailto:benhankins.work@gmail.com",
      description: "Drop me a line anytime"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(228) 327-1082", 
      href: "tel:+12283271082",
      description: "Let&apos;s chat about your project"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Orleans, LA", 
      href: null,
      description: "Currently based in Louisiana"
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your infrastructure needs? I&apos;d love to hear about your project and explore how we can work together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Let&apos;s Connect</h3>
                
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-md transition-shadow duration-300 border-0 ring-1 ring-slate-200 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center ring-1 ring-blue-200">
                            <info.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1">{info.label}</h4>
                            <p className="text-xs text-slate-500 mb-2">{info.description}</p>
                            {info.href ? (
                              <a 
                                href={info.href}
                                className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-slate-700 font-medium">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl ring-1 ring-emerald-200"
                >
                  <h4 className="font-semibold text-slate-900 mb-2">Response Time</h4>
                  <p className="text-sm text-slate-600">
                    I typically respond to messages within 24 hours. For urgent matters, feel free to call directly.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="border-0 ring-1 ring-slate-200 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-600">
                        Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`mt-1 ${errors.name ? 'ring-red-500 ring-2' : ''}`}
                            placeholder="Your full name"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`mt-1 ${errors.email ? 'ring-red-500 ring-2' : ''}`}
                            placeholder="your.email@company.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div>
                        <Label htmlFor="subject" className="text-sm font-medium text-slate-700 mb-2">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={`mt-1 ${errors.subject ? 'ring-red-500 ring-2' : ''}`}
                          placeholder="Infrastructure consultation, DevOps project, etc."
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-slate-700 mb-2">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`mt-1 min-h-32 ${errors.message ? 'ring-red-500 ring-2' : ''}`}
                          placeholder="Tell me about your project, timeline, and what kind of help you&apos;re looking for..."
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}