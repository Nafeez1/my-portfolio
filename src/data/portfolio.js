// ─── Hero ────────────────────────────────────────────────────────────────────
export const hero = {
  name: "Mohamed Nafeez S",
  role: "Front End Developer",
  tagline:
    "I build fast, accessible, and visually compelling web experiences — from pixel-perfect UIs to AI-powered applications that solve real problems.",
  resumeUrl: "/resume.pdf",
};

// ─── About ───────────────────────────────────────────────────────────────────
export const about = {
  bio: "I'm a Computer Science undergraduate and Front End Developer with a passion for crafting premium digital experiences. I combine strong fundamentals in React, Python, and Java with hands-on project experience in AI/ML, accessibility tools, and safety-focused applications. I thrive at the intersection of design and engineering — writing clean code that looks great and performs even better.",
  objective:
    "Seeking a challenging role where I can apply my frontend expertise, problem-solving mindset, and passion for impactful technology to build products that matter.",
  highlights: [
    "React & JavaScript Specialist",
    "AI / Deep Learning Projects",
    "Accessibility-First Development",
    "Full-Stack Capable",
    "Data Analytics & Visualization",
    "Clean, Maintainable Code",
  ],
  stats: [
    { label: "Projects Built", value: "10+" },
    { label: "Certifications", value: "3+" },
    { label: "Awards Won", value: "2" },
  ],
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export const skills = {
  languages: {
    label: "Languages",
    icon: "💻",
    items: ["Java", "Python", "C", "JavaScript", "HTML5", "CSS3"],
  },
  frontend: {
    label: "Frontend",
    icon: "🎨",
    items: ["React.js", "Tailwind CSS", "Bootstrap", "Responsive Design", "DOM Manipulation"],
  },
  backend: {
    label: "Backend & DB",
    icon: "⚙️",
    items: ["Node.js", "MySQL", "MongoDB", "PostgreSQL", "Firebase"],
  },
  tools: {
    label: "Tools & Platforms",
    icon: "🛠️",
    items: ["Git", "GitHub", "VS Code", "Figma", "Power BI", "Excel", "Vercel"],
  },
  other: {
    label: "Other Skills",
    icon: "✨",
    items: ["Deep Learning", "TensorFlow", "Data Analytics", "Process Automation", "REST APIs"],
  },
};

// ─── Projects ────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "cervical-detection",
    title: "Cervical Cancer Detection",
    category: "AI / ML",
    description:
      "A deep learning model using Convolutional Neural Networks (CNN) for early-stage cervical cancer detection. Achieved high accuracy on medical image datasets with a clean React-based diagnostic UI.",
    tech: ["Python", "TensorFlow", "CNN", "Flask", "React", "PostgreSQL"],
    features: [
      "94%+ model accuracy on test data",
      "Real-time image upload & analysis",
      "Medical-grade result visualization",
      "REST API backend with Flask",
    ],
    image: "🧬",
    duration: "2023 – 2024",
    role: "Full Stack Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "assistive-reading",
    title: "Assistive Reading Tool",
    category: "Accessibility",
    description:
      "A web application designed for individuals with dyslexia. Provides adjustable fonts, color overlays, text-to-speech, and a distraction-free reading mode to improve comprehension and comfort.",
    tech: ["React", "Node.js", "Web Speech API", "Accessibility APIs", "CSS"],
    features: [
      "Dyslexia-friendly font rendering",
      "Customizable color overlays",
      "Text-to-speech integration",
      "Distraction-free reading mode",
    ],
    image: "📖",
    duration: "2023",
    role: "Lead Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "haven-path",
    title: "Haven Path",
    category: "Safety App",
    description:
      "A mobile-first web application for women's safety. Features real-time location sharing, emergency SOS alerts, safe route mapping, and community-based safety scoring.",
    tech: ["React", "Firebase", "Google Maps API", "Express.js", "Node.js"],
    features: [
      "Real-time location sharing",
      "One-tap SOS emergency alert",
      "Safe route recommendations",
      "Community safety scoring",
    ],
    image: "🗺️",
    duration: "2022 – 2023",
    role: "Product Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "ecommerce-science-fair",
    title: "E-Commerce Website",
    category: "Web App",
    description:
      "A fully functional e-commerce platform built for the Tamil Nadu State Science Fair. Won 1st Prize for demonstrating innovation in web technology with a complete shopping experience.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    features: [
      "Product catalog with search & filter",
      "Cart and checkout flow",
      "Admin dashboard",
      "1st Prize — TN State Science Fair",
    ],
    image: "🛒",
    duration: "2023",
    role: "Solo Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
];

