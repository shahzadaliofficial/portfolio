import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Link, CheckCircle } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Showcasing my expertise in full-stack development and modern web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {projects.length > 0 ? (
            (projects || []).map((project: Project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <Link className="text-primary-foreground h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="space-y-4 mb-6">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <p className="text-foreground text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {project.appUrl ? (
                <Button 
                  className="inline-flex items-center"
                  onClick={() => window.open(project.appUrl!, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit App
                </Button>
              ) : (
                <Button className="inline-flex items-center" disabled>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit App
                </Button>
              )}
              
              {project.githubUrl && (
                <Button 
                  variant="outline" 
                  className="inline-flex items-center"
                  onClick={() => window.open(project.githubUrl!, "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Repository
                </Button>
              )}
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-6">
            <div className="bg-muted rounded-lg p-4 text-sm font-mono text-muted-foreground">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary">{project.title.toLowerCase().replace(/\s+/g, '-')}-app</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div><span className="text-blue-400">const</span> <span className="text-yellow-400">{project.title.replace(/\s+/g, '')}</span> <span className="text-pink-400">=</span> <span className="text-green-400">{"{"}</span></div>
                {project.technologies && project.technologies.slice(0, 4).map((tech, index) => (
                  <div key={index} className="ml-4">
                    <span className="text-blue-400">{tech.toLowerCase().replace(/[^a-z0-9]/g, '')}:</span> <span className="text-green-400">'{tech}'</span>{index < Math.min(project.technologies!.length, 4) - 1 ? ',' : ''}
                  </div>
                ))}
                <div><span className="text-green-400">{"}"}</span>;</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}