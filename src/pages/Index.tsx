import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail, ExternalLink, MapPin, Phone } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
});

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting me. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const projects = [
    {
      title: "AnkiMaster",
      subtitle: "English & Spanish Learning Platform",
      description: "Developed a bilingual learning platform with step-by-step modules for improving speaking, vocabulary, and grammar.",
      tech: ["Python", "Django","Html","Css", "JavaScript", "PostgreSQL"],
      link: "https://ankimasterflashcards.com/",
      features: [
        "Flashcard-based learning with browse and study functionality",
        "User authentication & profiles with progress tracking",
        "Interactive flashcards with translations, images, and audio",
        "Content management for teachers to upload lessons",
        "Multilingual learning history storage"
      ]
    },
    {
      title: "Edjobster",
      subtitle: "Job, Candidate & Interview Management Suite",
      description: "A multi-product platform for managing job postings, applications, resume parsing, and interview workflows.",
      tech: ["React.js", "Python", "Django REST", "PostgreSQL"],
      subProjects: [
        { name: "Main App", link: "https://app.edjobster.com" },
        { name: "Job Board", link: "https://jobs.edjobster.com" },
        { name: "Website", link: "https://edjobster.com" },
        { name: "CV Tuner", link: "https://cvtuner.edjobster.com" }
      ],
      features: [
        "React.js frontends backed by Django REST APIs",
        "Job postings, applications, and resume parsing",
        "Secure API authentication with role-based access",
        "Advanced search/filters for jobs and candidates",
        "Comprehensive interview workflow management"
      ]
    }
    // {
    //   title: "BizCraft",
    //   subtitle: "Business Products & Category Management Platform",
    //   description: "A modern, responsive B2B web platform built to showcase business products, manage categories, and handle customer inquiries using a scalable full-stack architecture.",
    //   tech: [
    //     "React.js",
    //     "Vite",
    //     "Tailwind CSS",
    //     "Python",
    //     "Django REST Framework",
    //     "PostgreSQL"
    //   ],
    //   subProjects: [
    //     { name: "Admin Dashboard", link: "https://admin.bizcraft.com" },
    //     { name: "Product Catalog", link: "https://bizcraft.com/products" },
    //     { name: "Categories Page", link: "https://bizcraft.com/categories" },
    //     { name: "Contact & Inquiry Module", link: "https://bizcraft.com/contact" }
    //   ],
    //   features: [
    //     "React + Vite frontend styled with Tailwind CSS",
    //     "Fully responsive UI optimized for desktop, tablet, and mobile",
    //     "Django REST backend providing clean, scalable APIs",
    //     "PostgreSQL database for reliable and structured data storage",
    //     "Admin-controlled product, category, and hero banner management",
    //     "Dynamic home hero section with CMS-style configuration",
    //     "Category-based product filtering and listing",
    //     "Secure API-ready architecture for future role-based access",
    //     "Contact and inquiry management stored and managed via admin panel"
    //   ]
    // }


  ];

  const skills = {
    "Languages & Technologies": ["Python", "JavaScript", "HTML", "CSS"],
    "Databases": ["PostgreSQL", "SQLite"],
    "UI & Design System": ["Material-UI", "Tailwind CSS"],
    "Libraries & Frameworks": ["Django REST Framework", "ReactJS"],
    "Tools & Platforms": ["Postman", "GitHub"]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              Ayush Kamani
            </h2>
            <div className="flex gap-6">
              <button onClick={() => scrollToSection("hero")} className="text-sm hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection("projects")} className="text-sm hover:text-primary transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection("skills")} className="text-sm hover:text-primary transition-colors">
                Skills
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-sm hover:text-primary transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-4 bg-hero-bg border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            Full Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Building scalable web applications with Python, Django, React & PostgreSQL
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={() => scrollToSection("contact")}>
              <Mail className="w-4 h-4" />
              Contact Me
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub
              </a> */}
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base">{project.subtitle}</CardDescription>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                      </a>
                    )}
                  </div>
                  {project.subProjects && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.subProjects.map((sub, i) => (
                        <a
                          key={i}
                          href={sub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-skill-bg border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-background">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>ayushkamani2004@gmail.com</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>+91 6355826374</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Available Remotely</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* <Card className="max-w-2xl mx-auto animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card> */}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-8 px-4 border-t text-center text-muted-foreground">
        <p>© 2025 Portfolio. Built with React, TypeScript & Tailwind CSS</p>
      </footer> */}
    </div>
  );
};

export default Index;