// ─── Experience / Education Timeline ─────────────────────────────────────────
export const experience = [
  {
    id: "edu-btech",
    type: "education",
    title: "B.Tech — Computer Science & Engineering",
    org: "Sri Manakula Vinayagar Engineering College",
    period: "2023 – Present",
    location: "Puducherry, India",
    grade: "CGPA 6.57",
    description:
      "Pursuing a Bachelor of Technology in Computer Science & Engineering. Coursework covers data structures, algorithms, web development, AI/ML, and database systems.",
  },
  {
    id: "edu-hsc",
    type: "education",
    title: "HSC — Higher Secondary Certificate",
    org: "Al Hudha Matric Higher Secondary School",
    period: "2021 – 2023",
    location: "Trichy, Tamil Nadu, India",
    grade: "68.13%",
    description:
      "Science stream with Physics, Chemistry, Mathematics, and Computer Science. Developed strong analytical and problem-solving foundations.",
    subjects: [
      { name: "Physics", mark: "72%" },
      { name: "Chemistry", mark: "65%" },
      { name: "Mathematics", mark: "70%" },
      { name: "Computer Science", mark: "85%" },
      { name: "English", mark: "60%" },
    ],
  },
  {
    id: "edu-sslc",
    type: "education",
    title: "SSLC — Secondary School Leaving Certificate",
    org: "Al Hudha Matric Higher Secondary School",
    period: "2020 – 2021",
    location: "Trichy, Tamil Nadu, India",
    grade: "Completed",
    description:
      "Completed secondary education with a focus on Mathematics and Science subjects.",
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const certificates = [
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    year: "2023",
    score: "80% — Silver Badge",
    icon: "☕",
    color: "from-yellow-500/20 to-yellow-700/10",
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    year: "2023",
    score: "Completed",
    icon: "🐍",
    color: "from-blue-500/20 to-blue-700/10",
  },
  {
    title: "Data Analytics & Process Automation",
    issuer: "Cohort Program",
    year: "2023",
    score: "Completed",
    icon: "📊",
    color: "from-green-500/20 to-green-700/10",
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────
export const achievements = [
  {
    title: "1st Prize — Tamil Nadu State Science Fair",
    description:
      "Won first place for building a fully functional E-Commerce Website at the state-level science fair, recognized for innovation in web technology.",
    year: "2023",
    icon: "🏆",
  },
  {
    title: "NPTEL Java Silver Badge",
    description:
      "Scored 80% in NPTEL's Programming in Java course, earning the prestigious Silver Badge certification from IIT.",
    year: "2023",
    icon: "🥈",
  },
  {
    title: "AI Innovation Recognition",
    description:
      "Recognized for developing a high-accuracy cervical cancer detection model using deep learning, contributing to medical AI research.",
    year: "2024",
    icon: "🧠",
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  email: "nafeezdeveloper@gmail.com",
  phone: "6380225223",
  location: "Villupuram, Tamil Nadu, India",
  social: [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/Nafeez1",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com/in/nafeez-s-836636377",
    },
  ],
};

// ─── Chatbot ──────────────────────────────────────────────────────────────────
export const chatbotAnswers = {
  who: "Mohamed Nafeez S is a Front End Developer and B.Tech CSE student skilled in React, Python, Java, and AI/ML. He builds fast, accessible, and visually compelling web experiences.",
  skills:
    "Skills: Java, Python, C, JavaScript, HTML5, CSS3, React.js, Tailwind CSS, Node.js, MySQL, MongoDB, Firebase, Git, Power BI, TensorFlow, and more.",
  projects:
    "Key projects: Cervical Cancer Detection (CNN/AI), Assistive Reading Tool for Dyslexia, Haven Path (women's safety app), and an E-Commerce Website that won 1st Prize at TN State Science Fair.",
  experience:
    "Currently pursuing B.Tech CSE at Sri Manakula Vinayagar Engineering College (CGPA 6.57). HSC from Al Hudha Matric School (68.13%).",
  contact:
    "Email: nafeezdeveloper@gmail.com | Phone: 6380225223 | Location: Villupuram, Tamil Nadu | LinkedIn: /in/nafeez-s-836636377",
  education:
    "B.Tech CSE (2023–Present, CGPA 6.57) | HSC 68.13% | SSLC — Al Hudha Matric School, Trichy",
  certificates:
    "NPTEL Java (80%, Silver Badge), NPTEL Python for Data Science, Cohort Data Analytics & Process Automation.",
  achievements:
    "1st Prize at Tamil Nadu State Science Fair (E-Commerce Website) | NPTEL Java Silver Badge (80%) | AI Innovation Recognition for Cervical Cancer Detection.",
  default:
    "I can answer questions about Mohamed Nafeez's skills, projects, education, certifications, achievements, and contact info. What would you like to know?",
};
