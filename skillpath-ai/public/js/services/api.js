// public/js/services/api.js
// SkillPath AI - Frontend API Service & Remote Agent Connector

const API_BASE = window.location.origin;

class ApiService {
  constructor() {
    this.token = localStorage.getItem("skillpath_token") || null;
  }

  setToken(t) {
    this.token = t;
    if (t) localStorage.setItem("skillpath_token", t);
    else localStorage.removeItem("skillpath_token");
  }

  async request(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `API error ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(`[API Call Failed: ${endpoint}]`, err);
      throw err;
    }
  }

  // Health
  getHealth() {
    return this.request("/api/health");
  }

  // Auth
  login(email, password) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  }

  register(userData) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    });
  }

  // Profile
  getProfile(studentId = null) {
    const q = studentId ? `?id=${studentId}` : "";
    return this.request(`/api/profile${q}`);
  }

  updateProfile(updates) {
    return this.request("/api/profile", {
      method: "PUT",
      body: JSON.stringify(updates)
    });
  }

  // Careers
  getCareers() {
    return this.request("/api/careers");
  }

  // Individual Agents
  analyzeSkills(studentId) {
    return this.request("/api/agents/analyze-skills", {
      method: "POST",
      body: JSON.stringify({ studentId })
    });
  }

  matchCareer(studentId, careerSlug) {
    return this.request("/api/agents/match-career", {
      method: "POST",
      body: JSON.stringify({ studentId, careerSlug })
    });
  }

  predictGaps(studentId, careerSlug) {
    return this.request("/api/agents/predict-gaps", {
      method: "POST",
      body: JSON.stringify({ studentId, careerSlug })
    });
  }

  generateRoadmap(studentId, careerSlug) {
    return this.request("/api/agents/generate-roadmap", {
      method: "POST",
      body: JSON.stringify({ studentId, careerSlug })
    });
  }

  // Central Orchestration
  runOrchestration(studentId, targetCareerSlug = null, triggerContext = "Manual Run") {
    return this.request("/api/agents/orchestrate", {
      method: "POST",
      body: JSON.stringify({ studentId, targetCareerSlug, triggerContext })
    });
  }

  // Assessments
  getAssessments() {
    return this.request("/api/assessments");
  }

  submitAssessment(studentId, assessmentId, answers) {
    return this.request("/api/assessment/submit", {
      method: "POST",
      body: JSON.stringify({ studentId, assessmentId, answers })
    });
  }

  // Project Lab
  getProjects() {
    return this.request("/api/projects");
  }

  evaluateProject(studentId, projectId, submissionData) {
    return this.request("/api/projects/evaluate", {
      method: "POST",
      body: JSON.stringify({ studentId, projectId, submissionData })
    });
  }

  // Roadmap tasks
  toggleRoadmapTask(stageNumber, moduleId) {
    return this.request("/api/roadmap/toggle-task", {
      method: "POST",
      body: JSON.stringify({ stageNumber, moduleId })
    });
  }

  // Progress Analytics
  getProgress() {
    return this.request("/api/progress");
  }

  // Agent Activity Logs
  getAgentActivity() {
    return this.request("/api/agents/activity");
  }

  // AI Mentor Chat
  chatMentor(studentId, message, history = []) {
    return this.request("/api/mentor/chat", {
      method: "POST",
      body: JSON.stringify({ studentId, message, history })
    });
  }

  // Export Passport
  exportPassport() {
    return this.request("/api/export-passport");
  }
}

export const api = new ApiService();
