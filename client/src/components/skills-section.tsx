import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Languages, Wrench } from "lucide-react";

const technicalSkills = [
  { name: "React.js", level: 90, color: "bg-blue-500" },
  { name: "Node.js", level: 85, color: "bg-green-500" },
  { name: "Express.js", level: 80, color: "bg-slate-600" },
  { name: "MongoDB", level: 75, color: "bg-green-600" },
  { name: "JavaScript", level: 90, color: "bg-yellow-500" },
  { name: "SQL", level: 70, color: "bg-blue-600" },
  { name: "C++", level: 75, color: "bg-blue-700" },
  { name: "Python", level: 70, color: "bg-green-500" },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Urdu", level: "Native" },
  { name: "Punjabi", level: "Native" },
];

const additionalTools = [
  "Git", "GitHub", "Tailwind CSS", "JWT", "RESTful API", "Bcrypt", "React Native", "Mongoose"
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Technical Skills</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive skill set covering modern web development technologies and programming languages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Code className="text-primary mr-3" />
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {technicalSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages & Tools */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <Languages className="text-primary mr-3" />
                  Languages
                </h3>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{lang.name}</span>
                      <Badge variant="secondary">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <Wrench className="text-primary mr-3" />
                  Additional Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {additionalTools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
