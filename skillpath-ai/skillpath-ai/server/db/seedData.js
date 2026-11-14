// server/db/seedData.js
// Preloaded realistic industry datasets for SKILLPATH AI

export const INITIAL_CAREERS = [
  {
    id: "career-fsd",
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Engineering",
    description: "Builds modern client-facing web applications and resilient backend server architectures, connecting responsive user interfaces to databases and cloud APIs.",
    salaryRange: "$85,000 - $145,000",
    demandLevel: "Very High",
    growthRate: "+22% (Next 5 Years)",
    readinessBenchmark: 80,
    requiredSkills: [
      { name: "HTML & CSS", minProficiency: "Intermediate", weight: 10, isCore: true, category: "Frontend" },
      { name: "JavaScript", minProficiency: "Advanced", weight: 20, isCore: true, category: "Frontend" },
      { name: "React.js", minProficiency: "Intermediate", weight: 18, isCore: true, category: "Frontend" },
      { name: "Node.js", minProficiency: "Intermediate", weight: 15, isCore: true, category: "Backend" },
      { name: "Express.js", minProficiency: "Intermediate", weight: 12, isCore: true, category: "Backend" },
      { name: "REST APIs", minProficiency: "Intermediate", weight: 10, isCore: true, category: "Backend" },
      { name: "Database Integration", minProficiency: "Intermediate", weight: 15, isCore: true, category: "Database" },
      { name: "Git & GitHub", minProficiency: "Intermediate", weight: 10, isCore: false, category: "DevOps" }
    ],
    milestones: [
      "Master modern semantic HTML5 and responsive Flexbox/Grid CSS",
      "Gain fluency in JavaScript ES6+, async/await, and DOM manipulation",
      "Build component-based interfaces with React hooks and state management",
      "Develop scalable REST APIs using Node.js and Express",
      "Design database schemas and integrate SQL/NoSQL with server APIs",
      "Deploy full-stack applications with CI/CD and secure authentication"
    ]
  },
  {
    id: "career-ai-eng",
    slug: "ai-engineer",
    title: "AI Engineer",
    category: "Artificial Intelligence",
    description: "Engineers generative AI models, agentic workflows, LLM pipelines, and vector databases into production-grade scalable software systems.",
    salaryRange: "$110,000 - $185,000",
    demandLevel: "Extremely High",
    growthRate: "+38% (Next 5 Years)",
    readinessBenchmark: 85,
    requiredSkills: [
      { name: "Python", minProficiency: "Advanced", weight: 20, isCore: true, category: "Core" },
      { name: "Machine Learning", minProficiency: "Intermediate", weight: 18, isCore: true, category: "AI/ML" },
      { name: "Deep Learning & PyTorch", minProficiency: "Intermediate", weight: 16, isCore: true, category: "AI/ML" },
      { name: "Large Language Models (LLMs)", minProficiency: "Intermediate", weight: 18, isCore: true, category: "AI/ML" },
      { name: "Prompt Engineering & RAG", minProficiency: "Intermediate", weight: 14, isCore: true, category: "AI/ML" },
      { name: "FastAPI / Backend APIs", minProficiency: "Intermediate", weight: 14, isCore: true, category: "Backend" }
    ],
    milestones: [
      "Advanced Python data structures, algorithms and async programming",
      "Supervised and unsupervised ML models with Scikit-Learn",
      "Neural networks, embeddings and fine-tuning with PyTorch",
      "Building Retrieval-Augmented Generation (RAG) pipelines with Vector DBs",
      "Agentic orchestration (LangChain, AutoGen, Multi-agent workflows)"
    ]
  },
  {
    id: "career-data-sci",
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Data Science & Analytics",
    description: "Transforms unstructured datasets into actionable predictive insights, statistical experiments, and automated forecasting algorithms.",
    salaryRange: "$95,000 - $160,000",
    demandLevel: "High",
    growthRate: "+28% (Next 5 Years)",
    readinessBenchmark: 80,
    requiredSkills: [
      { name: "Python", minProficiency: "Advanced", weight: 22, isCore: true, category: "Core" },
      { name: "SQL", minProficiency: "Advanced", weight: 20, isCore: true, category: "Database" },
      { name: "Statistics & Probability", minProficiency: "Intermediate", weight: 18, isCore: true, category: "Theory" },
      { name: "Pandas & NumPy", minProficiency: "Advanced", weight: 15, isCore: true, category: "Data" },
      { name: "Data Visualization (Seaborn/Plotly)", minProficiency: "Intermediate", weight: 12, isCore: false, category: "Data" },
      { name: "Scikit-Learn & Predictive Modeling", minProficiency: "Intermediate", weight: 13, isCore: true, category: "AI/ML" }
    ],
    milestones: [
      "Master advanced relational database queries, window functions, and indexing",
      "Exploratory Data Analysis and data munging with Pandas",
      "Hypothesis testing, A/B testing and inferential statistics",
      "Feature engineering and classification/regression pipelines",
      "Executive dashboard communication and model deployment"
    ]
  },
  {
    id: "career-cyber-sec",
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Information Security",
    description: "Protects enterprise systems, audits network vulnerabilities, monitors security incident events, and enforces zero-trust compliance standards.",
    salaryRange: "$80,000 - $140,000",
    demandLevel: "Very High",
    growthRate: "+32% (Next 5 Years)",
    readinessBenchmark: 80,
    requiredSkills: [
      { name: "Computer Networking (TCP/IP)", minProficiency: "Advanced", weight: 20, isCore: true, category: "Networking" },
      { name: "Linux Administration", minProficiency: "Intermediate", weight: 18, isCore: true, category: "Systems" },
      { name: "Security Architecture & OWASP", minProficiency: "Intermediate", weight: 18, isCore: true, category: "Security" },
      { name: "Vulnerability Assessment", minProficiency: "Intermediate", weight: 16, isCore: true, category: "Security" },
      { name: "Incident Response & SIEM", minProficiency: "Intermediate", weight: 14, isCore: true, category: "Security" },
      { name: "Cryptography Basics", minProficiency: "Beginner", weight: 14, isCore: false, category: "Security" }
    ],
    milestones: [
      "Network packet analysis with Wireshark and firewall configurations",
      "Linux command line, permission models, and process hardening",
      "Web application vulnerabilities: XSS, SQLi, CSRF and secure coding",
      "Log monitoring, anomaly detection and threat hunting with SIEM tools",
      "Security certification readiness (CompTIA Security+, CEH)"
    ]
  },
  {
    id: "career-cloud-eng",
    slug: "cloud-engineer",
    title: "Cloud & DevOps Engineer",
    category: "Infrastructure",
    description: "Architects scalable, fault-tolerant cloud infrastructures, automates CI/CD delivery pipelines, and manages container orchestration.",
    salaryRange: "$95,000 - $165,000",
    demandLevel: "Very High",
    growthRate: "+26% (Next 5 Years)",
    readinessBenchmark: 80,
    requiredSkills: [
      { name: "Linux Administration", minProficiency: "Advanced", weight: 18, isCore: true, category: "Systems" },
      { name: "AWS / Cloud Providers", minProficiency: "Intermediate", weight: 20, isCore: true, category: "Cloud" },
      { name: "Docker & Containerization", minProficiency: "Intermediate", weight: 18, isCore: true, category: "DevOps" },
      { name: "Kubernetes Orchestration", minProficiency: "Intermediate", weight: 16, isCore: true, category: "DevOps" },
      { name: "Infrastructure as Code (Terraform)", minProficiency: "Intermediate", weight: 14, isCore: true, category: "Cloud" },
      { name: "CI/CD Pipelines (GitHub Actions)", minProficiency: "Intermediate", weight: 14, isCore: true, category: "DevOps" }
    ],
    milestones: [
      "Linux kernel fundamentals, systemd, and bash automation",
      "Core cloud computing primitives: VPC, EC2, S3, IAM, and Lambda",
      "Containerizing multi-service web applications with Docker",
      "Cluster management, deployments and ingress with Kubernetes",
      "Automated infrastructure provisioning using Terraform scripts"
    ]
  },
  {
    id: "career-uiux",
    slug: "ui-ux-designer",
    title: "UI/UX Product Designer",
    category: "Design",
    description: "Crafts intuitive, accessible, research-backed digital product interfaces and scalable design systems for web and mobile platforms.",
    salaryRange: "$75,000 - $130,000",
    demandLevel: "High",
    growthRate: "+18% (Next 5 Years)",
    readinessBenchmark: 75,
    requiredSkills: [
      { name: "Figma & UI Component Systems", minProficiency: "Advanced", weight: 25, isCore: true, category: "Design" },
      { name: "User Research & Usability Testing", minProficiency: "Intermediate", weight: 20, isCore: true, category: "UX" },
      { name: "Wireframing & Prototyping", minProficiency: "Advanced", weight: 20, isCore: true, category: "Design" },
      { name: "Information Architecture", minProficiency: "Intermediate", weight: 15, isCore: true, category: "UX" },
      { name: "Design Systems & Tokens", minProficiency: "Intermediate", weight: 12, isCore: true, category: "Design" },
      { name: "HTML & CSS Awareness", minProficiency: "Beginner", weight: 8, isCore: false, category: "Frontend" }
    ],
    milestones: [
      "User persona development, empathy maps, and problem statements",
      "Low-fidelity wireframing and user journey mapping",
      "High-fidelity visual design, typography, spacing and color theory",
      "Interactive micro-prototyping and design system tokens in Figma",
      "Usability testing, heuristic evaluation and design handoff"
    ]
  }
];

