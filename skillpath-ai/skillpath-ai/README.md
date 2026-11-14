# SKILLPATH AI – Your Skills. Your Future.

> **Tagline:** Discover Your Skills. Predict Your Gaps. Engineer Your Future.  
> **Architecture:** Collaborative Multi-Agent Autonomous Career Learning Ecosystem

---

## 1. Project Overview

**SKILLPATH AI** is an intelligent, full-stack career development ecosystem powered by six collaborating AI agents. Rather than functioning as a standard video course directory, SKILLPATH AI audits each student's current technical abilities, detects prerequisite bottlenecks, simulates their digital **Career Twin**, generates personalized learning roadmaps, and dynamically adapts based on real-world project submissions and assessment performance.

### The Platform Answers 5 Fundamental Questions:
1. **What skills do I currently have?** *(Answered by Skill Detective & Skill DNA)*
2. **What skills am I missing?** *(Answered by Career Architect & Gap Predictor)*
3. **What career can I realistically pursue?** *(Answered by Career Twin & Comparison Matrix)*
4. **What should I learn next?** *(Answered by Learning Researcher & Adaptive Roadmap)*
5. **Am I becoming market-ready?** *(Answered by Performance Evaluator & Proof-of-Skill Passport)*

---

## 2. Six Specialized Backend AI Agents

SKILLPATH AI features six distinct backend agent modules that communicate through a central orchestrator (`server/agents/orchestrator.js`):

| Agent | Module | Core Responsibility |
|---|---|---|
| **Agent 1: Skill Detective** | `server/agents/skillAgent.js` | Audits learner profile, classifies skills into 5 tiers, computes verified confidence scores without taking self-claims as fact. |
| **Agent 2: Career Architect** | `server/agents/careerAgent.js` | Calculates mathematically weighted career readiness against market blueprints and constructs the digital Career Twin. |
| **Agent 3: Gap Predictor** | `server/agents/gapAgent.js` | Traverses prerequisite trees (e.g., JS before React), isolates critical bottlenecks, and builds topological learning dependencies. |
| **Agent 4: Learning Researcher** | `server/agents/learningAgent.js` | Synthesizes an adaptive multi-stage curriculum prioritizing free open-access documentation, tutorials, and practical missions. |
| **Agent 5: Performance Evaluator** | `server/agents/progressAgent.js` | Grades diagnostic assessments, evaluates Project Lab submissions against rubrics, and triggers the Learning Rescue System. |
| **Agent 6: Vera (AI Career Mentor)** | `server/agents/mentorAgent.js` | Coordinates all agent outputs, provides context-aware conversational guidance, explains roadmap changes, and suggests daily focus. |

---

## 3. Key Differentiating Features

### A. Skill DNA™ – Empirical Skill Fingerprint
- Classifies skills into **Strong** (≥75%), **Intermediate** (55-74%), **Beginner** (30-54%), **Missing**, and **Untested**.
- Interactive SVG **Connected Neural Skill Graph** illustrating prerequisite connections.
- 6-axis **Competency Radar Chart** mapping domain balance.
- Strict confidence weighting: unverified self-reported skills are capped until proven by code labs or assessments.

### B. Career Twin & Career Time Machine
- Simulates 6 major tech careers:
  - **Full Stack Developer**
  - **AI Engineer**
  - **Data Scientist**
  - **Cybersecurity Analyst**
  - **Cloud & DevOps Engineer**
  - **UI/UX Product Designer**
- Instant dynamic recalculation of readiness, matching skills, and missing gaps upon career switching.
- **Side-by-Side Comparison Tool**: Directly compare salary potential, growth rates, overlapping strengths, and time-to-hire.

### C. Learning Rescue System™
- Automatically triggered when an assessment score drops below 50%.
- Diagnoses weak concepts and checks prerequisite knowledge.
- Injects a remedial recovery module into Stage 1 of the student's active roadmap.

### D. Project Lab & Mission Rubrics
- Real-world missions (Developer Portfolio, Dynamic Budget Tracker, React Kanban Manager, RESTful API with Auth, Full-Stack Capstone).
- Rubric-based evaluation certifying demonstrated skills into Skill DNA and awarding XP.

