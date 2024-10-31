"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Project {
  name: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink: string;
  projectLink: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden bg-gray-800 h-full flex flex-col border-gray-700">
        <div className="h-48 relative">
          <Image
            src={project.image}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-gray-100">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-700 text-gray-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Project
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