export const INITIAL_SKILLS = [
  { id: "s-py", name: "Python", category: "Core", prerequisites: [] },
  { id: "s-sql", name: "SQL", category: "Database", prerequisites: [] },
  { id: "s-html", name: "HTML & CSS", category: "Frontend", prerequisites: [] },
  { id: "s-js", name: "JavaScript", category: "Frontend", prerequisites: ["HTML & CSS"] },
  { id: "s-react", name: "React.js", category: "Frontend", prerequisites: ["JavaScript", "HTML & CSS"] },
  { id: "s-node", name: "Node.js", category: "Backend", prerequisites: ["JavaScript"] },
  { id: "s-exp", name: "Express.js", category: "Backend", prerequisites: ["Node.js", "JavaScript"] },
  { id: "s-api", name: "REST APIs", category: "Backend", prerequisites: ["Express.js", "JavaScript"] },
  { id: "s-db", name: "Database Integration", category: "Database", prerequisites: ["SQL", "Node.js"] },
  { id: "s-git", name: "Git & GitHub", category: "DevOps", prerequisites: [] },
  { id: "s-ml", name: "Machine Learning", category: "AI/ML", prerequisites: ["Python", "SQL"] },
  { id: "s-dl", name: "Deep Learning & PyTorch", category: "AI/ML", prerequisites: ["Machine Learning", "Python"] },
  { id: "s-llm", name: "Large Language Models (LLMs)", category: "AI/ML", prerequisites: ["Deep Learning & PyTorch"] },
  { id: "s-rag", name: "Prompt Engineering & RAG", category: "AI/ML", prerequisites: ["Large Language Models (LLMs)"] },
  { id: "s-fastapi", name: "FastAPI / Backend APIs", category: "Backend", prerequisites: ["Python"] },
  { id: "s-pandas", name: "Pandas & NumPy", category: "Data", prerequisites: ["Python"] },
  { id: "s-stats", name: "Statistics & Probability", category: "Theory", prerequisites: [] },
  { id: "s-dataviz", name: "Data Visualization (Seaborn/Plotly)", category: "Data", prerequisites: ["Python", "Pandas & NumPy"] },
  { id: "s-scikit", name: "Scikit-Learn & Predictive Modeling", category: "AI/ML", prerequisites: ["Python", "Pandas & NumPy", "Statistics & Probability"] },
  { id: "s-net", name: "Computer Networking (TCP/IP)", category: "Networking", prerequisites: [] },
  { id: "s-linux", name: "Linux Administration", category: "Systems", prerequisites: [] },
  { id: "s-owasp", name: "Security Architecture & OWASP", category: "Security", prerequisites: ["Computer Networking (TCP/IP)"] },
  { id: "s-vuln", name: "Vulnerability Assessment", category: "Security", prerequisites: ["Security Architecture & OWASP", "Linux Administration"] },
  { id: "s-siem", name: "Incident Response & SIEM", category: "Security", prerequisites: ["Computer Networking (TCP/IP)"] },
  { id: "s-crypto", name: "Cryptography Basics", category: "Security", prerequisites: [] },
  { id: "s-aws", name: "AWS / Cloud Providers", category: "Cloud", prerequisites: ["Linux Administration", "Computer Networking (TCP/IP)"] },
  { id: "s-docker", name: "Docker & Containerization", category: "DevOps", prerequisites: ["Linux Administration"] },
  { id: "s-k8s", name: "Kubernetes Orchestration", category: "DevOps", prerequisites: ["Docker & Containerization"] },
  { id: "s-tf", name: "Infrastructure as Code (Terraform)", category: "Cloud", prerequisites: ["AWS / Cloud Providers"] },
  { id: "s-cicd", name: "CI/CD Pipelines (GitHub Actions)", category: "DevOps", prerequisites: ["Git & GitHub", "Docker & Containerization"] },
  { id: "s-figma", name: "Figma & UI Component Systems", category: "Design", prerequisites: [] },
  { id: "s-uxres", name: "User Research & Usability Testing", category: "UX", prerequisites: [] },
  { id: "s-wire", name: "Wireframing & Prototyping", category: "Design", prerequisites: ["Figma & UI Component Systems"] },
  { id: "s-ia", name: "Information Architecture", category: "UX", prerequisites: ["User Research & Usability Testing"] },
  { id: "s-ds", name: "Design Systems & Tokens", category: "Design", prerequisites: ["Figma & UI Component Systems"] }
];

