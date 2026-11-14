// public/js/app.js
// SKILLPATH AI - Master Application Controller & Reactive State Bus

import { api } from "./services/api.js";
import { renderNavbar } from "./components/Navbar.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderLandingPage } from "./components/LandingPage.js";
import { renderDashboardView } from "./components/DashboardView.js";
import { renderSkillDNAView } from "./components/SkillDNAView.js";
import { renderCareerTwinView } from "./components/CareerTwinView.js";
import { renderSkillGapView } from "./components/SkillGapView.js";
import { renderRoadmapView } from "./components/RoadmapView.js";
import { renderProjectLabView } from "./components/ProjectLabView.js";
import { renderAnalyticsView } from "./components/AnalyticsView.js";
import { renderMentorChatView } from "./components/MentorChatView.js";
import { renderAgentCenterView } from "./components/AgentCenterView.js";
import { renderProfileView } from "./components/ProfileView.js";
import { renderPassportModal } from "./components/PassportModal.js";
import { renderAssessmentModal, renderAssessmentResultModal } from "./components/AssessmentModal.js";
import { renderSubmitMissionModal } from "./components/SubmitMissionModal.js";
import { renderAuthModal } from "./components/AuthModal.js";

class SkillPathApp {
  constructor() {
    this.state = {
      currentPage: "landing",
      profile: null,
      careers: [],
      activeRoadmap: null,
      assessments: [],
      projects: [],
      agentLogs: [],
      progressAnalytics: {},
      chatMessages: [],
      activeModal: null, // "auth", "passport", "quiz", "quiz-result", "submit-mission"
      modalData: null,
      orchestrationRunning: false,
      compareCareerSlug: "ai-engineer"
    };

    window.app = this;
  }

  async init() {
    console.log("[SkillPath AI] Initializing client state...");
    try {
      // 1. Fetch initial profile
      const profRes = await api.getProfile().catch(() => null);
      if (profRes && profRes.profile) {
        this.state.profile = profRes.profile;
        this.state.activeRoadmap = profRes.activeRoadmap;
      }

      // 2. Fetch careers list
      const carRes = await api.getCareers().catch(() => null);
      if (carRes && carRes.careers) {
        this.state.careers = carRes.careers;
      }

      // 3. Fetch assessments list
      const asmRes = await api.getAssessments().catch(() => null);
      if (asmRes && asmRes.assessments) {
        this.state.assessments = asmRes.assessments;
      }

      // 4. Fetch project lab missions
      const projRes = await api.getProjects().catch(() => null);
      if (projRes && projRes.projects) {
        this.state.projects = projRes.projects;
      }

      // 5. Fetch agent logs
      const logRes = await api.getAgentActivity().catch(() => null);
      if (logRes && logRes.logs) {
        this.state.agentLogs = logRes.logs;
      }

      // 6. Fetch progress analytics
      const progRes = await api.getProgress().catch(() => null);
      if (progRes && progRes.analytics) {
        this.state.progressAnalytics = progRes.analytics;
      }

      // Initialize default active page from URL hash if present
      const hash = window.location.hash.replace("#", "");
      if (hash && ["landing", "dashboard", "skill-dna", "career-twin", "skill-gap", "roadmap", "project-lab", "analytics", "mentor-chat", "agent-center", "profile", "passport"].includes(hash)) {
        this.state.currentPage = hash;
      }

      this.render();
    } catch (err) {
      console.error("[SkillPath Init Error]", err);
      this.render();
    }
  }

  navigate(pageId) {
    if (pageId === "passport") {
      this.openPassport();
      return;
    }
    this.state.currentPage = pageId;
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.render();
  }

  // Career Switching (Scenario 2: Career Goal Change)
  async switchCareer(careerSlug) {
    try {
      const selected = this.state.careers.find(c => c.slug === careerSlug);
      if (!selected) return;

      console.log(`[Career Switcher] Target changed to: ${selected.title}`);
      const res = await api.updateProfile({
        targetCareer: selected.title,
        targetCareerId: selected.slug
      });

      if (res && res.profile) {
        this.state.profile = res.profile;
      }

      // Refresh roadmap & logs
      const profRes = await api.getProfile();
      this.state.activeRoadmap = profRes.activeRoadmap;

      const logRes = await api.getAgentActivity();
      this.state.agentLogs = logRes.logs;

      this.showToast(`Target switched to ${selected.title}! AI Council recalculated roadmap & readiness.`);
      this.render();
    } catch (err) {
      this.showToast(`Error switching career: ${err.message}`, "error");
    }
  }

