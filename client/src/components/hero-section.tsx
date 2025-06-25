import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code, Mail, Download } from "lucide-react";

export default function HeroSection() {
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
            SHAHZAD ALI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
            Software Engineer | MERN Stack Developer
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Dedicated computer science graduate with experience in web development, IT management, 
            teaching, and CV formatting. Skilled in React.js, React Native, Node.js, and databases, 
            with strong problem-solving and technical expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => handleClick("#projects")}
              className="inline-flex items-center px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Code className="mr-2 h-5 w-5" />
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleClick("#contact")}
              className="inline-flex items-center px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
            <Button
              variant="outline"
              size="lg"
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
