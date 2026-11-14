// public/js/components/RoadmapView.js
// Module F & 8: PERSONALIZED ADAPTIVE LEARNING ROADMAP
// Interactive stages, completion checkboxes, mission links, quiz triggers, and Learning Rescue injection

export function renderRoadmapView(state) {
  const roadmap = state.activeRoadmap || {};
  const stages = roadmap.stages || [];
  const profile = state.profile || {};
  const career = profile.targetCareer || "Full Stack Developer";

  return `
    <div class="roadmap-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Title Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div class="badge badge-cyan" style="margin-bottom: 8px;">PEDAGOGICAL AGENT SYNTHESIS</div>
          <h1 style="font-size: 2rem; font-weight: 800;">Adaptive Learning Roadmap</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Customized for <strong>${career}</strong> based on your verified baseline, learning style, and 3 hours/day pace.
          </p>
        </div>

        <button class="btn-primary" onclick="window.app.runCouncilOrchestration()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          Recalculate Roadmap
        </button>
      </div>

      <!-- Stage Progression Timeline List -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${stages.map((stage, sIdx) => {
          const isRescueInjected = (stage.modules || []).some(m => m.rescueTag);
          const compPct = stage.completionPercentage || 0;

          return `
            <div class="glass-card ${isRescueInjected ? 'anim-rescue' : ''}" style="padding: 26px; border-left: 5px solid ${isRescueInjected ? '#F43F5E' : stage.completed ? '#10B981' : stage.status === 'in-progress' ? '#06B6D4' : 'rgba(255,255,255,0.1)'};">
              <!-- Stage Header Row -->
              <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 14px; margin-bottom: 14px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                    <span class="badge ${stage.completed ? 'badge-emerald' : stage.status === 'in-progress' ? 'badge-cyan' : 'badge-purple'}">
                      STAGE ${stage.stageNumber}
                    </span>
                    <h3 style="font-size: 1.35rem; font-weight: 700;">${stage.title}</h3>
                    ${isRescueInjected ? '<span class="badge badge-rose anim-pulse-cyan">RESCUE DRILL ACTIVE</span>' : ''}
                  </div>
                  <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 900px; line-height: 1.5;">
                    ${stage.description}
                  </p>
                </div>

                <div style="text-align: right;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="badge badge-cyan">${stage.durationWeeks} WEEKS</span>
                    <span class="badge badge-purple">${stage.difficulty}</span>
                    <strong style="color: ${stage.completed ? '#34D399' : 'var(--accent-cyan)'}; font-size: 1.1rem;">${compPct}%</strong>
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="progress-track" style="margin-bottom: 18px;">
                <div class="progress-fill ${stage.completed ? 'progress-fill-emerald' : ''}" style="width: ${compPct}%;"></div>
              </div>

              <!-- Modules Interactive Checklist -->
              <div style="margin-bottom: 18px;">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
                  Learning Modules & Checkpoints (Click to Toggle Completion):
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
                  ${(stage.modules || []).map(mod => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: ${mod.rescueTag ? 'rgba(244, 63, 94, 0.15)' : 'rgba(0,0,0,0.25)'}; border: 1px solid ${mod.rescueTag ? 'rgba(244, 63, 94, 0.4)' : 'rgba(255,255,255,0.04)'}; border-radius: 8px; cursor: pointer;"
                      onclick="window.app.toggleRoadmapTask(${stage.stageNumber}, '${mod.id}')">
                      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.85rem; color: ${mod.completed ? 'var(--accent-emerald)' : 'var(--text-primary)'}; font-weight: 500;">
                        <input type="checkbox" ${mod.completed ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--accent-cyan);" />
                        ${mod.title}
                      </label>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">${mod.duration}</span>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Stage Gateways: Practical Assignment & Assessment Trigger -->
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
                <!-- Mission Link -->
                ${stage.practicalAssignment ? `
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; color: #3B82F6;">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                    </div>
                    <div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">Practical Mission:</div>
                      <strong style="font-size: 0.85rem;">${stage.practicalAssignment.title}</strong>
                      <span class="badge badge-emerald" style="margin-left: 6px; font-size: 0.65rem;">+${stage.practicalAssignment.xpReward} XP</span>
                    </div>
                    <button class="btn-secondary" onclick="window.app.navigate('project-lab')" style="font-size: 0.75rem; padding: 4px 10px; margin-left: 8px;">
                      Open Mission →
                    </button>
                  </div>
                ` : ''}

                <!-- Assessment Trigger -->
                ${stage.assessmentTrigger ? `
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Benchmark Gate:</span>
                    <button class="btn-primary" onclick="window.app.openQuiz('asm-js-1')" style="font-size: 0.8rem; padding: 6px 14px;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                      Take ${stage.assessmentTrigger}
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}