  setCompareCareer(careerSlug) {
    this.state.compareCareerSlug = careerSlug;
    this.render();
  }

  // Trigger Multi-Agent Orchestration Run
  async runCouncilOrchestration() {
    this.state.orchestrationRunning = true;
    this.render();

    try {
      this.showToast("Initiating 6-agent collaboration pipeline...");
      const res = await api.runOrchestration(
        this.state.profile?.id || "student-alex",
        this.state.profile?.targetCareerId || "full-stack-developer",
        "Interactive Console Run"
      );

      if (res && res.orchestration) {
        this.state.profile = res.orchestration.student;
        this.state.activeRoadmap = { stages: res.orchestration.results.learningRoadmap.data.stages };
      }

      const logRes = await api.getAgentActivity();
      this.state.agentLogs = logRes.logs;

      this.showToast("Multi-Agent Council completed diagnostic pass! Metrics updated.");
    } catch (err) {
      this.showToast(`Orchestration error: ${err.message}`, "error");
    } finally {
      this.state.orchestrationRunning = false;
      this.render();
    }
  }

  // Toggle Module in Roadmap
  async toggleRoadmapTask(stageNumber, moduleId) {
    try {
      const res = await api.toggleRoadmapTask(stageNumber, moduleId);
      if (res && res.activeRoadmap) {
        this.state.activeRoadmap = res.activeRoadmap;
        this.render();
      }
    } catch (err) {
      this.showToast("Error updating module task", "error");
    }
  }

  // Assessments & Learning Rescue System
  openQuiz(assessmentId) {
    const asm = this.state.assessments.find(a => a.id === assessmentId) || this.state.assessments[0];
    this.state.activeModal = "quiz";
    this.state.modalData = asm;
    this.render();
  }