export const DEMO_STUDENT = {
  id: "student-alex",
  userId: "user-alex",
  fullName: "Alex Rivera",
  email: "alex@skillpath.ai",
  educationLevel: "Undergraduate",
  institution: "State Institute of Technology",
  degree: "B.S. in Computer Science (1st Year)",
  targetCareer: "Full Stack Developer",
  targetCareerId: "career-fsd",
  preferredLearningStyle: "Hands-on projects & Interactive drills",
  availableHoursPerDay: 3,
  interests: ["Web Applications", "AI Tooling", "Cloud Architecture", "Open Source"],
  technicalSkills: [
    { name: "Python", proficiency: "Intermediate", verified: true, source: "Project Evidence & Coursework", confidence: 78 },
    { name: "SQL", proficiency: "Intermediate", verified: true, source: "Lab Work & Database Assessment", confidence: 74 },
    { name: "HTML & CSS", proficiency: "Beginner", verified: false, source: "Self-Reported", confidence: 45 }
  ],
  softSkills: [
    { name: "Problem Solving", proficiency: "Intermediate" },
    { name: "Analytical Thinking", proficiency: "Advanced" },
    { name: "Team Collaboration", proficiency: "Intermediate" }
  ],
  certifications: [
    { title: "Python for Data & Automation", issuer: "CS50x Harvard", year: 2025, verified: true }
  ],
  projects: [
    {
      id: "proj-prev-1",
      title: "Python CLI Expense Tracker",
      description: "Terminal utility that logs daily expenses into SQLite and computes categorical expenditure graphs.",
      skillsDemonstrated: ["Python", "SQL"],
      verified: true
    }
  ],
  careerReadiness: 38,
  skillConfidenceScore: 65,
  xp: 420,
  level: 3,
  streakDays: 4,
  lastActive: new Date().toISOString()
};

