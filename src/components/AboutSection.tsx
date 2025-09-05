
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  Server,
  Shield,
  Monitor,
  BrainCircuit,
  Code,
  Database,
  Globe
} from "lucide-react";

export default function AboutSection() {
  const skills = [
    {
      icon: Cloud,
      name: "Cloud & Infra",
      description: "AWS, IBM Cloud, GCP, Kubernetes, OpenShift",
      hoverColor: "hover:bg-red-100",
    },
    {
      icon: Server,
      name: "Automation & DevOps",
      description: "Terraform, Helm, Docker, GitHub Actions, Argo CD, Ansible",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      description: "AWS IAM, IRSA, least-privilege RBAC, GitHub Secrets, SOC 2",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: Code,
      name: "Programming & Scripting",
      description: "Python, JavaScript, Node.js, Go, Bash",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      icon: Monitor,
      name: "Observability",
      description: "OpenSearch, Vector, Prometheus",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: BrainCircuit,
      name: "Web & Databases",
      description: "React, Vue.js, Next.js, Express, SQL, MongoDB",
      hoverColor: "hover:bg-orange-100",
    },
  ];
  

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              An experienced SRE/DevOps engineer with a background working across both enterprise and startup environments. I take ownership from setup to delivery to help engineers move quickly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">My Journey</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  I began my career in tech as a Web Developer, building a solid foundation in software development lifecycles. This experience sparked my passion for the operational side of software, leading me to transition into the DevOps space.
                </p>
                <p>
                  At IBM, I helped land multi-million dollar cloud deals through infrastructure automation and client delivery. More recently at Prove AI, I assisted in the deployment and management of production services, automated full-stack environments, and cut deploy times by over 80%.
                </p>
                <p>
                  My goal is to build infrastructure that stays out of the way, empowering development teams to innovate and deliver value without second-guessing their tools.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c43e712a7_62696b86-1380-4132-bee7-5150b48ef3a9.png"
                alt="Ben Hankins cartoon avatar"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Technical Expertise
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border-0 bg-slate-50 ${skill.hoverColor}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-inner transition-all duration-300 group-hover:bg-[#E07A5F]">
                      <skill.icon className="w-8 h-8 text-[#3D405B] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">{skill.name}</h4>
                    <p className="text-sm text-slate-600">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