  closeQuiz() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.render();
  }

  async submitQuizForm(assessmentId) {
    const form = document.getElementById("assessmentForm");
    if (!form) return;

    const formData = new FormData(form);
    const answers = {};

    for (const [key, val] of formData.entries()) {
      if (key.startsWith("question_")) {
        const qId = key.replace("question_", "");
        answers[qId] = parseInt(val, 10);
      }
    }

    try {
      this.showToast("Agent 5 (Performance Evaluator) grading responses...");
      const res = await api.submitAssessment(this.state.profile?.id || "student-alex", assessmentId, answers);

      this.state.activeModal = "quiz-result";
      this.state.modalData = res.evaluation;
      if (res.profile) {
        this.state.profile = res.profile;
      }

      // Refresh roadmap in case Learning Rescue injected a drill
      const profRes = await api.getProfile();
      this.state.activeRoadmap = profRes.activeRoadmap;

      const logRes = await api.getAgentActivity();
      this.state.agentLogs = logRes.logs;

      this.render();
    } catch (err) {
      this.showToast(`Error submitting quiz: ${err.message}`, "error");
    }
  }

  closeQuizResult() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.render();
  }

  // Project Lab Missions
  openSubmitMission(missionId) {
    const mission = this.state.projects.find(p => p.id === missionId);
    this.state.activeModal = "submit-mission";
    this.state.modalData = mission;
    this.render();
  }

  closeSubmitMission() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.render();
  }

  async submitMissionArtifact(missionId) {
    const repoUrl = document.getElementById("subRepoUrl")?.value;
    const demoUrl = document.getElementById("subDemoUrl")?.value;
    const notes = document.getElementById("subNotes")?.value;

    try {
      this.showToast("Agent 5 evaluating submission against production rubrics...");
      const res = await api.evaluateProject(this.state.profile?.id || "student-alex", missionId, {
        repositoryUrl: repoUrl,
        liveDemoUrl: demoUrl,
        notes
      });

      this.closeSubmitMission();

      if (res.profile) {
        this.state.profile = res.profile;
      }

      // Refresh roadmap & logs
      const profRes = await api.getProfile();
      this.state.activeRoadmap = profRes.activeRoadmap;

      const logRes = await api.getAgentActivity();
      this.state.agentLogs = logRes.logs;

      this.showToast(`Mission Certified! +${res.evaluation.xpEarned} XP awarded. Readiness is now ${res.newReadiness}%.`);
      this.render();
    } catch (err) {
      this.showToast(`Error grading project: ${err.message}`, "error");
    }
  }

  // Proof-of-Skill Passport
  async openPassport() {
    try {
      const res = await api.exportPassport();
      this.state.activeModal = "passport";
      this.state.modalData = res.passport;
      this.render();
    } catch (err) {
      this.showToast("Failed to generate Passport credential", "error");
    }
  }

  closePassport() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.render();
  }

  downloadPassportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.modalData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SkillPath_Passport_${this.state.profile?.fullName || "Alex"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // Profile Editor
  async saveProfileChanges() {
    const fullName = document.getElementById("profFullName")?.value;
    const educationLevel = document.getElementById("profEduLevel")?.value;
    const availableHoursPerDay = parseInt(document.getElementById("profHours")?.value || "3", 10);
    const institution = document.getElementById("profInstitution")?.value;
    const degree = document.getElementById("profDegree")?.value;
    const targetCareer = document.getElementById("profCareer")?.value;
    const preferredLearningStyle = document.getElementById("profStyle")?.value;

    try {
      this.showToast("Saving profile updates & synchronizing with AI Council...");
      const res = await api.updateProfile({
        fullName,
        educationLevel,
        availableHoursPerDay,
        institution,
        degree,
        targetCareer,
        preferredLearningStyle,
        technicalSkills: this.state.profile.technicalSkills
      });

      if (res && res.profile) {
        this.state.profile = res.profile;
      }

      this.showToast("Profile successfully updated!");
      this.render();
    } catch (err) {
      this.showToast(`Update error: ${err.message}`, "error");
    }
  }

  addSkillPrompt() {
    const name = window.prompt("Enter new Technical Skill name (e.g. TypeScript, GraphQL, Docker):");
    if (!name || !name.trim()) return;

    const prof = window.prompt("Enter proficiency (Beginner, Intermediate, Advanced):", "Beginner");
    const newSkill = {
      name: name.trim(),
      proficiency: prof || "Beginner",
      verified: false,
      source: "Self-Reported",
      confidence: 40
    };

    const skills = [...(this.state.profile.technicalSkills || []), newSkill];
    this.state.profile.technicalSkills = skills;
    this.render();
    this.showToast(`Added ${name.trim()} (Pending Assessment Verification). Click 'Save & Update Profile'.`);
  }

  deleteSkill(index) {
    const skills = [...(this.state.profile.technicalSkills || [])];
    const removed = skills.splice(index, 1);
    this.state.profile.technicalSkills = skills;
    this.render();
    this.showToast(`Removed skill ${removed[0]?.name}.`);
  }

  // AI Mentor Chatbot ("Vera")
  async submitChatInput() {
    const input = document.getElementById("chatInput");
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = "";
    await this.sendChatMessage(text);
  }

  async sendChatMessage(userText) {
    const userMsg = {
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.state.chatMessages.push(userMsg);
    this.render();

    // Scroll chat to bottom
    setTimeout(() => {
      const container = document.getElementById("chatMessagesContainer");
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);

    try {
      const res = await api.chatMentor(this.state.profile?.id || "student-alex", userText, this.state.chatMessages);
      const mentorReply = res.data?.reply || "I am analyzing your query with our specialist agents.";

      const veraMsg = {
        sender: "vera",
        text: mentorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.state.chatMessages.push(veraMsg);
      this.render();

      setTimeout(() => {
        const container = document.getElementById("chatMessagesContainer");
        if (container) container.scrollTop = container.scrollHeight;
      }, 50);
    } catch (err) {
      this.showToast("Vera is momentarily offline", "error");
    }
  }

  // Auth & Demo Alex Loader
  openAuth(isRegister = false) {
    this.state.activeModal = "auth";
    this.state.modalData = { isRegister };
    this.render();
  }

  closeAuth() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.render();
  }

  async quickLoginDemoAlex() {
    try {
      const res = await api.login("alex@skillpath.ai", "demo");
      if (res && res.profile) {
        this.state.profile = res.profile;
        api.setToken(res.token);
      }
      this.closeAuth();
      this.showToast("Signed in as Demo Student: Alex Rivera (CS Student)");
      this.navigate("dashboard");
    } catch (err) {
      this.showToast("Demo sign in failed", "error");
    }
  }

  openDemoAlex() {
    this.quickLoginDemoAlex();
  }

  async submitAuthForm(isRegister) {
    const email = document.getElementById("authEmail")?.value;
    const password = document.getElementById("authPassword")?.value;

    try {
      let res;
      if (isRegister) {
        const name = document.getElementById("authName")?.value;
        res = await api.register({ name, email, password });
      } else {
        res = await api.login(email, password);
      }

      if (res && res.profile) {
        this.state.profile = res.profile;
        api.setToken(res.token);
      }

      this.closeAuth();
      this.showToast(`Welcome ${res.profile?.fullName || "Learner"}!`);
      this.navigate("dashboard");
    } catch (err) {
      this.showToast(`Authentication failed: ${err.message}`, "error");
    }
  }

  showToast(message, type = "success") {
    const existing = document.getElementById("appToast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "appToast";
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.right = "24px";
    toast.style.background = type === "error" ? "rgba(244, 63, 94, 0.95)" : "rgba(13, 21, 45, 0.95)";
    toast.style.border = `1px solid ${type === "error" ? "#FB7185" : "var(--border-glow)"}`;
    toast.style.color = "#FFF";
    toast.style.padding = "14px 20px";
    toast.style.borderRadius = "12px";
    toast.style.boxShadow = "0 8px 30px rgba(0,0,0,0.5)";
    toast.style.zIndex = "2000";
    toast.style.fontSize = "0.9rem";
    toast.style.fontWeight = "600";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${type === "error" ? "⚠️" : "⚡"}</span>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s ease";
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  render() {
    const appEl = document.getElementById("app");
    if (!appEl) return;

    const page = this.state.currentPage;

    // Render active page module
    let pageContent = "";
    if (page === "landing") {
      pageContent = renderLandingPage();
    } else if (page === "dashboard") {
      pageContent = renderDashboardView(this.state);
    } else if (page === "skill-dna") {
      pageContent = renderSkillDNAView(this.state);
    } else if (page === "career-twin") {
      pageContent = renderCareerTwinView(this.state);
    } else if (page === "skill-gap") {
      pageContent = renderSkillGapView(this.state);
    } else if (page === "roadmap") {
      pageContent = renderRoadmapView(this.state);
    } else if (page === "project-lab") {
      pageContent = renderProjectLabView(this.state);
    } else if (page === "analytics") {
      pageContent = renderAnalyticsView(this.state);
    } else if (page === "mentor-chat") {
      pageContent = renderMentorChatView(this.state);
    } else if (page === "agent-center") {
      pageContent = renderAgentCenterView(this.state);
    } else if (page === "profile") {
      pageContent = renderProfileView(this.state);
    } else {
      pageContent = renderDashboardView(this.state);
    }

    // Modal layer
    let modalContent = "";
    if (this.state.activeModal === "auth") {
      modalContent = renderAuthModal(this.state.modalData?.isRegister);
    } else if (this.state.activeModal === "passport") {
      modalContent = renderPassportModal(this.state.modalData);
    } else if (this.state.activeModal === "quiz") {
      modalContent = renderAssessmentModal(this.state.modalData);
    } else if (this.state.activeModal === "quiz-result") {
      modalContent = renderAssessmentResultModal(this.state.modalData);
    } else if (this.state.activeModal === "submit-mission") {
      modalContent = renderSubmitMissionModal(this.state.modalData);
    }

    // Shell container: if on landing page, display hero full width; otherwise show sidebar navigation
    if (page === "landing") {
      appEl.innerHTML = `
        ${renderNavbar(this.state)}
        <main>${pageContent}</main>
        ${modalContent}
      `;
    } else {
      appEl.innerHTML = `
        ${renderNavbar(this.state)}
        <div style="display: flex; min-height: calc(100vh - 68px);">
          ${renderSidebar(page)}
          <main style="flex: 1; overflow-x: hidden; background: rgba(5, 8, 20, 0.4);">${pageContent}</main>
        </div>
        ${modalContent}
      `;
    }
  }
}

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new SkillPathApp();
  app.init();
});
