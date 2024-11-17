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
    nestJS,
    angular,
    scss,
    postgres,
    hello_computing,
    cia,
    insam,
    freelance,
    laravel,
    carrent,
    jobit,
    tripguide,
    threejs,
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
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Graphic Designer",
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
      icon: laravel
    }
  ];
  
  const experiences = [
    {
      title: "Software Engineer",
      company_name: "Hello Computing",
      icon: hello_computing, // You'll need to import this icon
      iconBg: "#E6DEDD", // You can adjust this color as needed
      date: "November 2023 - Present",
      points: [
        "DDesigned user-centric front-end interfaces using Angular and Figma to enhance UX for 1,000+ users.",
        "Designed and built back-end services with NestJS, ensuring robust and scalable server-side functionality.",
        "Utilized Docker for containerization, streamlining development, testing, and deployment processes.",
        "Collaborated with designers, developers and cross-functional teams to gather requirements, troubleshoot issues,create wireframes and interactive prototypes and deliver high-quality software solutions.",
        "Implemented best practices in coding, testing, and documentation to ensure maintainable and efficient code.",
        "Contributed to agile development processes, including sprint planning, daily stand-ups, and code reviews.",
        "Conducted usability tests, identifying pain points and improving user flows",
      ],
    },
    {
      title: "Junior Full Stack Developer",
      company_name: "CIA Consulting",
      icon: cia, // You'll need to import this icon
      iconBg: "#383E56", // You can adjust this color as needed
      date: "June 2023 - November 2023",
      points: [
        "Developed and maintained web applications using React, creating dynamic and interactive user interfaces.",
        "Built server-side logic with Laravel, implementing efficient and secure back-end solutions.",
        "Utilized Next.js for server-side rendering and static site generation, optimizing performance and SEO.",
        "Collaborated with senior developers to design and implement features, troubleshoot issues, and improve application functionality.",
        "Participated in code reviews and contributed to team meetings, enhancing the development workflow and ensuring code quality."
      ],
    },
    {
      title: "Web Developer Intern",
      company_name: "Estuary Academic and Strategic Institut (INSAM)",
      icon: insam, // You'll need to import this icon
      iconBg: "#E6DEDD", // You can adjust this color as needed
      date: "2022 - 2023", // You might want to provide more specific dates if available
      points: [
        "Gained hands-on experience in web development during Bachelor's degree program.",
        "Assisted in developing and maintaining web applications.",
        "Learned and applied best practices in software development and team collaboration."
      ],
    },
    {
      title: "Freelance Web Developer",
      company_name: "Self-employed",
      icon: freelance, // You'll need to create or import this icon
      iconBg: "#383E56", // You can adjust this color as needed
      date: "2020 - Present",
      points: [
        "Developed and maintained websites and e-commerce platforms using WordPress, including custom theme development and plugin integration.",
        "Created responsive and user-friendly web applications using modern front-end technologies like React and Angular.",
        "Implemented back-end solutions using Laravel and Node.js, ensuring robust and scalable server-side functionality.",
        "Collaborated with clients to gather requirements, provide regular updates, and deliver high-quality web solutions that meet their specific needs."
      ],
    }
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
      source_code_link: "https://github.com/hotnaigga/donatetheblood",
    },
    {
      name: "Task Tracker",
      description:
        "Web application that enables users to create a todo list and have alerts them when the time for the defined task arrives.",
      tags: [
        {
          name: "angular",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/hotnaigga/task-tracker",
    },
    {
      name: "Online Exam System",
      description:
        "A comprehensive online exam platform that allows users to take exams online and have them marked by their lecturers. Equally gives the possibility to rank student's performace and track progress.",
      tags: [
        {
          name: "html/javaScript",
          color: "blue-text-gradient",
        },
        {
          name: "postgres",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/hotnaigga/online-exam-system",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };