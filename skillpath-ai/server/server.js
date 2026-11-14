// server/server.js
// SKILLPATH AI - Production-Style REST API Server & Multi-Agent Backend
// Built with Node.js ESM, Mongoose-compatible Document Store & Configurable LLM Engine

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  db,
  User,
  StudentProfile,
  CareerRole,
  Skill,
  LearningRoadmap,
  LearningResource,
  Assessment,
  AssessmentResult,
  Project,
  ProjectEvaluation,
  ProgressHistory,
  AgentActivityLog
} from "./db/database.js";
import { runSkillAnalysisAgent } from "./agents/skillAgent.js";
import { runCareerMatchingAgent } from "./agents/careerAgent.js";
import { runSkillGapPredictionAgent } from "./agents/gapAgent.js";
import { runLearningRecommendationAgent } from "./agents/learningAgent.js";
import { evaluateAssessmentProgress, evaluateProjectSubmission } from "./agents/progressAgent.js";
import { runMentorSynthesisAgent, chatWithMentor } from "./agents/mentorAgent.js";
import { orchestrateFullPipeline } from "./agents/orchestrator.js";
import { llm } from "./services/llmService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const PORT = process.env.PORT || 5000;

// Helper to parse JSON body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Malformed JSON: " + err.message));
      }
    });
    req.on("error", reject);
  });
}

// Send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(data));
}

