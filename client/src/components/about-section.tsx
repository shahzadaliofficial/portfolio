import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Database, Smartphone, Settings, MapPin, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AboutSection() {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ["/api/portfolio-content/about"],
  });

  // Parse content from database
  let content;
  try {
    content = aboutContent?.content ? JSON.parse(aboutContent.content) : null;
  } catch (error) {
    console.error('Error parsing about content:', error);
    content = null;
  }

  // Fallback content structure
  const fallbackContent = {
    title: "About Me",
    description: "I'm a passionate software engineer with a strong foundation in computer science and a drive to create innovative solutions. With experience in full-stack development, I enjoy tackling complex problems and turning ideas into reality through clean, efficient code.",
    skills: [
      "Full-stack web development",
      "Problem-solving and algorithm design", 
      "Team collaboration and leadership",
      "Continuous learning and adaptation"
    ],
    email: "ShahzadAliOfficial@outlook.com",
    phone: "+92 323 4992839"
  };

  const finalContent = content || fallbackContent;

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">Loading content...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">{finalContent.title || "About Me"}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Professional Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {finalContent.description}
                </p>
                
                <div className="space-y-4 mt-6">
                  {(finalContent.skills || []).map((skill: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">{skill}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Laptop className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <h4 className="font-semibold text-foreground">Full-Stack Development</h4>
                  <p className="text-sm text-muted-foreground mt-2">MERN Stack Expertise</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Database className="h-8 w-8 text-green-600 mb-3 mx-auto" />
                  <h4 className="font-semibold text-foreground">Database Management</h4>
                  <p className="text-sm text-muted-foreground mt-2">MongoDB & SQL</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Smartphone className="h-8 w-8 text-purple-600 mb-3 mx-auto" />
                  <h4 className="font-semibold text-foreground">Mobile Development</h4>
                  <p className="text-sm text-muted-foreground mt-2">React Native</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Settings className="h-8 w-8 text-orange-600 mb-3 mx-auto" />
                  <h4 className="font-semibold text-foreground">IT Management</h4>
                  <p className="text-sm text-muted-foreground mt-2">System Administration</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Location & Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5" />
                    <span>Lahore, Pakistan</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5" />
                    <span className="break-all">{finalContent.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    <span>{finalContent.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
