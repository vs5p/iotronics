// Content Manager - Handles localStorage for dynamic content

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react
  tags: string[];
  status: "Completed" | "In Progress";
  image: string; // gradient string or image URL
}

export interface NewsItem {
  id: string;
  type: "hackathon" | "blog" | "event" | "project";
  title: string;
  description: string;
  date: string;
  icon: string; // Icon name from lucide-react
  image: string; // URL to image
}

const ACTIVITIES_KEY = "iotronics_activities";
const PROJECTS_KEY = "iotronics_projects";
const NEWS_KEY = "iotronics_news";

// Default activities
const defaultActivities: Activity[] = [
  {
    id: "1",
    title: "Hardware Development",
    description: "Design and build IoT devices using Arduino, ESP32, Raspberry Pi, and custom PCBs.",
    icon: "Cpu",
  },
  {
    id: "2",
    title: "Software Integration",
    description: "Develop firmware, mobile apps, and cloud platforms to power smart devices.",
    icon: "Code",
  },
  {
    id: "3",
    title: "Network & Connectivity",
    description: "Explore WiFi, Bluetooth, LoRa, and other protocols for seamless communication.",
    icon: "Wifi",
  },
  {
    id: "4",
    title: "Innovation Labs",
    description: "Experiment with cutting-edge technologies in our state-of-the-art lab space.",
    icon: "Lightbulb",
  },
  {
    id: "5",
    title: "Workshops & Training",
    description: "Regular hands-on sessions to learn new skills and stay updated with trends.",
    icon: "Cog",
  },
  {
    id: "6",
    title: "Competitions",
    description: "Participate in hackathons, tech fests, and national-level competitions.",
    icon: "Zap",
  },
];

// Default projects
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Smart Campus System",
    description:
      "IoT-based campus management with automated lighting, attendance tracking, and energy monitoring. This comprehensive system uses ESP32 modules placed across campus buildings.",
    icon: "Home",
    tags: ["ESP32", "MQTT", "React", "Node.js"],
    status: "Completed",
    image: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
  },
  {
    id: "2",
    title: "Environmental Monitor",
    description:
      "Real-time air quality, temperature, and humidity monitoring with data visualization dashboard. Features predictive analytics for weather patterns.",
    icon: "Thermometer",
    tags: ["Arduino", "Sensors", "Firebase", "Flutter"],
    status: "In Progress",
    image: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))",
  },
  {
    id: "3",
    title: "Autonomous Robot",
    description:
      "Line-following and obstacle-avoiding robot with computer vision capabilities. Can navigate complex mazes and detect objects using ML.",
    icon: "Car",
    tags: ["Raspberry Pi", "OpenCV", "Python", "Motors"],
    status: "Completed",
    image: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))",
  },
  {
    id: "4",
    title: "Health Band",
    description:
      "Wearable device for monitoring heart rate, steps, and sleep patterns with mobile app. Syncs data to cloud for health tracking.",
    icon: "Heart",
    tags: ["ESP32", "BLE", "React Native", "ML"],
    status: "In Progress",
    image: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
  },
  {
    id: "5",
    title: "Smart Agriculture",
    description: "Automated irrigation system based on soil moisture, weather data, and crop requirements. Reduces water usage by 40%.",
    icon: "Cpu",
    tags: ["LoRa", "Arduino", "Solar", "Cloud"],
    status: "Completed",
    image: "linear-gradient(135deg, hsl(var(--glow-green)), hsl(var(--primary)))",
  },
  {
    id: "6",
    title: "Home Automation Hub",
    description:
      "Central hub for controlling all smart home devices with voice commands and mobile app. Supports multiple protocols.",
    icon: "Wifi",
    tags: ["Zigbee", "Matter", "Voice AI", "Security"],
    status: "In Progress",
    image: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))",
  },
];

// Default news items
const defaultNews: NewsItem[] = [
  {
    id: "1",
    type: "hackathon",
    title: "Won Smart India Hackathon 2024",
    description: "Our team secured first place with an IoT-based healthcare solution",
    date: "Dec 2024",
    icon: "Trophy",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    type: "blog",
    title: "New Blog: Getting Started with ESP32",
    description: "A comprehensive guide for beginners in embedded systems",
    date: "Nov 2024",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    type: "event",
    title: "Upcoming: IoT Workshop Series",
    description: "5-day hands-on workshop covering sensors to cloud integration",
    date: "Jan 2025",
    icon: "Calendar",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    type: "project",
    title: "Smart Campus v2.0 Launched",
    description: "Major update with AI-powered energy optimization",
    date: "Oct 2024",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
  },
];

function initializeDefaults() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(defaultActivities));
  }
  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
  }
  if (!localStorage.getItem(NEWS_KEY)) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(defaultNews));
  }
}

// Activities management
export function getActivities(): Activity[] {
  initializeDefaults();
  const data = localStorage.getItem(ACTIVITIES_KEY);
  return data ? JSON.parse(data) : defaultActivities;
}

export function addActivity(activity: Omit<Activity, "id">): Activity {
  const activities = getActivities();
  const newActivity: Activity = {
    ...activity,
    id: Date.now().toString(),
  };
  activities.push(newActivity);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  return newActivity;
}

export function updateActivity(id: string, updates: Partial<Activity>): Activity | null {
  const activities = getActivities();
  const index = activities.findIndex((a) => a.id === id);
  if (index === -1) return null;

  activities[index] = { ...activities[index], ...updates };
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  return activities[index];
}

export function deleteActivity(id: string): boolean {
  const activities = getActivities();
  const filtered = activities.filter((a) => a.id !== id);
  if (filtered.length === activities.length) return false;

  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(filtered));
  return true;
}

// Projects management
export function getProjects(): Project[] {
  initializeDefaults();
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : defaultProjects;
}

export function addProject(project: Omit<Project, "id">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
  };
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projects[index] = { ...projects[index], ...updates };
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
  return true;
}

// Reset to defaults
export function resetToDefaults() {
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(defaultActivities));
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
  localStorage.setItem(NEWS_KEY, JSON.stringify(defaultNews));
}

// News management
export function getNews(): NewsItem[] {
  initializeDefaults();
  const data = localStorage.getItem(NEWS_KEY);
  return data ? JSON.parse(data) : defaultNews;
}

export function addNewsItem(newsItem: Omit<NewsItem, "id">): NewsItem {
  const news = getNews();
  const newItem: NewsItem = {
    ...newsItem,
    id: Date.now().toString(),
  };
  news.push(newItem);
  localStorage.setItem(NEWS_KEY, JSON.stringify(news));
  return newItem;
}

export function updateNewsItem(id: string, updates: Partial<NewsItem>): NewsItem | null {
  const news = getNews();
  const index = news.findIndex((n) => n.id === id);
  if (index === -1) return null;

  news[index] = { ...news[index], ...updates };
  localStorage.setItem(NEWS_KEY, JSON.stringify(news));
  return news[index];
}

export function deleteNewsItem(id: string): boolean {
  const news = getNews();
  const filtered = news.filter((n) => n.id !== id);
  if (filtered.length === news.length) return false;

  localStorage.setItem(NEWS_KEY, JSON.stringify(filtered));
  return true;
}
