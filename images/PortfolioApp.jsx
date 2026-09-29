import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUp,
  Send,
  CheckCircle2,
  GraduationCap,
  Code2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Redux", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git & GitHub", "VS Code", "Postman", "Figma", "Vercel"],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Engineering",
    school: "L.D. College of Engineering, Ahmedabad",
    period: "2021 — 2025",
    detail: "Focused on web technologies, data structures, and software design.",
  },
  {
    degree: "Higher Secondary Education (Science)",
    school: "Gujarat Board, Surat",
    period: "2019 — 2021",
    detail: "Specialized in Computer Science and Mathematics.",
  },
];

const PROJECTS = [
  {
    title: "ShopEase — E-Commerce Platform",
    category: "Full Stack",
    description:
      "A full-featured online store with product catalog, cart, and secure checkout flow.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "TaskFlow — Task Manager",
    category: "Frontend",
    description:
      "A drag-and-drop task board with boards, labels, and deadline reminders.",
    stack: ["React", "Redux", "Tailwind CSS"],
    github: "#",
    live: "#",
  },
  {
    title: "WeatherNow",
    category: "Frontend",
    description:
      "A clean weather lookup app with live forecasts and saved locations.",
    stack: ["React", "OpenWeather API"],
    github: "#",
    live: "#",
  },
  {
    title: "DevConnect — Community API",
    category: "Backend",
    description:
      "A REST API powering a developer community: auth, posts, and comments.",
    stack: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "#",
    live: "#",
  },
];

const FILTERS = ["All", "Frontend", "Backend", "Full Stack"];

/* ------------------------------------------------------------------ */
/*  SHARED UI BITS                                                    */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER / NAV                                                      */
/* ------------------------------------------------------------------ */

