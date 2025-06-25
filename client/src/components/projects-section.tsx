import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Link, CheckCircle, Plus } from "lucide-react";
import type { Project } from "@shared/schema";

const projectFeatures = [
  "Developed a full-stack URL shortening service using the MERN stack",
  "Implemented secure user authentication with JWT, email validation using Abstract API & password hashing using Bcrypt",
  "Created responsive dashboard with analytics for tracking shortened URL performance",
  "Built custom middleware for database connection reliability and error handling",
  "Organized project with modular structure following MVC pattern with dedicated routes, controllers, services, DAO, and utils layers",
  "Deployed frontend and backend separately on Vercel with CI/CD integration"
];

const technologies = [
  "React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS v4", "JWT", "RESTful API", "Bcrypt"
];

export default function ProjectsSection() {
  const [showAddProject, setShowAddProject] = useState(false);
  
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  // Static project data for the URL Shortener
  const staticProject = {
    title: "URL Shortener",
    description: "MERN Full Stack Web Application",
    features: projectFeatures,
    technologies: technologies,
    appUrl: null,
    githubUrl: "https://github.com/shahzadaliofficial"
  };

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
          {/* Static URL Shortener Project */}
          <Card className="gradient-bg shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <Link className="text-primary-foreground h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">URL Shortener</h3>
                      <p className="text-muted-foreground">MERN Full Stack Web Application</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {projectFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                        <p className="text-foreground text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="inline-flex items-center" disabled>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit App
                    </Button>
                    <Button 
                      variant="outline" 
                      className="inline-flex items-center"
                      onClick={() => window.open(staticProject.githubUrl, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </Button>
                  </div>
                </div>

                <div className="lg:order-last">
                  {/* Code Editor Mockup */}
                  <Card className="bg-slate-900 text-white shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="ml-4 text-slate-400 text-sm">url-shortener-app</div>
                      </div>
                      <div className="text-sm font-mono space-y-1">
                        <div className="text-purple-400">const <span className="text-blue-300">urlShortener</span> = {`{`}</div>
                        <div className="ml-4 text-green-300">frontend: <span className="text-yellow-300">'React.js'</span>,</div>
                        <div className="ml-4 text-green-300">backend: <span className="text-yellow-300">'Node.js + Express'</span>,</div>
                        <div className="ml-4 text-green-300">database: <span className="text-yellow-300">'MongoDB'</span>,</div>
                        <div className="ml-4 text-green-300">auth: <span className="text-yellow-300">'JWT + Bcrypt'</span>,</div>
                        <div className="ml-4 text-green-300">styling: <span className="text-yellow-300">'Tailwind CSS v4'</span></div>
                        <div className="text-purple-400">{`};`}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Projects from Database */}
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading projects...</div>
          ) : (
            projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}

          {/* Add Project Button */}
          <Card className="border-dashed border-2 hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAddProject(true)}
                className="inline-flex items-center"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Project
              </Button>
            </CardContent>
          </Card>
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

          <div className="lg:order-last">
            <Card className="bg-muted">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="font-semibold text-foreground mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                  {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}`}
                  {!project.endDate && project.startDate && ' - Present'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
