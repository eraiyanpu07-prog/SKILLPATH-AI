// server/agents/learningAgent.js
// AGENT 4: LEARNING RECOMMENDATION AGENT
// Responsibility: Synthesize adaptive learning roadmap stages, recommend free curated resources, and link practical project lab assignments.

import { llm } from "../services/llmService.js";
import { LearningResource, Project } from "../db/database.js";

export async function runLearningRecommendationAgent(studentProfile, careerMatchData, gapData) {
  const startTime = Date.now();
  const careerTitle = careerMatchData?.data?.careerTitle || studentProfile.targetCareer || "Full Stack Developer";
  const careerSlug = careerMatchData?.data?.careerSlug || "full-stack-developer";
  const hoursPerDay = studentProfile.availableHoursPerDay || 2;
  const learningStyle = studentProfile.preferredLearningStyle || "Hands-on projects";

  const allResources = LearningResource.find();
  const allMissions = Project.find();

  const fallbackGenerator = () => {
    let stages = [];

    if (careerSlug.includes("full-stack")) {
      stages = [
        {
          stageNumber: 1,
          title: "HTML5 & Modern Responsive CSS",
          focusSkills: ["HTML & CSS", "Git & GitHub"],
          durationWeeks: 2,
          difficulty: "Beginner",
          status: "in-progress",
          completed: false,
          completionPercentage: 60,
          description: "Solidify semantic document architecture, Flexbox/Grid layouts, and version control discipline.",
          modules: [
            { id: "m1-1", title: "Semantic HTML5 Tags & Accessibility (ARIA)", completed: true, duration: "3h" },
            { id: "m1-2", title: "CSS Flexbox & CSS Grid Mastery", completed: true, duration: "5h" },
            { id: "m1-3", title: "Mobile-First Media Queries & Responsive Typography", completed: false, duration: "4h" },
            { id: "m1-4", title: "Git Branching, Pull Requests & GitHub", completed: false, duration: "2h" }
          ],
          practicalAssignment: {
            title: "Build Responsive Developer Portfolio",
            missionSlug: "responsive-portfolio",
            xpReward: 150
          },
          assessmentTrigger: "HTML & CSS Benchmark Exam"
        },
        {
          stageNumber: 2,
          title: "Modern JavaScript Deep Dive (ES6+ & Async)",
          focusSkills: ["JavaScript"],
          durationWeeks: 3,
          difficulty: "Intermediate",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Master lexical scope, closures, array methods, Promise chains, and async/await event loops.",
          modules: [
            { id: "m2-1", title: "Lexical Scope, Closures & Execution Context", completed: false, duration: "4h" },
            { id: "m2-2", title: "Higher-Order Functions & Array Reductions", completed: false, duration: "4h" },
            { id: "m2-3", title: "Promises, Async/Await & Fetch API", completed: false, duration: "5h" },
            { id: "m2-4", title: "DOM Manipulation & Event Propagation", completed: false, duration: "4h" }
          ],
          practicalAssignment: {
            title: "Interactive Dynamic Budget Tracker",
            missionSlug: "budget-tracker-js",
            xpReward: 250
          },
          assessmentTrigger: "JavaScript Core Fundamentals (asm-js-1)"
        },
        {
          stageNumber: 3,
          title: "React.js Component Architecture & Reactive State",
          focusSkills: ["React.js"],
          durationWeeks: 3,
          difficulty: "Intermediate",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Construct modular, declarative user interfaces utilizing React 18+ hooks, effects, and virtual DOM diffing.",
          modules: [
            { id: "m3-1", title: "JSX, Component Decomposition & Props Contracts", completed: false, duration: "4h" },
            { id: "m3-2", title: "State Management with useState & useReducer", completed: false, duration: "6h" },
            { id: "m3-3", title: "useEffect Lifecycles & Asynchronous Subscriptions", completed: false, duration: "5h" },
            { id: "m3-4", title: "Custom React Hooks & Context API", completed: false, duration: "4h" }
          ],
          practicalAssignment: {
            title: "React Flow - Agile Kanban Manager",
            missionSlug: "react-task-manager",
            xpReward: 350
          },
          assessmentTrigger: "React Components & Hooks Exam (asm-react-1)"
        },
        {
          stageNumber: 4,
          title: "Node.js Server Runtime & Streams Architecture",
          focusSkills: ["Node.js"],
          durationWeeks: 2,
          difficulty: "Intermediate",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Understand non-blocking event-driven backend execution, core Node modules, and buffer/stream pipelines.",
          modules: [
            { id: "m4-1", title: "Node.js Event Loop & Non-Blocking I/O Internals", completed: false, duration: "3h" },
            { id: "m4-2", title: "Native HTTP Server & Module Systems (ESM/CJS)", completed: false, duration: "4h" },
            { id: "m4-3", title: "File System Operations & Asynchronous Streams", completed: false, duration: "4h" }
          ],
          practicalAssignment: {
            title: "Custom CLI File Ingestion Stream Processor",
            missionSlug: "nodejs-cli-stream",
            xpReward: 300
          },
          assessmentTrigger: "Node.js Runtime Architecture Exam (asm-node-1)"
        },
        {
          stageNumber: 5,
          title: "Express.js & RESTful API Engineering",
          focusSkills: ["Express.js", "REST APIs"],
          durationWeeks: 2,
          difficulty: "Intermediate",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Design industry-standard idempotent REST endpoints, JWT authorization middleware, and error interceptors.",
          modules: [
            { id: "m5-1", title: "REST Protocol Standards & HTTP Verbs", completed: false, duration: "3h" },
            { id: "m5-2", title: "Express Router & Custom Middleware Pipelines", completed: false, duration: "4h" },
            { id: "m5-3", title: "JWT Bearer Authentication & Password Hashing", completed: false, duration: "5h" }
          ],
          practicalAssignment: {
            title: "Resilient RESTful Auth & Resource API",
            missionSlug: "nodejs-rest-api",
            xpReward: 450
          },
          assessmentTrigger: "RESTful API Security Benchmark"
        },
        {
          stageNumber: 6,
          title: "Database Integration & Relational Persistence",
          focusSkills: ["Database Integration", "SQL"],
          durationWeeks: 2,
          difficulty: "Intermediate",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Model relational database schemas, execute atomic transactions, optimize query indexing, and link ORMs.",
          modules: [
            { id: "m6-1", title: "Relational Schema Normalization & Foreign Keys", completed: false, duration: "4h" },
            { id: "m6-2", title: "SQL Joins, Aggregations & Window Functions", completed: false, duration: "4h" },
            { id: "m6-3", title: "Connecting Node.js to SQLite/Postgres with Connection Pooling", completed: false, duration: "5h" }
          ],
          practicalAssignment: {
            title: "Database Schema Migration & Query Benchmark",
            missionSlug: "db-schema-migration",
            xpReward: 400
          },
          assessmentTrigger: "Database Integration Assessment"
        },
        {
          stageNumber: 7,
          title: "Full Stack Capstone Application Integration",
          focusSkills: ["React.js", "Node.js", "Express.js", "Database Integration"],
          durationWeeks: 4,
          difficulty: "Advanced",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Architect and deliver an end-to-end production web application unifying React, Express REST APIs, and a live database.",
          modules: [
            { id: "m7-1", title: "Client-Server Contract & OpenAPI Documentation", completed: false, duration: "4h" },
            { id: "m7-2", title: "Full-Stack State Synchronization & Optimistic UI", completed: false, duration: "6h" },
            { id: "m7-3", title: "End-to-End Testing & Automated Build Pipelines", completed: false, duration: "6h" }
          ],
          practicalAssignment: {
            title: "Full-Stack Career Intelligence Capstone",
            missionSlug: "fullstack-capstone",
            xpReward: 600
          },
          assessmentTrigger: "Capstone Code Review & Defense"
        },
        {
          stageNumber: 8,
          title: "Production Deployment & Interview Portfolio",
          focusSkills: ["Git & GitHub", "DevOps"],
          durationWeeks: 2,
          difficulty: "Advanced",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Deploy production builds to cloud infrastructure, configure HTTPS/CORS, and prep for system design interviews.",
          modules: [
            { id: "m8-1", title: "Cloud Deployment (Vercel, Render, Railway)", completed: false, duration: "4h" },
            { id: "m8-2", title: "System Design Patterns & Technical Interview Drills", completed: false, duration: "6h" }
          ],
          practicalAssignment: {
            title: "Verified Skill Passport & Technical Showcase",
            missionSlug: "skill-passport-export",
            xpReward: 300
          },
          assessmentTrigger: "Mock Technical Interview"
        }
      ];
    } else {
      // Generalized career stages generator
      const missingList = gapData?.data?.criticalGaps || [];
      stages = [
        {
          stageNumber: 1,
          title: `Foundations of ${careerTitle}`,
          focusSkills: missingList.slice(0, 2).map(g => g.name),
          durationWeeks: 3,
          difficulty: "Beginner",
          status: "in-progress",
          completed: false,
          completionPercentage: 25,
          description: `Core foundational building blocks required for ${careerTitle}.`,
          modules: [
            { id: "gen-1-1", title: "Core Concepts & Environment Setup", completed: true, duration: "4h" },
            { id: "gen-1-2", title: "Syntax, Libraries & Essential Patterns", completed: false, duration: "6h" }
          ],
          practicalAssignment: {
            title: "Foundational Applied Project",
            missionSlug: "foundational-proj",
            xpReward: 200
          },
          assessmentTrigger: "Foundational Competency Assessment"
        },
        {
          stageNumber: 2,
          title: "Intermediate Implementation & Pipelines",
          focusSkills: missingList.slice(2, 4).map(g => g.name),
          durationWeeks: 4,
          difficulty: "Intermediate",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "Applied tools, data pipelines, and workflow automation.",
          modules: [
            { id: "gen-2-1", title: "Architecture & Data Flow", completed: false, duration: "6h" },
            { id: "gen-2-2", title: "Practical Implementation Lab", completed: false, duration: "8h" }
          ],
          practicalAssignment: {
            title: "Intermediate Practical Mission",
            missionSlug: "intermediate-mission",
            xpReward: 350
          },
          assessmentTrigger: "Intermediate Benchmark"
        },
        {
          stageNumber: 3,
          title: "Production Mastery & Capstone",
          focusSkills: [careerTitle],
          durationWeeks: 4,
          difficulty: "Advanced",
          status: "pending",
          completed: false,
          completionPercentage: 0,
          description: "End-to-end production deployment and portfolio verification.",
          modules: [
            { id: "gen-3-1", title: "Production Hardening & Optimization", completed: false, duration: "6h" },
            { id: "gen-3-2", title: "Portfolio Capstone Defense", completed: false, duration: "10h" }
          ],
          practicalAssignment: {
            title: `${careerTitle} Capstone Defense`,
            missionSlug: "capstone-defense",
            xpReward: 500
          },
          assessmentTrigger: "Final Comprehensive Evaluation"
        }
      ];
    }

    const matchedResources = allResources.filter(r =>
      stages.some(st => st.focusSkills.some(fs => fs.toLowerCase().includes(r.skill.toLowerCase())))
    );

    const totalEstimatedWeeks = stages.reduce((acc, st) => acc + st.durationWeeks, 0);

    return {
      careerTitle,
      careerSlug,
      learnerHoursPerDay: hoursPerDay,
      preferredLearningStyle: learningStyle,
      totalStages: stages.length,
      totalEstimatedWeeks,
      stages,
      recommendedResources: matchedResources.length ? matchedResources : allResources.slice(0, 4),
      recommendedMissions: allMissions.slice(0, 4),
      recommendationSummary: `Generated an adaptive ${stages.length}-stage progression for ${careerTitle}. Calculated for ${hoursPerDay} hours/day study pace with priority on free documentation, code katas, and practical project evaluations.`
    };
  };

  const prompt = `Generate a personalized learning roadmap for career: '${careerTitle}'
Learner Style: ${learningStyle}
Hours Per Day: ${hoursPerDay}
Missing Gaps: ${JSON.stringify(gapData?.data?.criticalGaps || [])}

Create detailed sequential stages with estimated duration, difficulty, module tasks, practical assignments, and assessment triggers. Prioritize free high-quality documentation.
Return JSON schema:
{
  "careerTitle": "${careerTitle}",
  "totalStages": number,
  "totalEstimatedWeeks": number,
  "stages": [
    {
      "stageNumber": number,
      "title": string,
      "focusSkills": string[],
      "durationWeeks": number,
      "difficulty": string,
      "description": string,
      "modules": [{ "id": string, "title": string, "completed": boolean, "duration": string }],
      "practicalAssignment": { "title": string, "missionSlug": string, "xpReward": number },
      "assessmentTrigger": string
    }
  ],
  "recommendationSummary": string
}`;

  const result = await llm.generateStructuredJSON(
    prompt,
    "You are AGENT 4: LEARNING RESEARCHER in SkillPath AI. You construct actionable pedagogical curriculum prioritizing free open educational resources.",
    fallbackGenerator
  );

  const durationMs = Date.now() - startTime;
  return {
    agentId: "agent-4-learning-researcher",
    agentName: "Learning Recommendation Agent (Learning Researcher)",
    status: "Completed",
    executionTimeMs: durationMs,
    mode: result.mode,
    data: result.data
  };
}
