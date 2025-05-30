import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  wordpress,
  angular,
  nestJS,
  postgres,
  scss,
  laravel,
  threejs,
  // Project images
  event_portal,
  pikdrive,
  hopimed,
  hello_hardware,
  hello_identity,
  secure_vault,
  bluewindow_todo,
  barber_shop,
  carrent,
  // Company icons
  hello_computing,
  cia,
  insam,
  freelance,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI/UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "angular",
    icon: angular,
  },
  {
    name: "nestJS",
    icon: nestJS,
  },
  {
    name: "postgres",
    icon: postgres,
  },
  {
    name: "scss",
    icon: scss,
  },
  {
    name: "wordpress",
    icon: wordpress,
  },
  {
    name: "laravel",
    icon: laravel,
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "Hello Computing",
    icon: hello_computing,
    iconBg: "#E6DEDD",
    date: "November 2023 - Present",
    points: [
      "Designed user-centric front-end interfaces using Angular and Figma to enhance UX for 1,000+ users.",
      "Designed and built back-end services with NestJS, ensuring robust and scalable server-side functionality.",
      "Utilized Docker for containerization, streamlining development, testing, and deployment processes.",
      "Collaborated with designers, developers and cross-functional teams to gather requirements, troubleshoot issues, create wireframes and interactive prototypes and deliver high-quality software solutions.",
      "Implemented best practices in coding, testing, and documentation to ensure maintainable and efficient code.",
      "Contributed to agile development processes, including sprint planning, daily stand-ups, and code reviews.",
      "Conducted usability tests, identifying pain points and improving user flows",
    ],
  },
  {
    title: "Junior Full Stack Developer",
    company_name: "CIA Consulting",
    icon: cia,
    iconBg: "#383E56",
    date: "June 2023 - November 2023",
    points: [
      "Developed and maintained web applications using React, creating dynamic and interactive user interfaces.",
      "Built server-side logic with Laravel, implementing efficient and secure back-end solutions.",
      "Utilized Next.js for server-side rendering and static site generation, optimizing performance and SEO.",
      "Collaborated with senior developers to design and implement features, troubleshoot issues, and improve application functionality.",
      "Participated in code reviews and contributed to team meetings, enhancing the development workflow and ensuring code quality.",
    ],
  },
  {
    title: "Web Developer Intern",
    company_name: "Estuary Academic and Strategic Institut (INSAM)",
    icon: insam,
    iconBg: "#E6DEDD",
    date: "2022 - 2023",
    points: [
      "Gained hands-on experience in web development during Bachelor's degree program.",
      "Assisted in developing and maintaining web applications.",
      "Learned and applied best practices in software development and team collaboration.",
    ],
  },
  {
    title: "Freelance Web Developer",
    company_name: "Self-employed",
    icon: freelance,
    iconBg: "#383E56",
    date: "2020 - Present",
    points: [
      "Developed and maintained websites and e-commerce platforms using WordPress, including custom theme development and plugin integration.",
      "Created responsive and user-friendly web applications using modern front-end technologies like React and Angular.",
      "Implemented back-end solutions using Laravel and Node.js, ensuring robust and scalable server-side functionality.",
      "Collaborated with clients to gather requirements, provide regular updates, and deliver high-quality web solutions that meet their specific needs.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Jospen's expertise in both front-end and back-end technologies significantly improved our web application's performance and user experience. His work with Angular and NestJS was particularly impressive.",
    name: "Sarah Laure",
    designation: "Project Manager",
    company: "TechInnovate Solutions",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    testimonial:
      "We were amazed by Jospen's ability to seamlessly integrate React and Laravel in our e-commerce platform. His attention to detail and problem-solving skills are truly commendable.",
    name: "Peter Boka",
    designation: "CTO",
    company: "WebCommerce Inc.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Jospen's proficiency in WordPress development and custom theme creation transformed our company website. His work significantly improved our online presence and user engagement.",
    name: "Lisa Chantal",
    designation: "Marketing Director",
    company: "Global Reach Enterprises",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
];

const projects = [
  {
    name: "Pikdrive",
    description:
      "Modern ride-sharing platform connecting drivers and passengers with real-time tracking, secure payments, and a responsive UI. Supports PWA capabilities for mobile installation.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "shadcn/ui",
        color: "pink-text-gradient",
      },
    ],
    image: pikdrive,
    source_code_link: "https://github.com/JospenWolongwo/pickdrive",
    demo_link: "https://pikdrive.com",
  },
  {
    name: "Hopimed",
    description:
      "Healthcare availability app that helps users find available doctors, pharmacies, and hospitals in their vicinity with real-time updates and emergency service status.",
    tags: [
      {
        name: "Angular 17",
        color: "blue-text-gradient",
      },
      {
        name: "NgRx",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      },
    ],
    image: hopimed,
    source_code_link: "https://github.com/JospenWolongwo/hopimed",
    demo_link: "https://hopimed.netlify.app",
  },
  {
    name: "Hello Hardware",
    description:
      "Full-stack hardware management system with customer-facing interface and admin dashboard. Built using NX monorepo architecture with Angular frontends and NestJS backend.",
    tags: [
      {
        name: "Angular 17+",
        color: "blue-text-gradient",
      },
      {
        name: "NestJS",
        color: "green-text-gradient",
      },
      {
        name: "NX Monorepo",
        color: "pink-text-gradient",
      },
    ],
    image: hello_hardware,
    source_code_link: "https://github.com/JospenWolongwo/hello-hardware",
  },
  {
    name: "Hello Identity",
    description:
      "Comprehensive authentication service with secure user authentication, identity management, and multi-client support. Features include OAuth integration and token management.",
    tags: [
      {
        name: "NestJS",
        color: "blue-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "green-text-gradient",
      },
      {
        name: "JWT/OAuth",
        color: "pink-text-gradient",
      },
    ],
    image: hello_identity,
    source_code_link: "https://github.com/JospenWolongwo/hello-identity",
  },
  {
    name: "SecureVault Military",
    description:
      "Secure document storage and communication platform for military personnel with end-to-end encryption, role-based access control, and audit logging.",
    tags: [
      {
        name: "Angular 17+",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "Angular Material",
        color: "pink-text-gradient",
      },
    ],
    image: secure_vault,
    source_code_link: "https://github.com/JospenWolongwo/secure-vault-military",
    demo_link: "https://secure-vault-military.netlify.app/dashboard",
  },
  {
    name: "Event Portal",
    description:
      "A comprehensive event management platform for creating, discovering, and registering for events with secure payment processing. Features include event discovery, real-time updates, and an admin dashboard.",
    tags: [
      {
        name: "Next.js 14",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "pink-text-gradient",
      },
    ],
    image: event_portal,
    source_code_link: "https://github.com/JospenWolongwo/event-portal",
    demo_link: "https://event-planning-portal.vercel.app",
  },
  {
    name: "BlueWindow Todo",
    description:
      "Full-stack todo application with authentication, task prioritization, and responsive UI. Built with NestJS, TypeORM, PostgreSQL, and Angular with containerized deployment.",
    tags: [
      {
        name: "NestJS",
        color: "blue-text-gradient",
      },
      {
        name: "Angular",
        color: "green-text-gradient",
      },
      {
        name: "Docker",
        color: "pink-text-gradient",
      },
    ],
    image: bluewindow_todo,
    source_code_link:
      "https://github.com/JospenWolongwo/bluewindow-todo-fullstack",
    demo_link: "https://bluewindow-todo-fullstack-production.up.railway.app",
  },
  {
    name: "Barber Shop Website",
    description:
      "Modern, responsive barber shop website with service pricing, booking form, gallery, and location information. Built with React and custom CSS styling.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: barber_shop,
    source_code_link: "https://github.com/JospenWolongwo/barber-shop-website",
    demo_link: "https://jospenwolongwo.github.io/barber-shop-website",
  },
  {
    name: "Blood Donate",
    description:
      "Web-based platform that allows users to search, and book appointments with blood donors, providing a convenient and efficient solution for blood donation barriers and shortages thus saving more lifes.",
    tags: [
      {
        name: "html/php/jquery",
        color: "blue-text-gradient",
      },
      {
        name: "mysql",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/JospenWolongwo/donatetheblood",
  },
];

export { services, technologies, experiences, testimonials, projects };
