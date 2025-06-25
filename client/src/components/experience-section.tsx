import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { Experience } from "@shared/schema";



export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["/api/experiences"],
  });

  // Sort experiences by start date (most recent first)
  const sortedExperiences = experiences.sort((a, b) => {
    const aDate = new Date(a.startDate || 0);
    const bDate = new Date(b.startDate || 0);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <section id="experience" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A comprehensive journey through various roles in software development and IT management
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-0.5 bg-border"></div>

          <div className="space-y-12">
            {(sortedExperiences || []).map((exp, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                <div className={`absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-background shadow-lg z-10 ${
                  exp.current ? 'bg-primary' : 'bg-muted-foreground'
                }`}></div>
                
                <div className={`ml-12 lg:ml-0 ${index % 2 === 1 ? 'lg:w-1/2 lg:pl-8' : 'lg:w-1/2 lg:pr-8'}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <Badge variant={exp.current ? "default" : "secondary"}>
                          {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        </Badge>
                      </div>
                      <h4 className={`text-lg font-medium mb-4 ${exp.current ? 'text-primary' : 'text-muted-foreground'}`}>
                        {exp.company}
                      </h4>
                      <p className="text-muted-foreground mb-4">{exp.location}</p>
                      <div className="space-y-2">
                        <p className="text-foreground text-sm leading-relaxed">
                          {exp.description}
                        </p>
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech, techIdx) => (
                              <Badge key={techIdx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

function formatDateRange(startDate: string | Date | null, endDate: string | Date | null, current?: boolean): string {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  
  if (current) {
    return `${startFormatted} – Present`;
  }
  
  if (!endDate) {
    return startFormatted;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  
  return `${startFormatted} – ${endFormatted}`;
}
