"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY, type CategoryKey } from "@/lib/colors";
import {
  Cloud,
  Server,
  Shield,
  Monitor,
  BrainCircuit,
  Code,
  CheckCircle2,
} from "lucide-react";

export default function AboutSection() {
  const principles = [
    {
      icon: CheckCircle2,
      title: "Developer experience first",
      blurb:
        "Clear defaults and paved paths that help teams ship without friction.",
    },
    {
      icon: CheckCircle2,
      title: "Security by design",
      blurb:
        "IAM, secrets, and RBAC baked into workflows, not bolted on later.",
    },
    {
      icon: CheckCircle2,
      title: "Reliability as a habit",
      blurb:
        "Simple, observable systems with automation that catches drift early.",
    },
  ];

  const skills: Array<{
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    description: string;
    key: CategoryKey;
  }> = [
    {
      icon: Cloud,
      name: "Cloud & Infra",
      description: "AWS, IBM Cloud, GCP, Kubernetes, OpenShift",
      key: "infrastructure",
    },
    {
      icon: Server,
      name: "Automation & DevOps",
      description: "Terraform, Helm, Docker, GitHub Actions, Argo CD, Ansible",
      key: "automation",
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      description: "AWS IAM, IRSA, least-privilege RBAC, SOC 2",
      key: "security",
    },
    {
      icon: Code,
      name: "Programming & Scripting",
      description: "Python, Go, JavaScript/Node.js, Bash",
      key: "ci-cd",
    },
    {
      icon: Monitor,
      name: "Observability",
      description: "OpenSearch, Vector, Prometheus",
      key: "monitoring",
    },
    {
      icon: BrainCircuit,
      name: "Web & Databases",
      description: "React, Next.js, Express, SQL, MongoDB",
      key: "cloud",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              SRE, DevOps, and Infrastructure engineer focused on secure,
              automated platforms that let teams move fast with confidence.
            </p>
          </div>

          {/* Intro + Avatar */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">My journey</h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  I started in web development and leaned into platform work after
                  seeing how much time teams lose to tooling. My focus is building
                  systems that feel simple to use and safe to ship.
                </p>
                <p>
                  At IBM I codified cloud environments and helped win a{" "}
                  <span className="font-medium">$10.1M</span> SAP RISE deal by proving speed and safety.
                  At Prove AI I owned deployment and operations for production services,
                  using Terraform, Helm, and GitHub Actions to remove bottlenecks.
                </p>
                <p>
                  The result I care about most is clear ownership and fewer surprises
                  from idea to production.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-slate-200 shadow-sm">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c43e712a7_62696b86-1380-4132-bee7-5150b48ef3a9.png"
                    alt="Ben Hankins cartoon avatar"
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Principles */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Principles I build with
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border bg-white p-5 text-center shadow-sm hover:shadow-md transition"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200">
                    <p.icon className="h-5 w-5 text-slate-800" />
                  </div>
                  <div className="font-semibold text-slate-900">{p.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{p.blurb}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills – unified color + lighter on hover */}
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Technical expertise
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const c = CATEGORY[skill.key];
              return (
                <Card
                  key={skill.name}
                  className={[
                    "group overflow-hidden rounded-2xl border-0 ring-1", // trim default border/bg
                    c.ring,
                    c.bg,                      // ⬅️ move gradient to the Card
                    "transition-colors",
                  ].join(" ")}
                >
                  <CardContent
                    className="bg-transparent p-6 text-center" // ⬅️ no background on content
                  >
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-1 ${c.ring} shadow-inner transition group-hover:scale-[1.03]`}
                    >
                      <skill.icon className="h-8 w-8 text-slate-800" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">{skill.name}</h4>
                    <p className="text-sm text-slate-700">{skill.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}