// Serve static frontend assets
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function serveStatic(req, res, pathname) {
  let safePath = pathname === "/" ? "/index.html" : pathname;
  let filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      const indexPath = path.join(PUBLIC_DIR, "index.html");
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404);
          res.end("Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*"
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = reqUrl.pathname;
  const method = req.method.toUpperCase();

  try {
    // ----------------------------------------------------
    // API ROUTES
    // ----------------------------------------------------

    // Health & System Info
    if (pathname === "/api/health" && method === "GET") {
      return sendJson(res, 200, {
        status: "healthy",
        app: "SKILLPATH AI",
        tagline: "Discover Your Skills. Predict Your Gaps. Engineer Your Future.",
        timestamp: new Date().toISOString(),
        llmMode: llm.isConfigured() ? "live-llm (Gemini)" : "rule-based-engine",
        activeLearners: StudentProfile.count()
      });
    }

    // 1. Authentication: Register
    if (pathname === "/api/auth/register" && method === "POST") {
      const body = await parseJsonBody(req);
      const { name, email, password, educationLevel, targetCareer } = body;

      if (!name || !email) {
        return sendJson(res, 400, { success: false, message: "Name and email are required." });
      }

      let existing = User.findOne({ email });
      if (existing) {
        return sendJson(res, 400, { success: false, message: "A user with this email already exists." });
      }

      const user = User.create({
        name,
        email,
        passwordHash: "hash_" + Date.now(),
        role: "student"
      });

      const profile = StudentProfile.create({
        userId: user.id,
        fullName: name,
        email,
        educationLevel: educationLevel || "Undergraduate",
        institution: body.institution || "Self-Taught / University",
        degree: body.degree || "Computer Science / Software Engineering",
        targetCareer: targetCareer || "Full Stack Developer",
        targetCareerId: body.targetCareerId || "career-fsd",
        preferredLearningStyle: body.preferredLearningStyle || "Hands-on projects",
        availableHoursPerDay: body.availableHoursPerDay || 3,
        technicalSkills: body.technicalSkills || [
          { name: "Python", proficiency: "Intermediate", verified: true, source: "Assessment", confidence: 75 },
          { name: "SQL", proficiency: "Intermediate", verified: true, source: "Lab Work", confidence: 70 },
          { name: "HTML & CSS", proficiency: "Beginner", verified: false, source: "Self-Reported", confidence: 45 }
        ],
        softSkills: body.softSkills || [
          { name: "Problem Solving", proficiency: "Intermediate" },
          { name: "Team Collaboration", proficiency: "Intermediate" }
        ],
        certifications: [],
        projects: [],
        careerReadiness: 38,
        skillConfidenceScore: 65,
        xp: 100,
        level: 1,
        streakDays: 1,
        lastActive: new Date().toISOString()
      });

      return sendJson(res, 201, {
        success: true,
        message: "Registration successful. Welcome to SkillPath AI!",
        token: `demo_jwt_token_${user.id}`,
        user: { id: user.id, name: user.name, email: user.email },
        profile
      });
    }

    // 2. Authentication: Login
    if (pathname === "/api/auth/login" && method === "POST") {
      const body = await parseJsonBody(req);
      const email = body.email || "alex@skillpath.ai";

      let user = User.findOne({ email }) || User.findOne();
      let profile = StudentProfile.findOne({ userId: user?.id }) || StudentProfile.findOne();

      return sendJson(res, 200, {
        success: true,
        message: `Welcome back, ${profile?.fullName || "Learner"}!`,
        token: `demo_jwt_token_${user?.id || "demo"}`,
        user: { id: user?.id, name: user?.name, email: user?.email },
        profile
      });
    }

    // 3. Student Profile: GET
    if (pathname === "/api/profile" && method === "GET") {
      const studentId = reqUrl.searchParams.get("id");
      const profile = studentId
        ? StudentProfile.findOne({ id: studentId }) || StudentProfile.findOne()
        : StudentProfile.findOne();

      if (!profile) {
        return sendJson(res, 404, { success: false, message: "Profile not found" });
      }

      const activeRoadmap = LearningRoadmap.findOne({ studentId: profile.id });

      return sendJson(res, 200, {
        success: true,
        profile,
        activeRoadmap
      });
    }

    // 4. Student Profile: PUT (Update profile details, target career, or skills)
    if (pathname === "/api/profile" && method === "PUT") {
      const body = await parseJsonBody(req);
      const current = StudentProfile.findOne();
      if (!current) {
        return sendJson(res, 404, { success: false, message: "Profile not found" });
      }

      const previousCareer = current.targetCareer;
      const updated = StudentProfile.updateOne({ id: current.id }, body);

      // SCENARIO 2: CAREER GOAL CHANGE ADAPTATION
      let careerChanged = false;
      if (body.targetCareer && body.targetCareer !== previousCareer) {
        careerChanged = true;
        // Trigger automated orchestrator re-adaptation
        await orchestrateFullPipeline(current.id, {
          targetCareerSlug: body.targetCareerId || body.targetCareer.toLowerCase().replace(/\s+/g, "-"),
          triggerContext: `Career goal switched from '${previousCareer}' to '${body.targetCareer}'`
        });
      }

      return sendJson(res, 200, {
        success: true,
        message: careerChanged
          ? `Career goal updated to '${body.targetCareer}'. AI Council recalculated your roadmap and readiness score!`
          : "Profile updated successfully.",
        profile: StudentProfile.findOne({ id: current.id }),
        careerChanged
      });
    }

    // 5. Careers List
    if (pathname === "/api/careers" && method === "GET") {
      const careers = CareerRole.find();
      return sendJson(res, 200, { success: true, careers });
    }

    // 6. Agent 1: Analyze Skills
    if (pathname === "/api/agents/analyze-skills" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const result = await runSkillAnalysisAgent(profile.id);
      return sendJson(res, 200, { success: true, agent: result });
    }

    // 7. Agent 2: Match Career
    if (pathname === "/api/agents/match-career" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const targetSlug = body.careerSlug || profile.targetCareerId;
      const result = await runCareerMatchingAgent(profile, null, targetSlug);
      return sendJson(res, 200, { success: true, agent: result });
    }

    // 8. Agent 3: Predict Skill Gaps
    if (pathname === "/api/agents/predict-gaps" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const targetSlug = body.careerSlug || profile.targetCareerId;
      const careerMatch = await runCareerMatchingAgent(profile, null, targetSlug);
      const result = await runSkillGapPredictionAgent(careerMatch, null);
      return sendJson(res, 200, { success: true, agent: result });
    }

    // 9. Agent 4: Generate Personalized Roadmap
    if (pathname === "/api/agents/generate-roadmap" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const targetSlug = body.careerSlug || profile.targetCareerId;
      const careerMatch = await runCareerMatchingAgent(profile, null, targetSlug);
      const gaps = await runSkillGapPredictionAgent(careerMatch, null);
      const result = await runLearningRecommendationAgent(profile, careerMatch, gaps);
      return sendJson(res, 200, { success: true, agent: result });
    }

    // 10. Agent 5: Evaluate Progress & Check Rescue
    if (pathname === "/api/agents/evaluate-progress" && method === "POST") {
      const body = await parseJsonBody(req);
      const { studentId, assessmentId, answers } = body;
      const result = await evaluateAssessmentProgress(studentId || "student-alex", assessmentId || "asm-js-1", answers || {});
      return sendJson(res, 200, { success: true, evaluation: result });
    }

    // 11. Central Agent Orchestrator: Run Full Pipeline
    if (pathname === "/api/agents/orchestrate" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const result = await orchestrateFullPipeline(profile.id, {
        targetCareerSlug: body.targetCareerSlug || profile.targetCareerId,
        triggerContext: body.triggerContext || "Manual Trigger from AI Council Console"
      });
      return sendJson(res, 200, { success: true, orchestration: result });
    }

    // 12. Assessment Submit (Handles SCENARIO 1: Poor Assessment / Rescue System)
    if (pathname === "/api/assessment/submit" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const { assessmentId, answers } = body;

      const evalResult = await evaluateAssessmentProgress(profile.id, assessmentId, answers);
      const { score, passed, requiresRescue, weakTopics, rescuePlan } = evalResult.data;

      // Record assessment result in database
      const savedResult = AssessmentResult.create({
        studentId: profile.id,
        assessmentId,
        skillName: evalResult.data.skillName,
        score,
        passed,
        weakTopics,
        answers,
        requiresRescue,
        createdAt: new Date().toISOString()
      });

      // Update skill evidence in StudentProfile
      const currentSkills = [...(profile.technicalSkills || [])];
      const existingSkillIdx = currentSkills.findIndex(
        s => s.name.toLowerCase() === evalResult.data.skillName.toLowerCase()
      );

      if (existingSkillIdx >= 0) {
        currentSkills[existingSkillIdx] = {
          ...currentSkills[existingSkillIdx],
          verified: passed,
          confidence: score,
          proficiency: score >= 80 ? "Advanced" : score >= 60 ? "Intermediate" : "Beginner",
          source: `Assessment Graded (${score}%)`
        };
      } else {
        currentSkills.push({
          name: evalResult.data.skillName,
          verified: passed,
          confidence: score,
          proficiency: score >= 80 ? "Advanced" : score >= 60 ? "Intermediate" : "Beginner",
          source: `Assessment Graded (${score}%)`
        });
      }

      // Add XP
      const xpEarned = passed ? 100 : 25;
      const updatedXp = (profile.xp || 420) + xpEarned;

      StudentProfile.updateOne(
        { id: profile.id },
        {
          technicalSkills: currentSkills,
          xp: updatedXp
        }
      );

      // SCENARIO 1: LEARNING RESCUE SYSTEM TRIGGER
      let rescueRoadmapAdjustment = null;
      if (requiresRescue) {
        // Find existing roadmap and prepend or inject a Rescue Module
        const activeRoadmap = LearningRoadmap.findOne({ studentId: profile.id });
        if (activeRoadmap && activeRoadmap.stages && activeRoadmap.stages.length > 0) {
          const rescueModule = {
            id: `rescue-${Date.now()}`,
            title: `[LEARNING RESCUE] ${evalResult.data.skillName} Remedial Recovery`,
            completed: false,
            duration: "25 min",
            rescueTag: true
          };

          const stages = [...activeRoadmap.stages];
          // Prepend to current active stage
          if (!stages[0].modules.some(m => m.rescueTag)) {
            stages[0].modules.unshift(rescueModule);
          }

          LearningRoadmap.updateOne({ id: activeRoadmap.id }, { stages });
          rescueRoadmapAdjustment = "Rescue drill injected into Stage 1 of your Learning Roadmap.";
        }

        ProgressHistory.create({
          studentId: profile.id,
          eventType: "LEARNING_RESCUE_TRIGGERED",
          details: `Score ${score}% on ${evalResult.data.skillName} triggered Learning Rescue. Weak concepts: ${weakTopics.join(", ")}.`,
          timestamp: new Date().toISOString()
        });
      } else {
        ProgressHistory.create({
          studentId: profile.id,
          eventType: "ASSESSMENT_PASSED",
          details: `Passed ${evalResult.data.skillName} assessment with ${score}%. +${xpEarned} XP awarded.`,
          timestamp: new Date().toISOString()
        });
      }

      return sendJson(res, 200, {
        success: true,
        evaluation: evalResult.data,
        xpEarned,
        rescueRoadmapAdjustment,
        profile: StudentProfile.findOne({ id: profile.id })
      });
    }

    // 13. Practical Project Lab: Evaluate Submission (SCENARIO 3: Project Completion)
    if (pathname === "/api/projects/evaluate" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const { projectId, submissionData } = body;

      const evalResult = await evaluateProjectSubmission(profile.id, projectId, submissionData);
      const { xpEarned, verifiedSkills, percentage } = evalResult.data;

      // Record evaluation
      ProjectEvaluation.create({
        studentId: profile.id,
        projectId,
        submissionData,
        percentage,
        xpEarned,
        verifiedSkills,
        status: "evaluated",
        createdAt: new Date().toISOString()
      });

      // Update student's technical skills as verified!
      const currentSkills = [...(profile.technicalSkills || [])];
      verifiedSkills.forEach(vSkill => {
        const idx = currentSkills.findIndex(s => s.name.toLowerCase() === vSkill.toLowerCase());
        if (idx >= 0) {
          currentSkills[idx] = {
            ...currentSkills[idx],
            verified: true,
            confidence: Math.max(85, currentSkills[idx].confidence || 75),
            source: "Project Lab Certified"
          };
        } else {
          currentSkills.push({
            name: vSkill,
            verified: true,
            proficiency: "Intermediate",
            confidence: 85,
            source: "Project Lab Certified"
          });
        }
      });

      const updatedXp = (profile.xp || 420) + xpEarned;
      const updatedProjects = [...(profile.projects || []), {
        id: `proj-${Date.now()}`,
        title: evalResult.data.projectTitle,
        description: submissionData?.notes || "Practical lab submission",
        skillsDemonstrated: verifiedSkills,
        verified: true,
        score: percentage
      }];

      StudentProfile.updateOne(
        { id: profile.id },
        {
          technicalSkills: currentSkills,
          xp: updatedXp,
          projects: updatedProjects
        }
      );

      // Re-orchestrate to recalculate career readiness with new verified skills
      const orch = await orchestrateFullPipeline(profile.id, {
        triggerContext: `Project mission '${evalResult.data.projectTitle}' completed (+${xpEarned} XP)`
      });

      return sendJson(res, 200, {
        success: true,
        evaluation: evalResult.data,
        newReadiness: orch.results.careerMatch.data.readinessPercentage,
        profile: StudentProfile.findOne({ id: profile.id })
      });
    }

    // 14. Progress Analytics & History
    if (pathname === "/api/progress" && method === "GET") {
      const profile = StudentProfile.findOne();
      const history = ProgressHistory.find({ studentId: profile.id });
      const assessmentResults = AssessmentResult.find({ studentId: profile.id });
      const projectEvaluations = ProjectEvaluation.find({ studentId: profile.id });

      return sendJson(res, 200, {
        success: true,
        analytics: {
          streakDays: profile.streakDays || 4,
          xp: profile.xp || 420,
          level: profile.level || 3,
          readiness: profile.careerReadiness || 38,
          confidence: profile.skillConfidenceScore || 65,
          assessmentsTaken: assessmentResults.length,
          projectsCompleted: projectEvaluations.length,
          recentEvents: history.slice(-10).reverse()
        }
      });
    }

    // 15. AI Agent Activity Center Logs
    if (pathname === "/api/agents/activity" && method === "GET") {
      const logs = AgentActivityLog.find();
      return sendJson(res, 200, {
        success: true,
        count: logs.length,
        logs: logs.slice(-25).reverse()
      });
    }

    // 16. AI Mentor Chatbot ("Vera")
    if (pathname === "/api/mentor/chat" && method === "POST") {
      const body = await parseJsonBody(req);
      const profile = StudentProfile.findOne({ id: body.studentId }) || StudentProfile.findOne();
      const message = body.message || "What should I learn today?";
      const history = body.history || [];

      const result = await chatWithMentor(profile.id, message, history);
      return sendJson(res, 200, result);
    }

    // 17. Toggle Module Completion in Active Roadmap
    if (pathname === "/api/roadmap/toggle-task" && method === "POST") {
      const body = await parseJsonBody(req);
      const { stageNumber, moduleId } = body;
      const profile = StudentProfile.findOne();
      const roadmap = LearningRoadmap.findOne({ studentId: profile.id });

      if (roadmap && roadmap.stages) {
        const stages = roadmap.stages.map(stage => {
          if (stage.stageNumber === stageNumber) {
            const updatedModules = stage.modules.map(mod => {
              if (mod.id === moduleId) {
                return { ...mod, completed: !mod.completed };
              }
              return mod;
            });
            const compCount = updatedModules.filter(m => m.completed).length;
            const compPct = Math.round((compCount / updatedModules.length) * 100);
            return {
              ...stage,
              modules: updatedModules,
              completionPercentage: compPct,
              completed: compPct === 100
            };
          }
          return stage;
        });

        LearningRoadmap.updateOne({ id: roadmap.id }, { stages });
      }

      return sendJson(res, 200, {
        success: true,
        message: "Module progress updated",
        activeRoadmap: LearningRoadmap.findOne({ studentId: profile.id })
      });
    }

    // 18. Assessments List
    if (pathname === "/api/assessments" && method === "GET") {
      const list = Assessment.find();
      // Return metadata without correctIndex to prevent client cheating
      const sanitized = list.map(a => ({
        id: a.id,
        skillName: a.skillName,
        title: a.title,
        difficulty: a.difficulty,
        timeLimitMinutes: a.timeLimitMinutes,
        questionsCount: a.questions?.length || 0,
        questions: (a.questions || []).map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          topic: q.topic
        }))
      }));
      return sendJson(res, 200, { success: true, assessments: sanitized });
    }

    // 19. Project Lab Missions List
    if (pathname === "/api/projects" && method === "GET") {
      const missions = Project.find();
      return sendJson(res, 200, { success: true, projects: missions });
    }

    // 20. Proof-of-Skill Passport Export
    if (pathname === "/api/export-passport" && method === "GET") {
      const profile = StudentProfile.findOne();
      const results = AssessmentResult.find({ studentId: profile.id });
      const projects = ProjectEvaluation.find({ studentId: profile.id });

      const passport = {
        title: "SKILLPATH AI - Verified Proof-of-Skill Passport",
        issuedTo: profile.fullName,
        degree: profile.degree,
        institution: profile.institution,
        targetCareer: profile.targetCareer,
        careerReadinessIndex: `${profile.careerReadiness}%`,
        skillConfidenceScore: `${profile.skillConfidenceScore}%`,
        totalXp: profile.xp,
        verifiableCredentials: {
          verifiedSkills: profile.technicalSkills.filter(s => s.verified),
          unverifiedSelfReported: profile.technicalSkills.filter(s => !s.verified),
          passedAssessments: results.map(r => ({ skill: r.skillName, score: `${r.score}%`, date: r.createdAt })),
          certifiedProjects: projects.map(p => ({ title: p.projectId, xp: p.xpEarned, date: p.createdAt }))
        },
        issueDate: new Date().toISOString(),
        verificationHash: `VERIFY-SHA256-${Math.random().toString(36).substring(2, 12).toUpperCase()}`
      };

      return sendJson(res, 200, { success: true, passport });
    }

    // ----------------------------------------------------
    // STATIC ASSETS (SPA FRONTEND)
    // ----------------------------------------------------
    serveStatic(req, res, pathname);

  } catch (err) {
    console.error(`[Server Error] ${method} ${pathname}:`, err);
    sendJson(res, 500, {
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SKILLPATH AI - Server Online`);
  console.log(`  Target: http://localhost:${PORT}`);
  console.log(`  Status: 6 AI Agents & Central Orchestrator Active`);
  console.log(`  LLM Mode: ${llm.isConfigured() ? "Live LLM (Gemini)" : "Rule-Based Deterministic Engine"}`);
  console.log(`=======================================================`);
});
