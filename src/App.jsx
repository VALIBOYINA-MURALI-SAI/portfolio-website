import { useEffect, useState } from 'react';
import profileImage from '../assets/img/profile.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub Projects', href: '#github-projects' },
  { label: 'References', href: '#references' },
  { label: 'Contact', href: '#contact' },
];

const experience = [
  {
    id: 1,
    company: 'Nokia',
    role: 'Student Intern - Generative AI',
    period: '01/2025 – Present',
    achievements: [
      'Built a hybrid RAG chatbot combining semantic and keyword search, improving retrieval precision by ~35% over single-method baseline.',
      'Implemented HNSW-based vector search, reducing query latency by ~60% compared to flat search.',
      'Designed agent-based workflows using LangChain to enable dynamic tool usage and multi-step reasoning.',
    ],
  },
  {
    id: 2,
    company: 'Samsung PRISM',
    role: 'Research Intern',
    period: '12/2023 – 05/2024',
    achievements: [
      'Developed a web crawling pipeline to collect structured e-commerce data for LLM fine-tuning.',
      'Improved prompt generation relevance by ~22% using curated domain-specific datasets.',
      'Contributed to LLaMA-based model fine-tuning and evaluation workflow.',
    ],
  },
];

const skillCategories = {
  'AI / GenAI': ['LLMs', 'RAG', 'LangChain', 'PyTorch', 'TensorFlow'],
  'Data': ['NumPy', 'Pandas', 'Matplotlib', 'Plotly', 'scikit-learn', 'SQL'],
  'Tools': ['Git', 'Flask', 'Streamlit', 'Docker', 'Hugging Face Hub', 'Jenkins', 'LaTeX'],
  'CV / NLP': ['OpenCV', 'MediaPipe', 'Hugging Face Transformers', 'spaCy', 'NLTK', 'Whisper', 'TF-IDF'],
  'Languages': ['Python', 'C++', 'C'],
};

const projects = [
  {
    id: 1,
    title: 'HireSense AI',
    description: 'AI-powered resume analyzer using TF-IDF and cosine similarity to match resumes with job descriptions. Uses spaCy for entity extraction (skills, experience) to improve ATS scoring.',
    tech: ['Python', 'Streamlit', 'spaCy', 'scikit-learn', 'SQLite3'],
    highlight: 'Deployed using Streamlit Cloud with sub-2 second response time.',
    link: 'https://hire-sense-ai-srm.streamlit.app/',
  },
  {
    id: 2,
    title: 'Gesture Genius',
    description: 'Real-time hand gesture recognition system using 21-point hand landmarks for gesture-based mouse control and keyboard actions.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'autopy'],
    highlight: 'Achieved ~94% accuracy with <30ms latency using distance-based gesture classification.',
  },
  {
    id: 3,
    title: 'AI Meeting Summarizer',
    description: 'End-to-end pipeline for audio transcription, summarization, and structured output generation.',
    tech: ['Python', 'Flask', 'Whisper', 'HuggingFace Transformers', 'NLTK'],
    highlight: 'Reduced manual documentation time by ~70%.',
  },
];

