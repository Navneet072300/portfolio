'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Mail, ExternalLink, Code2, ArrowUpRight, GitFork, Star } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Branch {
  x1: number; y1: number;
  x2: number; y2: number;
  depth: number;
  progress: number;
  started: boolean;
  children: Branch[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  image?: string;
}

interface OSSContrib {
  project: string;
  org: string;
  description: string;
  url: string;
  language: string;
  stars?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: 'Arc',
    description:
      'Self-hosted serverless PostgreSQL-as-a-Service on AWS EKS. Inspired by Neon/Supabase — connection pooling, scale-to-zero, read replicas, PITR, and a full dashboard.',
    tech: ['Python', 'AWS EKS', 'PostgreSQL', 'Kubernetes'],
    github: 'https://github.com/Navneet072300/arc',
  },
  {
    title: 'StoreIt',
    description:
      'Cloud file storage and management app — upload, organize, and share files with a clean Next.js interface.',
    tech: ['Next.js', 'TypeScript', 'Appwrite'],
    github: 'https://github.com/Navneet072300/storeIt',
    live: 'https://store-it-omega.vercel.app',
    image: '/store.png',
  },
  {
    title: 'Disaster Recovery',
    description:
      'Terraform multi-region AWS infrastructure with Route 53 DNS failover, RDS cross-region read replica, and S3 cross-region replication.',
    tech: ['Terraform', 'AWS', 'HCL', 'Route 53'],
    github: 'https://github.com/Navneet072300/disaster-recovery',
    image: '/terraform.png',
  },
  {
    title: 'Code-Craft',
    description:
      'VS Code-like code editor in the browser with syntax highlighting, multiple themes, and multi-language support.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/Navneet072300/code-craft',
    live: 'https://code-craft-navy.vercel.app',
    image: '/code.png',
  },
  {
    title: 'Scrapeflow',
    description:
      'Visual workflow automation platform for web scraping — drag and drop nodes to build scraping pipelines without code.',
    tech: ['Next.js', 'TypeScript', 'Prisma'],
    github: 'https://github.com/Navneet072300/scrapeflow',
    image: '/scrapper.jpeg',
  },
  {
    title: 'PrepBot',
    description:
      'AI-powered mock interview platform with real-time feedback and personalized question generation.',
    tech: ['Next.js', 'TypeScript', 'AI'],
    github: 'https://github.com/Navneet072300/PrepBot',
  },
];

const OSS: OSSContrib[] = [
  {
    project: 'Argo CD',
    org: 'argoproj',
    description:
      'Declarative GitOps continuous delivery tool for Kubernetes. One of the most widely used CNCF projects — contributed to the codebase and infrastructure configuration.',
    url: 'https://github.com/argoproj/argo-cd/pull/26876',
    language: 'Go',
    stars: '18k+',
  },
];

const SKILLS = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'Golang', 'Python', 'Docker', 'Kubernetes',
  'Terraform', 'PostgreSQL', 'AWS', 'CI/CD',
];

