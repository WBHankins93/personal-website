import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Code } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Site Reliability Engineer",
      company: "Prove AI",
      period: "Jan 2024 - Present",
      location: "Remote",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ef8062d24_image.png",
      achievements: [
        "Built GitHub Actions workflows to automate Terraform for AWS and Kubernetes, reducing deployment time by 90% across 4 environments.",
        "Deployed and maintained 4 production services using Helm, including chart templating and secrets integration.",
        "Managed IAM roles, GitHub Secrets, and IRSA to securely provision workloads and enforce least-privilege access.",
        "Oversaw SOC 2 readiness, driving completion from 34% to 100% compliance.",
        "Tuned OpenSearch visibility by refining Vector transforms and dashboard filters, improving log quality.",
        "Created Python scripts to summarize Terraform output and post clean PR plan summaries, reducing review friction."
      ],
      technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Helm", "OpenSearch", "Vector", "Python"]
    },
    {
      title: "Cloud Infrastructure Engineer",
      company: "IBM",
      period: "Feb 2022 - Aug 2024",
      location: "Remote",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      achievements: [
        "Architected and automated cloud environments on IBM Cloud, reducing deployment times by 85% through Terraform automation.",
        "Led technical client sessions, collaborating on public and hybrid cloud solutions, resulting in a $10.1M SAP RISE IBM Cloud deal.",
        "Developed monitoring systems to ensure 99.9% uptime and optimized performance across cloud infrastructures.",
        "Mentored junior engineers, improving team productivity by 20%."
      ],
      technologies: ["IBM Cloud", "Terraform", "Automation", "Monitoring", "Mentorship", "Client Delivery"]
    },
    {
      title: "Cloud Engineer",
      company: "IBM",
      period: "Feb 2021 - Jun 2022",
      location: "Austin, TX",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      achievements: [
        "Provisioned scalable cloud infrastructure using Terraform, significantly improving deployment efficiency.",
        "Deployed microservices on Red Hat OpenShift, enabling seamless CI/CD integration.",
        "Engineered Argo CD container pipelines, reducing build times by 40%.",
        "Deployed and configured Cloud Pak for Data."
      ],
      technologies: ["Terraform", "Red Hat OpenShift", "Argo CD", "Microservices", "Cloud Pak for Data"]
    },
    {
      title: "Pre-Sales Technical Engineer",
      company: "IBM",
      period: "Dec 2019 - Feb 2021",
      location: "Austin, TX",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      achievements: [
        "Guided clients in cloud modernization and migration, enhancing Java applications for cloud environments.",
        "Managed Tekton container pipelines for CI/CD, optimizing deployment processes.",
        "Designed cloud migration strategies using Red Hat OpenShift, leading to successful project completions."
      ],
      technologies: ["Cloud Modernization", "Tekton", "CI/CD", "Red Hat OpenShift", "Java", "Pre-Sales"]
    },
    {
      title: "Web Developer",
      company: "Kortivity",
      period: "May 2019 - Dec 2019",
      location: "Austin, TX",
      logo: null,
      achievements: [
        "Responsible for the SDLC of a Google Chrome extension using Vue.js framework to build a recruiter talent pool database.",
        "Contributed to a product currently being used by Kortivity clients."
      ],
      technologies: ["Vue.js", "Google Chrome Extension", "SDLC", "JavaScript"]
    }
  ];

  const techColors = [
    "bg-red-100 text-red-800",
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
    "bg-cyan-100 text-cyan-800",
    "bg-teal-100 text-teal-800",
    "bg-orange-100 text-orange-800",
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Professional Experience
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A journey through innovative companies, building robust infrastructure 
              and fostering DevOps culture across diverse environments.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-md flex-shrink-0 flex items-center justify-center p-1">
                          {exp.logo ? (
                            <img src={exp.logo} alt={`${exp.company} logo`} className="object-contain w-full h-full" />
                          ) : (
                            <Code className="w-8 h-8 text-[#3D405B]" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-slate-900 mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-[#3D405B] font-semibold mb-1">{exp.company}</p>
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <p className="text-slate-500 text-sm mt-1">{exp.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <div 
                            key={techIndex}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${techColors[techIndex % techColors.length]}`}
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#E07A5F] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-600">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}