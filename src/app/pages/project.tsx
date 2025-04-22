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
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-[#1e293b]/80 h-full flex flex-col border-gray-800 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <div className="h-48 relative overflow-hidden group">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-100 font-bold">
            {project.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-2">
          <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-[#0f172a] text-gray-300 border border-gray-700 hover:border-purple-500"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-[#0f172a] text-gray-300 hover:bg-gray-800 hover:text-purple-400 border border-gray-700"
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
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
              size="sm"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0"
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
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