export const INITIAL_ASSESSMENTS = [
  {
    id: "asm-js-1",
    skillName: "JavaScript",
    title: "JavaScript Core Fundamentals & Asynchronous Programming",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What will `console.log(typeof NaN)` output in modern JavaScript?",
        options: ["'number'", "'undefined'", "'NaN'", "'object'"],
        correctIndex: 0,
        explanation: "In JavaScript, NaN (Not-a-Number) is a special numeric value defined by IEEE 754, so its typeof is 'number'.",
        topic: "Types & Coercion",
        prerequisiteCheck: "Basic Data Types"
      },
      {
        id: "q2",
        question: "Which keyword prevents reassignment of a variable binding while allowing internal mutation of object properties?",
        options: ["var", "let", "const", "freeze"],
        correctIndex: 2,
        explanation: "`const` declares a block-scoped constant reference, meaning the identifier cannot be reassigned, but properties of an assigned object or array can still be modified.",
        topic: "Variable Declarations",
        prerequisiteCheck: "Scope & Variables"
      },
      {
        id: "q3",
        question: "How does the JavaScript Event Loop handle microtasks (e.g. `Promise.then`) relative to macrotasks (e.g. `setTimeout`)?",
        options: [
          "Macrotasks are executed before microtasks always",
          "All queued microtasks are drained immediately after each script or task execution before the next macrotask runs",
          "Microtasks and macrotasks alternate execution one by one",
          "They run in parallel on separate browser threads"
        ],
        correctIndex: 1,
        explanation: "The microtask queue has strict priority over the macrotask queue. Once the current stack clears, the engine drains all microtasks before picking the next macrotask.",
        topic: "Asynchronous Execution & Event Loop",
        prerequisiteCheck: "Promises & Callbacks"
      },
      {
        id: "q4",
        question: "What is the return value of `[1, 2, 3].reduce((acc, curr) => acc + curr, 10)`?",
        options: ["6", "16", "10", "NaN"],
        correctIndex: 1,
        explanation: "The accumulator starts with initial value 10, then adds 1, 2, and 3, yielding 10 + 1 + 2 + 3 = 16.",
        topic: "Array Higher-Order Functions",
        prerequisiteCheck: "Functional Array Methods"
      },
      {
        id: "q5",
        question: "In standard closures, what does an inner function retain access to?",
        options: [
          "Only variables declared inside itself",
          "Only global variables",
          "Its outer (enclosing) function's lexical scope even after that outer function has returned",
          "Only variables passed as formal parameters"
        ],
        correctIndex: 2,
        explanation: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).",
        topic: "Closures & Scope Chain",
        prerequisiteCheck: "Lexical Scope"
      }
    ]
  },
  {
    id: "asm-react-1",
    skillName: "React.js",
    title: "React Components, Hooks & Virtual DOM",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: "rq1",
        question: "Why should you never call React Hooks inside loops, conditions, or nested functions?",
        options: [
          "It causes JavaScript syntax compilation errors",
          "React relies on the call order of hooks across render cycles to preserve state bindings correctly",
          "Hooks consume too much memory when called conditionally",
          "Browser engines do not support dynamic functions"
        ],
        correctIndex: 1,
        explanation: "React relies on a predictable array index based on the call order of hooks during each component render cycle.",
        topic: "Rules of Hooks",
        prerequisiteCheck: "React Lifecycle"
      },
      {
        id: "rq2",
        question: "What is the primary function of the virtual DOM in React?",
        options: [
          "Directly replace the browser DOM with a web assembly canvas",
          "Maintain a lightweight in-memory representation to compute minimal actual DOM mutations via reconciliation",
          "Store component state in persistent local storage",
          "Bypass CSS styling and render faster"
        ],
        correctIndex: 1,
        explanation: "The Virtual DOM computes diffs (reconciliation) and batches updates so only necessary changes are pushed to the slow browser DOM.",
        topic: "Virtual DOM Reconciliation",
        prerequisiteCheck: "DOM Fundamentals"
      },
      {
        id: "rq3",
        question: "When should you provide a cleanup function inside `useEffect`?",
        options: [
          "Whenever a component makes a GET request",
          "To unsubscribe from event listeners, clear intervals, or cancel pending network subscriptions when the component unmounts or before re-running the effect",
          "Only when the dependency array is empty",
          "Cleanup functions are deprecated in React 18+"
        ],
        correctIndex: 1,
        explanation: "Cleanup functions execute when the component unmounts or prior to re-running the effect when dependencies change.",
        topic: "Side Effects & Subscriptions",
        prerequisiteCheck: "Async Operations"
      }
    ]
  },
  {
    id: "asm-node-1",
    skillName: "Node.js",
    title: "Node.js Runtime, Modules & Stream Architecture",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: "nq1",
        question: "How does Node.js achieve high concurrency despite running on a single main execution thread?",
        options: [
          "By spinning up a new OS thread for every incoming HTTP socket connection",
          "Via non-blocking event-driven I/O supported by the libuv thread pool and OS asynchronous primitives",
          "By executing JavaScript in multi-threaded parallel byte-code blocks",
          "It cannot handle concurrency without third-party plugins"
        ],
        correctIndex: 1,
        explanation: "Node.js utilizes an event loop with non-blocking I/O, delegating blocking tasks (DNS, file I/O, crypto) to libuv's background thread pool.",
        topic: "Event-Driven Architecture",
        prerequisiteCheck: "Operating System Basics"
      },
      {
        id: "nq2",
        question: "Which HTTP status code must an idempotent REST API return when a resource is successfully updated with `PUT`?",
        options: ["200 OK or 204 No Content", "201 Created", "304 Not Modified", "400 Bad Request"],
        correctIndex: 0,
        explanation: "PUT updates a resource idempotently; returning 200 with the updated entity or 204 with no body is standard REST practice.",
        topic: "REST Protocol Standards",
        prerequisiteCheck: "HTTP Status Codes"
      }
    ]
  }
];