### E. Proof-of-Skill Passport™
- Verifiable digital credential displaying assessment scores, completed missions, verified skills, and a cryptographic verification hash.
- Exportable to PDF/print format and downloadable as structured JSON.

---

## 4. Technology Stack

- **Backend:** Node.js (ESM native) with REST API routing.
- **Database:** Mongoose/MongoDB compatible document store with disk persistence (`data/db.json`) and seed engine.
- **Frontend:** Responsive Single-Page Application (SPA) with CSS glassmorphism, animated SVG charts, and interactive modals.
- **AI Integration:** Configurable Google Gemini API (`gemini-1.5-flash`) with realistic rule-based agent fallback for 100% offline functionality.

---

## 5. Quick Start & Execution

### Prerequisites
- Node.js (v18+ or v26+)

### Installation & Run
```bash
# 1. Navigate to the project directory
cd skillpath-ai

# 2. Start the server
node server/server.js
```

### Accessing the Web Application
Open your browser and navigate to:
```
http://localhost:5000
```

### Default Preloaded Learner (Alex Rivera)
- **Role:** 1st Year Computer Science Undergraduate
- **Target Career:** Full Stack Developer
- **Baseline Skills:** Python (Intermediate), SQL (Intermediate), HTML & CSS (Beginner)
- **Missing Skills:** JavaScript, React.js, Node.js, Express.js, Database Integration

---

## 6. How to Test the 3 Adaptive Scenarios

### Scenario 1: Learning Rescue System Trigger
1. In the sidebar, navigate to **Adaptive Roadmap** or **Dashboard**.
2. Click **"Take JavaScript Benchmark Quiz"**.
3. Select deliberate incorrect answers to score under 50% and click **"Submit Assessment"**.
4. Observe the **Learning Rescue System Triggered** alert modal diagnosing weak concepts.
5. Close the modal and inspect Stage 1 of your roadmap: observe the injected **`[LEARNING RESCUE] Remedial Recovery`** module!

### Scenario 2: Dynamic Career Goal Switch
1. In the sidebar, navigate to **Career Twin**.
2. In the "Active Career" selector, switch from **Full Stack Developer** to **AI Engineer** or **Data Scientist**.
3. Notice that Career Readiness instantly recalculates (Python and SQL immediately provide a ~52-58% readiness baseline), missing skills update, and the AI Council recalculates the roadmap while **preserving all your earned achievements**.

### Scenario 3: Project Lab Submission & Verification
1. In the sidebar, navigate to **Project Lab**.
2. On Mission 1 ("Responsive Developer Portfolio"), click **"Submit for Evaluation"**.
3. Provide your repository link and architecture notes, then click **"Submit & Verify Code Proof"**.
4. Observe Agent 5 grading the rubrics, awarding +137 XP, certifying demonstrated skills, and updating your Career Readiness score in real-time!

---

## 7. REST API Endpoints

- `POST /api/auth/register` – Register new student account
- `POST /api/auth/login` – Login (or quick demo login)
- `GET /api/profile` – Fetch current learner profile and active roadmap
- `PUT /api/profile` – Update profile, target career, or skills inventory
- `GET /api/careers` – List all 6 career role blueprints
- `POST /api/agents/analyze-skills` – Trigger Agent 1 (Skill Detective)
- `POST /api/agents/match-career` – Trigger Agent 2 (Career Architect)
- `POST /api/agents/predict-gaps` – Trigger Agent 3 (Gap Predictor)
- `POST /api/agents/generate-roadmap` – Trigger Agent 4 (Learning Researcher)
- `POST /api/agents/evaluate-progress` – Trigger Agent 5 (Performance Evaluator)
- `POST /api/agents/orchestrate` – Trigger Central Multi-Agent Orchestrator
- `POST /api/assessment/submit` – Submit quiz & evaluate rescue triggers
- `POST /api/projects/evaluate` – Submit project mission for rubric grading
- `GET /api/progress` – Velocity, XP, streak, and recent learning events
- `GET /api/agents/activity` – Live audit stream of agent tasks and logs
- `POST /api/mentor/chat` – Conversational chat with Vera (AI Mentor)
- `GET /api/export-passport` – Export verified Proof-of-Skill Passport credential