const githubRepoProjects = [
  {
    repoName: 'Hiresense_AI',
    title: 'HireSense AI',
    subject: 'Artificial Intelligence / Resume Analytics',
    semester: 'Semester 7',
    description: 'Smart resume analyzer built from my GitHub repository. It aligns resume content with job descriptions for better match scoring.',
    uniqueness: 'Combines skill extraction, job-fit ranking, and resume quality evaluation to surface top candidate matches.',
    highlights: ['AI-based resume and job-matching pipeline', 'Dynamic GitHub project with C and AI metadata', 'Built for SRM CSE AI & ML coursework'],
  },
  {
    repoName: 'AI_Meeting_Summarizer',
    title: 'AI Meeting Summarizer',
    subject: 'Natural Language Processing',
    semester: 'Semester 7',
    description: 'Summarizes meeting audio into crisp notes using Whisper and transformer summarization workflows.',
    uniqueness: 'Transforms spoken meeting content into structured summaries and action items for easy review.',
    highlights: ['Audio transcription + summarization', 'Reduces manual note-taking effort by 70%', 'Designed for AI/ML project coursework'],
  },
  {
    repoName: 'gesture_genius',
    title: 'Gesture Genius',
    subject: 'Computer Vision',
    semester: 'Semester 2',
    description: 'Real-time hand gesture recognition system that maps hand landmarks to mouse and keyboard actions.',
    uniqueness: 'Uses MediaPipe landmarks for low-latency gesture control and interactive desktop automation.',
    highlights: ['Real-time gesture action control', 'High accuracy with low inference latency', 'Applied computer vision for practical UI control'],
  },
  {
    repoName: 'IMAGE-ENHANCEMENT',
    title: 'Image Enhancement',
    subject: 'Digital Image Processing',
    semester: 'Semester 5',
    description: 'Image enhancement pipeline that improves contrast and visual quality using Python processing techniques.',
    uniqueness: 'Combines enhancement filters and algorithmic tuning for sharper, clearer output.',
    highlights: ['Image clarity improvements', 'Python-based processing', 'Ideal for AI-Assisted imaging coursework'],
  },
  {
    repoName: 'Medical-Chatbot',
    title: 'Medical Chatbot',
    subject: 'Healthcare AI / NLP',
    semester: 'Semester 7',
    description: 'AI chatbot for medical guidance and question answering built with natural language understanding.',
    uniqueness: 'Designed to support medical dialogue with a knowledge-aware conversational flow.',
    highlights: ['AI chatbot for medical assistance', 'NLP-driven response generation', 'Real-world healthcare application'],
  },
  {
    repoName: 'CAB-BOOKING-SYSTEM',
    title: 'Cab Booking System',
    subject: 'Software Engineering / OOP',
    semester: 'Semester 4',
    description: 'Java GUI application for booking cabs, managing user requests, and tracking ride status.',
    uniqueness: 'Built with object-oriented design and a clean booking workflow for user convenience.',
    highlights: ['Java GUI project', 'Service booking and ride flow', 'Suitable for OOP and software design subjects'],
  },
  {
    repoName: 'Student_Database_Management_System',
    title: 'Student Database Management System',
    subject: 'Database Systems',
    semester: 'Semester 3',
    description: 'C++ student record management system with CRUD operations and reporting.',
    uniqueness: 'Efficient record handling for academic database management and student analytics.',
    highlights: ['C++ database management', 'CRUD interface for student records', 'Fits database and data structures coursework'],
  },
  {
    repoName: 'Old-Age-Home-Manager',
    title: 'Old Age Home Manager',
    subject: 'Web Programming',
    semester: 'Semester 5',
    description: 'Web portal for managing elderly care workflows using PHP and intuitive forms.',
    uniqueness: 'Provides a structured system for scheduling, tracking, and assisting senior care.',
    highlights: ['PHP web application', 'Care management features', 'Designed for web dev and project work'],
  },
  {
    repoName: 'E-Commerce_Web_Scraper',
    title: 'E-Commerce Web Scraper',
    subject: 'Data Mining',
    semester: 'Semester 2',
    description: 'Python scraper for collecting e-commerce product and price information across multiple sites.',
    uniqueness: 'Automates dataset collection for product analysis and competitive price comparison.',
    highlights: ['Web scraping for e-commerce analytics', 'Python automation pipeline', 'Great fit for data mining practicum'],
  },
  {
    repoName: 'building-and-training-a-neural-network-using-the-Keras-library',
    title: 'Neural Network with Keras',
    subject: 'Deep Learning',
    semester: 'Semester 5',
    description: 'Keras notebook that builds and trains a neural network to solve classification tasks.',
    uniqueness: 'Hands-on deep learning experimentation with a clear training and evaluation workflow.',
    highlights: ['Keras-based neural network', 'Hands-on DL model training', 'Designed for AI/ML core subjects'],
  },
];

const [githubRepos, setGithubRepos] = useState([]);
const [repoError, setRepoError] = useState(false);

useEffect(() => {
  fetch('https://api.github.com/users/VALIBOYINA-MURALI-SAI/repos?per_page=100')
    .then((res) => {
      if (!res.ok) throw new Error('GitHub API rate or network issue');
      return res.json();
    })
    .then((data) => setGithubRepos(data))
    .catch(() => setRepoError(true));
}, []);

