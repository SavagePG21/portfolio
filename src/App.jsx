import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, DoorOpen, Home, 
  User, Mail, ArrowLeft, MessageSquare, Send, X, 
  Award, Briefcase, Code, GraduationCap, ExternalLink,
  Download
} from 'lucide-react';
import profileImage from './assets/profile.jpeg';

// --- CV Data & System Prompt ---
const CV_DATA = {
  name: "Manaka Phuti Gift",
  title: "Software Developer | IT Graduate",
  location: "South Africa",
  contact: {
    phone: "081 274 1278",
    email: "giftphuti459@gmail.com",
    portfolio: "savagepg21.github.io/portfolio",
    github: "github.com/SavagePG21",
    linkedin: "linkedin.com/in/phuti-gift-manaka-8707aa346"
  },
  profile: "Information Technology graduate with a foundation in software and web development, backed by hands-on experience supporting complex payment systems in a Tier 3 operations environment. Skilled in Java, JavaScript, PHP, SQL, and modern web technologies including Spring Boot and Angular. Brings a developer's problem-solving mindset, experience analysing logs and diagnosing root causes, and the ability to collaborate across technical teams. Seeking a software development role where I can build reliable applications, strengthen engineering practice, and contribute to user-focused solutions.",
  skills: {
    programming: ["JavaScript", "Java", "PHP", "Python", "VB.NET", "SQL", "PL/SQL"],
    web: ["HTML", "CSS", "Angular", "TypeScript", "React"],
    backend: ["FastAPI", "Spring Boot", "Android with Java"],
    databases: ["SQL", "PL/SQL", "database management"],
    dataEngineering: ["Python data pipelines", "CSV data ingestion", "Data cleaning and preprocessing", "Exploratory data analysis", "Feature engineering", "pandas", "NumPy", "Matplotlib"],
    machineLearning: ["scikit-learn", "RFM customer segmentation", "K-Means clustering", "Feature scaling", "Time-series forecasting with Prophet", "Collaborative filtering with TruncatedSVD", "Prototype NLP sentiment classification with Logistic Regression"],
    automationCloud: ["n8n workflow automation", "Microsoft Azure Fundamentals (AZ-900)"],
    troubleshooting: ["Log analysis", "root-cause investigation", "payment-system diagnostics", "PC hardware and software"],
    professional: ["Problem-solving", "communication", "teamwork", "cross-functional collaboration"]
  },
  experience: [
    {
      title: "3rd Line Operations (EFT) Engineer",
      company: "Adumo (Lesaka)",
      date: "March 2026 - Present",
      duties: [
        "Act as a Tier 3 technical escalation point for complex merchant, payment-terminal, software, and system issues.",
        "Investigate transaction-routing logs and ISO 8583 messages to trace failures, identify contributing factors, and support root-cause analysis.",
        "Diagnose hardware, software, and connectivity issues affecting card-payment terminals and related services.",
        "Collaborate with developers, network teams, and external vendors to investigate incidents and coordinate technical resolution.",
        "Communicate findings clearly during high-priority incidents, translating technical evidence into actionable updates."
      ]
    }
  ],
  education: [
    {
      degree: "Diploma in Information Technology",
      institution: "Vaal University of Technology",
      date: "Completed April 2026",
      details: "Relevant study areas: software development, web development, programming, networking, database management, and troubleshooting."
    },
    {
      degree: "Matriculation",
      institution: "Makgetha Secondary School",
      date: "December 2022"
    }
  ],
  projects: [
    {
      name: "RetailCast",
      context: "Retail Data Analytics & Machine Learning",
      details: "Built an end-to-end retail analytics workflow for transaction cleaning, sales exploration, demand forecasting, RFM customer segmentation, product recommendations, and prototype sentiment analysis.",
      techStack: ["Python", "pandas", "NumPy", "scikit-learn", "Prophet", "Matplotlib"],
      url: "https://github.com/BA-ASSIGNMENT/RetailCast",
      award: "GitHub Project"
    },
    {
      name: "GenZ Connect",
      context: "Full-stack Social Platform",
      details: "Built with Angular, Spring Boot, PostgreSQL, and Cloudflare R2.",
      techStack: ["Angular", "Spring Boot", "PostgreSQL", "Cloudflare R2"],
      award: "Portfolio Project"
    },
    {
      name: "ATS Microservice",
      context: "Resume Parsing & Processing",
      details: "Python-based resume parser integrated with a Spring Boot Java core.",
      techStack: ["Python", "Spring Boot", "Java"],
      award: "Portfolio Project"
    },
    {
      name: "Automated Merchant Transaction Processor",
      context: "Transaction Tooling",
      details: "Developed utilizing Python, Tkinter, pandas, and openpyxl.",
      techStack: ["Python", "Tkinter", "pandas", "openpyxl"],
      award: "Portfolio Project"
    },
    {
      name: "AI-Driven Auto-Remediation Solution",
      context: "POS & Switch Operations",
      details: "Automated remediation for POS and switch operations to reduce downtime.",
      award: "Portfolio Project"
    },
    {
      name: "Unique Mobile App Project",
      context: "BRICS Skill Development & Technology Innovation Competition",
      details: "Participated in a team mobile-app project that earned 3rd place in November 2024.",
      award: "3rd Place"
    },
    {
      name: "VUT Hackathon 2025",
      details: "Hackathon participation focusing on rapid problem solving and innovation.",
      award: "Certificate of Participation"
    },
    {
      name: "IBM Z Datathon 2024",
      details: "Datathon participation involving enterprise data challenges.",
      award: "Certificate of Participation"
    },
    {
      name: "Intervarsity Hackathon 2025",
      details: "Competitive programming and development against multiple universities.",
      award: "Certificate of Participation"
    }
  ],
  githubProjects: [
    {
      name: "CSV_Processor",
      url: "https://github.com/SavagePG21/CSV_Processor",
      techStack: ["Java", "Shell", "Batch", "PowerShell"],
      description: "CSV processing application."
    },
    {
      name: "Cyphers_Bank",
      url: "https://github.com/SavagePG21/Cyphers_Bank",
      techStack: ["HTML", "CSS", "JavaScript", "Java"],
      description: "Banking project."
    },
    {
      name: "EmployeeManagement",
      url: "https://github.com/SavagePG21/EmployeeManagement",
      techStack: ["Java"],
      description: "Employee management application using Java."
    },
    {
      name: "Healthcare-App",
      url: "https://github.com/SavagePG21/Healthcare-App",
      techStack: ["Java", "Android"],
      description: "Android application built with Java."
    },
    {
      name: "Mark-Entry",
      url: "https://github.com/SavagePG21/Mark-Entry",
      description: "View the project and source code on GitHub."
    },
    {
      name: "NextGen-IDE",
      url: "https://github.com/SavagePG21/NextGen-IDE",
      techStack: ["JavaScript", "HTML", "CSS"],
      description: "Drag-and-drop HTML element and CSS property generator."
    },
    {
      name: "portfolio",
      url: "https://github.com/SavagePG21/portfolio",
      techStack: ["HTML", "CSS", "JavaScript"],
      description: "Portfolio website repository."
    },
    {
      name: "Property24",
      url: "https://github.com/SavagePG21/Property24",
      techStack: ["Java", "SQL"],
      description: "Property selling system using Java and SQL."
    },
    {
      name: "skills-introduction-to-github",
      url: "https://github.com/SavagePG21/skills-introduction-to-github",
      techStack: ["Markdown", "Git", "GitHub"],
      description: "GitHub Skills: Introduction to GitHub exercise."
    },
    {
      name: "SowetoStore",
      url: "https://github.com/SavagePG21/SowetoStore",
      techStack: ["Visual Basic"],
      description: "Store management system built with Visual Basic."
    },
    {
      name: "Student_Management-",
      url: "https://github.com/SavagePG21/Student_Management-",
      description: "Student management REST API."
    },
    {
      name: "Takealot-System",
      url: "https://github.com/SavagePG21/Takealot-System",
      techStack: ["Java"],
      description: "Takealot system built with Java."
    },
    {
      name: "Taskflow-management-system",
      url: "https://github.com/SavagePG21/Taskflow-management-system",
      description: "Task management web application."
    },
    {
      name: "VUT-Cyphers",
      url: "https://github.com/SavagePG21/VUT-Cyphers",
      techStack: ["HTML", "CSS", "JavaScript", "Java", "Docker"],
      description: "View the project and source code on GitHub."
    },
    {
      name: "Weather-Application",
      url: "https://github.com/SavagePG21/Weather-Application",
      description: "Real-time weather web application."
    }
  ],
  certifications: [
    "Microsoft Azure Fundamentals (AZ-900)",
    "Cisco CCNA/CCNAv7 coursework (Switching, Routing and Wireless Essentials)",
    "Cisco IT Essentials (PC Hardware and Software)",
    "IBM Data Science Foundations - Level 1",
    "IBM Data Science Tools Foundation"
  ]
};

