type Category = "AI/ML" | "Web" | "Full-Stack" | "Mobile" | "Data Science";

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    github?: string | null;
    demo: string;
    featured: boolean;
    category: Category;
}