const achievements = [
  {
    title: 'Winner – SRM Hackathon 8.0',
    description: 'Built AI-based medical assistant with 98% accuracy fall detection',
  },
  {
    title: 'IEEE Conference Best Paper Award',
    description: 'RAG-X: Adaptive Graph Traversal for Enhanced RAG Systems',
  },
  {
    title: 'Ranked 4th in India - INTSO Mathematical Olympiad',
    description: 'Top tier mathematics competition',
  },
  {
    title: 'Academic Excellence',
    items: ['98.2% (Class XII)', '97.16% (Class X)'],
  },
];

const publication = {
  title: 'RAG-X: Density-Adaptive Path Sampling for Enhanced Knowledge Graph-Based Retrieval Augmented Generation',
  venue: 'IEEE Conference Paper',
  link: 'https://ieeexplore.ieee.org/document/11437293',
  highlights: [
    'Proposed adaptive graph traversal to improve factual accuracy in RAG systems.',
    'Achieved 92.4% accuracy vs 65.8% baseline (+26.6%).',
    'Improved throughput by 4.9x using optimized retrieval + reranking.',
  ],
};

const certifications = [
  { name: 'AWS AI-ML & Google AI-ML', issuer: 'EduSkills', date: 'Mar 2025' },
  { name: 'Machine Learning in Urban Studies', issuer: 'ISRO IIRS' },
  { name: 'Intro to ML', issuer: 'IIT Madras (NPTEL)' },
  { name: 'Data Mining Gold - Top 1%', issuer: 'IIT Kharagpur (NPTEL)' },
  { name: 'NEP Saarthi Certificate', issuer: 'SRM Institute' },
];

const credlyBadges = [
  { name: 'Alteryx Designer Core Certification', issuer: 'Alteryx', expiry: 'Jan 31, 2027', image: 'https://images.credly.com/images/14744318-8d6a-49c3-971d-6a4a0f524925/Certification_Designer_Core.png' },
  { name: 'Fortinet Certified Associate Cybersecurity', issuer: 'Fortinet', expiry: 'Dec 24, 2026', image: 'https://images.credly.com/images/20082fc1-94af-4773-9df0-28856b566748/image.png' },
  { name: 'Fortinet FortiGate 7.4 Operator', issuer: 'Fortinet', issued: 'Dec 24, 2024', image: 'https://images.credly.com/images/4b6db74c-f2da-4958-ad21-27288f2dd7f3/image.png' },
  { name: 'Alteryx Foundational Micro-Credential', issuer: 'Alteryx', expiry: 'Dec 10, 2026', image: 'https://images.credly.com/images/1ec9c0f8-60f4-4c96-8fc8-2442b9022a12/image.png' },
  { name: 'AWS Academy Graduate - Cloud Operations', issuer: 'Amazon Web Services', issued: 'Sep 18, 2024', image: 'https://images.credly.com/images/07e7ba52-aea4-431f-ba2d-a4113efd1d5a/blob' },
  { name: 'AWS Academy Graduate - Cloud Foundations', issuer: 'Amazon Web Services', issued: 'Jul 9, 2023', image: 'https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob' },
  { name: 'AWS Academy Graduate - Machine Learning Foundations', issuer: 'Amazon Web Services', issued: 'Jul 9, 2023', image: 'https://images.credly.com/images/727c2754-d727-4e27-a1aa-3de2425ce239/blob' },
  { name: 'IBM Applied AI Professional Certificate (V3)', issuer: 'Coursera', issued: 'Jul 6, 2023', image: 'https://images.credly.com/images/4cc305d5-5f90-427d-b42e-0a165092419a/blob' },
  { name: 'Chatbot Building Essentials', issuer: 'Coursera', issued: 'Jul 2, 2023', image: 'https://images.credly.com/images/6a583c30-8234-43ae-8b75-8f7b41933d6e/image.png' },
  { name: 'Python Project for AI and Application Development', issuer: 'Coursera', issued: 'Jun 22, 2023', image: 'https://images.credly.com/images/33ed2910-9750-4613-aa2a-590e845c6edb/image.png' },
  { name: 'Python for Data Science and AI', issuer: 'Coursera', issued: 'Apr 28, 2023', image: 'https://images.credly.com/images/40bee502-a5b3-4365-90e7-57eed5067594/image.png' },
];

