// public/js/components/CareerTwinView.js
// Module D & 6: CAREER TIME MACHINE & DIGITAL CAREER TWIN
// Dynamic Career Switcher, Real-Time Recalculation, and Side-by-Side Career Comparison Matrix

export function renderCareerTwinView(state) {
  const profile = state.profile || {};
  const careers = state.careers || [];
  const currentSlug = profile.targetCareerId || "full-stack-developer";
  const activeCareer = careers.find(c => c.slug === currentSlug) || careers[0] || {};
  const readiness = profile.careerReadiness || 38;

  // Comparison state (defaults to comparing current career with AI Engineer or Data Scientist)
  const compareCareerSlug = state.compareCareerSlug || (currentSlug === "ai-engineer" ? "full-stack-developer" : "ai-engineer");
  const compareCareer = careers.find(c => c.slug === compareCareerSlug) || careers[1] || {};

  return `
    <div class="career-twin-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Title & Switcher Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div class="badge badge-cyan" style="margin-bottom: 8px;">DIGITAL TWIN SIMULATION ENGINE</div>
          <h1 style="font-size: 2rem; font-weight: 800;">Career Twin & Career Time Machine</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Switch career vectors to dynamically recalculate readiness benchmarks, missing skills, and adaptive roadmaps.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; background: rgba(13, 21, 45, 0.8); padding: 8px 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">ACTIVE CAREER:</span>
          <select id="careerSelect" onchange="window.app.switchCareer(this.value)" 
            style="background: #070B19; color: var(--accent-cyan); font-weight: 700; border: 1px solid var(--border-glow); padding: 8px 14px; border-radius: 8px; font-size: 0.95rem; cursor: pointer;">
            ${careers.map(c => `
              <option value="${c.slug}" ${c.slug === currentSlug ? "selected" : ""}>
                ${c.title} (${c.category})
              </option>
            `).join("")}
          </select>
        </div>
      </div>

      <!-- Active Career Twin Blueprint Card -->
      <div class="glass-card" style="padding: 28px; margin-bottom: 28px; border-left: 4px solid var(--accent-cyan);">
        <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <h2 style="font-size: 1.8rem; font-weight: 800;">${activeCareer.title || "Full Stack Developer"}</h2>
              <span class="badge badge-cyan">${activeCareer.category || "Engineering"}</span>
              <span class="badge badge-emerald">Demand: ${activeCareer.demandLevel || "Very High"}</span>
            </div>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem; line-height: 1.5;">
              ${activeCareer.description || "Builds modern client-facing web applications and resilient backend server architectures."}
            </p>
          </div>

          <!-- Readiness Badge & Stats -->
          <div style="display: flex; gap: 20px; background: rgba(0,0,0,0.3); padding: 16px 24px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06);">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Your Readiness</div>
              <div style="font-size: 2rem; font-weight: 800;" class="gradient-text-cyan">${readiness}%</div>
            </div>
            <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 16px;">
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Salary Range</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #F8FAFC;">${activeCareer.salaryRange || "$85K - $145K"}</div>
              <div style="font-size: 0.75rem; color: #34D399;">Growth: ${activeCareer.growthRate || "+22%"}</div>
            </div>
          </div>
        </div>

        <!-- Matching Skills vs Missing Skills Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 14px;">
          <!-- Matching Baseline Skills -->
          <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="color: #34D399; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Existing Matching Competencies
              </h4>
              <span class="badge badge-emerald">Aligned</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(profile.technicalSkills || []).map(s => `
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; padding: 6px 10px; background: rgba(0,0,0,0.25); border-radius: 6px;">
                  <span style="font-weight: 600;">${s.name}</span>
                  <span style="color: ${s.verified ? '#34D399' : '#FBBF24'}; font-size: 0.75rem;">
                    ${s.proficiency} (${s.confidence || 60}% Conf.)
                  </span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Missing Skills Required for Market Readiness -->
          <div style="background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="color: #FB7185; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Missing Critical Gaps (Calculated by Agent 2)
              </h4>
              <span class="badge badge-rose">Gaps</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(activeCareer.requiredSkills || []).filter(req => 
                !(profile.technicalSkills || []).some(s => s.name.toLowerCase().includes(req.name.toLowerCase()))
              ).map(req => `
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; padding: 6px 10px; background: rgba(0,0,0,0.25); border-radius: 6px;">
                  <span style="font-weight: 600; color: #FB7185;">${req.name}</span>
                  <span style="color: var(--text-muted); font-size: 0.75rem;">
                    Required: ${req.minProficiency} • Weight: ${req.weight}%
                  </span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- Side-by-Side Career Comparison Tool -->
      <div class="glass-card-purple" style="padding: 28px; border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div>
            <span class="badge badge-purple" style="margin-bottom: 6px;">INTERACTIVE DECISION MATRIX</span>
            <h3 style="font-size: 1.4rem; font-weight: 800;">Side-by-Side Career Path Comparison</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Analyze skill transferability and readiness tradeoffs across alternative career trajectories.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Compare against:</span>
            <select onchange="window.app.setCompareCareer(this.value)"
              style="background: #070B19; color: var(--accent-purple); font-weight: 700; border: 1px solid var(--border-purple); padding: 8px 12px; border-radius: 8px; font-size: 0.9rem; cursor: pointer;">
              ${careers.map(c => `
                <option value="${c.slug}" ${c.slug === compareCareer.slug ? "selected" : ""}>
                  ${c.title}
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Comparison Matrix Table -->
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
                <th style="padding: 12px 16px;">Metric / Attribute</th>
                <th style="padding: 12px 16px; color: var(--accent-cyan);">${activeCareer.title} (Active)</th>
                <th style="padding: 12px 16px; color: var(--accent-purple);">${compareCareer.title} (Alternative)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 14px 16px; font-weight: 600;">Your Readiness Index</td>
                <td style="padding: 14px 16px; font-weight: 700; color: #38BDF8;">${readiness}%</td>
                <td style="padding: 14px 16px; font-weight: 700; color: #C084FC;">
                  ${compareCareer.slug === "ai-engineer" ? "52% (Python + SQL match)" : compareCareer.slug === "data-scientist" ? "58% (High overlap)" : "30%"}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 14px 16px; font-weight: 600;">Salary Potential</td>
                <td style="padding: 14px 16px;">${activeCareer.salaryRange || "$85K - $145K"}</td>
                <td style="padding: 14px 16px;">${compareCareer.salaryRange || "$110K - $185K"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 14px 16px; font-weight: 600;">5-Year Job Growth</td>
                <td style="padding: 14px 16px; color: #34D399;">${activeCareer.growthRate || "+22%"}</td>
                <td style="padding: 14px 16px; color: #34D399;">${compareCareer.growthRate || "+38%"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 14px 16px; font-weight: 600;">Estimated Time to Market-Ready</td>
                <td style="padding: 14px 16px;">~16 - 20 Weeks (at 3 hrs/day)</td>
                <td style="padding: 14px 16px;">
                  ${compareCareer.slug === "data-scientist" ? "~12 - 14 Weeks (faster due to SQL/Python)" : "~18 - 22 Weeks"}
                </td>
              </tr>
              <tr>
                <td style="padding: 14px 16px; font-weight: 600;">Key Overlapping Strengths</td>
                <td style="padding: 14px 16px; color: var(--text-secondary);">Python, SQL, HTML Foundations</td>
                <td style="padding: 14px 16px; color: var(--text-secondary);">
                  ${compareCareer.slug.includes("ai") || compareCareer.slug.includes("data") 
                    ? "Python and SQL directly satisfy 40% of requirements!" 
                    : "General algorithmic logic transfers well."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <button class="btn-purple" onclick="window.app.switchCareer('${compareCareer.slug}')" style="font-size: 0.9rem;">
            Switch Active Target to ${compareCareer.title} →
          </button>
        </div>
      </div>
    </div>
  `;
}