export const INITIAL_MISSIONS = [
  {
    id: "miss-1",
    title: "Mission 1: Modern Responsive Developer Portfolio",
    slug: "responsive-portfolio",
    category: "Frontend",
    difficulty: "Beginner",
    xpReward: 150,
    estimatedHours: 4,
    requiredSkills: ["HTML & CSS", "Git & GitHub"],
    objective: "Engineer a high-performance, mobile-responsive portfolio site showcasing your projects, technical skills, and interactive contact modal.",
    instructions: [
      "Use modern semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`).",
      "Implement responsive layout using CSS Flexbox and CSS Grid without frameworks.",
      "Support responsive media queries for mobile (<640px), tablet (<1024px) and desktop.",
      "Add smooth scrolling and accessible form labels.",
      "Push your code to a public GitHub repository."
    ],
    rubrics: [
      { criterion: "Semantic Markup & Accessibility", maxScore: 25, description: "Valid HTML5 semantics and ARIA tags." },
      { criterion: "Responsive CSS Layout", maxScore: 35, description: "Flawless mobile, tablet and desktop layout." },
      { criterion: "Visual Aesthetic & Typography", maxScore: 20, description: "Consistent spacing, dark theme contrast." },
      { criterion: "Git Workflow & Documentation", maxScore: 20, description: "Clean commit history and structured README." }
    ]
  },
  {
    id: "miss-2",
    title: "Mission 2: Interactive Dynamic Budget & Expense Engine",
    slug: "budget-tracker-js",
    category: "Frontend",
    difficulty: "Intermediate",
    xpReward: 250,
    estimatedHours: 6,
    requiredSkills: ["JavaScript", "HTML & CSS"],
    objective: "Build an interactive financial calculation dashboard with dynamic DOM manipulation, real-time balance totals, and local storage caching.",
    instructions: [
      "Create entry forms for income and expense transactions with validation.",
      "Dynamically create and append DOM cards for each recorded transaction.",
      "Recalculate total balance, cumulative income, and total expenses automatically using `reduce()`.",
      "Persist transaction records across page refreshes via `localStorage`.",
      "Implement categorical filtering (food, rent, tech, education)."
    ],
    rubrics: [
      { criterion: "DOM Manipulation & Events", maxScore: 30, description: "Clean event listeners and element generation." },
      { criterion: "Data State & Calculation Logic", maxScore: 30, description: "Accurate mathematical reduction and edge cases." },
      { criterion: "Persistence & Validation", maxScore: 20, description: "LocalStorage and form input boundary checks." },
      { criterion: "Code Structure & Cleanliness", maxScore: 20, description: "Modular JS functions, descriptive variable names." }
    ]
  },
  {
    id: "miss-3",
    title: "Mission 3: React Flow - Agile Task & Kanban Manager",
    slug: "react-task-manager",
    category: "Frontend",
    difficulty: "Intermediate",
    xpReward: 350,
    estimatedHours: 8,
    requiredSkills: ["React.js", "JavaScript"],
    objective: "Develop a component-driven Kanban board with customizable columns, priority tags, search filters, and reactive state updates.",
    instructions: [
      "Decompose UI into modular React components (`Column`, `TaskCard`, `NewTaskModal`, `FilterBar`).",
      "Manage task state using React `useState` and `useReducer` for complex actions.",
      "Enable moving tasks between 'To Do', 'In Progress', and 'Completed' lanes.",
      "Add search bar filtering tasks by title, tag, or priority.",
      "Demonstrate custom hooks for state synchronization."
    ],
    rubrics: [
      { criterion: "Component Architecture", maxScore: 30, description: "Clean props passing, reusability, single responsibility." },
      { criterion: "State Management with Hooks", maxScore: 30, description: "Proper use of hooks and immutable state patterns." },
      { criterion: "User Experience & Responsiveness", maxScore: 20, description: "Smooth column transitions and responsive layout." },
      { criterion: "Edge Cases & Validation", maxScore: 20, description: "Handling empty columns and validation errors." }
    ]
  },
  {
    id: "miss-4",
    title: "Mission 4: Resilient RESTful API with Authentication",
    slug: "nodejs-rest-api",
    category: "Backend",
    difficulty: "Advanced",
    xpReward: 450,
    estimatedHours: 10,
    requiredSkills: ["Node.js", "Express.js", "REST APIs", "Database Integration"],
    objective: "Architect a robust backend REST API featuring JWT authentication, route protection middleware, schema validation, and database CRUD operations.",
    instructions: [
      "Setup Express application with structured controllers, routes, and middleware.",
      "Implement `POST /auth/register` and `POST /auth/login` with password hashing (`bcrypt`) and JWT issuance.",
      "Build authentication middleware verifying Bearer tokens on protected endpoints.",
      "Implement CRUD endpoints for user resources with status codes (200, 201, 400, 401, 404, 500).",
      "Connect routes to SQLite or MongoDB database with transactional safety."
    ],
    rubrics: [
      { criterion: "API Design & REST Standards", maxScore: 30, description: "Strict HTTP semantics, idempotency, JSON schemas." },
      { criterion: "Security & Authentication", maxScore: 30, description: "Safe password hashing, JWT expiry, token extraction." },
      { criterion: "Database Schema & Queries", maxScore: 25, description: "Normalized relational schema or clean document design." },
      { criterion: "Error Handling & Logging", maxScore: 15, description: "Global centralized error middleware and audit logs." }
    ]
  },
  {
    id: "miss-5",
    title: "Mission 5: Full-Stack Career Intelligence Engine",
    slug: "fullstack-capstone",
    category: "Full Stack",
    difficulty: "Advanced",
    xpReward: 600,
    estimatedHours: 15,
    requiredSkills: ["React.js", "Node.js", "Express.js", "Database Integration", "REST APIs"],
    objective: "Assemble an end-to-end full-stack web application uniting a React interface with a Node.js REST API and persistent database.",
    instructions: [
      "Connect React client to backend Express server via asynchronous API fetch/axios.",
      "Store authentication tokens securely in client state and attach to HTTP headers.",
      "Render real-time data visualizations (charts, status badges) based on server data.",
      "Implement optimistic UI updates with error rollback handling.",
      "Deploy or bundle both frontend and backend for production execution."
    ],
    rubrics: [
      { criterion: "Full-Stack Integration", maxScore: 35, description: "Seamless client-server protocol and state synchronization." },
      { criterion: "Feature Completeness", maxScore: 30, description: "All promised features work without runtime breaks." },
      { criterion: "Code Quality & Patterns", maxScore: 20, description: "Clean async handling, modular imports, defensive coding." },
      { criterion: "UI Polish & Experience", maxScore: 15, description: "Professional futuristic styling and feedback toasts." }
    ]
  }
];

