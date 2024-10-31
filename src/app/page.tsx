/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectCard from "./pages/project";

interface Project {
  name: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink: string;
  projectLink: string;
}

export default function Portfolio() {
  const projectList: Project[] = [
    {
      name: "Project Alpha",
      description: "A revolutionary app that does amazing things.",
      image: "/placeholder.svg?height=200&width=300",
      techStack: ["React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/username/project-alpha",
      projectLink: "https://project-alpha.com",
    },
    {
      name: "Beta Dashboard",
      description: "Powerful analytics dashboard for businesses.",
      image: "/placeholder.svg?height=200&width=300",
      techStack: ["Vue.js", "Express", "PostgreSQL"],
      githubLink: "https://github.com/username/beta-dashboard",
      projectLink: "https://beta-dashboard.com",
    },
    {
      name: "Gamma API",
      description: "Scalable and efficient API for data processing.",
      image: "/placeholder.svg?height=200&width=300",
      techStack: ["Python", "FastAPI", "Redis"],
      githubLink: "https://github.com/username/gamma-api",
      projectLink: "https://gamma-api.com",
    },
    {
      name: "Delta Mobile App",
      description: "Cross-platform mobile app for productivity.",
      image: "/placeholder.svg?height=200&width=300",
      techStack: ["React Native", "Firebase", "Redux"],
      githubLink: "https://github.com/username/delta-mobile",
      projectLink: "https://delta-mobile.com",
    },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience"];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm">
          <ul className="flex justify-center space-x-6 py-4">
            {["home", "about", "projects", "experience"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollTo(section)}
                  className={`text-lg font-semibold capitalize ${
                    activeSection === section
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section
          id="home"
          className="h-screen flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-6 px-4 sm:px-6"
        >
          <div className="flex items-center justify-center min-h-[54vh] bg-gray-900">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[480px] lg:h-[480px]">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-lg opacity-90"
                animate={{
                  background: [
                    "linear-gradient(0deg, #10b981, #22d3ee, #3b82f6)",
                    "linear-gradient(90deg, #10b981, #22d3ee, #3b82f6)",
                    "linear-gradient(180deg, #10b981, #22d3ee, #3b82f6)",
                    "linear-gradient(270deg, #10b981, #22d3ee, #3b82f6)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[4px] bg-gray-800 rounded-lg p-2 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  className="w-full h-full bg-gray-900 rounded-md overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Sample image"
                    width={480}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:w-1/2 px-4 lg:px-0"
          >
            <h1 className="relative z-10 text-xl sm:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-semibold flex items-center justify-center lg:justify-start">
              hi, i'm navneet shahi
              <Image src="/blob-wave.gif" alt="emoji" width={30} height={20} />
            </h1>

            <p className="text-neutral-500 max-w-lg mx-auto lg:mx-0 my-2 text-lg sm:text-xl lg:text-2xl">
              full stack developer
            </p>

            <p className="text-neutral-500 max-w-lg mx-auto lg:mx-0 my-2 text-sm sm:text-base lg:text-lg">
              I am an enthusiastic Computer Science Engineering student studying
              my Bachelor's degree at Chandigarh University (2021 July - 2025
              June) with a focus in DevOps. Highly motivated beginner
              Engineering student with a strong desire to gain practical
              experience in the field of software development, operations, and
              analysis.
            </p>

            <div className="flex justify-center lg:justify-start space-x-4 mt-4">
              <a
                href="https://github.com/Navneet072300"
                className="text-2xl hover:text-purple-400 transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/navneet-shahi-4636191a9/"
                className="text-2xl hover:text-purple-400 transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:navneetshahi345@gmail.com"
                className="text-2xl hover:text-purple-400 transition-colors"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        </section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center py-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <p className="text-lg text-gray-300 mb-6">
              I'm a passionate full-stack developer dedicated to crafting
              beautiful, functional, and user-centric websites and applications.
              With over a year of experience, I've worked as a freelancer,
              delivering tailored solutions across various small projects.
            </p>
            <p className="text-lg text-gray-300 mb-10">
              My expertise spans modern technologies like JavaScript, React,
              Next.js, Node.js, and Go, as well as TypeScript, Tailwind CSS, and
              Python for building versatile, robust applications. With a strong
              foundation in DevOps tools—Docker, Kubernetes, Jenkins, and AWS—I
              ensure projects are scalable and efficient from development to
              deployment. I’m constantly learning and embracing new technologies
              to stay at the forefront of web development.
            </p>
            <div className="flex justify-center mb-10">
              <Button className="text-l p-4 bg-blue-600">
                <a
                  className="text-base font-bold text-white"
                  href="https://drive.google.com/file/d/1hgx2HcOIPda9h_giBGmBL3Mphwwrur4R/view?usp=sharing"
                >
                  View Resume
                </a>
              </Button>
            </div>
            <div className="mt-7">
              <p className="text-white font-semibold max-w-lg mx-auto my-2 text-lg sm:text-xl text-center">
                Here are some technologies I have been working with:
              </p>
              <div className="flex flex-wrap items-center justify-center p-2 my-3 gap-3 h-[3rem]">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/node.svg"
                  alt="Node.js"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/javascript.svg"
                  alt="JavaScript"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/typescript.svg"
                  alt="TypeScript"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/tailwindcss.svg"
                  alt="Tailwind CSS"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/docker.svg"
                  alt="Docker"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/go.svg"
                  alt="Go"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
                <Image
                  src="/aws.svg"
                  alt="AWS"
                  width={40}
                  height={24}
                  className="sm:w-12 sm:h-8"
                />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {projectList.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="min-h-screen py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-12">
              {[
                {
                  year: "Dec 2023 - Jun 2024 (7 months)",
                  title: "Full Stack Developer",
                  company: "Cloudnix Software Labs Pvt Ltd (Remote)",
                },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <p className="text-purple-400 font-semibold">{job.year}</p>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-300">{job.company}</p>

                    <div className="text-white text-lg font-medium mt-2">
                      <ul>
                        <li>
                          Developed robust and scalable APIs to handle
                          server-side functionality, ensuring seamless
                          integration with front-end components.
                        </li>
                        <li>
                          Focused on delivering efficient, maintainable code and
                          collaborating on both server-side and client-side
                          development for end-to-end solutions.
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <footer className="bg-gray-800 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-gray-400">© 2023. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
