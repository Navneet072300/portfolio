'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Branch {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: 'PrepBot',
    description:
      'AI-powered mock interview platform with real-time feedback, personalized question generation, and session analytics.',
    tech: ['Next.js', 'TypeScript', 'AI'],
    github: 'https://github.com/Navneet072300/PrepBot',
  },
  {
    title: 'Story Book',
    description:
      'Full-stack AI kids story generator — enter a prompt, get an illustrated, age-appropriate story in seconds.',
    tech: ['Next.js', 'TypeScript', 'OpenAI'],
    github: 'https://github.com/Navneet072300/story-book',
  },
  {
    title: 'BudgetBuddy',
    description:
      'eCommerce price tracker with web scraping, cron jobs, and email alerts when prices drop.',
    tech: ['Next.js 15', 'TypeScript', 'Cron', 'Scraping'],
    github: 'https://github.com/Navneet072300/budgetbuddy',
  },
  {
    title: 'Code-Craft',
    description:
      'VS Code-like code editor in the browser with syntax highlighting, multiple themes, and file management.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/Navneet072300/code-craft',
  },
  {
    title: 'Go-Todo',
    description:
      'Full-stack todo application with a Golang REST API backend and a clean React frontend.',
    tech: ['React', 'Golang', 'REST API'],
    github: 'https://github.com/Navneet072300/go-todo',
  },
  {
    title: 'Genova',
    description:
      'Multi-modal AI platform to generate code, images, videos, and text from a single unified interface.',
    tech: ['Next.js', 'TypeScript', 'AI APIs'],
    github: 'https://github.com/Navneet072300/genova',
  },
];

const SKILLS = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'Golang', 'Python', 'Docker', 'Kubernetes',
  'Terraform', 'PostgreSQL', 'AWS', 'CI/CD',
];

// ─── Binary Tree Canvas ───────────────────────────────────────────────────────

function buildTree(
  x: number,
  y: number,
  angleDeg: number,
  len: number,
  depth: number,
  maxDepth: number
): Branch {
  const rad = (angleDeg * Math.PI) / 180;
  const x2 = x + Math.sin(rad) * len;
  const y2 = y - Math.cos(rad) * len;

  const branch: Branch = {
    x1: x, y1: y,
    x2, y2,
    depth,
    progress: 0,
    started: false,
    children: [],
  };

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

const BinaryTree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
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
      const trunkLen = Math.min(h * 0.2, 140);
      const maxDepth = w < 768 ? 8 : 10;
      const tree = buildTree(w / 2, h, 0, trunkLen, 0, maxDepth);
      tree.started = true;
      treeRef.current = tree;
    };

    init();

    let allDone = false;

    const updateBranch = (b: Branch): boolean => {
      if (!b.started) return true;
      const rate = 0.022 * (0.8 + b.depth * 0.09);
      if (b.progress < 1) {
        b.progress = Math.min(1, b.progress + rate);
      }
      if (b.progress >= 0.7) {
        b.children.forEach(c => { c.started = true; });
      }
      let done = b.progress >= 1;
      b.children.forEach(c => { if (!updateBranch(c)) done = false; });
      return done;
    };

    const drawBranch = (b: Branch) => {
      if (!b.started || b.progress <= 0) return;
      const p = Math.min(b.progress, 1);
      const ex = b.x1 + (b.x2 - b.x1) * p;
      const ey = b.y1 + (b.y2 - b.y1) * p;

      const maxD = 10;
      const alpha = 0.5 - (b.depth / maxD) * 0.35;
      const width = Math.max(0.4, 2.4 - b.depth * 0.2);

      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.stroke();

      b.children.forEach(drawBranch);
    };

    const render = () => {
      if (!treeRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!allDone) allDone = updateBranch(treeRef.current);
      drawBranch(treeRef.current);
      if (!allDone) rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      allDone = false;
      init();
      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
};

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['about', 'projects', 'contact'] as const;

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 960, margin: '0 auto', padding: '0 24px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13, color: '#737373' }}>
          ns<span style={{ color: '#4ade80' }}>.</span>
        </span>
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                type="button"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-geist-mono)', fontSize: 12, letterSpacing: 0.5,
                  color: active === link ? '#4ade80' : '#4a4a4a',
                  transition: 'color 0.2s', padding: '4px 0',
                }}
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
        border: `1px solid ${hovered ? 'rgba(74,222,128,0.22)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 8, padding: '20px',
        backgroundColor: hovered ? 'rgba(74,222,128,0.02)' : 'transparent',
        transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Code2 size={15} color="#4ade80" />
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href={project.github} target="_blank" rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            style={{ color: '#333', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#d4d4d4')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#333')}
          >
            <FaGithub size={14} />
          </a>
          {project.live && (
            <a
              href={project.live} target="_blank" rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              style={{ color: '#333', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#d4d4d4')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#333')}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div>
        <h3 style={{
          fontSize: 15, fontWeight: 500, margin: '0 0 6px',
          color: hovered ? '#4ade80' : '#e5e5e5', transition: 'color 0.2s',
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, color: '#4a4a4a', lineHeight: 1.65, margin: 0 }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#3a3a3a',
          }}>
            {t}
          </span>
        ))}
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

        {/* Vignette — fades tree at bottom so it blends into page */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 100% 55% at 50% 100%, transparent 0%, #0a0a0a 65%)',
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 160, pointerEvents: 'none',
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

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%',
          transform: 'translateX(-50%)',
          animation: 'nudge 2.5s ease-in-out infinite',
        }}>
          <div style={{
            width: 1, height: 44,
            background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.35))',
          }} />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ maxWidth: 960, margin: '0 auto', padding: '96px 24px' }}>
        <SectionLabel>// about</SectionLabel>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 48, alignItems: 'start',
        }}>
          <div>
            <p style={{ fontSize: 17, color: '#c0c0c0', lineHeight: 1.75, marginBottom: 14, fontWeight: 300 }}>
              Hi, I&apos;m Navneet. I build things for the web — from full-stack applications
              to distributed systems and cloud infrastructure.
            </p>
            <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.75, marginBottom: 28 }}>
              I care about clean code, good architecture, and software that actually works.
              Currently exploring AI applications, DevOps tooling, and backend systems with Go.
            </p>
            <a
              href="https://github.com/Navneet072300" target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#4ade80',
                textDecoration: 'none', borderBottom: '1px solid rgba(74,222,128,0.3)',
                paddingBottom: 2,
              }}
            >
              View all projects <ArrowUpRight size={12} />
            </a>
          </div>

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
                    el.style.color = '#86efac';
                    el.style.borderColor = 'rgba(74,222,128,0.18)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#404040';
                    el.style.borderColor = '#161616';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{
        maxWidth: 960, margin: '0 auto', padding: '96px 24px',
        borderTop: '1px solid #111',
      }}>
        <SectionLabel>// projects</SectionLabel>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14,
        }}>
          {PROJECTS.map(project => <ProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{
        maxWidth: 960, margin: '0 auto', padding: '96px 24px 120px',
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
        <p style={{
          fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#222',
        }}>
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
