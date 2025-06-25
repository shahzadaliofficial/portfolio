import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function SkillsSection() {
  const { data: skillsContent, isLoading } = useQuery({
    queryKey: ["/api/portfolio-content/skills"],
  });

  // Parse content from database
  let content;
  try {
    content = skillsContent?.content ? JSON.parse(skillsContent.content) : null;
  } catch (error) {
    console.error('Error parsing skills content:', error);
    content = null;
  }

  // Fallback content structure
  const fallbackContent = {
    title: "Skills & Technologies",
    categories: [
      {
        name: "Frontend",
        skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"]
      },
      {
        name: "Backend", 
        skills: ["Node.js", "Express", "PHP", "Laravel", "REST APIs", "GraphQL"]
      },
      {
        name: "Database",
        skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"]
      },
      {
        name: "Tools & Others",
        skills: ["Git", "Docker", "AWS", "Vercel", "Jest", "Webpack"]
      }
    ]
  };

  const finalContent = content || fallbackContent;

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {finalContent.title || "Skills & Technologies"}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(finalContent.categories || []).map((category: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-center">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {(category.skills || []).map((skill: string, skillIndex: number) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
