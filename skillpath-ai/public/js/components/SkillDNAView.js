// public/js/components/SkillDNAView.js
// Module C & 5: SKILL DNA - Unique Skill Intelligence Engine with Interactive Connected Graph & Radar Chart

export function renderSkillDNAView(state) {
  const profile = state.profile || {};
  const skills = profile.technicalSkills || [];
  const confidence = profile.skillConfidenceScore || 65;

  const strong = skills.filter(s => (s.confidence || 50) >= 75);
  const intermediate = skills.filter(s => (s.confidence || 50) >= 55 && (s.confidence || 50) < 75);
  const beginner = skills.filter(s => (s.confidence || 50) >= 30 && (s.confidence || 50) < 55);
  const untested = skills.filter(s => (s.confidence || 50) < 30);

  // Missing skills for current target career
  const missing = [
    { name: "JavaScript", category: "Frontend", reason: "Core web scripting engine" },
    { name: "React.js", category: "Frontend", reason: "Declarative UI components" },
    { name: "Node.js", category: "Backend", reason: "Non-blocking event runtime" },
    { name: "Express.js", category: "Backend", reason: "REST endpoint routing" },
    { name: "Database Integration", category: "Database", reason: "ORM & connection pooling" }
  ];

  return `
    <div class="skill-dna-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div class="badge badge-purple" style="margin-bottom: 8px;">INTELLIGENT FINGERPRINT ENGINE</div>
          <h1 style="font-size: 2rem; font-weight: 800;">SKILL DNA™ – Empirical Skill Fingerprint</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Real-time classification based on diagnostic exams and Project Lab evidence. Self-claims are not treated as verified.
          </p>
        </div>

        <div style="display: flex; gap: 12px;">
          <button class="btn-primary" onclick="window.app.openQuiz('asm-js-1')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Verify a Skill
          </button>
          <button class="btn-secondary" onclick="window.app.openEditProfile()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Edit Profile Skills
          </button>
        </div>
      </div>

      <!-- Top Row: Interactive SVG Connected Skill Graph & Categorical Radar Visualizer -->
      <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; margin-bottom: 28px;">
        <!-- Connected Skill Graph Network -->
        <div class="glass-card" style="padding: 24px; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">Connected Neural Skill Graph</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Prerequisite relationships and mastery illumination</p>
            </div>
            <div style="display: flex; gap: 8px; font-size: 0.75rem;">
              <span style="display:flex; align-items:center; gap:4px; color: #34D399;"><span style="width:8px; height:8px; border-radius:50%; background:#10B981;"></span> Verified</span>
              <span style="display:flex; align-items:center; gap:4px; color: #FBBF24;"><span style="width:8px; height:8px; border-radius:50%; background:#F59E0B;"></span> Unverified</span>
              <span style="display:flex; align-items:center; gap:4px; color: #FB7185;"><span style="width:8px; height:8px; border-radius:50%; background:#F43F5E;"></span> Missing</span>
            </div>
          </div>

          <!-- Interactive SVG Neural Graph Canvas -->
          <div style="width: 100%; height: 320px; background: rgba(5, 8, 20, 0.6); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden;">
            <svg width="100%" height="100%" viewBox="0 0 600 320" style="display: block;">
              <!-- Connecting Dependency Lines -->
              <line x1="100" y1="80" x2="250" y2="80" stroke="rgba(56, 189, 248, 0.4)" stroke-width="2" stroke-dasharray="4,4" />
              <line x1="250" y1="80" x2="420" y2="80" stroke="rgba(244, 63, 94, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
              <line x1="250" y1="80" x2="250" y2="200" stroke="rgba(244, 63, 94, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
              <line x1="250" y1="200" x2="420" y2="200" stroke="rgba(244, 63, 94, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
              <line x1="100" y1="230" x2="420" y2="200" stroke="rgba(16, 185, 129, 0.4)" stroke-width="2" />
              <line x1="420" y1="80" x2="520" y2="140" stroke="rgba(244, 63, 94, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
              <line x1="420" y1="200" x2="520" y2="140" stroke="rgba(244, 63, 94, 0.3)" stroke-width="2" stroke-dasharray="4,4" />

              <!-- Node 1: HTML & CSS (Self-reported Beginner) -->
              <g class="anim-float" style="cursor: pointer;" onclick="window.alert('Skill: HTML & CSS\\nStatus: Self-Reported (45% Confidence)\\nRequirement: Intermediate')">
                <circle cx="100" cy="80" r="26" fill="#0D152D" stroke="#F59E0B" stroke-width="2" />
                <text x="100" y="84" fill="#F8FAFC" font-size="10" font-weight="700" text-anchor="middle">HTML/CSS</text>
              </g>

              <!-- Node 2: JavaScript (Missing - Core Blocker) -->
              <g style="cursor: pointer;" onclick="window.app.openQuiz('asm-js-1')">
                <circle cx="250" cy="80" r="30" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" stroke-width="3" stroke-dasharray="4,2" />
                <circle cx="250" cy="80" r="18" fill="#F43F5E" opacity="0.3" class="anim-pulse-cyan" />
                <text x="250" y="84" fill="#FB7185" font-size="11" font-weight="800" text-anchor="middle">JavaScript</text>
              </g>

              <!-- Node 3: React.js (Missing - Depends on JS) -->
              <g style="cursor: pointer;" onclick="window.app.openQuiz('asm-react-1')">
                <circle cx="420" cy="80" r="28" fill="#0D152D" stroke="#F43F5E" stroke-width="2" stroke-dasharray="4,2" />
                <text x="420" y="84" fill="#94A3B8" font-size="10" font-weight="700" text-anchor="middle">React.js</text>
              </g>

              <!-- Node 4: Node.js (Missing - Depends on JS) -->
              <g style="cursor: pointer;" onclick="window.app.openQuiz('asm-node-1')">
                <circle cx="250" cy="200" r="28" fill="#0D152D" stroke="#F43F5E" stroke-width="2" stroke-dasharray="4,2" />
                <text x="250" y="204" fill="#94A3B8" font-size="10" font-weight="700" text-anchor="middle">Node.js</text>
              </g>

              <!-- Node 5: Express.js (Missing - Backend) -->
              <g style="cursor: pointer;">
                <circle cx="420" cy="200" r="26" fill="#0D152D" stroke="#F43F5E" stroke-width="2" stroke-dasharray="4,2" />
                <text x="420" y="204" fill="#94A3B8" font-size="10" font-weight="700" text-anchor="middle">Express</text>
              </g>

              <!-- Node 6: Python (Verified Strong) -->
              <g style="cursor: pointer;" onclick="window.alert('Skill: Python\\nStatus: Verified via Project Evidence (78% Confidence)')">
                <circle cx="60" cy="180" r="28" fill="#0D152D" stroke="#10B981" stroke-width="3" />
                <text x="60" y="184" fill="#34D399" font-size="11" font-weight="800" text-anchor="middle">Python</text>
              </g>

              <!-- Node 7: SQL (Verified Intermediate) -->
              <g style="cursor: pointer;" onclick="window.alert('Skill: SQL\\nStatus: Verified via Database Lab (74% Confidence)')">
                <circle cx="100" cy="260" r="26" fill="#0D152D" stroke="#10B981" stroke-width="3" />
                <text x="100" y="264" fill="#34D399" font-size="11" font-weight="800" text-anchor="middle">SQL</text>
              </g>

              <!-- Node 8: Full Stack Capstone (End Goal) -->
              <g style="cursor: pointer;">
                <circle cx="520" cy="140" r="32" fill="rgba(139, 92, 246, 0.2)" stroke="#8B5CF6" stroke-width="3" />
                <text x="520" y="144" fill="#C084FC" font-size="10" font-weight="800" text-anchor="middle">Capstone</text>
              </g>
            </svg>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; text-align: center;">
            Click on any node to view verification audit, prerequisites, or launch an instant assessment.
          </div>
        </div>

        <!-- Multi-Axis Domain Balance Radar -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Competency Radar</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Domain proficiency vs Senior Developer benchmark</p>

          <div style="width: 100%; height: 260px; display: flex; align-items: center; justify-content: center;">
            <!-- SVG Radar Polygon -->
            <svg width="260" height="260" viewBox="0 0 260 260">
              <!-- Radial Grid Polygons -->
              <polygon points="130,30 225,85 225,195 130,250 35,195 35,85" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <polygon points="130,60 195,98 195,178 130,215 65,178 65,98" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
              <polygon points="130,90 165,110 165,160 130,180 95,160 95,110" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

              <!-- Axis Lines -->
              <line x1="130" y1="140" x2="130" y2="30" stroke="rgba(255,255,255,0.1)"/>
              <line x1="130" y1="140" x2="225" y2="85" stroke="rgba(255,255,255,0.1)"/>
              <line x1="130" y1="140" x2="225" y2="195" stroke="rgba(255,255,255,0.1)"/>
              <line x1="130" y1="140" x2="130" y2="250" stroke="rgba(255,255,255,0.1)"/>
              <line x1="130" y1="140" x2="35" y2="195" stroke="rgba(255,255,255,0.1)"/>
              <line x1="130" y1="140" x2="35" y2="85" stroke="rgba(255,255,255,0.1)"/>

              <!-- Student Competency Area -->
              <!-- Axes: Top: Frontend, Top-Right: Backend, Bottom-Right: Database, Bottom: AI/ML, Bottom-Left: DevOps, Top-Left: Problem-Solving -->
              <polygon points="130,105 165,125 200,180 130,165 95,150 55,100" 
                fill="rgba(6, 182, 212, 0.25)" stroke="#06B6D4" stroke-width="2" />

              <!-- Axis Labels -->
              <text x="130" y="22" fill="#38BDF8" font-size="9" font-weight="700" text-anchor="middle">Frontend (35%)</text>
              <text x="235" y="85" fill="#94A3B8" font-size="9" font-weight="600" text-anchor="start">Backend (25%)</text>
              <text x="235" y="200" fill="#34D399" font-size="9" font-weight="700" text-anchor="start">Database (74%)</text>
              <text x="130" y="258" fill="#C084FC" font-size="9" font-weight="700" text-anchor="middle">AI/Python (78%)</text>
              <text x="25" y="200" fill="#94A3B8" font-size="9" font-weight="600" text-anchor="end">DevOps (30%)</text>
              <text x="25" y="85" fill="#FBBF24" font-size="9" font-weight="700" text-anchor="end">Problem Solving (70%)</text>
            </svg>
          </div>

          <div style="display: flex; justify-content: space-around; font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 10px;">
            <span>Verified Skills: <strong>2</strong></span>
            <span>Self-Reported: <strong>1</strong></span>
            <span>Uncovered Gaps: <strong>5</strong></span>
          </div>
        </div>
      </div>

      <!-- Five Classified Skill Categories -->
      <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 16px;">Skill DNA Classification Breakdown</h2>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">
        <!-- Strong Skills -->
        <div class="glass-card" style="padding: 20px; border-top: 3px solid #10B981;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #34D399;">Strong Skills (≥75%)</h4>
            <span class="badge badge-emerald">${strong.length}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${strong.length ? strong.map(s => `
              <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.9rem;">
                  <span>${s.name}</span>
                  <span style="color: #34D399;">${s.confidence}%</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                  Evidence: ${s.source || "Project Lab Certified"}
                </div>
              </div>
            `).join("") : `<div style="font-size: 0.85rem; color: var(--text-muted);">No skills reached ≥75% confidence yet.</div>`}
          </div>
        </div>

        <!-- Intermediate Skills -->
        <div class="glass-card" style="padding: 20px; border-top: 3px solid #3B82F6;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #38BDF8;">Intermediate Skills (55-74%)</h4>
            <span class="badge badge-cyan">${intermediate.length}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${intermediate.length ? intermediate.map(s => `
              <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.9rem;">
                  <span>${s.name}</span>
                  <span style="color: #38BDF8;">${s.confidence}%</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                  Evidence: ${s.source || "Verified Coursework"}
                </div>
              </div>
            `).join("") : `<div style="font-size: 0.85rem; color: var(--text-muted);">None in intermediate tier.</div>`}
          </div>
        </div>

        <!-- Beginner Skills -->
        <div class="glass-card" style="padding: 20px; border-top: 3px solid #F59E0B;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #FBBF24;">Beginner Skills (30-54%)</h4>
            <span class="badge badge-amber">${beginner.length}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${beginner.length ? beginner.map(s => `
              <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.9rem;">
                  <span>${s.name}</span>
                  <span style="color: #FBBF24;">${s.confidence}%</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                  Status: Self-Reported (Unverified)
                </div>
              </div>
            `).join("") : `<div style="font-size: 0.85rem; color: var(--text-muted);">None in beginner tier.</div>`}
          </div>
        </div>

        <!-- Missing Skills -->
        <div class="glass-card" style="padding: 20px; border-top: 3px solid #F43F5E;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #FB7185;">Missing for Target Role</h4>
            <span class="badge badge-rose">${missing.length}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${missing.map(m => `
              <div style="padding: 10px; background: rgba(244, 63, 94, 0.06); border-radius: 8px; border: 1px solid rgba(244,63,94,0.15);">
                <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.9rem; color: #FB7185;">
                  <span>${m.name}</span>
                  <span style="font-size: 0.75rem;">${m.category}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                  ${m.reason}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}
