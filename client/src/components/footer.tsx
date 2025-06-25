import { Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Shahzad Ali</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Passionate about creating innovative web solutions and staying at the forefront of modern technology. 
            Always open to new opportunities and collaborations.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400 text-sm">
              © 2025 Shahzad Ali. All rights reserved. Built with passion using React.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
