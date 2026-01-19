import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Edit2, LogOut, GripVertical, Download, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  subscribeToProjects,
  getNews,
  addNews,
  updateNews,
  deleteNews,
  subscribeToNews,
  getSubscribers,
  deleteSubscriber,
  getProposals,
  deleteProposal,
  updateProposalStatus,
  getEvents,
  addEvent,
  deleteEvent,
  getMessages,
  deleteMessage,
  supabase,
  logoutAdmin,
  onAuthChange,
  updateProjectsOrder,
  updateNewsOrder,
} from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  status: "Completed" | "In Progress";
  tags: string[];
  gradient: string;
  github_url?: string;
  website_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "hackathon" | "blog" | "event" | "project";
  icon: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

// Sortable components
const SortableProjectItem = ({ project, children }: { project: Project; children: (listeners: any) => React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children(listeners)}
    </div>
  );
};

const SortableNewsItem = ({ newsItem, children }: { newsItem: NewsItem; children: (listeners: any) => React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: newsItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children(listeners)}
    </div>
  );
};

const NEWS_TYPES = ["hackathon", "blog", "event", "project"];

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    icon: "🚀",
    status: "In Progress" as "Completed" | "In Progress",
    tags: "",
    github_url: "",
    website_url: "",
  });

  // News
  const [news, setNews] = useState<NewsItem[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    registration_link: "",
    banner: "",
  });
  const [messages, setMessages] = useState<any[]>([]);
  const [adminName, setAdminName] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [tempName, setTempName] = useState("");
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    type: "event" as "hackathon" | "blog" | "event" | "project",
    icon: "🚀",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  });

  const [submitting, setSubmitting] = useState(false);

  // Drag and drop sensors - MUST be before any conditional returns (React Hooks rule)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Auth
  useEffect(() => {
    const subscription = onAuthChange((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => subscription?.unsubscribe();
  }, [navigate]);

  // Load projects
  useEffect(() => {
    if (!user) return;
    let subscription: ReturnType<typeof subscribeToProjects> | null = null;

    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        subscription = subscribeToProjects(setProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
        toast.error("Failed to load projects");
      }
    };

    loadProjects();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user, toast]);

  // Load news
  useEffect(() => {
    if (!user) return;
    let subscription: ReturnType<typeof subscribeToNews> | null = null;

    const loadNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
        subscription = subscribeToNews(setNews);
      } catch (error) {
        console.error("Failed to load news:", error);
        toast.error("Failed to load news");
      }
    };

    loadNews();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user, toast]);

  // Load subscribers
  useEffect(() => {
    if (!user) return;
    let subscription: any = null;

    const loadSubscribers = async () => {
      try {
        const data = await getSubscribers();
        setSubscribers(data);

        // Subscription
        subscription = supabase
          .channel('subscribers-list')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'subscribers' },
            () => {
              getSubscribers().then(e => setSubscribers(e));
            }
          )
          .subscribe();

      } catch (error) {
        console.error("Failed to load subscribers:", error);
      }
    };

    loadSubscribers();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user]);

  // Load proposals
  useEffect(() => {
    if (!user) return;
    let subscription: any = null;

    const loadProposals = async () => {
      try {
        const data = await getProposals();
        setProposals(data);

        subscription = supabase
          .channel('proposals-list')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'proposals' },
            () => {
              getProposals().then(setProposals);
            }
          )
          .subscribe();

      } catch (error) {
        console.error("Failed to load proposals:", error);
      }
    };

    loadProposals();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user]);

  // Load events
  useEffect(() => {
    if (!user) return;
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    };
    loadEvents();
  }, [user]);

  // Load messages
  useEffect(() => {
    if (!user) return;
    getMessages().then(setMessages).catch(console.error);

    // Optional: Realtime subscription for messages
    const sub = supabase
      .channel('messages-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' },
        () => getMessages().then(setMessages))
      .subscribe();

    return () => { sub.unsubscribe(); };
  }, [user]);

  // Admin Name Check
  useEffect(() => {
    if (user) {
      const storedName = localStorage.getItem("adminName");
      if (storedName) {
        setAdminName(storedName);
      } else {
        setShowNameDialog(true);
      }
    }
  }, [user]);

  const handleSaveName = () => {
    if (!tempName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    localStorage.setItem("adminName", tempName);
    setAdminName(tempName);
    setShowNameDialog(false);
    toast.success("Welcome, " + tempName + "!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-xl"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Project handlers
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const projectData = {
        ...projectForm,
        tags: projectForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        github_url: projectForm.github_url ? (projectForm.github_url.startsWith('http') ? projectForm.github_url : `https://${projectForm.github_url}`) : "",
        website_url: projectForm.website_url ? (projectForm.website_url.startsWith('http') ? projectForm.website_url : `https://${projectForm.website_url}`) : "",
      };
      if (editingProject) {
        await updateProject(editingProject.id, projectData);
        toast.success("Project updated successfully");
      } else {
        await addProject(projectData);
        toast.success("Project added successfully");
      }
      clearProjectForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save project");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const clearProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      description: "",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      icon: "🚀",
      status: "In Progress",
      tags: "",
      github_url: "",
      website_url: "",
    });
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project");
    }
  };

  // News handlers
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      if (editingNews) {
        await updateNews(editingNews.id, newsForm);
        toast.success("News updated successfully");
      } else {
        await addNews(newsForm);
        toast.success("News added successfully");
      }
      clearNewsForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save news");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const clearNewsForm = () => {
    setEditingNews(null);
    setNewsForm({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      type: "event",
      icon: "🚀",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    });
  };

  const handleDeleteNews = async (newsId: string) => {
    try {
      await deleteNews(newsId);
      toast.success("News deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete news");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
    }
  };


  const handleProjectDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex(p => p.id === active.id);
      const newIndex = projects.findIndex(p => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);

      // Update display_order in database
      try {
        const projectsOrder = newProjects.map((project, index) => ({
          id: project.id,
          display_order: index + 1,
        }));
        await updateProjectsOrder(projectsOrder);
        toast.success("Projects reordered successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to reorder projects");
        // Revert on error
        const data = await getProjects();
        setProjects(data);
      }
    }
  };

  const handleNewsDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = news.findIndex(n => n.id === active.id);
      const newIndex = news.findIndex(n => n.id === over.id);

      const newNews = arrayMove(news, oldIndex, newIndex);
      setNews(newNews);

      // Update display_order in database
      try {
        const newsOrder = newNews.map((item, index) => ({
          id: item.id,
          display_order: index + 1,
        }));
        await updateNewsOrder(newsOrder);
        toast.success("News reordered successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to reorder news");
        // Revert on error
        const data = await getNews();
        setNews(data);
      }
    }
  };

  const handleProposalStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateProposalStatus(id, newStatus);
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      toast.success(`Status updated to ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const handleExportProposalsCSV = () => {
    if (proposals.length === 0) {
      toast.error("No proposals to export");
      return;
    }

    const headers = ["Title", "Name", "Email", "Idea", "Status", "Submitted At"];
    const rows = proposals.map(prop => [
      prop.title,
      prop.name,
      prop.email,
      (prop.idea || "").replace(/(\r\n|\n|\r)/gm, " "),
      prop.status || "Pending",
      new Date(prop.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `iotronics_proposals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Proposals list exported successfully");
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) {
      toast.error("Title and Date are required");
      return;
    }
    setSubmitting(true);
    try {
      await addEvent(eventForm);
      toast.success("Event added successfully");
      setEventForm({ title: "", date: "", time: "", location: "", description: "", registration_link: "", banner: "" });
      const data = await getEvents();
      setEvents(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to add event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted");
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      toast.error("Failed to delete event");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteMessage(id);
      toast.success("Message deleted");
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (e) {
      toast.error("Failed to delete message");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20';
      case 'on hold': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20'; // Pending
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export");
      return;
    }

    // Define CSV headers and rows
    const headers = ["Email", "Subscribed At"];
    const rows = subscribers.map(sub => [
      sub.email,
      new Date(sub.created_at).toLocaleString()
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")) // Quote cells to handle commas
    ].join("\n");

    // Create a Blob and Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `iotronics_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Subscribers list exported successfully");
  };

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Navigation />

      <main className="relative pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 flex justify-between items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-2">Admin Dashboard</h1>
              <p className="font-rajdhani text-lg text-muted-foreground">
                {adminName ? `Welcome back, ${adminName}` : "Manage projects and news for your IoTRONICS website"}
              </p>
            </div>
            <Button onClick={handleLogout} variant="destructive" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout ({user?.email})
            </Button>
          </motion.div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full max-w-5xl grid-cols-6 h-auto gap-2 bg-muted/50 p-2 mb-8">
              <TabsTrigger value="projects" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide">Projects</TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide">News</TabsTrigger>
              <TabsTrigger value="subscribers" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide hidden md:inline-flex">Newsletter</TabsTrigger>
              <TabsTrigger value="subscribers" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide md:hidden">Subs</TabsTrigger>
              <TabsTrigger value="proposals" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide hidden md:inline-flex">Proposals</TabsTrigger>
              <TabsTrigger value="proposals" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide md:hidden">Props</TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide">Events</TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg py-3 transition-all uppercase tracking-wide">Messages</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-2xl font-extrabold uppercase tracking-widest text-primary">{editingProject ? "Edit Project" : "Add Project"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <Input
                        placeholder="Title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        rows={3}
                      />
                      {projectForm.image && (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border group">
                          <img
                            src={projectForm.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                            }}
                          />
                        </div>
                      )}
                      <Input
                        placeholder="Image URL (e.g., https://example.com/image.jpg)"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      />
                      <Input
                        placeholder="Icon (emoji)"
                        value={projectForm.icon}
                        onChange={(e) => setProjectForm({ ...projectForm, icon: e.target.value })}
                      />
                      <Select
                        value={projectForm.status}
                        onValueChange={(value) => setProjectForm({ ...projectForm, status: value as "Completed" | "In Progress" })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Tags (comma separated)"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      />

                      <Input
                        placeholder="GitHub URL (optional)"
                        value={projectForm.github_url}
                        onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                      />
                      <Input
                        placeholder="Website URL (optional)"
                        value={projectForm.website_url}
                        onChange={(e) => setProjectForm({ ...projectForm, website_url: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" disabled={submitting} className="flex-1">
                          {submitting ? "Saving..." : editingProject ? "Update" : "Add"}
                        </Button>
                        {editingProject && (
                          <Button type="button" onClick={clearProjectForm} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-bold text-lg">Projects ({projects.length})</h3>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleProjectDragEnd}
                  >
                    <SortableContext
                      items={projects.map(p => p.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {projects.length === 0 ? (
                          <p className="text-muted-foreground">No projects yet</p>
                        ) : (
                          projects.map((project) => (
                            <SortableProjectItem key={project.id} project={project}>
                              {(listeners) => (
                                <Card>
                                  <CardContent className="pt-4">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start gap-2 flex-1">
                                        <button
                                          className="cursor-grab active:cursor-grabbing mt-1 text-muted-foreground hover:text-foreground transition-colors"
                                          {...listeners}
                                        >
                                          <GripVertical className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1">
                                          <h4 className="font-extrabold text-2xl tracking-wide text-foreground">
                                            {project.icon} {project.title}
                                          </h4>
                                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                          <div className="flex gap-2 mt-2 flex-wrap">
                                            <Badge variant="outline">{project.status}</Badge>
                                            {project.tags.map((tag) => (
                                              <Badge key={tag} variant="secondary">
                                                {tag}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 ml-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setEditingProject(project);
                                            setProjectForm({
                                              title: project.title,
                                              description: project.description,
                                              image: project.image,
                                              icon: project.icon,
                                              status: project.status,
                                              tags: project.tags.join(", "),
                                              github_url: project.github_url || "",
                                              website_url: project.website_url || "",
                                            });
                                          }}
                                        >
                                          <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="destructive">
                                              <Trash2 className="w-4 h-4" />
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Are you sure? This cannot be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="flex gap-2 justify-end">
                                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                                              <AlertDialogAction
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="bg-red-600 hover:bg-red-700"
                                              >
                                                Delete
                                              </AlertDialogAction>
                                            </div>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </SortableProjectItem>
                          ))
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-2xl font-extrabold uppercase tracking-widest text-primary">{editingNews ? "Edit News" : "Add News"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddNews} className="space-y-4">
                      <Input
                        placeholder="Title"
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Description"
                        value={newsForm.description}
                        onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                        rows={3}
                      />
                      <Input
                        type="date"
                        value={newsForm.date}
                        onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                      />
                      <Select value={newsForm.type} onValueChange={(value) => setNewsForm({ ...newsForm, type: value as any })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {NEWS_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Icon (emoji)"
                        value={newsForm.icon}
                        onChange={(e) => setNewsForm({ ...newsForm, icon: e.target.value })}
                      />
                      {newsForm.image && (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border group">
                          <img
                            src={newsForm.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                            }}
                          />
                        </div>
                      )}
                      <Input
                        placeholder="Image URL"
                        value={newsForm.image}
                        onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" disabled={submitting} className="flex-1">
                          {submitting ? "Saving..." : editingNews ? "Update" : "Add"}
                        </Button>
                        {editingNews && (
                          <Button type="button" onClick={clearNewsForm} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-bold text-lg">News Items ({news.length})</h3>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleNewsDragEnd}
                  >
                    <SortableContext
                      items={news.map(n => n.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {news.length === 0 ? (
                          <p className="text-muted-foreground">No news items yet</p>
                        ) : (
                          news.map((item) => (
                            <SortableNewsItem key={item.id} newsItem={item}>
                              {(listeners) => (
                                <Card>
                                  <CardContent className="pt-4">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start gap-2 flex-1">
                                        <button
                                          className="cursor-grab active:cursor-grabbing mt-1 text-muted-foreground hover:text-foreground transition-colors"
                                          {...listeners}
                                        >
                                          <GripVertical className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1">
                                          <h4 className="font-extrabold text-2xl tracking-wide text-foreground">
                                            {item.icon} {item.title}
                                          </h4>
                                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                          <div className="flex gap-2 mt-2">
                                            <Badge variant="outline">{item.date}</Badge>
                                            <Badge variant="secondary">{item.type}</Badge>
                                          </div>
                                        </div>
                                        <div className="flex gap-2 ml-2">
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setEditingNews(item);
                                              setNewsForm({
                                                title: item.title,
                                                description: item.description,
                                                date: item.date,
                                                type: item.type,
                                                icon: item.icon,
                                                image: item.image,
                                              });
                                            }}
                                          >
                                            <Edit2 className="w-4 h-4" />
                                          </Button>
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <Button size="sm" variant="destructive">
                                                <Trash2 className="w-4 h-4" />
                                              </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Delete News</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Are you sure? This cannot be undone.
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <div className="flex gap-2 justify-end">
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                  onClick={() => handleDeleteNews(item.id)}
                                                  className="bg-red-600 hover:bg-red-700"
                                                >
                                                  Delete
                                                </AlertDialogAction>
                                              </div>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </SortableNewsItem>
                          ))
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subscribers">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Newsletter Subscribers ({subscribers.length})</CardTitle>
                    <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {subscribers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No subscribers yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {subscribers.map((subscriber) => (
                        <div
                          key={subscriber.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                        >
                          <div>
                            <div className="font-semibold">{subscriber.email}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(subscriber.created_at).toLocaleDateString()} at {new Date(subscriber.created_at).toLocaleTimeString()}
                            </div>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Subscriber?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this subscriber? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex justify-end gap-2 mt-4">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    try {
                                      await deleteSubscriber(subscriber.id);
                                      toast.success("Subscriber removed");
                                    } catch (e) {
                                      toast.error("Failed to remove subscriber");
                                    }
                                  }}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="proposals">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Project Proposals ({proposals.length})</CardTitle>
                    <Button onClick={handleExportProposalsCSV} variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {proposals.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No proposals yet.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {proposals.map((prop) => (
                        <div key={prop.id} className="border border-border rounded-lg bg-muted/20 overflow-hidden">
                          <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-start">
                            <div>
                              <h4 className="font-orbitron font-semibold text-lg">{prop.title}</h4>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="text-primary font-bold">{prop.name}</span> • {prop.email}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-muted-foreground mr-2">
                                {new Date(prop.created_at).toLocaleDateString()}
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className={`h-8 border capitalize ${getStatusColor(prop.status || 'Pending')}`}>
                                    {prop.status || 'Pending'}
                                    <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleProposalStatusChange(prop.id, 'Pending')}>Pending</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleProposalStatusChange(prop.id, 'On Hold')}>On Hold</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleProposalStatusChange(prop.id, 'Completed')}>Completed</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleProposalStatusChange(prop.id, 'Rejected')}>Rejected</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Proposal?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this proposal? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="flex justify-end gap-2 mt-4">
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={async () => {
                                        try {
                                          await deleteProposal(prop.id);
                                          toast.success("Proposal deleted");
                                        } catch (e) {
                                          toast.error("Failed to delete proposal");
                                        }
                                      }}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="text-xs font-mono uppercase text-muted-foreground mb-2">Project Idea</h5>
                            <p className="font-rajdhani text-foreground/90 whitespace-pre-wrap leading-relaxed">
                              {prop.idea}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Event Title"
                          value={eventForm.title}
                          onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                          required
                        />
                        <Input
                          type="date"
                          value={eventForm.date}
                          onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                          required
                        />
                        <Input
                          placeholder="Time (e.g. 10:00 AM)"
                          value={eventForm.time}
                          onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                        />
                        <Input
                          placeholder="Location"
                          value={eventForm.location}
                          onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                        />
                        <Input
                          placeholder="Registration Link (Optional)"
                          value={eventForm.registration_link}
                          onChange={e => setEventForm({ ...eventForm, registration_link: e.target.value })}
                          className="md:col-span-2"
                        />
                        <Input
                          placeholder="Banner Image URL"
                          value={(eventForm as any).banner || ""}
                          onChange={e => setEventForm({ ...eventForm, banner: e.target.value } as any)}
                          className="md:col-span-2"
                        />
                        {/* Banner Preview */}
                        {(eventForm as any).banner && (
                          <div className="md:col-span-2 relative h-48 rounded-lg overflow-hidden border border-border">
                            <img
                              src={(eventForm as any).banner}
                              alt="Banner Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                              }}
                            />
                          </div>
                        )}
                        <Textarea
                          placeholder="Event Description"
                          value={eventForm.description}
                          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                          className="md:col-span-2"
                        />
                      </div>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? "Adding..." : "Add Event"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events ({events.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {events.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">No events scheduled.</div>
                    ) : (
                      <div className="space-y-4">
                        {events.map((event) => (
                          <div key={event.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg bg-muted/20 gap-4">
                            <div>
                              <h4 className="font-extrabold text-2xl tracking-wide">{event.title}</h4>
                              <div className="text-sm text-muted-foreground flex gap-4">
                                <span>{new Date(event.date).toLocaleDateString()} {event.time}</span>
                                <span>{event.location}</span>
                              </div>
                              <p className="text-sm mt-1 max-w-xl">{event.description}</p>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" className="gap-2">
                                  <Trash2 className="w-4 h-4" /> Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex justify-end gap-2 mt-4">
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteEvent(event.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Inquiries & Messages ({messages.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No messages received.</div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div key={msg.id} className="p-4 bg-muted/20 border border-border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-extrabold text-2xl font-orbitron tracking-wide">{msg.subject || 'No Subject'}</h4>
                              <p className="text-sm text-primary font-semibold">{msg.name} <span className="text-muted-foreground font-normal">({msg.email})</span></p>
                              <p className="text-xs text-muted-foreground mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex justify-end gap-2 mt-4">
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteMessage(msg.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                          <div className="bg-background/50 p-3 rounded border border-border/50">
                            <p className="text-sm font-rajdhani whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <PageFooter />

      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="bg-card text-card-foreground border-border">
          <DialogHeader>
            <DialogTitle className="font-orbitron">Welcome Admin!</DialogTitle>
            <DialogDescription className="font-rajdhani text-muted-foreground">
              Please enter your name to personalize your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adminName" className="font-mono">Name</Label>
              <Input
                id="adminName"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="font-rajdhani"
              />
            </div>
            <Button onClick={handleSaveName} className="w-full">Save Name</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
