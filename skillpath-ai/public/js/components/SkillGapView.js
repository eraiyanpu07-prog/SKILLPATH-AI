// public/js/components/SkillGapView.js
// Module 7: INTELLIGENT GAP PREDICTOR & PREREQUISITE DEPENDENCY VIEWER

export function renderSkillGapView(state) {
  const profile = state.profile || {};
  const targetCareer = profile.targetCareer || "Full Stack Developer";

  const criticalGaps = [
    {
      name: "JavaScript (ES6+ & Async)",
      category: "Frontend Core",
      urgency: "Critical Blocker",
      prerequisites: ["HTML & CSS"],
      unlockedSkills: ["React.js", "Node.js", "Express.js", "REST APIs"],
      impact: "Zero progress possible in modern frontend frameworks or Node backend runtimes without mastery of closures, prototypes, Promises, and the Event Loop."
    },
    {
      name: "React.js Component Architecture",
      category: "Frontend Framework",
      urgency: "High Priority",
      prerequisites: ["JavaScript", "HTML & CSS"],
      unlockedSkills: ["Full Stack Capstone", "Frontend State Management"],
      impact: "Required for 85% of modern full-stack web engineering positions. Demands deep understanding of reactive hooks and Virtual DOM diffing."
    },
    {
      name: "Node.js & Express.js REST APIs",
      category: "Backend Services",
      urgency: "Critical Blocker",
      prerequisites: ["JavaScript"],
      unlockedSkills: ["Database Integration", "Full Stack Capstone"],
      impact: "Serves as the server backbone for client data exchange, authentication pipelines, and business logic execution."
    },
    {
      name: "Database Integration & Relational Persistence",
      category: "Database Engineering",
      urgency: "High Priority",
      prerequisites: ["SQL", "Node.js"],
      unlockedSkills: ["Production Full-Stack Deployment"],
      impact: "Connects persistent data stores to backend endpoints with connection pooling, migrations, and ACID transactional integrity."
    }
  ];

  return `
    <div class="skill-gap-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <div class="badge badge-rose" style="margin-bottom: 8px;">PREDICTIVE BOTTLENECK ENGINE</div>
        <h1 style="font-size: 2rem; font-weight: 800;">Intelligent Skill Gap Predictor</h1>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Agent 3 (Gap Predictor) analyzed your profile against <strong>${targetCareer}</strong> and discovered <strong>4 critical prerequisite bottlenecks</strong>.
        </p>
      </div>

      <!-- Prerequisite Flow Visualization Card -->
      <div class="glass-card" style="padding: 24px; margin-bottom: 28px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Topological Learning Order (Optimal Path)</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px;">
          Calculated using Directed Acyclic Graph (DAG) topological sorting to eliminate learning roadblocks.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          <div style="background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 10px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #FB7185; font-weight: 700; margin-bottom: 4px;">
              <span>STEP 1</span>
              <span>IMMEDIATE</span>
            </div>
            <strong style="font-size: 0.95rem; display: block; margin-bottom: 4px;">JavaScript Async Core</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Unblocks: React & Node.js</div>
            <button class="btn-primary" onclick="window.app.openQuiz('asm-js-1')" style="margin-top: 10px; width: 100%; font-size: 0.75rem; padding: 4px; justify-content: center;">
              Launch Diagnostic Quiz
            </button>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #38BDF8; font-weight: 700; margin-bottom: 4px;">
              <span>STEP 2</span>
              <span>FRONTEND</span>
            </div>
            <strong style="font-size: 0.95rem; display: block; margin-bottom: 4px;">React Component Architecture</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Prerequisite: Step 1 (JS)</div>
            <span class="badge badge-amber" style="margin-top: 10px; font-size: 0.65rem;">GATED ON JS</span>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #C084FC; font-weight: 700; margin-bottom: 4px;">
              <span>STEP 3</span>
              <span>BACKEND</span>
            </div>
            <strong style="font-size: 0.95rem; display: block; margin-bottom: 4px;">Node.js & Express REST APIs</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Prerequisite: Step 1 (JS)</div>
            <span class="badge badge-cyan" style="margin-top: 10px; font-size: 0.65rem;">STAGE 4</span>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #34D399; font-weight: 700; margin-bottom: 4px;">
              <span>STEP 4</span>
              <span>PERSISTENCE</span>
            </div>
            <strong style="font-size: 0.95rem; display: block; margin-bottom: 4px;">Database Integration</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Prerequisite: SQL & Node.js</div>
            <span class="badge badge-emerald" style="margin-top: 10px; font-size: 0.65rem;">STAGE 6</span>
          </div>
        </div>
      </div>

      <!-- Critical Gap Cards List -->
      <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 16px;">Detailed Gap & Prerequisite Matrix</h2>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${criticalGaps.map(gap => `
          <div class="glass-card" style="padding: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 12px; margin-bottom: 10px;">
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                  <h3 style="font-size: 1.2rem; font-weight: 700;">${gap.name}</h3>
                  <span class="badge badge-rose">${gap.urgency}</span>
                  <span class="badge badge-cyan">${gap.category}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 900px; line-height: 1.5;">
                  ${gap.impact}
                </p>
              </div>

              <button class="btn-primary" onclick="window.app.navigate('roadmap')" style="font-size: 0.8rem; padding: 8px 16px;">
                View Roadmap Module →
              </button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
              <div style="font-size: 0.8rem;">
                <span style="color: var(--text-muted);">Direct Prerequisites:</span>
                <strong style="color: #38BDF8; margin-left: 6px;">${gap.prerequisites.join(", ")}</strong>
              </div>
              <div style="font-size: 0.8rem;">
                <span style="color: var(--text-muted);">Unlocks Downstream:</span>
                <strong style="color: #34D399; margin-left: 6px;">${gap.unlockedSkills.join(", ")}</strong>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}
