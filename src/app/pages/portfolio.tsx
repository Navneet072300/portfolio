"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiMedium } from "react-icons/si";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/app/pages/project";

interface Project {
  name: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink: string;
  projectLink: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export default function Portfolio() {
  const projectList: Project[] = [
    {
      name: "Terraform Projects",
      description:
        "Collection of Infrastructure as Code (IaC) projects using Terraform.",
      image: "/iac.webp?height=200&width=300",
      techStack: ["Terraform", "AWS", "Docker", "Kubernetes"],
      githubLink: "https://github.com/Navneet072300/terraform-projects",
      projectLink: "#", // Add if there's a live deployment
    },
    {
      name: "ScraperFlow",
      description:
        "The Scraper platform enables users to extract data from websites using a modular workflow editor without the need for extensive coding knowledge.",
      image: "/scrapper.jpeg?height=200&width=300",
      techStack: [
        "NextJS",
        "Tailwind",
        "Typescript",
        "PSQL",
        "Prisma",
        "Scrapping",
      ],
      githubLink: "https://github.com/Navneet072300/scrapflow",
      projectLink: "https://data-scraper-lime.vercel.app/",
    },
    {
      name: "Code Craft",
      description:
        "A code editor where you can run your code in different languages and save them.",
      image: "/code.png?height=200&width=300",
      techStack: ["NextJS", "TypeScript", "Convex", "TailwindCSS", "API"],
      githubLink: "https://github.com/Navneet072300/code-craft",
      projectLink: "https://code-craft-navy.vercel.app/",
    },
    {
      name: "StoreIt",
      description:
        "A cloud storage where you can store all type of files, images and videos.",
      image: "/store.png?height=200&width=300",
      techStack: ["NextJS", "TypeScript", "AppWrite", "TailwindCSS"],
      githubLink: "https://github.com/Navneet072300/storeIt",
      projectLink: "https://store-it-omega.vercel.app",
    },
  ];

  const experienceList: Experience[] = [
    {
      title: "Full Stack Developer",
      company: "Keen and Able Pvt. Ltd.",
      location: "On-site",
      duration: "June, 2025 - Present",
      description: [
        "Developed and delivered custom web applications for various clients using modern technologies",
        "Handled DevOps tasks like CI/CD setup, deployment, and server management to ensure smooth delivery.",
        "Built responsive, user-friendly interfaces with React, Next.js, and Tailwind CSS",
        "Implemented backend solutions using Node.js, Express, and various databases",
        "Developed responsive and user-friendly frontend interfaces integrated with backend APIs.",
        "Managed project timelines and deliverables independently",
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "Linux",
      ],
    },
    // {
    //   title: "DevOps Engineering Student",
    //   company: "Chandigarh University",
    //   location: "Punjab, India",
    //   duration: "2021 - 2025",
    //   description: [
    //     "Pursuing Bachelor's degree in Computer Science Engineering with focus on DevOps",
    //     "Gained hands-on experience with containerization technologies like Docker and Kubernetes",
    //     "Learned Infrastructure as Code (IaC) using Terraform and AWS services",
    //     "Developed understanding of CI/CD pipelines using Jenkins and GitHub Actions",
    //     "Participated in various technical projects and hackathons",
    //   ],
    //   technologies: [
    //     "Docker",
    //     "Kubernetes",
    //     "Terraform",
    //     "AWS",
    //     "Jenkins",
    //     "Git",
    //     "Linux",
    //   ],
    // },
    // {
    //   title: "Open Source Contributor",
    //   company: "Various Projects",
    //   location: "Remote",
    //   duration: "2022 - Present",
    //   description: [
    //     "Contributed to open source projects on GitHub",
    //     "Collaborated with developers worldwide on various technical solutions",
    //     "Improved code quality and documentation for community projects",
    //     "Gained experience in collaborative development workflows",
    //   ],
    //   technologies: ["Git", "GitHub", "JavaScript", "Python", "Go"],
    //   link: "https://github.com/Navneet072300",
    // },
  ];

  const [activeSection, setActiveSection] = useState("home");

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience"];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
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

  // Animated background gradient
  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
        "linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6)",
        "linear-gradient(225deg, #ec4899, #3b82f6, #8b5cf6)",
        "linear-gradient(315deg, #3b82f6, #ec4899, #8b5cf6)",
      ],
      transition: {
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen overflow-hidden">
      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 opacity-10 z-0">
        <motion.div
          className="w-full h-full"
          variants={gradientVariants}
          animate="animate"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-filter backdrop-blur-lg border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Navneet Shahi
            </motion.div>
            <ul className="flex space-x-6">
              {["home", "about", "projects", "experience"].map(
                (section, index) => (
                  <motion.li
                    key={section}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => scrollTo(section)}
                      className={`text-sm md:text-base font-medium capitalize transition-all duration-300 ${
                        activeSection === section
                          ? "text-purple-400 scale-110"
                          : "text-gray-300 hover:text-purple-300"
                      }`}
                    >
                      {section}
                    </button>
                  </motion.li>
                )
              )}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-12 px-4 sm:px-6 pt-20"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <motion.div
          style={{ y: y1, opacity }}
          className="flex items-center justify-center min-h-[40vh] z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px]"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                background: [
                  "linear-gradient(0deg, #10b981, #22d3ee, #3b82f6)",
                  "linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b)",
                  "linear-gradient(180deg, #f59e0b, #10b981, #8b5cf6)",
                  "linear-gradient(270deg, #3b82f6, #ec4899, #10b981)",
                ],
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-[3px] bg-[#0f172a] rounded-2xl p-2 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="w-full h-full bg-[#1e293b] rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Navneet Shahi"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center lg:text-left lg:w-1/2 px-4 lg:px-0 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h1 className="relative z-10 text-xl sm:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-sans font-bold flex items-center justify-center lg:justify-start">
              hi, i&apos;m navneet shahi
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              >
                <Image
                  src="/blob-wave.gif"
                  alt="emoji"
                  width={30}
                  height={20}
                  className="ml-2"
                />
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-purple-300 max-w-lg mx-auto lg:mx-0 my-2 text-lg sm:text-xl lg:text-2xl font-medium"
            >
              full stack developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 max-w-lg mx-auto lg:mx-0 my-4 text-sm sm:text-base lg:text-lg"
            >
              I am a passionate and driven Computer Science Engineering graduate
              from Chandigarh University (July 2021 — June 2025), with a
              specialization in DevOps. Currently, I am working as a DevOps
              Engineer at Keen and Able Pvt. Ltd., where I am gaining hands-on
              experience in software development, system operations, and
              infrastructure management. I am highly motivated to apply my
              academic background in real-world scenarios and actively
              contribute to impactful and innovative projects. My strong desire
              to continuously learn and grow drives me to take on new challenges
              and make meaningful contributions in the field of DevOps and
              software engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center lg:justify-start space-x-5 mt-6"
            >
              {[
                {
                  icon: <FaGithub size={24} />,
                  url: "https://github.com/Navneet072300",
                },
                {
                  icon: <FaLinkedin size={24} />,
                  url: "https://www.linkedin.com/in/navneet-shahi-4636191a9/",
                },
                {
                  icon: <FaEnvelope size={24} />,
                  url: "mailto:navneetshahi345@gmail.com",
                },
                {
                  icon: <SiMedium size={24} />,
                  url: "https://medium.com/@navneetshahi345",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, color: "#a855f7" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-purple-400 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm mb-2">Scroll down</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center py-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto px-4 z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#1e293b]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 mb-6"
            >
              I’m a DevOps Engineer at Keen and Able Pvt. Ltd. with a strong
              interest in full-stack development. Alongside managing
              infrastructure and deployment pipelines, I actively contribute to
              building clean, functional, and user-focused web applications.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 mb-10"
            >
              With over a year of experience, including freelance work on
              various small projects, I’ve worked with modern technologies like
              JavaScript, TypeScript, React, Next.js, Node.js, Go, Python, and
              Tailwind CSS. My DevOps expertise includes Docker, Kubernetes,
              Jenkins, and AWS, enabling me to deliver scalable and efficient
              solutions from development to production. I&apos;m continuously
              learning and exploring new technologies to stay ahead in both
              DevOps and development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="text-l p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                  <a
                    className="text-base font-bold text-white"
                    href="https://drive.google.com/drive/folders/1KIKSt6nLqj5HHQzE_whxWsLfLbJkEe9N"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-white font-semibold max-w-lg mx-auto my-2 text-lg sm:text-xl text-center">
              Here are some technologies I have been working with:
            </p>

            {/* Scrolling skills carousel - Fixed */}
            <div className="mt-8 relative h-36 overflow-hidden">
              {/* First row */}
              <div className="h-16 mb-4 relative overflow-hidden">
                <div className="absolute left-0 right-0 h-16 bg-gradient-to-r from-[#0f172a] via-transparent to-[#0f172a] z-10"></div>
                <motion.div
                  animate={{ x: [0, -2400] }}
                  transition={{
                    x: {
                      duration: 40,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "linear",
                    },
                  }}
                  className="flex absolute h-16"
                >
                  {[...Array(2)].map((_, dupeIndex) => (
                    <div key={dupeIndex} className="flex h-16">
                      {[
                        { src: "/react.svg", alt: "React" },
                        { src: "/node.svg", alt: "Node.js" },
                        { src: "/javascript.svg", alt: "JavaScript" },
                        { src: "/typescript.svg", alt: "TypeScript" },
                        { src: "/tailwindcss.svg", alt: "Tailwind CSS" },
                        { src: "/docker.svg", alt: "Docker" },
                        { src: "/k8s.png", alt: "Kubernetes" },
                        { src: "/terraform.png", alt: "Terraform" },
                        { src: "/go.svg", alt: "Go" },
                        { src: "/aws.svg", alt: "AWS" },
                      ].map((tech, index) => (
                        <motion.div
                          key={`${dupeIndex}-${index}`}
                          whileHover={{ y: -5, scale: 1.1 }}
                          className="flex-shrink-0 bg-[#1e293b]/40 p-3 rounded-xl backdrop-blur-sm mx-8 w-16 h-16 flex items-center justify-center"
                        >
                          <Image
                            src={tech.src || "/placeholder.svg"}
                            alt={tech.alt}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Second row */}
              <div className="h-16 relative overflow-hidden">
                <div className="absolute left-0 right-0 h-16 bg-gradient-to-r from-[#0f172a] via-transparent to-[#0f172a] z-10"></div>
                <motion.div
                  animate={{ x: [-2400, 0] }}
                  transition={{
                    x: {
                      duration: 40,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "linear",
                    },
                  }}
                  className="flex absolute h-16"
                >
                  {[...Array(2)].map((_, dupeIndex) => (
                    <div key={dupeIndex} className="flex h-16">
                      {[
                        { src: "/aws.svg", alt: "AWS" },
                        { src: "/go.svg", alt: "Go" },
                        { src: "/docker.svg", alt: "Docker" },
                        { src: "/tailwindcss.svg", alt: "Tailwind CSS" },
                        { src: "/typescript.svg", alt: "TypeScript" },
                        { src: "/javascript.svg", alt: "JavaScript" },
                        { src: "/node.svg", alt: "Node.js" },
                        { src: "/react.svg", alt: "React" },
                      ].map((tech, index) => (
                        <motion.div
                          key={`${dupeIndex}-${index}`}
                          whileHover={{ y: -5, scale: 1.1 }}
                          className="flex-shrink-0 bg-[#1e293b]/40 p-3 rounded-xl backdrop-blur-sm mx-8 w-16 h-16 flex items-center justify-center"
                        >
                          <Image
                            src={tech.src || "/placeholder.svg"}
                            alt={tech.alt}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#0f172a] relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-40 right-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Projects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {projectList.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-[#0f172a] relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 rounded-full bg-green-500/5 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 14,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 16,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Experience
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {experienceList.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline line */}
                {index !== experienceList.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-purple-500 to-blue-500 opacity-30" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-4 top-8 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-[#0f172a] z-10" />

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="ml-12 bg-[#1e293b]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-xl hover:border-purple-500/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {experience.title}
                      </h3>
                      <div className="flex items-center gap-2 text-purple-400 font-medium mb-2">
                        <span>{experience.company}</span>
                        {experience.link && (
                          <motion.a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end text-sm text-gray-400">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={14} />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="text-gray-300 mb-4 space-y-2">
                    {experience.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * itemIndex }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * techIndex }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e293b] py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 text-center"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-6">
              {[
                {
                  icon: <FaGithub size={20} />,
                  url: "https://github.com/Navneet072300",
                },
                {
                  icon: <FaLinkedin size={20} />,
                  url: "https://www.linkedin.com/in/navneet-shahi-4636191a9/",
                },
                {
                  icon: <FaEnvelope size={20} />,
                  url: "mailto:navneetshahi345@gmail.com",
                },
                {
                  icon: <SiMedium size={20} />,
                  url: "https://medium.com/@navneetshahi345",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, color: "#a855f7" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Navneet Shahi. All rights reserved.
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
