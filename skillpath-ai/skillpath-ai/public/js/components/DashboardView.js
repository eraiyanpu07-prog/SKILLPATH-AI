// public/js/components/DashboardView.js
// Module 4 & D: Main Futuristic Control Center Dashboard

export function renderDashboardView(state) {
  const profile = state.profile || {};
  const roadmap = state.activeRoadmap || {};
  const stages = roadmap.stages || [];
  const currentStage = stages.find(s => s.status === "in-progress") || stages[0] || {};
  const readiness = profile.careerReadiness || 38;
  const confidence = profile.skillConfidenceScore || 65;
  const xp = profile.xp || 420;
  const level = profile.level || 3;
  const streak = profile.streakDays || 4;
  const targetCareer = profile.targetCareer || "Full Stack Developer";

  // Calculate SVG circular gauge parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readiness / 100) * circumference;

  return `
    <div class="dashboard-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Top Welcome Banner -->
      <div class="glass-card" style="padding: 24px 28px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; border-left: 4px solid var(--accent-cyan);">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <h1 style="font-size: 1.8rem; font-weight: 700;">Welcome back, <span class="gradient-text-cyan">${profile.fullName || "Alex Rivera"}</span></h1>
            <span class="badge badge-emerald">LEVEL ${level}</span>
            <span class="badge badge-amber" title="${streak} days in a row!"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.5 3 4 5 4 9 0 4-3 7-7 7s-7-3-7-7c0-4 2.5-6 4-9 0 2 1.5 4 3 4s3-2 3-4z"/></svg> ${streak} DAY STREAK</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Target Role: <strong style="color: var(--text-primary);">${targetCareer}</strong> • Institution: ${profile.institution || "CS Undergrad"}
          </p>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn-primary" onclick="window.app.runCouncilOrchestration()" style="font-size: 0.9rem; padding: 10px 18px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            Trigger AI Council Run
          </button>
          <button class="btn-secondary" onclick="window.app.openPassport()" style="font-size: 0.9rem; padding: 10px 18px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Skill Passport
          </button>
        </div>
      </div>

      <!-- Main Metric Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 24px;">
        <!-- Career Readiness Meter -->
        <div class="glass-card" style="padding: 22px; display: flex; align-items: center; gap: 20px;">
          <div style="position: relative; width: 140px; height: 140px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
            <svg width="140" height="140" style="transform: rotate(-90deg);">
              <circle cx="70" cy="70" r="${radius}" stroke="rgba(255, 255, 255, 0.08)" stroke-width="10" fill="transparent" />
              <circle cx="70" cy="70" r="${radius}" stroke="url(#cyanGrad)" stroke-width="10" fill="transparent"
                stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round" style="transition: stroke-dashoffset 1s ease;" />
              <defs>
                <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#3B82F6" />
                  <stop offset="100%" stop-color="#00F2FE" />
                </linearGradient>
              </defs>
            </svg>
            <div style="position: absolute; text-align: center;">
              <div style="font-size: 1.8rem; font-weight: 800; line-height: 1;" class="gradient-text-cyan">${readiness}%</div>
              <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-top: 4px;">Readiness</div>
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">Career Twin</div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin: 4px 0;">Market Readiness</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              Weighted score against hiring standards for ${targetCareer}. Benchmark: <strong>80%</strong>.
            </p>
            <button class="btn-outline-cyan" onclick="window.app.navigate('career-twin')" style="margin-top: 8px; font-size: 0.75rem; padding: 4px 10px;">
              Explore Career Twin →
            </button>
          </div>
        </div>

        <!-- Skill DNA Confidence Index -->
        <div class="glass-card" style="padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <div style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; text-transform: uppercase;">Skill Fingerprint</div>
            <span class="badge badge-purple">${confidence}% Conf.</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 10px;">Skill DNA Confidence</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
            Factored from verified assessments and project lab evidence vs self-reported data.
          </p>
          <div class="progress-track" style="margin-bottom: 8px;">
            <div class="progress-fill progress-fill-purple" style="width: ${confidence}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
            <span>Self-Reported: 35%</span>
            <span>Empirical Verified: 65%</span>
          </div>
          <button class="btn-secondary" onclick="window.app.navigate('skill-dna')" style="margin-top: 10px; width: 100%; font-size: 0.8rem; padding: 6px; justify-content: center;">
            Inspect Skill DNA Graph →
          </button>
        </div>

        <!-- Experience & Progression -->
        <div class="glass-card" style="padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <div style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 700; text-transform: uppercase;">Progression</div>
            <span class="badge badge-emerald">${xp} XP</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Level ${level} Apprentice</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
            Earn XP by passing benchmark assessments and submitting Project Lab missions.
          </p>
          <div class="progress-track" style="margin-bottom: 8px;">
            <div class="progress-fill progress-fill-emerald" style="width: ${(xp % 500) / 5}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
            <span>Current: ${xp} XP</span>
            <span>Next Level: ${Math.ceil(xp / 500) * 500} XP</span>
          </div>
          <button class="btn-secondary" onclick="window.app.navigate('project-lab')" style="margin-top: 10px; width: 100%; font-size: 0.8rem; padding: 6px; justify-content: center;">
            Open Project Lab Missions →
          </button>
        </div>
      </div>

      <!-- Mid Section: Daily Focus & Current Active Roadmap Stage -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; margin-bottom: 24px;">
        <!-- Today's Recommended Task from Vera -->
        <div class="glass-card-purple" style="padding: 24px; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #10B981;" class="anim-pulse-cyan"></div>
              <strong style="color: #C084FC; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Vera's Daily Focus Briefing</strong>
            </div>
            <button class="btn-outline-cyan" onclick="window.app.navigate('mentor-chat')" style="font-size: 0.75rem; padding: 4px 10px;">
              Chat With Vera
            </button>
          </div>

          <h3 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 8px;">
            Master JavaScript Async & Complete Stage 1 Portfolio
          </h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 16px;">
            Your career gap analysis indicates that JavaScript asynchronous fundamentals are the immediate prerequisite for 5 downstream modules (React, Node, Express, APIs, DB). Today, dedicate 45 minutes to Promise chains and event loops, then test your understanding.
          </p>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-primary" onclick="window.app.openQuiz('asm-js-1')" style="font-size: 0.85rem; padding: 8px 16px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Take JavaScript Benchmark Quiz
            </button>
            <button class="btn-secondary" onclick="window.app.navigate('roadmap')" style="font-size: 0.85rem; padding: 8px 16px;">
              View Stage 1 Checklist
            </button>
          </div>
        </div>

        <!-- Active Roadmap Stage Preview -->
        <div class="glass-card" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">Active Learning Stage</div>
            <span class="badge badge-cyan">STAGE ${currentStage.stageNumber || 1} OF ${stages.length || 8}</span>
          </div>

          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 4px;">
            ${currentStage.title || "HTML5 & Modern Responsive CSS"}
          </h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;">
            ${currentStage.description || "Foundational semantic structure and responsive layouts."}
          </p>

          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
            <span>Stage Progress</span>
            <strong style="color: var(--accent-cyan);">${currentStage.completionPercentage || 50}%</strong>
          </div>
          <div class="progress-track" style="margin-bottom: 16px;">
            <div class="progress-fill" style="width: ${currentStage.completionPercentage || 50}%;"></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(currentStage.modules || []).slice(0, 3).map(mod => `
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                <span style="display: flex; align-items: center; gap: 8px; color: ${mod.completed ? 'var(--accent-emerald)' : 'var(--text-primary)'};">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="${mod.completed ? 'var(--accent-emerald)' : 'none'}" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    ${mod.completed ? '<polyline points="9 12 12 15 16 10"/>' : ''}
                  </svg>
                  ${mod.title}
                </span>
                <span style="color: var(--text-muted); font-size: 0.75rem;">${mod.duration}</span>
              </div>
            `).join("")}
          </div>

          <button class="btn-secondary" onclick="window.app.navigate('roadmap')" style="margin-top: 14px; width: 100%; font-size: 0.8rem; padding: 8px; justify-content: center;">
            Full Adaptive Roadmap →
          </button>
        </div>
      </div>

      <!-- Bottom Grid: AI Council Activity & Critical Skill Gaps Alert -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <!-- Live AI Agent Activity Stream -->
        <div class="glass-card" style="padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Live AI Council Activity
            </h3>
            <button class="btn-outline-cyan" onclick="window.app.navigate('agent-center')" style="font-size: 0.75rem; padding: 4px 10px;">
              Control Room
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 8px; border-left: 3px solid #3B82F6;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94A3B8; margin-bottom: 2px;">
                <span style="font-weight: 600; color: #38BDF8;">Skill Detective (Agent 1)</span>
                <span>Just Now</span>
              </div>
              <div style="font-size: 0.85rem;">Audited technical skills: verified 2 skills via lab evidence, 1 pending quiz.</div>
            </div>

            <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 8px; border-left: 3px solid #8B5CF6;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94A3B8; margin-bottom: 2px;">
                <span style="font-weight: 600; color: #C084FC;">Career Architect (Agent 2)</span>
                <span>Just Now</span>
              </div>
              <div style="font-size: 0.85rem;">Calculated ${readiness}% Career Readiness for ${targetCareer}. Found 6 required skills missing.</div>
            </div>

            <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 8px; border-left: 3px solid #06B6D4;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94A3B8; margin-bottom: 2px;">
                <span style="font-weight: 600; color: #00F2FE;">Gap Predictor (Agent 3)</span>
                <span>Just Now</span>
              </div>
              <div style="font-size: 0.85rem;">Built prerequisite dependency tree: JavaScript is the primary gatekeeper for React.js & Node.js.</div>
            </div>
          </div>
        </div>

        <!-- Critical Skill Gaps & Action Center -->
        <div class="glass-card" style="padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-rose)" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Critical Skill Bottlenecks
            </h3>
            <button class="btn-outline-cyan" onclick="window.app.navigate('skill-gap')" style="font-size: 0.75rem; padding: 4px 10px;">
              Gap Details
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 8px;">
              <div>
                <strong style="color: #FB7185; font-size: 0.9rem;">JavaScript (ES6+ & Async)</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Required Level: Advanced • Core Blocker</div>
              </div>
              <button class="btn-primary" onclick="window.app.openQuiz('asm-js-1')" style="font-size: 0.75rem; padding: 4px 10px;">
                Quiz
              </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 8px;">
              <div>
                <strong style="font-size: 0.9rem;">React.js</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Depends on JavaScript • Weight: 18%</div>
              </div>
              <span class="badge badge-amber">WAITING ON JS</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 8px;">
              <div>
                <strong style="font-size: 0.9rem;">Node.js & Express REST APIs</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Backend Server Runtime • Weight: 15%</div>
              </div>
              <span class="badge badge-cyan">STAGE 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
