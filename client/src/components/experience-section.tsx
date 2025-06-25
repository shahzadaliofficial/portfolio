import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { Experience } from "@shared/schema";

const experiences = [
  {
    title: "Software Engineer - Intern",
    company: "Gateway Technologies (University of South Asia Software House)",
    location: "Lahore",
    duration: "02/2025 – Present",
    current: true,
    responsibilities: [
      "Developed and maintained scalable web applications using the MERN stack",
      "Enhanced technical skills by learning Python and FastAPI during the internship",
      "Collaborated with team members to meet project deadlines and deliver efficient solutions"
    ]
  },
  {
    title: "MERN Stack Developer - Internship",
    company: "Merak Consultants",
    location: "Lahore",
    duration: "09/2024 – 02/2025",
    current: false,
    responsibilities: [
      "Built and maintained scalable MERN stack web applications",
      "Conducted code reviews and resolved software issues",
      "Collaborated with cross-functional teams to meet project deadlines and deliver solutions"
    ]
  },
  {
    title: "Web Developer",
    company: "TopperWorld.in",
    location: "Remote",
    duration: "12/2023 – 01/2024",
    current: false,
    responsibilities: [
      "Designed and developed responsive landing pages and portfolio websites, ensuring optimal user experience",
      "Utilized modern front-end technologies such as React.js and Tailwind CSS to enhance visual appeal and functionality",
      "Optimized website performance for diverse devices and browsers, improving load times by 30%"
    ]
  },
  {
    title: "IT & Exam Dept./Accountant",
    company: "Al-Razi Group of Colleges (Boys Campus)",
    location: "Lahore",
    duration: "02/2022 – 02/2023",
    current: false,
    responsibilities: [
      "Managed exams, created academic calendars, and supervised test sessions",
      "Maintained exam records and scheduled exams with faculty",
      "Handled fee collection, expenses, and salary management"
    ]
  },
  {
    title: "Head of IT & Examination Dept.",
    company: "Horizon Group of Institutes",
    location: "Lahore",
    duration: "07/2018 – 12/2020",
    current: false,
    responsibilities: [
      "Organized exams, academic schedules, and test papers",
      "Secured and managed exam records confidentially",
      "Coordinated exams with academic goals and curriculum"
    ]
  }
];

export default function ExperienceSection() {
  const { data: dbExperiences = [], isLoading } = useQuery({
    queryKey: ["/api/experiences"],
  });

  // Combine static experiences with database experiences
  const allExperiences = [...experiences, ...dbExperiences].sort((a, b) => {
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
            {(allExperiences || []).map((exp, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                <div className={`absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-background shadow-lg z-10 ${
                  (exp.current || exp.isCurrent) ? 'bg-primary' : 'bg-muted-foreground'
                }`}></div>
                
                <div className={`ml-12 lg:ml-0 ${index % 2 === 1 ? 'lg:w-1/2 lg:pl-8' : 'lg:w-1/2 lg:pr-8'}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <Badge variant={(exp.current || exp.isCurrent) ? "default" : "secondary"}>
                          {exp.duration || formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                        </Badge>
                      </div>
                      <h4 className={`text-lg font-medium mb-4 ${(exp.current || exp.isCurrent) ? 'text-primary' : 'text-muted-foreground'}`}>
                        {exp.company}
                      </h4>
                      <p className="text-muted-foreground mb-4">{exp.location}</p>
                      <div className="space-y-2">
                        <p className="text-foreground text-sm leading-relaxed">
                          {exp.description || exp.responsibilities?.[0] || ""}
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

function formatDateRange(startDate: string | Date | null, endDate: string | Date | null, isCurrent?: boolean): string {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  
  if (isCurrent) {
    return `${startFormatted} – Present`;
  }
  
  if (!endDate) {
    return startFormatted;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  
  return `${startFormatted} – ${endFormatted}`;
}