export const INITIAL_RESOURCES = [
  {
    id: "res-1",
    skill: "HTML & CSS",
    title: "MDN Web Docs: Responsive Web Design Essentials",
    provider: "Mozilla Developer Network",
    type: "Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
    duration: "4 hours",
    difficulty: "Beginner",
    cost: "Free",
    rating: 4.9,
    keyTopics: ["Flexbox", "CSS Grid", "Media Queries", "Fluid Typography"]
  },
  {
    id: "res-2",
    skill: "JavaScript",
    title: "Modern JavaScript Deep Dive & Async Mastery",
    provider: "javascript.info",
    type: "Interactive Tutorial",
    url: "https://javascript.info/",
    duration: "12 hours",
    difficulty: "Intermediate",
    cost: "Free",
    rating: 4.95,
    keyTopics: ["Closures", "Promises", "Async/Await", "Event Loop", "Prototypes"]
  },
  {
    id: "res-3",
    skill: "React.js",
    title: "The Official React Tutorial: Thinking in React",
    provider: "React Documentation",
    type: "Interactive Guide",
    url: "https://react.dev/learn",
    duration: "8 hours",
    difficulty: "Intermediate",
    cost: "Free",
    rating: 4.9,
    keyTopics: ["Component Trees", "State Management", "Hooks", "Reconciliation"]
  },
  {
    id: "res-4",
    skill: "Node.js",
    title: "Node.js Architecture & Asynchronous I/O Guide",
    provider: "Nodejs.org",
    type: "Documentation",
    url: "https://nodejs.org/en/docs/guides",
    duration: "6 hours",
    difficulty: "Intermediate",
    cost: "Free",
    rating: 4.8,
    keyTopics: ["Event Loop", "Modules", "Streams", "HTTP Module", "Buffers"]
  },
  {
    id: "res-5",
    skill: "Express.js",
    title: "Building Enterprise RESTful APIs with Express",
    provider: "freeCodeCamp",
    type: "Full Course",
    url: "https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/",
    duration: "5 hours",
    difficulty: "Intermediate",
    cost: "Free",
    rating: 4.85,
    keyTopics: ["Routing", "Middleware", "CORS", "Error Handling", "JWT"]
  },
  {
    id: "res-6",
    skill: "Database Integration",
    title: "Relational Modeling & SQL Query Optimization",
    provider: "SQLZoo & Postgres Guide",
    type: "Interactive Sandbox",
    url: "https://sqlzoo.net/",
    duration: "6 hours",
    difficulty: "Intermediate",
    cost: "Free",
    rating: 4.8,
    keyTopics: ["Foreign Keys", "Joins", "Transactions", "Indexes", "Normalization"]
  }
];
