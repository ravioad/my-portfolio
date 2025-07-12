import { LucideIcon } from "lucide-react";

export interface Experience {
    id: number;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
    icon: LucideIcon;
    color: string;
  }