// --- Audio Helper for Synthesized Knock ---
const playKnockSound = (audioCtx) => {
  if (!audioCtx) return;
  const time = audioCtx.currentTime;
  
  // Create 3 rapid knocks
  for(let i=0; i<3; i++) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle'; // Deep, wooden sound
    osc.frequency.setValueAtTime(120, time + i * 0.18);
    osc.frequency.exponentialRampToValueAtTime(30, time + i * 0.18 + 0.1);
    
    gain.gain.setValueAtTime(1.5, time + i * 0.18);
    gain.gain.exponentialRampToValueAtTime(0.01, time + i * 0.18 + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(time + i * 0.18);
    osc.stop(time + i * 0.18 + 0.1);
  }
};

// --- Components ---

const Button = ({ children, onClick, active, className = "" }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 backdrop-blur-md border border-white/10
      ${active ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-stone-900/50 text-stone-400 hover:bg-stone-800 hover:text-stone-200'}
      ${className}`}
  >
    {children}
  </button>
);

const CinematicHome = ({ onEnter }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in z-10 relative px-4">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800 via-stone-950 to-black -z-10"></div>
    
    <div className="w-32 h-32 md:w-40 md:h-40 mb-8 rounded-full overflow-hidden border-4 border-stone-800 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-stone-900">
      <img src={profileImage} alt="Manaka Phuti Gift" className="w-full h-full object-cover" />
    </div>

    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-stone-100 to-stone-500 mb-6 drop-shadow-lg">
      Manaka Phuti Gift
    </h1>
    <h2 className="text-xl md:text-3xl font-light text-amber-400/80 mb-8 tracking-widest uppercase">
      Software Developer & EFT (3rd line) Engineer
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-12"></div>
    <p className="max-w-2xl text-stone-400 mb-12 leading-relaxed text-lg">
      Step into the architecture of my career. A foundation in software engineering, fortified by Tier 3 operations experience.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-6 items-center">
      <button 
        onClick={onEnter}
        className="group relative px-8 py-4 bg-stone-900 border border-amber-900/50 rounded-lg overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] w-full sm:w-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/10 to-amber-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <span className="relative flex items-center justify-center gap-3 text-stone-300 group-hover:text-amber-400 transition-colors uppercase tracking-widest text-sm font-bold">
          Enter the Gallery <DoorOpen size={18} />
        </span>
      </button>

      <a 
        href="Manaka_Phuti_Gift_CV.pdf" 
        download="Manaka_Phuti_Gift_CV.pdf"
        className="group relative px-8 py-4 bg-stone-900/40 border border-stone-700 rounded-lg overflow-hidden transition-all hover:border-stone-500 hover:bg-stone-800 w-full sm:w-auto flex items-center justify-center gap-3 text-stone-400 hover:text-stone-200 uppercase tracking-widest text-sm font-bold shadow-lg"
      >
        <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Download CV
      </a>
    </div>
  </div>
);

const ArchitecturalDoor = ({ title, icon: Icon, onClick, isOpen }) => {
  return (
    <div className="flex flex-col items-center group">
      <Icon
        size={32}
        aria-hidden="true"
        className="mb-1 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.35)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-amber-400"
      />
      <div 
        style={{ perspective: '1500px' }} 
        className="w-48 h-80 sm:w-64 sm:h-[26rem] relative mb-6 cursor-pointer"
        onClick={onClick}
      >
        {/* Door Frame / Behind Door (Portal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-black border-8 border-stone-800 shadow-[inset_0_0_50px_rgba(0,0,0,1)] rounded-t-sm flex flex-col items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <Icon size={48} className="text-amber-500/30 mb-4" />
           <span className="text-amber-500/50 font-mono tracking-widest text-sm uppercase">Enter</span>
        </div>
        
        {/* The Door Itself */}
        <div 
          style={{ 
            transformStyle: 'preserve-3d', 
            transformOrigin: 'left', 
            transform: isOpen ? 'rotateY(-105deg)' : 'rotateY(0deg)', 
            transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }} 
          className="absolute inset-0 bg-gradient-to-br from-[#3e2723] to-[#1b0000] border-4 border-[#2d1a11] shadow-[10px_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-start pt-12"
        >
          {/* Panel Styling */}
          <div className="w-3/4 h-1/3 border-2 border-[#5d4037]/30 shadow-inner rounded-sm mb-4 bg-gradient-to-b from-white/5 to-transparent"></div>
          <div className="w-3/4 h-1/3 border-2 border-[#5d4037]/30 shadow-inner rounded-sm bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
             {/* Nameplate */}
             <div className="bg-stone-900 border border-stone-700 px-4 py-2 rounded-sm shadow-md">
                <span className="text-amber-500/90 font-serif tracking-widest text-xs uppercase">{title}</span>
             </div>
          </div>

          {/* Door Handle */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-16 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 rounded-sm shadow-[2px_2px_5px_rgba(0,0,0,0.5)]">
             <div className="w-full h-full border border-yellow-300/30 rounded-sm"></div>
          </div>
        </div>
      </div>
      <h3 className="text-stone-400 font-light tracking-widest uppercase text-sm group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
    </div>
  );
};

const ProjectsView = () => (
  <div className="max-w-6xl mx-auto space-y-12 animate-fade-in-up">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-amber-500 mb-4 tracking-wider uppercase">Project Gallery</h2>
      <div className="h-px w-24 bg-amber-500/50 mx-auto"></div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {CV_DATA.projects.map((proj, i) => (
        <div key={i} className="bg-stone-900/60 border border-stone-700 hover:border-amber-500/50 p-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] group">
          <Code className="text-amber-500/50 mb-4 group-hover:text-amber-400 transition-colors" size={32} />
          <h3 className="text-xl font-bold text-stone-200 mb-2">{proj.name}</h3>
          {proj.context && <p className="text-stone-400 text-sm italic mb-3">{proj.context}</p>}
          <p className="text-stone-300 mb-4 leading-relaxed">{proj.details}</p>
          {proj.techStack && (
            <div className="mb-4">
              <h4 className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-2">Tech stack</h4>
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((technology) => (
                  <span key={technology} className="px-2 py-1 bg-stone-800 text-stone-300 text-xs rounded border border-stone-700">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}
          {proj.url && (
            <a
              href={proj.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm mb-4"
            >
              View project on GitHub <ExternalLink size={16} />
            </a>
          )}
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm rounded-full">
            {proj.award}
          </div>
        </div>
      ))}
    </div>
    <section>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-amber-500 mb-3 tracking-wider uppercase">GitHub Repositories</h3>
        <p className="text-stone-400">Browse all 15 public repositories on GitHub.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CV_DATA.githubProjects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="bg-stone-900/60 border border-stone-700 hover:border-amber-500/50 p-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] group"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-lg font-bold text-stone-200 group-hover:text-amber-400 transition-colors">{project.name}</h4>
              <ExternalLink size={18} className="shrink-0 text-stone-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">{project.description}</p>
            {project.techStack && (
              <div className="mb-4">
                <h5 className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-2">Tech stack</h5>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((technology) => (
                    <span key={technology} className="px-2 py-1 bg-stone-800 text-stone-300 text-xs rounded border border-stone-700">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-3">
              <span className="text-amber-500 text-sm font-medium">View on GitHub</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  </div>
);

const JourneyView = () => (
  <div className="max-w-3xl mx-auto animate-fade-in-up">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-amber-500 mb-4 tracking-wider uppercase">Professional Journey</h2>
      <div className="h-px w-24 bg-amber-500/50 mx-auto"></div>
    </div>
    <div className="relative border-l border-stone-700 ml-4 md:ml-0">
      <div className="mb-10 ml-8 relative">
        <span className="absolute -left-10 w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
        <h3 className="text-xl font-bold text-stone-200">{CV_DATA.experience[0].title}</h3>
        <p className="text-amber-400 mb-2">{CV_DATA.experience[0].company} | {CV_DATA.experience[0].date}</p>
        <ul className="space-y-2 text-stone-400 mt-4">
          {CV_DATA.experience[0].duties.map((duty, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-500 mt-1">▹</span> 
              <span>{duty}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-10 ml-8 relative">
        <span className="absolute -left-10 w-4 h-4 rounded-full bg-stone-700 border-2 border-stone-950"></span>
        <h3 className="text-xl font-bold text-stone-200">{CV_DATA.education[0].degree}</h3>
        <p className="text-amber-400/80 mb-2">{CV_DATA.education[0].institution} | {CV_DATA.education[0].date}</p>
        <p className="text-stone-400">{CV_DATA.education[0].details}</p>
      </div>

      <div className="ml-8 relative">
        <span className="absolute -left-10 w-4 h-4 rounded-full bg-stone-700 border-2 border-stone-950"></span>
        <h3 className="text-xl font-bold text-stone-200">{CV_DATA.education[1].degree}</h3>
        <p className="text-amber-400/80">{CV_DATA.education[1].institution} | {CV_DATA.education[1].date}</p>
      </div>
    </div>
  </div>
);

const SkillsView = () => (
  <div className="max-w-5xl mx-auto animate-fade-in-up">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-amber-500 mb-4 tracking-wider uppercase">Technical Capabilities</h2>
      <div className="h-px w-24 bg-amber-500/50 mx-auto"></div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(CV_DATA.skills).map(([category, skills], i) => (
        <div key={i} className="bg-stone-900/50 border border-stone-800 p-6 rounded-lg">
          <h3 className="text-stone-200 font-bold mb-4 uppercase tracking-wider text-sm border-b border-stone-800 pb-2 capitalize">
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, j) => (
              <span key={j} className="px-3 py-1 bg-stone-800/80 text-stone-300 text-sm rounded border border-stone-700/50">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AchievementsView = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-amber-500 mb-4 tracking-wider uppercase">Certifications & Accolades</h2>
      <div className="h-px w-24 bg-amber-500/50 mx-auto"></div>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      {CV_DATA.certifications.map((cert, i) => (
        <div key={i} className="flex items-center gap-4 bg-stone-900/40 border border-stone-800 p-4 rounded-lg hover:bg-stone-800/50 transition-colors">
          <div className="p-3 bg-stone-800 rounded-full text-amber-500/70">
            <Award size={24} />
          </div>
          <span className="text-stone-200 font-medium">{cert}</span>
        </div>
      ))}
    </div>
    <section className="mt-12">
      <h3 className="text-2xl font-bold text-amber-500 mb-6 tracking-wider uppercase text-center">Awards & Participation</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {CV_DATA.projects
          .filter((project) => project.award !== "Portfolio Project")
          .map((project) => (
            <div key={project.name} className="flex items-center gap-4 bg-stone-900/40 border border-stone-800 p-4 rounded-lg hover:bg-stone-800/50 transition-colors">
              <div className="p-3 bg-stone-800 rounded-full text-amber-500/70">
                <Award size={24} />
              </div>
              <div>
                <p className="text-stone-200 font-medium">{project.name}</p>
                <p className="text-stone-400 text-sm">{project.context && `${project.context} · `}{project.award}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  </div>
);

const AboutView = () => (
  <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
    <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-stone-800 to-stone-900 rounded-full border-4 border-stone-800 shadow-[0_0_30px_rgba(245,158,11,0.15)] overflow-hidden">
      <img src={profileImage} alt="Manaka Phuti Gift" className="w-full h-full object-cover" />
    </div>
    
    <h2 className="text-3xl font-bold text-stone-100 mb-2">{CV_DATA.name}</h2>
    <h3 className="text-xl text-amber-500 mb-6">{CV_DATA.title}</h3>
    
    <div className="mb-8">
      <a 
        href="Manaka_Phuti_Gift_CV.pdf" 
        download="Manaka_Phuti_Gift_CV.pdf"
        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600/10 border border-amber-600/30 text-amber-500 hover:bg-amber-600/20 hover:border-amber-500 rounded-full transition-all uppercase tracking-widest text-xs font-bold shadow-sm"
      >
        <Download size={16} /> Download Full CV
      </a>
    </div>

    <p className="text-stone-300 text-lg leading-relaxed bg-stone-900/50 p-8 rounded-xl border border-stone-800 shadow-lg">
      "{CV_DATA.profile}"
    </p>
  </div>
);

const ContactView = () => (
  <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
    <h2 className="text-3xl font-bold text-amber-500 mb-4 tracking-wider uppercase">Connect</h2>
    <div className="h-px w-24 bg-amber-500/50 mx-auto mb-12"></div>
    <div className="grid sm:grid-cols-2 gap-6">
      <a href={`mailto:${CV_DATA.contact.email}`} className="flex flex-col items-center gap-4 p-8 bg-stone-900/60 border border-stone-800 rounded-xl hover:border-amber-500/50 transition-colors group">
        <Mail size={40} className="text-stone-400 group-hover:text-amber-400 transition-colors" />
        <div>
          <h3 className="text-stone-200 font-bold mb-1">Email</h3>
          <p className="text-stone-400 text-sm break-all">{CV_DATA.contact.email}</p>
        </div>
      </a>
      <div className="flex flex-col items-center gap-4 p-8 bg-stone-900/60 border border-stone-800 rounded-xl hover:border-amber-500/50 transition-colors group">
        <User size={40} className="text-stone-400 group-hover:text-amber-400 transition-colors" />
        <div>
          <h3 className="text-stone-200 font-bold mb-1">Phone</h3>
          <p className="text-stone-400 text-sm">{CV_DATA.contact.phone}</p>
        </div>
      </div>
      <a href={`https://${CV_DATA.contact.github}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 p-8 bg-stone-900/60 border border-stone-800 rounded-xl hover:border-amber-500/50 transition-colors group">
        <Code size={40} className="text-stone-400 group-hover:text-amber-400 transition-colors" />
        <div>
          <h3 className="text-stone-200 font-bold mb-1">GitHub</h3>
          <p className="text-stone-400 text-sm flex items-center gap-1 justify-center">SavagePG21 <ExternalLink size={14}/></p>
        </div>
      </a>
      <a href={`https://${CV_DATA.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 p-8 bg-stone-900/60 border border-stone-800 rounded-xl hover:border-amber-500/50 transition-colors group">
        <User size={40} className="text-stone-400 group-hover:text-amber-400 transition-colors" />
        <div>
          <h3 className="text-stone-200 font-bold mb-1">LinkedIn</h3>
          <p className="text-stone-400 text-sm flex items-center gap-1 justify-center">Phuti Gift Manaka <ExternalLink size={14}/></p>
        </div>
      </a>
    </div>
  </div>
);


const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const getAssistantReply = (question) => {
  const query = normalizeText(question);
  const allProjects = [...CV_DATA.projects, ...CV_DATA.githubProjects];
  const matchedProject = allProjects.find((project) =>
    query.includes(normalizeText(project.name))
  );

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
    return `Hello! I'm Ask Manaka. I can help with Manaka's skills, projects, tech stacks, work experience, education, certificates, awards, or contact details.`;
  }

  if (/^(thanks|thank you|thx)\b/.test(query)) {
    return "You're welcome! Ask me if you'd like to know more about Manaka's experience, projects, or skills.";
  }

  if (/what can you|how can you|help me|what do you know/.test(query)) {
    return "I can answer questions using the information on this portfolio: profile, skills, named projects and their tech stacks, GitHub repositories, work experience, education, certificates, awards, and contact details.";
  }

  if (matchedProject) {
    const techStack = matchedProject.techStack
      ? `\nTech stack: ${matchedProject.techStack.join(', ')}.`
      : '';
    const projectUrl = matchedProject.url ? `\nGitHub: ${matchedProject.url}` : '';
    const projectContext = matchedProject.context ? ` (${matchedProject.context})` : '';
    return `${matchedProject.name}${projectContext}: ${matchedProject.details || matchedProject.description}${techStack}${projectUrl}`;
  }

  if (/award|achievement|brics|hackathon|datathon|third place|3rd place/.test(query)) {
    return `Awards and participation:\n${CV_DATA.projects
      .filter((project) => project.award !== "Portfolio Project")
      .map((project) => `• ${project.name}${project.context ? ` — ${project.context}` : ''}: ${project.award}`)
      .join('\n')}`;
  }

  if (/certif|certificate|credential|az.?900|ccna|ccnav7/.test(query)) {
    const matchingCertificate = CV_DATA.certifications.find((certificate) =>
      query.includes(normalizeText(certificate))
    );
    if (matchingCertificate) return matchingCertificate;
    return `Manaka's certificates and coursework:\n${CV_DATA.certifications.map((cert) => `• ${cert}`).join('\n')}`;
  }

  const mentionedSkill = Object.entries(CV_DATA.skills).flatMap(([category, skills]) =>
    skills.map((skill) => ({ category, skill }))
  ).find(({ skill }) => query.includes(normalizeText(skill)));
  if (mentionedSkill && /skill|know|experience|use|proficien|stack|technology/.test(query)) {
    return `${mentionedSkill.skill} is listed under Manaka's ${mentionedSkill.category} skills.`;
  }

  if (/skill|technology|tech stack|programming|language|framework|database/.test(query)) {
    return `Manaka's skills include:\n${Object.entries(CV_DATA.skills)
      .map(([category, skills]) => `• ${category.replace(/([A-Z])/g, ' $1').trim()}: ${skills.join(', ')}`)
      .join('\n')}`;
  }

  if (/experience|work|job|career|current role|responsibilit|eft/.test(query)) {
    const experience = CV_DATA.experience[0];
    return `${experience.title} at ${experience.company} (${experience.date}).\n${experience.duties.map((duty) => `• ${duty}`).join('\n')}`;
  }

  if (/education|study|degree|university|school|qualification/.test(query)) {
    return CV_DATA.education
      .map(({ degree, institution, date, details }) =>
        `• ${degree} — ${institution} (${date})${details ? `: ${details}` : ''}`
      )
      .join('\n');
  }

  if (/contact|email|phone|linkedin|reach|hire/.test(query)) {
    return `You can contact Manaka at ${CV_DATA.contact.email} or ${CV_DATA.contact.phone}.\nGitHub: https://${CV_DATA.contact.github}\nLinkedIn: https://${CV_DATA.contact.linkedin}`;
  }

  if (/where|location|based|country/.test(query)) {
    return `Manaka is based in ${CV_DATA.location}.`;
  }

  if (/github|repositor|repo\b/.test(query)) {
    return `Manaka's public GitHub repositories:\n${CV_DATA.githubProjects
      .map((project) => `• ${project.name}${project.techStack ? ` — ${project.techStack.join(', ')}` : ''}: ${project.url}`)
      .join('\n')}`;
  }

  if (/project|portfolio work/.test(query)) {
    return `Manaka's portfolio projects:\n${CV_DATA.projects
      .map((project) => `• ${project.name}: ${project.details}${project.techStack ? ` Tech stack: ${project.techStack.join(', ')}.` : ''}`)
      .join('\n')}`;
  }

  if (/who are you|about you|tell me about|profile|summary/.test(query)) {
    return `${CV_DATA.name} is a ${CV_DATA.title} based in ${CV_DATA.location}. ${CV_DATA.profile}`;
  }

  if (/cv|resume|curriculum vitae/.test(query)) {
    return "You can download Manaka's CV using the Download CV button on the landing page or About section.";
  }

  return "I can only answer from the information in this portfolio. Try asking about a specific project, tech stack, skill, certificate, award, work experience, education, or contact details.";
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hi, I'm Ask Manaka. Ask me about my projects, GitHub repositories, certificates, skills, experience, education, or contact details." }]);
  const [input, setInput] = useState('');
  const chatMessagesRef = useRef(null);

  const scrollToBottom = () => {
    const chatMessages = chatMessagesRef.current;
    chatMessages?.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    const userMsg = input.trim();
    if (!userMsg) return;

    setInput('');
    setMessages((previousMessages) => [
      ...previousMessages,
      { role: 'user', text: userMsg },
      { role: 'assistant', text: getAssistantReply(userMsg) }
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-amber-600 text-stone-900 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-500 hover:scale-110 transition-all z-50 ${isOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100 scale-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 max-w-[calc(100vw-3rem)] sm:w-96 h-[min(34rem,calc(100dvh-3rem))] max-h-[calc(100dvh-3rem)] bg-stone-900 border border-stone-700 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-50 opacity-0 pointer-events-none'}`}>
        <div className="bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <MessageSquare size={18} />
            Ask Manaka
          </div>
          <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-200">
            <X size={20} />
          </button>
        </div>
        
        <div ref={chatMessagesRef} className="flex-1 min-h-0 p-4 overflow-y-auto overscroll-y-contain flex flex-col gap-4 bg-stone-950/50 text-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`max-w-[85%] whitespace-pre-line break-words p-3 rounded-xl ${msg.role === 'user' ? 'bg-amber-600/20 text-stone-200 self-end rounded-br-none border border-amber-500/30' : 'bg-stone-800 text-stone-300 self-start rounded-bl-none border border-stone-700'}`}>
              {msg.text.split(/(https?:\/\/\S+)/g).map((part, partIndex) => (
                part.startsWith('https://') ? (
                  <a key={partIndex} href={part} target="_blank" rel="noreferrer" className="text-amber-400 underline break-all">
                    {part}
                  </a>
                ) : part
              ))}
            </div>
          ))}
        </div>

        <div className="p-3 bg-stone-800 border-t border-stone-700 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about skills, projects..."
            className="flex-1 bg-stone-900 border border-stone-700 text-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-amber-600 text-stone-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-500 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default function App() {
  const [view, setView] = useState('home'); // home, doors, projects, journey, skills, achievements, about, contact
  const [isMuted, setIsMuted] = useState(false);
  const [openDoor, setOpenDoor] = useState(null);
  
  const audioCtxRef = useRef(null);

  useEffect(() => {
    // Inject custom CSS for animations that Tailwind doesn't have by default
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 1s ease-out forwards;
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleDoorClick = (doorId, targetView) => {
    if (openDoor) return; // Prevent clicking multiple doors at once

    // Initialize audio context on first interaction if not muted
    if (!isMuted) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      playKnockSound(audioCtxRef.current);
    }

    // Animation flow
    const knockDuration = isMuted ? 0 : 700; 
    setTimeout(() => {
      setOpenDoor(doorId); // Start opening animation
      setTimeout(() => {
        setView(targetView);
        setOpenDoor(null); // Reset door state after transition
      }, 1200); // Wait for door to open before changing view
    }, knockDuration);
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <CinematicHome onEnter={() => setView('doors')} />;
      case 'doors':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] w-full animate-fade-in px-4 py-12">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-stone-200 mb-4 font-serif">The Digital Architecture</h2>
                <p className="text-stone-400">Select a door to uncover the foundation of my career.</p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 w-full max-w-7xl justify-items-center">
                <ArchitecturalDoor 
                  title="Projects" 
                  icon={Code} 
                  isOpen={openDoor === 'projects'} 
                  onClick={() => handleDoorClick('projects', 'projects')} 
                />
                <ArchitecturalDoor 
                  title="Journey" 
                  icon={Briefcase} 
                  isOpen={openDoor === 'journey'} 
                  onClick={() => handleDoorClick('journey', 'journey')} 
                />
                <ArchitecturalDoor 
                  title="Skills" 
                  icon={GraduationCap} 
                  isOpen={openDoor === 'skills'} 
                  onClick={() => handleDoorClick('skills', 'skills')} 
                />
                <ArchitecturalDoor 
                  title="Achievements" 
                  icon={Award} 
                  isOpen={openDoor === 'achievements'} 
                  onClick={() => handleDoorClick('achievements', 'achievements')} 
                />
             </div>
          </div>
        );
      case 'projects':
        return <ProjectsView />;
      case 'journey':
        return <JourneyView />;
      case 'skills':
        return <SkillsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-stone-300 font-sans overflow-x-hidden selection:bg-amber-500/30">
      
      {/* Global Background Styling */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_#2a241b_0%,_#000000_100%)] pointer-events-none z-[-1]"></div>
      
      {/* Top Navigation & Controls */}
      {view !== 'home' && (
        <nav className="fixed top-0 w-full p-4 flex flex-wrap justify-between items-center z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
          <div className="flex gap-2 mb-2 sm:mb-0">
            {view === 'doors' && (
              <Button onClick={() => setView('home')}>
                <Home size={18} /> <span className="hidden sm:inline">Home</span>
              </Button>
            )}
            <Button active={view === 'doors'} onClick={() => setView('doors')}>
               <DoorOpen size={18} /> <span className="hidden sm:inline">Doors</span>
            </Button>
            <Button active={view === 'about'} onClick={() => setView('about')}>
               <User size={18} /> <span className="hidden sm:inline">About</span>
            </Button>
            <Button active={view === 'contact'} onClick={() => setView('contact')}>
               <Mail size={18} /> <span className="hidden sm:inline">Contact</span>
            </Button>
          </div>
          
          <div className="flex gap-2">
             <Button onClick={() => setIsMuted(!isMuted)} className={isMuted ? 'text-red-400' : ''}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />} 
             </Button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`pt-24 pb-12 px-6 min-h-screen flex flex-col justify-center relative z-10 ${view === 'home' ? 'pt-0 pb-0' : ''}`}>
        
        {/* Back Button for internal views */}
        {view !== 'home' && view !== 'doors' && view !== 'about' && view !== 'contact' && (
          <button 
            onClick={() => setView('doors')}
            className="absolute top-28 left-6 flex items-center gap-2 text-stone-500 hover:text-amber-500 transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft size={16} /> Back to Gallery
          </button>
        )}

        {renderContent()}
      </main>

      {/* AI Assistant Widget */}
      <AIAssistant />
    </div>
  );
}