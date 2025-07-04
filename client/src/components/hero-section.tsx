import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code, Mail, Download } from "lucide-react";

export default function HeroSection() {
  const { data: heroContent, isLoading } = useQuery({
    queryKey: ["/api/portfolio-content/hero"],
  });

  // Parse content from database
  let content;
  try {
    content = heroContent?.content ? JSON.parse(heroContent.content) : null;
  } catch (error) {
    console.error('Error parsing hero content:', error);
    content = null;
  }

  // Fallback content structure
  const fallbackContent = {
    name: "Shahzad Ali",
    title: "Full Stack Developer",
    subtitle: "Building modern web applications with passion and precision",
    description: "Experienced full-stack developer specializing in React, Node.js, and MongoDB. I create scalable web applications that deliver exceptional user experiences.",
    resumeUrl: "https://usner.vercel.app/resume",
    githubUrl: "https://github.com/shahzadaliofficial",
    linkedinUrl: "https://linkedin.com/in/shahzadali786"
  };

  const finalContent = content || fallbackContent;

  if (isLoading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center gradient-bg pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  const handleClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center gradient-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Professional Avatar */}
          <div className="mb-8 mx-auto">
            <Avatar className="w-32 h-32 mx-auto shadow-lg border-4 border-background">
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                SA
              </AvatarFallback>
            </Avatar>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            {finalContent.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
            {finalContent.title}
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {finalContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => handleClick("#contact")}
              className="inline-flex items-center px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Code className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleClick("#projects")}
              className="inline-flex items-center px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Mail className="mr-2 h-5 w-5" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://usner.vercel.app/resume", "_blank")}
              className="inline-flex items-center px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
