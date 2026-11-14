// public/js/components/ProjectLabView.js
// Module G & 9: REAL-WORLD SKILL MISSIONS & PROJECT LAB
// Practical missions, instructions, rubric evaluation, and skill certification

export function renderProjectLabView(state) {
  const missions = state.projects || [];
  const profile = state.profile || {};
  const completedProjects = profile.projects || [];

  return `
    <div class="project-lab-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div class="badge badge-emerald" style="margin-bottom: 8px;">EMPIRICAL EVIDENCE ENGINE</div>
          <h1 style="font-size: 2rem; font-weight: 800;">Project Lab & Skill Missions</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Complete real-world software missions. Submissions are graded against rigorous rubrics to convert theoretical knowledge into verified Skill DNA evidence.
          </p>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <span class="badge badge-purple" style="font-size: 0.85rem; padding: 6px 14px;">
            ${completedProjects.length} Verified Missions
          </span>
          <span class="badge badge-amber" style="font-size: 0.85rem; padding: 6px 14px;">
            ${profile.xp || 420} Total XP
          </span>
        </div>
      </div>

      <!-- Missions Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px;">
        ${missions.map(mission => {
          const isDone = completedProjects.some(cp => 
            cp.title?.toLowerCase().includes(mission.slug?.toLowerCase()) || 
            mission.title?.toLowerCase().includes(cp.title?.toLowerCase())
          );

          return `
            <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${isDone ? '#10B981' : '#3B82F6'};">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                  <span class="badge ${isDone ? 'badge-emerald' : 'badge-cyan'}">
                    ${isDone ? 'COMPLETED & VERIFIED' : mission.difficulty}
                  </span>
                  <span class="badge badge-amber">+${mission.xpReward} XP</span>
                </div>

                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">${mission.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
                  ${mission.objective}
                </p>

                <!-- Required Skills Badges -->
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
                  ${(mission.requiredSkills || []).map(skill => `
                    <span class="badge badge-purple" style="font-size: 0.7rem;">${skill}</span>
                  `).join("")}
                </div>

                <!-- Instructions Checklist -->
                <div style="background: rgba(0,0,0,0.25); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                  <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
                    Key Deliverables:
                  </div>
                  <ul style="padding-left: 18px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
                    ${(mission.instructions || []).slice(0, 3).map(inst => `
                      <li style="margin-bottom: 4px;">${inst}</li>
                    `).join("")}
                  </ul>
                </div>
              </div>

              <!-- Footer CTA & Status -->
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Est: ~${mission.estimatedHours || 6} hours</span>
                ${isDone ? `
                  <button class="btn-secondary" disabled style="opacity: 0.8; font-size: 0.8rem; padding: 6px 14px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Certified in Skill DNA
                  </button>
                ` : `
                  <button class="btn-primary" onclick="window.app.openSubmitMission('${mission.id}')" style="font-size: 0.8rem; padding: 8px 16px;">
                    Submit for Evaluation →
                  </button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}
