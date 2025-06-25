import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Database, Smartphone, Settings, MapPin, Mail, Phone } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Professional Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a dedicated computer science graduate, I bring a unique blend of technical expertise 
                  and practical experience to every project. My journey in software development has been 
                  driven by an insatiable curiosity for new technologies and a passion for building 
                  innovative solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With hands-on experience in web development, IT management, and education, I've developed 
                  a well-rounded skill set that allows me to approach problems from multiple perspectives. 
                  My expertise in the MERN stack, combined with strong problem-solving abilities, enables 
                  me to create scalable and efficient web applications.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I'm particularly passionate about logic-building and staying current with emerging 
                  technologies. This drive for continuous learning has led me to work on diverse projects, 
                  from full-stack web applications to system administration roles.
                </p>
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
                    <span className="break-all">ShahzadAliOfficial@outlook.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    <span>+92 323 4992839</span>
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
