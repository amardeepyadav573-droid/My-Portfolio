import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm.jsx";

import profile from "./assets/amr.png";
import Project0 from "./assets/download.png";
import Project1 from "./assets/download (1).png";
import Project2 from "./assets/download (2).png";
import Project3 from "./assets/download (3).png";
import Certificate1 from "./assets/Coursera HV2X00I3PA7V_page-0001.jpg";
import Certificate2 from "./assets/WhatsApp Image 2026-08-26 at 22.53.38.jpeg";
import Certificate3 from "./assets/WhatsApp Image 2026-08-26 at 22.53.39.jpeg";
import Certificate4 from "./assets/WhatsApp Image 2026-08-27 at 21.23.07.jpeg";
import Certificate5 from "./assets/WhatsApp Image 2026-08-27 at 21.27.40.jpeg";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaBars,
  FaTimes,
  FaExternalLinkAlt,
  FaArrowRight,
  FaGraduationCap,
  FaCode,
} from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["certificates", "Certificates"],
  ["contact", "Contact"],
];

const SOCIALS = [
  { href: "https://github.com/amrdeepyadav509-cpu", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/amrdeep-yadav-000b42320/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://www.instagram.com/amrdeepyadav509", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.youtube.com/@Mahadev751-e4j", label: "YouTube", Icon: FaYoutube },
];

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", Icon: FaHtml5 },
      { name: "CSS", Icon: FaCss3Alt },
      { name: "JavaScript", Icon: FaJs },
      { name: "React", Icon: FaReact },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express", Icon: SiExpress },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", Icon: FaGitAlt },
      { name: "GitHub", Icon: FaGithub },
    ],
  },
];

const PROJECTS = [
  {
    title: "Foodie Restaurant",
    img: Project0,
    desc: "A modern, responsive restaurant website with a clean menu and ordering-style layout.",
    tags: ["React", "CSS"],
    link: "https://foodie-restaurant-seven.vercel.app/",
  },
  {
    title: "Chat Bot",
    img: Project1,
    desc: "An AI-powered chatbot interface for quick, conversational answers.",
    tags: ["React", "AI", "API"],
    link: "https://aky-chat-bot.vercel.app/",
  },
  {
    title: "My Portfolio",
    img: Project2,
    desc: "A developer portfolio showcasing projects, skills and certificates.",
    tags: ["React", "Vite"],
    link: "https://developer-portfolio-alpha-mocha.vercel.app/",
  },
  {
    title: "Task Manager",
    img: Project3,
    desc: "Plan and track daily tasks with a simple, distraction-free interface.",
    tags: ["React", "MERN"],
    link: "https://task-manager-lyart-psi-81.vercel.app/",
  },
];

const CERTIFICATES = [
  { img: Certificate1, title: "Introduction to HTML, CSS & JavaScript" },
  { img: Certificate2, title: "AI Chatbot Development" },
  { img: Certificate3, title: "First Rank in Bug Hunt" },
  { img: Certificate4, title: "HackIndia 2026" },
  { img: Certificate5, title: "Summer Training Program 2025 in MERN Stack" },
];

function App() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Navbar shadow + active section highlight
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV.map(([id]) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      spy.disconnect();
    };
  }, []);

  // Reveal-on-scroll animation
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close certificate modal with Escape; lock scroll while open
  useEffect(() => {
    if (!selectedCertificate) return;
    const onKey = (e) => e.key === "Escape" && setSelectedCertificate(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedCertificate]);

  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>

      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          Amardeep<span>.</span>
        </a>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={menuOpen ? "open" : ""} aria-label="Main">
          <ul>
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* HOME */}
        <section id="home" className="hero">
          <div className="hero-text">
            <span className="eyebrow">MERN Stack Developer</span>
            <h1>
              Hi, I'm <span className="gradient-text">Amardeep Yadav</span>
            </h1>
            <p>
              I build responsive and modern web applications using React,
              Node.js, Express.js and MongoDB. Let's turn your ideas into
              powerful, user-friendly digital solutions.
            </p>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View Projects <FaArrowRight />
              </a>
              <a href="#contact" className="btn btn-ghost">Contact Me</a>
            </div>

            <div className="hero-socials">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="profile-photo">
            <div className="photo-glow" />
            <img src={profile} alt="Amardeep Yadav" width="676" height="822" />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <h2 className="section-title reveal">About <span>Me</span></h2>
          <div className="about-grid reveal">
            <div className="about-card">
              <p>
                I'm a passionate MERN Stack Developer focused on building
                modern, responsive and user-friendly web applications. I work
                with MongoDB, Express.js, React and Node.js to create
                full-stack solutions.
              </p>
              <p>
                I enjoy turning ideas into functional websites and continuously
                improving my skills by working on real-world projects.
              </p>
            </div>
            <div className="about-facts">
              <div className="fact">
                <FaGraduationCap />
                <div>
                  <strong>B.Tech CSE (AI-ML)</strong>
                  <span>3rd Year</span>
                </div>
              </div>
              <div className="fact">
                <FaCode />
                <div>
                  <strong>{PROJECTS.length} Live Projects</strong>
                  <span>Deployed on Vercel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <h2 className="section-title reveal">My <span>Skills</span></h2>
          <div className="skill-groups">
            {SKILL_GROUPS.map((g) => (
              <div className="skill-group reveal" key={g.title}>
                <h3>{g.title}</h3>
                <div className="skill-list">
                  {g.items.map(({ name, Icon }) => (
                    <div className="skill" key={name}>
                      <Icon aria-hidden="true" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <h2 className="section-title reveal">My <span>Projects</span></h2>
          <div className="projects">
            {PROJECTS.map((p) => (
              <article className="pro reveal" key={p.title}>
                <div className="pro-img">
                  <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" />
                </div>
                <div className="pro-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    Live Demo <FaExternalLinkAlt />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certificates" className="section">
          <h2 className="section-title reveal">My <span>Certificates</span></h2>
          <div className="certificates">
            {CERTIFICATES.map((c) => (
              <button
                type="button"
                className="certificate reveal"
                key={c.title}
                onClick={() => setSelectedCertificate({ src: c.img, title: c.title })}
                aria-label={`View certificate: ${c.title}`}
              >
                <img src={c.img} alt={`${c.title} certificate`} loading="lazy" />
                <h3>{c.title}</h3>
                <span>Click to view</span>
              </button>
            ))}
          </div>

          {selectedCertificate && (
            <div
              className="certificate-modal"
              role="dialog"
              aria-modal="true"
              aria-label={selectedCertificate.title}
              onClick={() => setSelectedCertificate(null)}
            >
              <button
                className="close-certificate"
                aria-label="Close"
                onClick={() => setSelectedCertificate(null)}
              >
                &times;
              </button>
              <img
                src={selectedCertificate.src}
                alt={selectedCertificate.title}
                className="certificate-large"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <h2 className="section-title reveal">Contact <span>Me</span></h2>
          <p className="section-sub reveal">
            Have a project in mind or just want to say hi? Send a message and it
            will land straight in my inbox.
          </p>
          <div className="contact-wrap reveal">
            <ContactForm />
          </div>
          <div className="social-links reveal">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Amardeep Yadav | B.Tech CSE AI-ML, 3rd Year</p>
      </footer>
    </>
  );
}

export default App;