const EXPERIENCE = [
  {
    role: 'Full Stack Developer',
    company: 'Keen and Able Pvt. Ltd.',
    period: 'June 2025 — Present',
    location: 'India',
    points: [
      'Building and maintaining full-stack web applications with Next.js and Node.js',
      'Designing RESTful APIs and integrating third-party services',
      'Working on CI/CD pipelines and deployment automation',
      'Collaborating with cross-functional teams on product features',
    ],
    tech: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
];

// ─── Binary Tree Canvas ───────────────────────────────────────────────────────

function buildTree(
  x: number, y: number,
  angleDeg: number, len: number,
  depth: number, maxDepth: number
): Branch {
  const rad = (angleDeg * Math.PI) / 180;
  const x2 = x + Math.sin(rad) * len;
  const y2 = y - Math.cos(rad) * len;
  const branch: Branch = { x1: x, y1: y, x2, y2, depth, progress: 0, started: false, children: [] };
  if (depth < maxDepth) {
    const childLen = len * 0.7;
    const spread = 20 + depth * 1.5;
    branch.children = [
      buildTree(x2, y2, angleDeg - spread, childLen, depth + 1, maxDepth),
      buildTree(x2, y2, angleDeg + spread, childLen, depth + 1, maxDepth),
    ];
  }
  return branch;
}

function resetBranches(b: Branch, isRoot = true) {
  b.progress = 0;
  b.started = isRoot;
  b.children.forEach(c => resetBranches(c, false));
}

const BinaryTree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const treeRef = useRef<Branch | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const w = canvas.width;
      const h = canvas.height;
      // Taller trunk so branches reach well into the hero text area
      const trunkLen = Math.min(h * 0.28, 200);
      const maxDepth = w < 768 ? 9 : 11;
      const tree = buildTree(w / 2, h, 0, trunkLen, 0, maxDepth);
      tree.started = true;
      treeRef.current = tree;
    };

    init();
    let allDone = false;

    const updateBranch = (b: Branch): boolean => {
      if (!b.started) return true;
      // Slower base rate so growth is clearly visible
      const rate = 0.014 * (0.7 + b.depth * 0.07);
      if (b.progress < 1) b.progress = Math.min(1, b.progress + rate);
      if (b.progress >= 0.6) b.children.forEach(c => { c.started = true; });
      let done = b.progress >= 1;
      b.children.forEach(c => { if (!updateBranch(c)) done = false; });
      return done;
    };

    const drawBranch = (b: Branch) => {
      if (!b.started || b.progress <= 0) return;
      const p = Math.min(b.progress, 1);
      const ex = b.x1 + (b.x2 - b.x1) * p;
      const ey = b.y1 + (b.y2 - b.y1) * p;

      const alpha = Math.max(0.15, 0.9 - (b.depth / 11) * 0.62);
      const width = Math.max(0.5, 4.5 - b.depth * 0.35);

      // Glow on lower depth branches
      if (b.depth < 5) {
        ctx.shadowBlur = Math.max(0, 10 - b.depth * 2);
        ctx.shadowColor = 'rgba(74, 222, 128, 0.45)';
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glowing growing tip on actively-growing branches
      if (p < 1) {
        const tipR = Math.max(1.2, 3 - b.depth * 0.2);
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(134, 239, 172, 0.9)';
        ctx.beginPath();
        ctx.arc(ex, ey, tipR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(134, 239, 172, 0.95)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      b.children.forEach(drawBranch);
    };

    const scheduleRestart = () => {
      timerRef.current = setTimeout(() => {
        if (!treeRef.current) return;
        resetBranches(treeRef.current);
        allDone = false;
        rafRef.current = requestAnimationFrame(render);
      }, 1800);
    };

    const render = () => {
      if (!treeRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!allDone) allDone = updateBranch(treeRef.current);
      drawBranch(treeRef.current);
      ctx.shadowBlur = 0;
      if (!allDone) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        scheduleRestart();
      }
    };

    rafRef.current = requestAnimationFrame(render);

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      allDone = false;
      init();
      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
};

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['about', 'experience', 'projects', 'opensource', 'contact'] as const;

const Nav: React.FC = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = window.scrollY + 120;
      NAV_LINKS.forEach(id => {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) setActive(id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
    }}>
      <div style={{
        maxWidth: 1040, margin: '0 auto', padding: '0 24px',
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13, color: '#737373' }}>
          ns<span style={{ color: '#4ade80' }}>.</span>
        </span>
        <ul style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button type="button" onClick={() => scrollTo(link)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-geist-mono)', fontSize: 11, letterSpacing: 0.5,
                color: active === link ? '#4ade80' : '#484848',
                transition: 'color 0.2s', padding: '4px 0',
              }}
                onMouseEnter={e => { if (active !== link) (e.currentTarget as HTMLElement).style.color = '#a3a3a3'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active === link ? '#4ade80' : '#484848'; }}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 8,
        backgroundColor: hovered ? 'rgba(74,222,128,0.02)' : 'rgba(255,255,255,0.01)',
        transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {project.image && (
        <div style={{ height: 140, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <img
            src={project.image} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, filter: 'grayscale(30%)' }}
          />
        </div>
      )}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Code2 size={14} color="#4ade80" />
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href={project.github} target="_blank" rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              style={{ color: '#383838', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#d4d4d4')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#383838')}
            >
              <FaGithub size={14} />
            </a>
            {project.live && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                style={{ color: '#383838', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#d4d4d4')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#383838')}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
        <div>
          <h3 style={{
            fontSize: 14, fontWeight: 500, margin: '0 0 5px',
            color: hovered ? '#4ade80' : '#e0e0e0', transition: 'color 0.2s',
          }}>
            {project.title}
          </h3>
          <p style={{ fontSize: 12.5, color: '#484848', lineHeight: 1.65, margin: 0 }}>
            {project.description}
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#383838' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main Portfolio ───────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#d4d4d4', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <BinaryTree />
        {/* Soft bottom vignette — let tree breathe into the hero text */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 140% 55% at 50% 105%, transparent 30%, #0a0a0a 80%)',
        }} />
        {/* Very subtle top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 80, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
          <p style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#4ade80',
            letterSpacing: 5, textTransform: 'uppercase', marginBottom: 20,
          }}>
            hello, world
          </p>
          <h1 style={{
            fontSize: 'clamp(44px, 9vw, 92px)', fontWeight: 300,
            letterSpacing: '-0.03em', lineHeight: 1.05,
            margin: '0 0 14px', color: '#f0f0f0',
          }}>
            Navneet Shahi
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 18px)', color: '#525252',
            fontWeight: 300, marginBottom: 44,
          }}>
            Full Stack Developer <span style={{ color: '#222' }}>/</span> DevOps Engineer
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
            {[
              { href: 'https://github.com/Navneet072300', icon: <FaGithub size={19} />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/navneet-shahi', icon: <FaLinkedin size={19} />, label: 'LinkedIn' },
              { href: 'mailto:navneet072300@gmail.com', icon: <Mail size={19} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a
                key={label} href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={label}
                style={{ color: '#2e2e2e', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#4ade80')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#2e2e2e')}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 36, left: '50%',
          transform: 'translateX(-50%)', animation: 'nudge 2.5s ease-in-out infinite',
        }}>
          <div style={{
            width: 1, height: 44,
            background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.4))',
          }} />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ maxWidth: 1040, margin: '0 auto', padding: '96px 24px' }}>
        <SectionLabel>// about</SectionLabel>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 56, alignItems: 'start',
        }}>
          {/* Photo + bio */}
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0 }}>
              <Image
                src="/profile.jpg" alt="Navneet Shahi"
                width={88} height={88}
                style={{
                  borderRadius: '50%', objectFit: 'cover',
                  border: '1px solid rgba(74,222,128,0.18)',
                  filter: 'grayscale(20%)',
                }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 400, color: '#e0e0e0', margin: '0 0 6px' }}>
                Navneet Shahi
              </h2>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#4ade80', margin: '0 0 14px' }}>
                Full Stack · DevOps · Open Source
              </p>
              <p style={{ fontSize: 14, color: '#585858', lineHeight: 1.75, margin: 0 }}>
                I build things for the web — from full-stack applications to distributed systems and cloud infrastructure.
                Currently exploring AI applications, DevOps tooling, and backend systems with Go.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p style={{
              fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#2e2e2e',
              letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14,
            }}>
              tools &amp; technologies
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SKILLS.map(skill => (
                <span
                  key={skill}
                  style={{
                    fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#404040',
                    border: '1px solid #161616', borderRadius: 4, padding: '4px 10px',
                    transition: 'all 0.2s', cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#86efac'; el.style.borderColor = 'rgba(74,222,128,0.2)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#404040'; el.style.borderColor = '#161616';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <a
                href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#4a4a4a',
                  border: '1px solid #1a1a1a', borderRadius: 4, padding: '6px 14px',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#4ade80'; el.style.borderColor = 'rgba(74,222,128,0.2)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#4a4a4a'; el.style.borderColor = '#1a1a1a';
                }}
              >
                <ArrowUpRight size={11} /> view resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" style={{
        maxWidth: 1040, margin: '0 auto', padding: '96px 24px',
        borderTop: '1px solid #111',
      }}>
        <SectionLabel>// experience</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
              {/* Timeline left */}
              <div style={{ paddingTop: 4 }}>
                <p style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#4ade80',
                  marginBottom: 4,
                }}>
                  {exp.period}
                </p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#2e2e2e' }}>
                  {exp.location}
                </p>
              </div>
              {/* Content right */}
              <div style={{
                borderLeft: '1px solid #1a1a1a', paddingLeft: 28,
                paddingBottom: 40, position: 'relative',
              }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: -5, top: 6,
                  width: 9, height: 9, borderRadius: '50%',
                  backgroundColor: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.5)',
                }} />
                <h3 style={{ fontSize: 16, fontWeight: 500, color: '#e0e0e0', margin: '0 0 3px' }}>
                  {exp.role}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#525252', marginBottom: 14,
                }}>
                  {exp.company}
                </p>
                <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'none' }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{
                      fontSize: 13.5, color: '#4a4a4a', lineHeight: 1.7, marginBottom: 6,
                      display: 'flex', gap: 8, alignItems: 'flex-start',
                    }}>
                      <span style={{ color: '#2a3e2a', marginTop: 3, flexShrink: 0 }}>▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#383838',
                      border: '1px solid #161616', borderRadius: 3, padding: '2px 8px',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{
        maxWidth: 1040, margin: '0 auto', padding: '96px 24px',
        borderTop: '1px solid #111',
      }}>
        <SectionLabel>// projects</SectionLabel>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14,
        }}>
          {PROJECTS.map(project => <ProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      {/* ── Open Source ── */}
      <section id="opensource" style={{
        maxWidth: 1040, margin: '0 auto', padding: '96px 24px',
        borderTop: '1px solid #111',
      }}>
        <SectionLabel>// open source</SectionLabel>
        <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}>
          I contribute to open source projects in my spare time — mostly around infrastructure,
          developer tooling, and cloud-native ecosystems.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {OSS.map(contrib => (
            <a
              key={contrib.project}
              href={contrib.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 8, padding: '20px 24px',
                backgroundColor: 'rgba(255,255,255,0.01)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(74,222,128,0.2)';
                el.style.backgroundColor = 'rgba(74,222,128,0.02)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.05)';
                el.style.backgroundColor = 'rgba(255,255,255,0.01)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <GitFork size={13} color="#4ade80" />
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#525252' }}>
                      {contrib.org} /
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: '#e0e0e0' }}>
                      {contrib.project}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#4a4a4a', lineHeight: 1.65, margin: '0 0 12px' }}>
                    {contrib.description}
                  </p>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#383838' }}>
                      {contrib.language}
                    </span>
                    {contrib.stars && (
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#383838',
                      }}>
                        <Star size={10} /> {contrib.stars}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowUpRight size={14} color="#2e2e2e" style={{ flexShrink: 0, marginTop: 4 }} />
              </div>
            </a>
          ))}

          {/* PR link */}
          <a
            href="https://github.com/argoproj/argo-cd/pull/26876" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              border: '1px dashed #1a1a1a', borderRadius: 8, padding: '16px',
              textDecoration: 'none', transition: 'all 0.2s',
              fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#3a3a3a',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(74,222,128,0.15)';
              el.style.color = '#4ade80';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = '#1a1a1a';
              el.style.color = '#3a3a3a';
            }}
          >
            <FaGithub size={14} />
            view the contribution
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{
        maxWidth: 1040, margin: '0 auto', padding: '96px 24px 120px',
        borderTop: '1px solid #111',
      }}>
        <SectionLabel>// contact</SectionLabel>
        <div style={{ maxWidth: 460 }}>
          <h2 style={{
            fontSize: 28, fontWeight: 300, color: '#e0e0e0',
            margin: '0 0 12px', letterSpacing: '-0.02em',
          }}>
            Let&apos;s work together.
          </h2>
          <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.75, marginBottom: 32 }}>
            I&apos;m open to new opportunities, collaborations, or just a chat about interesting problems.
          </p>
          <a
            href="mailto:navneet072300@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#4ade80',
              border: '1px solid rgba(74,222,128,0.25)', borderRadius: 6,
              padding: '10px 18px', textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'rgba(74,222,128,0.07)';
              el.style.borderColor = 'rgba(74,222,128,0.5)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'transparent';
              el.style.borderColor = 'rgba(74,222,128,0.25)';
            }}
          >
            <Mail size={13} />
            get in touch
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #0f0f0f', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#222' }}>
          built by navneet shahi — {new Date().getFullYear()}
        </p>
      </footer>

      <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#4ade80',
      letterSpacing: 4, textTransform: 'uppercase', marginBottom: 40,
    }}>
      {children}
    </p>
  );
}