function Header({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Shrink / shadow header on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="header-inner">
        <button className="logo" onClick={() => handleNavClick("home")}>
          <Code2 size={18} strokeWidth={2.2} />
          <span>
            vaishvi<span className="logo-accent">.dev</span>
          </span>
        </button>

        <nav className="nav-desktop">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="nav-mobile" ref={menuRef}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-mobile-link ${activeSection === item.id ? "nav-link-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const codeLines = [
    { indent: 0, text: "const developer = {" },
    { indent: 1, text: '"name": "Vaishvi Patel",' },
    { indent: 1, text: '"role": "Software Developer",' },
    { indent: 1, text: '"stack": ["React", "Node.js", "MongoDB"],' },
    { indent: 1, text: '"focus": "Clean, scalable web apps",' },
    { indent: 1, text: '"status": "Open to opportunities"' },
    { indent: 0, text: "};" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <Eyebrow>// hello, world</Eyebrow>
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">Vaishvi Patel</span>
          </h1>
          <p className="hero-role">Professional Software Developer</p>
          <p className="hero-desc">
            I design and build reliable, user-friendly web applications —
            from responsive interfaces to well-structured backend services.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
              View Projects
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo("contact")}>
              Contact Me
            </button>
          </div>
        </div>

        <div className="hero-code-card" aria-hidden="true">
          <div className="code-card-topbar">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="code-card-filename">developer.js</span>
          </div>
          <pre className="code-card-body">
            {codeLines.map((line, i) => (
              <div key={i} style={{ paddingLeft: `${line.indent * 16}px` }}>
                {line.text}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const stats = [
    { label: "Years Learning & Building", value: "3+" },
    { label: "Projects Completed", value: "12+" },
    { label: "Technologies Used", value: "15+" },
  ];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="// about"
          title="A little about me"
        />
        <div className="about-grid">
          <p className="about-text">
            I'm a software developer who enjoys turning ideas into working
            products. My focus is the MERN stack, where I build interfaces
            that feel effortless and backends that stay reliable under
            real-world use. I care about clean code, thoughtful structure,
            and shipping things that actually help people.
            <br />
            <br />
            Outside of coding, I like reading about system design, exploring
            new frameworks, and contributing to small open-source tools.
          </p>
          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading eyebrow="// skills" title="Tools I work with" />
        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="skill-card">
              <h3 className="skill-card-title">{group.title}</h3>
              <div className="tag-row">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EDUCATION                                                          */
/* ------------------------------------------------------------------ */

function Education() {
  return (
    <section id="education" className="section section-alt">
      <div className="container">
        <SectionHeading eyebrow="// education" title="Academic background" />
        <div className="timeline">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="timeline-item">
              <div className="timeline-icon">
                <GraduationCap size={18} />
              </div>
              <div className="timeline-content">
                <div className="timeline-top-row">
                  <h3 className="timeline-degree">{edu.degree}</h3>
                  <span className="timeline-period">{edu.period}</span>
                </div>
                <p className="timeline-school">{edu.school}</p>
                <p className="timeline-detail">{edu.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading eyebrow="// projects" title="Things I've built" />

        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn ${activeFilter === f ? "filter-btn-active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-card-head">
                <span className="project-category">{project.category}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="tag-row">
                {project.stack.map((t) => (
                  <span key={t} className="tag tag-small">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link">
                  <Github size={16} /> Code
                </a>
                <a href={project.live} className="project-link">
                  <ExternalLink size={16} /> Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-hide the success message after a few seconds
  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => setIsSubmitted(false), 4000);
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Please enter your name.";
    if (!formData.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      next.email = "Please enter a valid email.";
    if (!formData.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // In a real app this would call an API / send an email.
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="// contact"
          title="Let's work together"
          subtitle="Have a project in mind or just want to say hi? My inbox is open."
        />

        <div className="contact-grid">
          <div className="contact-info">
            <a href="mailto:vaishvi.patel@example.com" className="contact-info-item">
              <Mail size={18} />
              <span>vaishvi.patel@example.com</span>
            </a>
            <a href="tel:+911234567890" className="contact-info-item">
              <Phone size={18} />
              <span>+91 12345 67890</span>
            </a>
            <div className="contact-info-item">
              <MapPin size={18} />
              <span>Surat, Gujarat, India</span>
            </div>

            <div className="social-row">
              <a href="#" className="social-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              <Send size={16} /> Send Message
            </button>

            {isSubmitted && (
              <div className="form-success">
                <CheckCircle2 size={16} />
                Thanks! Your message has been sent.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="logo footer-logo">
          <Code2 size={16} strokeWidth={2.2} />
          vaishvi<span className="logo-accent">.dev</span>
        </span>
        <p className="footer-copy">
          © {year} Vaishvi Patel. Built with React.
        </p>
        <div className="social-row">
          <a href="#" className="social-icon" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  SCROLL TO TOP BUTTON                                               */
/* ------------------------------------------------------------------ */

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  APP ROOT                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll-spy: highlight the nav item for the section in view
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --bg: #F8F7F4;
          --bg-alt: #F1EFEA;
          --surface: #FFFFFF;
          --ink: #171B1F;
          --ink-muted: #5C6570;
          --border: #E4E1DA;
          --dark: #12181B;
          --dark-2: #1B2226;
          --accent: #1B7F79;
          --accent-soft: rgba(27, 127, 121, 0.1);
          --accent-contrast: #F2C572;
        }

        * { box-sizing: border-box; }

        .app {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, .logo, .hero-name { font-family: 'Sora', sans-serif; }
        .eyebrow, .code-card-body, .tag, .filter-btn, .project-category, .timeline-period {
          font-family: 'IBM Plex Mono', monospace;
        }

        .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; }

        /* ---------- Eyebrow / Section heading ---------- */
        .eyebrow {
          display: inline-block;
          font-size: 13px;
          color: var(--accent);
          letter-spacing: 0.02em;
          margin-bottom: 12px;
        }
        .section-heading { margin-bottom: 40px; max-width: 640px; }
        .section-title { font-size: 32px; font-weight: 700; margin: 0 0 10px 0; color: var(--ink); }
        .section-subtitle { color: var(--ink-muted); font-size: 15px; margin: 0; }

        .section { padding: 88px 0; }
        .section-alt { background: var(--bg-alt); }

        /* ---------- Header ---------- */
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(248, 247, 244, 0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .header-scrolled {
          border-bottom-color: var(--border);
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
        }
        .header-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 16px;
          color: var(--ink);
        }
        .logo-accent { color: var(--accent); }

        .nav-desktop { display: flex; gap: 4px; }
        .nav-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-muted);
          border-radius: 6px;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .nav-link:hover { color: var(--ink); background: var(--accent-soft); }
        .nav-link-active { color: var(--accent); }

        .menu-toggle { display: none; padding: 6px; color: var(--ink); }

        .nav-mobile {
          display: flex;
          flex-direction: column;
          padding: 8px 24px 16px;
          border-top: 1px solid var(--border);
          background: var(--bg);
        }
        .nav-mobile-link {
          text-align: left;
          padding: 12px 4px;
          font-size: 15px;
          color: var(--ink-muted);
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 760px) {
          .nav-desktop { display: none; }
          .menu-toggle { display: block; }
        }

        /* ---------- Buttons ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: var(--accent); color: #fff; }
        .btn-primary:hover { opacity: 0.92; }
        .btn-outline { border: 1.5px solid var(--border); color: var(--ink); background: var(--surface); }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }
        .btn-full { width: 100%; }

        /* ---------- Hero ---------- */
        .hero { padding: 72px 0 96px; }
        .hero-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
          align-items: center;
        }
        .hero-title { font-size: 42px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.15; }
        .hero-name { color: var(--accent); }
        .hero-role { font-size: 18px; font-weight: 600; color: var(--ink); margin: 0 0 14px 0; }
        .hero-desc { color: var(--ink-muted); font-size: 16px; max-width: 480px; margin: 0 0 28px 0; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        .hero-code-card {
          background: var(--dark);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(18, 24, 27, 0.18);
        }
        .code-card-topbar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: var(--dark-2);
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .dot-red { background: #E4626F; }
        .dot-yellow { background: #E8B15C; }
        .dot-green { background: #6FBF8B; }
        .code-card-filename { margin-left: 8px; font-size: 12px; color: #8A9199; }
        .code-card-body {
          margin: 0;
          padding: 24px 20px;
          font-size: 13.5px;
          color: #D7E0DE;
          white-space: pre-wrap;
        }
        .code-card-body div:nth-child(2),
        .code-card-body div:nth-child(3),
        .code-card-body div:nth-child(4),
        .code-card-body div:nth-child(5),
        .code-card-body div:nth-child(6) {
          color: var(--accent-contrast);
        }

        @media (max-width: 760px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-title { font-size: 32px; }
        }

        /* ---------- About ---------- */
        .about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: start; }
        .about-text { color: var(--ink-muted); font-size: 15.5px; }
        .about-stats { display: flex; flex-direction: column; gap: 16px; }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
        }
        .stat-value { font-size: 26px; font-weight: 700; color: var(--accent); font-family: 'Sora', sans-serif; }
        .stat-label { font-size: 13px; color: var(--ink-muted); }

        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Skills ---------- */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }
        .skill-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 22px;
        }
        .skill-card-title { font-size: 15px; font-weight: 600; margin: 0 0 14px 0; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          font-size: 12.5px;
          padding: 6px 10px;
          border-radius: 6px;
          background: var(--accent-soft);
          color: var(--accent);
        }
        .tag-small { font-size: 11.5px; padding: 4px 8px; }

        /* ---------- Education / Timeline ---------- */
        .timeline { display: flex; flex-direction: column; gap: 24px; }
        .timeline-item {
          display: flex;
          gap: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 22px;
        }
        .timeline-icon {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: var(--accent-soft);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-top-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }
        .timeline-degree { font-size: 16px; font-weight: 600; margin: 0; }
        .timeline-period { font-size: 12.5px; color: var(--accent); }
        .timeline-school { font-size: 14px; color: var(--ink); margin: 4px 0 4px; font-weight: 500; }
        .timeline-detail { font-size: 13.5px; color: var(--ink-muted); margin: 0; }

        /* ---------- Projects ---------- */
        .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .filter-btn {
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid var(--border);
          color: var(--ink-muted);
          background: var(--surface);
        }
        .filter-btn-active { background: var(--accent); color: #fff; border-color: var(--accent); }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
        }
        .project-category { font-size: 11px; color: var(--accent); }
        .project-title { font-size: 17px; font-weight: 600; margin: 8px 0 8px; }
        .project-desc { font-size: 14px; color: var(--ink-muted); margin: 0 0 14px; flex-grow: 1; }
        .project-links { display: flex; gap: 16px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); }
        .project-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
        }
        .project-link:hover { color: var(--accent); }

        /* ---------- Contact ---------- */
        .contact-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 48px; }
        .contact-info { display: flex; flex-direction: column; gap: 18px; }
        .contact-info-item { display: flex; align-items: center; gap: 12px; font-size: 14.5px; color: var(--ink); }
        .contact-info-item svg { color: var(--accent); flex-shrink: 0; }
        .social-row { display: flex; gap: 10px; margin-top: 8px; }
        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          background: var(--surface);
        }
        .social-icon:hover { color: var(--accent); border-color: var(--accent); }

        .contact-form {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-size: 13px; font-weight: 600; color: var(--ink); }
        .form-field input, .form-field textarea {
          font-family: inherit;
          font-size: 14px;
          padding: 11px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--ink);
          resize: vertical;
        }
        .form-field input:focus, .form-field textarea:focus {
          outline: none;
          border-color: var(--accent);
        }
        .form-error { font-size: 12.5px; color: #C0453F; }
        .form-success {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 10px 14px;
          border-radius: 8px;
        }

        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Footer ---------- */
        .footer { background: var(--dark); color: #C7CCCF; padding: 32px 0; }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-logo { color: #fff; }
        .footer-copy { font-size: 13px; color: #8A9199; margin: 0; }
        .footer .social-icon { border-color: #2A3236; color: #C7CCCF; background: transparent; }
        .footer .social-icon:hover { color: var(--accent-contrast); border-color: var(--accent-contrast); }

        /* ---------- Scroll to top ---------- */
        .scroll-top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(27, 127, 121, 0.35);
          z-index: 40;
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      <Header activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
