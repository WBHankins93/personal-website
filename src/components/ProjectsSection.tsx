import React, { useState, useEffect } from "react";
import { projects as allProjects } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Folder } from "lucide-react";
import { FaGithub } from "react-icons/fa";


export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "automation", label: "Automation" },
    { id: "monitoring", label: "Monitoring" },
    { id: "ci-cd", label: "CI/CD" },
    { id: "cloud", label: "Cloud" },
    { id: "security", label: "Security" }
  ];

  const filteredProjects =
  selectedCategory === "all"
    ? allProjects
    : allProjects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A showcase of infrastructure projects, automation tools, and DevOps solutions 
              that demonstrate technical expertise and problem-solving capabilities.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Folder className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No Projects Yet</h3>
              <p className="text-slate-500">Projects will be displayed here once they're added to the portfolio.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                  {project.image_url && (
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                      <img 
                        src={project.image_url} 
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                        {project.name}
                      </h3>
                      <div className="flex gap-2">
                        {project.github_url && (
                          <a 
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            <FaGithub size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}