const achievementDocs = [
  { name: 'AARUUSH 2023', file: '/Achievements/AARUUSH_23.pdf' },
  { name: 'IEEE Conference Best Paper', file: '/Achievements/IEEE Conference Best Paper Award .pdf' },
  { name: 'Hackathon 7.0', file: '/Achievements/Hackathon 7.0.pdf' },
  { name: 'OODP Hack 2023', file: '/Achievements/OODP HACK_23 .pdf' },
  { name: 'IE(I) Award', file: '/Achievements/IE(I).pdf' },
];

const semesterSummaries = [
  { semester: 'Semester 1', creditsRegistered: 22, creditsEarned: 22, sgpa: 9.55 },
  { semester: 'Semester 2', creditsRegistered: 21, creditsEarned: 21, sgpa: 9.90 },
  { semester: 'Semester 3', creditsRegistered: 23, creditsEarned: 23, sgpa: 10.00 },
  { semester: 'Semester 4', creditsRegistered: 23, creditsEarned: 23, sgpa: 9.55 },
  { semester: 'Semester 5', creditsRegistered: 23, creditsEarned: 23, sgpa: 9.86 },
  { semester: 'Semester 6', creditsRegistered: 20, creditsEarned: 20, sgpa: 9.85 },
  { semester: 'Semester 7', creditsRegistered: 18, creditsEarned: 18, sgpa: 9.39 },
];

const internshipDocs = [
  { name: 'Samsung SRM Internship', file: '/Internship/223FP37SRM38172.pdf' },
  { name: 'AI-ML Virtual Internship', file: '/Internship/AI - ML virtual internship -1.pdf' },
  { name: 'Alteryx Sparked Training', file: '/Internship/Alteryx Sparked.pdf' },
  { name: 'Google AI-ML Virtual Internship', file: '/Internship/Google AI ML virtual Internship.pdf' },
  { name: 'NullClass Training', file: '/Internship/NullClass--Training-OL.pdf' },
  { name: 'Internship Offer Letter (Signed)', file: '/Internship/Valiboyina-Murali-Sai(Signed Internship offer letter Document).pdf' },
];

const languages = ['English', 'Telugu', 'Hindi'];

const externalLinks = [
  { name: 'GitHub', url: 'https://github.com/VALIBOYINA-MURALI-SAI', icon: '📁' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/valiboyina-murali-sai-ba5689250/', icon: '🔗' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/mv8039/', icon: '💻' },
];

