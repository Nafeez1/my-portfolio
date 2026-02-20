/**
 * Portfolio content — MOHAMED NAFEEZ S (from resume)
 */

export const hero = {
  name: "MOHAMED NAFEEZ S",
  role: "Front End Developer",
  tagline: "Building accessible web experiences with React, Java, Python & modern tech.",
};

export const about = {
  bio: "B.Tech student at Sri Manakula Vinayagar Engineering College, Puducherry. Front End Developer with experience in deep learning projects (CNNs, MobileNetV2, GANs), assistive tools for dyslexia, and safety & navigation apps. Strong in Java, Python, JavaScript, and data analytics.",
  highlights: ["Java", "Python", "JavaScript", "React", "Deep Learning", "Data Analytics"],
  listItems: [
    "Java, Python & C",
    "JavaScript, HTML & CSS",
    "React & Front End",
    "MySQL & MongoDB",
    "Power BI & Excel",
    "Deep Learning & CNNs",
    "Accessibility & UX",
  ],
};

// Resume: Programming Languages + Technologies & Tools
export const skills = {
  programming: ["Java", "Python", "C", "JavaScript", "HTML & CSS"],
  technologies: ["MySQL", "MongoDB", "Power BI", "Excel"],
  frontend: ["JavaScript", "HTML & CSS", "React"],
  tools: ["Git", "Power BI", "Excel"],
};

export const projects = [
  {
    id: 1,
    title: "Cervical Cancer Detection using Deep Learning",
    duration: "Aug – Oct 2025",
    role: "Front End Developer",
    description: "Developed a deep learning-based cervical cancer detection system using CNNs, MobileNetV2, and GANs for multiclass classification and data augmentation. Integrated severity scoring, segmentation (U-Net), and Grad-CAM for explainable predictions.",
    tech: ["Python", "Deep Learning", "CNN", "MobileNetV2", "U-Net"],
    image: "/placeholder-project-1.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Assistive Reading Tool for Dyslexia",
    duration: "Oct – Nov 2025",
    role: "Front End Developer",
    description: "Developed a user-friendly tool to aid dyslexic individuals by customizing font styles, spacing, and text-to-speech support, enhancing readability and accessibility.",
    tech: ["JavaScript", "Accessibility", "Front End"],
    image: "/placeholder-project-2.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Haven Path",
    duration: "Jan – Apr 2025",
    role: "Front End Developer",
    description: "Developed a safety and navigation application that provides secure travel routes by integrating real-time location tracking, hazard alerts, and safe-zone recommendations.",
    tech: ["React", "Maps", "Front End"],
    image: "/placeholder-project-3.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const experience = [
  {
    id: 1,
    type: "education",
    title: "B.Tech",
    org: "Sri Manakula Vinayagar Engineering College",
    location: "Puducherry, India",
    period: "09/2023 – Present",
    description: "Pursuing Bachelor of Technology in Engineering. Specializing in software development, deep learning (CNNs, MobileNetV2, GANs), web technologies, and data analytics. Active in project development and technical certifications.",
    grade: "6.57 CGPA",
    gradeType: "cgpa",
    percentile: "Percentile: 6.57 CGPA"
  },
  {
    id: 2,
    type: "education",
    title: "HSC (Higher Secondary Certificate)",
    org: "Al Hudha Matric Higher Secondary School",
    location: "Trichy, India",
    period: "07/2022 – 05/2023",
    description: "Completed Higher Secondary Certificate with focus on Science stream. Strong performance in Mathematics, Physics, Chemistry, and Computer Science. Built solid foundation for engineering studies.",
    grade: "68.13%",
    gradeType: "percentage",
    percentile: "Percentage: 68.13%",
    subjects: [
      { name: "Mathematics", mark: "70%" },
      { name: "Physics", mark: "68%" },
      { name: "Chemistry", mark: "66%" },
      { name: "Computer Science", mark: "72%" },
    ]
  },
  {
    id: 3,
    type: "education",
    title: "SSLC (Secondary School Leaving Certificate)",
    org: "Aditya Vivekananda Matric Higher Secondary School",
    location: "Villupuram, India",
    period: "09/2020 – 04/2021",
    description: "Completed Secondary School Leaving Certificate with strong academic performance across all subjects. Developed foundational knowledge in Mathematics, Science, and English. Early interest in technology and programming began during this period.",
    grade: "Passed",
    gradeType: "pass",
  },
];

export const certificates = [
  "Programming in Java — NPTEL (80%, Silver Badge)",
  "Cohort Data Analytics Process Automation — Virtual Internship",
  "Python for Data Science — NPTEL",
];

export const achievements = [
  "NPTEL Programming in Java: Scored 80% and earned Silver Badge",
  "Tamil Nadu Science Fair: Won 1st prize for E-Commerce Website",
  "Completed multiple NPTEL certifications in programming and data science",
  "Developed innovative projects in deep learning and accessibility",
];

export const contact = {
  email: "nafeezdeveloper@gmail.com",
  phone: "6380225223",
  location: "Villupuram, Tamil Nadu",
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/nafeez-s-836636377", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com", icon: "github" },
    { name: "LeetCode", url: "https://leetcode.com", icon: "code" },
  ],
};

export const resumeUrl = "/resume.pdf";
