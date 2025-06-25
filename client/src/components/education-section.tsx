import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, School, Book, Award } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Management and Technology",
    location: "Lahore",
    duration: "2020 – 2025",
    icon: GraduationCap,
    primary: true
  },
  {
    degree: "Intermediate in Computer Science",
    institution: "Bise Lahore",
    location: "Lahore",
    duration: "2017 – 2019",
    icon: School,
    primary: false
  },
  {
    degree: "Matric [Computer Science]",
    institution: "",
    location: "",
    duration: "2015 – 2017",
    icon: Book,
    primary: false
  }
];

const certificates = [
  {
    name: "Computer Course [MS OFFICE]",
    issuer: "Horizon Techlance",
    year: "2023",
    icon: "💻"
  },
  {
    name: "Introduction to Frontend Development",
    issuer: "Meta (Coursera)",
    year: "2023",
    icon: "🎯"
  },
  {
    name: "Digital Marketing",
    issuer: "Google Digital Garage",
    year: "2023",
    icon: "📱"
  },
  {
    name: "How to E-lance",
    issuer: "PSDF",
    year: "2022",
    icon: "💼"
  }
];

export default function EducationSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Education</h2>
              <div className="w-24 h-1 bg-primary mx-auto lg:mx-0 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => {
                const IconComponent = edu.icon;
                return (
                  <Card key={index} className={edu.primary ? "gradient-bg border-primary/20" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                          edu.primary ? "bg-primary" : "bg-muted"
                        }`}>
                          <IconComponent className={`h-6 w-6 ${
                            edu.primary ? "text-primary-foreground" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h3>
                          {edu.institution && (
                            <p className={`font-medium mb-2 ${
                              edu.primary ? "text-primary" : "text-muted-foreground"
                            }`}>
                              {edu.institution}
                            </p>
                          )}
                          {edu.location && (
                            <p className="text-muted-foreground text-sm mb-2">{edu.location}</p>
                          )}
                          <p className="text-muted-foreground text-sm">{edu.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Certifications</h2>
              <div className="w-24 h-1 bg-primary mx-auto lg:mx-0 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mr-4 text-lg">
                        {cert.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{cert.name}</h3>
                        <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                        <p className="text-muted-foreground text-xs">{cert.year}</p>
                      </div>
                    </div>
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
