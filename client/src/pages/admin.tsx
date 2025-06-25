import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { Project, Experience, InsertProject, InsertExperience } from "@shared/schema";

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Project Management
  const { data: projects = [] } = useQuery({ queryKey: ["/api/projects"] });
  const { data: experiences = [] } = useQuery({ queryKey: ["/api/experiences"] });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Portfolio Admin</h1>
          <p className="text-muted-foreground">Manage your projects and experience</p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experiences">Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsTab
              projects={projects}
              showForm={showProjectForm}
              setShowForm={setShowProjectForm}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          </TabsContent>

          <TabsContent value="experiences">
            <ExperiencesTab
              experiences={experiences}
              showForm={showExperienceForm}
              setShowForm={setShowExperienceForm}
              editingExperience={editingExperience}
              setEditingExperience={setEditingExperience}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProjectsTab({
  projects,
  showForm,
  setShowForm,
  editingProject,
  setEditingProject
}: {
  projects: Project[];
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/projects/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Success", description: "Project deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    },
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{project.title}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              <div className="flex space-x-2">
                {project.appUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.appUrl!, "_blank")}
                  >
                    Visit
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.githubUrl!, "_blank")}
                  >
                    GitHub
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  onClose
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    features: project?.features?.join("\n") || "",
    technologies: project?.technologies?.join(", ") || "",
    appUrl: project?.appUrl || "",
    githubUrl: project?.githubUrl || "",
    startDate: project?.startDate ? new Date(project.startDate) : undefined,
    endDate: project?.endDate ? new Date(project.endDate) : undefined,
    isActive: project?.isActive ?? true,
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: InsertProject) => apiRequest("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Success", description: "Project created successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: (data: InsertProject) => apiRequest(`/api/projects/${project!.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Success", description: "Project updated successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: InsertProject = {
      title: formData.title,
      description: formData.description,
      features: formData.features ? formData.features.split("\n").filter(f => f.trim()) : [],
      technologies: formData.technologies ? formData.technologies.split(",").map(t => t.trim()).filter(t => t) : [],
      appUrl: formData.appUrl || null,
      githubUrl: formData.githubUrl || null,
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      isActive: formData.isActive,
    };

    if (project) {
      updateProjectMutation.mutate(data);
    } else {
      createProjectMutation.mutate(data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project ? "Edit Project" : "Add New Project"}
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appUrl">App URL</Label>
              <Input
                id="appUrl"
                type="url"
                value={formData.appUrl}
                onChange={(e) => setFormData({ ...formData, appUrl: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({ ...formData, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Active Project</Label>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={createProjectMutation.isPending || updateProjectMutation.isPending}>
              {project ? "Update" : "Create"} Project
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ExperiencesTab({
  experiences,
  showForm,
  setShowForm,
  editingExperience,
  setEditingExperience
}: {
  experiences: Experience[];
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  editingExperience: Experience | null;
  setEditingExperience: (experience: Experience | null) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteExperienceMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/experiences/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({ title: "Success", description: "Experience deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete experience", variant: "destructive" });
    },
  });

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      deleteExperienceMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {showForm && (
        <ExperienceForm
          experience={editingExperience}
          onClose={() => {
            setShowForm(false);
            setEditingExperience(null);
          }}
        />
      )}

      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <p className="text-primary font-medium">{experience.company}</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {experience.location} • {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
                  </p>
                  <ul className="space-y-1">
                    {experience.responsibilities.slice(0, 2).map((responsibility, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {responsibility}
                      </li>
                    ))}
                    {experience.responsibilities.length > 2 && (
                      <li className="text-sm text-muted-foreground">
                        ... and {experience.responsibilities.length - 2} more
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(experience)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(experience.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExperienceForm({
  experience,
  onClose
}: {
  experience: Experience | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: experience?.title || "",
    company: experience?.company || "",
    location: experience?.location || "",
    startDate: experience?.startDate ? new Date(experience.startDate) : new Date(),
    endDate: experience?.endDate ? new Date(experience.endDate) : undefined,
    isCurrent: experience?.isCurrent ?? false,
    responsibilities: experience?.responsibilities?.join("\n") || "",
  });

  const createExperienceMutation = useMutation({
    mutationFn: (data: InsertExperience) => apiRequest("/api/experiences", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({ title: "Success", description: "Experience created successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create experience", variant: "destructive" });
    },
  });

  const updateExperienceMutation = useMutation({
    mutationFn: (data: InsertExperience) => apiRequest(`/api/experiences/${experience!.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({ title: "Success", description: "Experience updated successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update experience", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: InsertExperience = {
      title: formData.title,
      company: formData.company,
      location: formData.location || null,
      startDate: formData.startDate,
      endDate: formData.isCurrent ? null : formData.endDate || null,
      isCurrent: formData.isCurrent,
      responsibilities: formData.responsibilities.split("\n").filter(r => r.trim()),
    };

    if (experience) {
      updateExperienceMutation.mutate(data);
    } else {
      createExperienceMutation.mutate(data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {experience ? "Edit Experience" : "Add New Experience"}
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date || new Date() })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    disabled={formData.isCurrent}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate && !formData.isCurrent ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({ ...formData, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isCurrent"
              checked={formData.isCurrent}
              onCheckedChange={(checked) => setFormData({ ...formData, isCurrent: checked, endDate: checked ? undefined : formData.endDate })}
            />
            <Label htmlFor="isCurrent">Current Position</Label>
          </div>

          <div>
            <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
            <Textarea
              id="responsibilities"
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              rows={6}
              required
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={createExperienceMutation.isPending || updateExperienceMutation.isPending}>
              {experience ? "Update" : "Create"} Experience
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function formatDateRange(startDate: string | Date, endDate: string | Date | null, isCurrent?: boolean): string {
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