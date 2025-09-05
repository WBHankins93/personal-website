import React, { useState, useEffect } from "react";
import { projects as allProjects } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from "clsx";

const CATEGORY = {
  "infrastructure": {
    ring: "ring-emerald-200",
    grad: "from-emerald-50 to-teal-50",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500"
  },
  "automation": {
    ring: "ring-amber-200",
    grad: "from-amber-50 to-yellow-50",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500"
  },
  "monitoring": {
    ring: "ring-violet-200",
    grad: "from-violet-50 to-fuchsia-50",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500"
  },
  "ci-cd": {
    ring: "ring-sky-200",
    grad: "from-sky-50 to-cyan-50",
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500"
  },
  "cloud": {
    ring: "ring-cyan-200",
    grad: "from-cyan-50 to-blue-50",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500"
  },
  "security": {
    ring: "ring-rose-200",
    grad: "from-rose-50 to-orange-50",
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500"
  }
} as const;

function cat(c: keyof typeof CATEGORY) {
  return CATEGORY[c] ?? CATEGORY["infrastructure"];
}

// truncate helper for tech chips
function truncateTech(list: string[], max = 5) {
  if (!list) return [];
  if (list.length <= max) return list;
  const head = list.slice(0, max);
  const rest = list.length - max;
  return [...head, `+${rest} more`];
}

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
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              const styles = isActive && category.id !== "all"
                ? "bg-gradient-to-r " + cat(category.id as any).grad + " border-transparent shadow-sm"
                : "bg-white hover:bg-slate-50";
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={clsx("rounded-full transition", styles)}
                >
                  {category.label}
                </Button>
              );
            })}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Folder className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No Projects Yet</h3>
              <p className="text-slate-500">{`Projects will be displayed here once they're added to the portfolio.`}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const c = cat(project.category);
                const techs = truncateTech(project.technologies ?? [], 5);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className="rounded-2xl"
                  >
                    {/* Gradient frame */}
                    <div className={clsx("p-[1px] rounded-2xl ring-1", c.ring, "bg-gradient-to-br", c.grad)}>
                      <Card className="group rounded-2xl border-0 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                        {/* Media area or gradient artwork */}
                        <div className="relative aspect-video overflow-hidden">
                          {project.image_url ? (
                            <img
                              src={project.image_url}
                              alt={project.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          ) : (
                            <div className={clsx(
                              "h-full w-full",
                              "bg-[radial-gradient(1000px_500px_at_-10%_-10%,rgba(0,0,0,0.06),transparent),radial-gradient(800px_400px_at_110%_120%,rgba(0,0,0,0.06),transparent)]",
                              "bg-gradient-to-br", c.grad
                            )} />
                          )}

                          {/* Hover overlay CTA */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium shadow hover:bg-white"
                                aria-label={`Open repository for ${project.name}`}
                              >
                              <FaGithub className="opacity-70" />
                              Repo
                            </a>
                          )}
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={clsx("inline-block h-2.5 w-2.5 rounded-full", c.dot)} />
                                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                  {project.category}
                                </span>
                              </div>
                              <h3 className="mt-2 font-bold text-xl text-slate-900 group-hover:text-slate-950">
                                {project.name}
                              </h3>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-slate-600 mb-4 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, index) => (
                              <span
                                key={index}
                                className={clsx(
                                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide",
                                  c.pill
                                )}
                              >
                                <span className={clsx("h-1.5 w-1.5 rounded-full", c.dot)} />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}