function App() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [repoError, setRepoError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/VALIBOYINA-MURALI-SAI/repos?per_page=100')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API rate or network issue');
        return res.json();
      })
      .then((data) => setGithubRepos(data))
      .catch(() => setRepoError(true));
  }, []);

  const githubProjectCards = githubRepoProjects.map((project) => {
    const repo = githubRepos.find((repoItem) => repoItem.name === project.repoName) || {};
    return {
      ...project,
      githubUrl: repo.html_url || `https://github.com/VALIBOYINA-MURALI-SAI/${project.repoName}`,
      repoDescription: repo.description || project.description,
      stars: repo.stargazers_count ?? 0,
    };
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Murali Sai Valiboyina</div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* HOME SECTION */}
        <section id="home" className="hero-panel">
          <div className="hero-copy glass-card">
            <span className="eyebrow">Generative AI | RAG Systems | Full Stack</span>
            <h1>Hi, I'm <strong>Murali Sai</strong></h1>
            <p>AI & ML engineer building hybrid RAG systems, ML pipelines, and intelligent applications. Currently exploring advanced retrieval techniques at Nokia. This portfolio blends polished skeuomorphic design with modern tech stack.</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">View My Work</a>
              <a href="/VALIBOYINA_MURALI_SAI.pdf" className="button button-secondary" target="_blank" rel="noreferrer noopener">Download Resume</a>
            </div>
          </div>
          <div className="hero-visual glass-card hero-image-card">
            <img src={profileImage} alt="Murali Sai Valiboyina" />
            <div className="profile-badge">AI Engineer</div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section-grid">
          <div className="glass-card feature-card accent-blue">
            <h2>About Me</h2>
            <p>B.Tech graduate in CSE (AI & ML) from SRM Institute of Science and Technology. I specialize in Generative AI, RAG systems, and building intelligent applications. Currently working on hybrid search mechanisms and LLM-based solutions at Nokia.</p>
          </div>
          <div className="glass-card feature-card accent-gold">
            <h2>Education</h2>
            <p><strong>SRM Institute of Science and Technology</strong></p>
            <p>B.Tech in CSE (AI & ML)</p>
            <p>10th: 97.16% | 12th: 98.2%</p>
            <p><strong>Overall CGPA: 9.74 / 10</strong></p>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Total Credits Earned: <strong>150</strong><br />
              Medium of Instruction: <strong>English</strong><br />
              Course(s) Withdrawn: <strong>NIL</strong>
            </p>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section-panel">
          <div className="glass-card">
            <h2>Experience</h2>
            <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
              {experience.map((exp) => (
                <div key={exp.id} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(104, 191, 255, 0.06)', border: '1px solid rgba(104, 191, 255, 0.2)' }}>
                  <h4 style={{ color: 'var(--text)', margin: '0 0 0.25rem 0' }}>{exp.company}</h4>
                  <p style={{ color: 'var(--blue)', margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>{exp.role}</p>
                  <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{exp.period}</p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section-panel">
          <div className="glass-card">
            <h2>Projects</h2>
            <p style={{ color: 'var(--text-muted)' }}>Explore projects combining AI, web technologies, and real-world impact.</p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map((project) => (
                <div key={project.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ color: 'var(--text)', marginTop: 0 }}>{project.title}</h4>
                  <p style={{ color: 'var(--text-muted)', flex: 1, marginBottom: '1rem' }}>{project.description}</p>
                  <p style={{ color: 'var(--blue)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <strong>{project.highlight}</strong>
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {project.tech.map((tech) => (
                      <span key={tech} className="skill-badge" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="button button-secondary" style={{ marginTop: 'auto' }}>
                      Visit Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GITHUB PROJECTS SECTION */}
        <section id="github-projects" className="section-panel">
          <div className="glass-card">
            <h2>GitHub Project Portfolio</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Live project summaries pulled from my GitHub profile at <a href="https://github.com/VALIBOYINA-MURALI-SAI" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>github.com/VALIBOYINA-MURALI-SAI</a>.
            </p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {repoError && (
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.15)', background: 'rgba(254, 242, 242, 0.8)' }}>
                  <p style={{ color: '#991b1b', margin: 0 }}>Unable to fetch GitHub repos right now. Showing project metadata from the portfolio instead.</p>
                </div>
              )}
              {githubProjectCards.map((project) => (
                <div key={project.repoName} className="repo-card glass-card">
                  <div className="repo-tags">
                    <span className="repo-chip">{project.subject}</span>
                    <span className="repo-chip">{project.semester}</span>
                  </div>
                  <h4>{project.title}</h4>
                  <p className="repo-description">{project.repoDescription}</p>
                  <p className="repo-unique"><strong>Uniqueness:</strong> {project.uniqueness}</p>
                  <ul className="repo-highlights">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="repo-footer">
                    <span className="repo-chip">Stars: {project.stars}</span>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="button button-secondary" style={{ marginTop: 'auto' }}>
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="section-panel">
          <div className="glass-card">
            <h2>Skills</h2>
            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category}>
                  <h4 style={{ color: 'var(--gold)', marginTop: 0 }}>{category}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {skills.map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PUBLICATION SECTION */}
        <section className="section-panel">
          <div className="glass-card">
            <h2>Publication</h2>
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255, 209, 102, 0.06)', border: '1px solid rgba(255, 209, 102, 0.2)', borderRadius: '16px' }}>
              <h4 style={{ color: 'var(--gold)', marginTop: 0, marginBottom: '0.5rem' }}>
                {publication.title}
              </h4>
              <p style={{ color: 'var(--blue)', margin: '0 0 0.75rem 0', fontSize: '0.9rem' }}>
                <strong>{publication.venue}</strong>
              </p>
              <p style={{ margin: '0 0 1rem 0' }}>
                <a href={publication.link} target="_blank" rel="noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                  View IEEE Publication
                </a>
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {publication.highlights.map((highlight, idx) => (
                  <li key={idx} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section className="section-panel">
          <div className="glass-card">
            <h2>Achievements & Awards</h2>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {achievements.map((achievement, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--gold)', marginTop: 0 }}>{achievement.title}</h4>
                  {achievement.description && <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>{achievement.description}</p>}
                  {achievement.items && (
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                      {achievement.items.map((item, i) => (
                        <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            {/* LeetCode Badge */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <img src="/Achievements/Leet code 50 day coding contest.png" alt="LeetCode 50 Day Badge" style={{ maxWidth: '280px', height: 'auto', borderRadius: '12px' }} />
            </div>
          </div>
        </section>

        {/* BADGES SECTION */}
        <section className="section-panel">
          <div className="glass-card">
            <h2>Professional Badges</h2>
            <p style={{ color: 'var(--text-muted)' }}>Certifications and badges from Credly and other platforms.</p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {credlyBadges.map((badge, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                  <img src={badge.image} alt={badge.name} style={{ width: '80px', height: '80px', marginBottom: '0.5rem' }} />
                  <h5 style={{ color: 'var(--text)', margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{badge.name}</h5>
                  <p style={{ color: 'var(--blue)', margin: '0', fontSize: '0.8rem' }}>{badge.issuer}</p>
                  {badge.issued && <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.75rem' }}>Issued: {badge.issued}</p>}
                  {badge.expiry && <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.75rem' }}>Expires: {badge.expiry}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REFERENCES & DOCUMENTS SECTION */}
        <section id="references" className="section-panel">
          <div className="glass-card">
            <h2>References & Documents</h2>
            
            {/* Achievements Documents */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--blue)', marginBottom: '1rem' }}>Achievement Certificates</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {achievementDocs.map((doc, idx) => (
                  <a key={idx} href={doc.file} target="_blank" rel="noreferrer" className="button button-secondary" style={{ textAlign: 'center', padding: '0.85rem', fontSize: '0.9rem' }}>
                    📜 {doc.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Semester Summaries */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--blue)', marginBottom: '1rem' }}>Semester Summaries</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, marginBottom: '1rem' }}>Summary of credits and SGPA values from the semester grade cards.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {semesterSummaries.map((summary, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(104, 191, 255, 0.05)', border: '1px solid rgba(104, 191, 255, 0.16)' }}>
                    <h4 style={{ color: 'var(--gold)', margin: '0 0 0.5rem 0' }}>{summary.semester}</h4>
                    <p style={{ color: 'var(--text)', margin: '0.25rem 0' }}>SGPA: <strong>{summary.sgpa.toFixed(2)}</strong></p>
                    <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0' }}>{summary.creditsRegistered} / {summary.creditsEarned} credits</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Credits Earned: <strong>150</strong></p>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Medium of Instruction: <strong>English</strong></p>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Course(s) Withdrawn: <strong>NIL</strong></p>
              </div>
            </div>

            {/* Certifications */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Certifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {certifications.map((cert, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1rem', background: 'rgba(255, 209, 102, 0.05)', border: '1px solid rgba(255, 209, 102, 0.15)' }}>
                    <p style={{ color: 'var(--text)', margin: '0 0 0.25rem 0', fontWeight: '600' }}>{cert.name}</p>
                    <p style={{ color: 'var(--blue)', margin: '0', fontSize: '0.9rem' }}>{cert.issuer}</p>
                    {cert.date && <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>{cert.date}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXTERNAL LINKS SECTION */}
        <section className="section-panel">
          <div className="glass-card">
            <h2>Connect & Explore</h2>
            <p style={{ color: 'var(--text-muted)' }}>Visit my profiles and repositories across various platforms.</p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {externalLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', transition: 'all 180ms ease' }}>
                  <span style={{ fontSize: '2rem' }}>{link.icon}</span>
                  <span style={{ color: 'var(--text)', fontWeight: '600' }}>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section-panel contact-panel">
          <div className="glass-card contact-card">
            <h2>Let's Connect</h2>
            <p>Exploring opportunities in Generative AI, RAG systems, and ML engineering. Always open to collaborations and discussions.</p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--text)' }}>Email</h4>
                <p>
                  <a href="mailto:muralisaivaliboyina@gmail.com" style={{ color: 'var(--blue)' }}>muralisaivaliboyina@gmail.com</a>
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text)' }}>Phone</h4>
                <p style={{ color: 'var(--text-muted)' }}>+91 9347110168</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-panel">
        <div>© 2026 Murali Sai Valiboyina</div>
        <div>AI Engineer | RAG Systems | Full Stack</div>
      </footer>
    </div>
  );
}

export default App;
