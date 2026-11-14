// public/js/components/SubmitMissionModal.js
// Modal for submitting Project Lab code artifacts with instant rubric evaluation

export function renderSubmitMissionModal(mission, onClose) {
  const m = mission || {};

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.app.closeSubmitMission();">
      <div class="glass-card" style="max-width: 680px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; border-radius: 20px; border: 1px solid var(--border-glow); position: relative;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-emerald">PROJECT SUBMISSION</span>
              <span class="badge badge-amber">+${m.xpReward || 200} XP</span>
            </div>
            <h2 style="font-size: 1.35rem; font-weight: 800;">${m.title || 'Mission Evaluation'}</h2>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Graded automatically against production rubrics by Agent 5 (Performance Evaluator).
            </div>
          </div>

          <button onclick="window.app.closeSubmitMission()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Rubric Criteria Preview -->
        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 14px; margin-bottom: 20px;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
            Evaluation Rubrics:
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(m.rubrics || []).map(r => `
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                <span style="color: var(--text-primary); font-weight: 500;">${r.criterion}</span>
                <span style="color: var(--accent-cyan); font-weight: 700;">${r.maxScore} pts</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Submission Form -->
        <form onsubmit="event.preventDefault(); window.app.submitMissionArtifact('${m.id}');">
          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">GITHUB REPOSITORY URL</label>
              <input id="subRepoUrl" type="url" required placeholder="https://github.com/alex-dev/portfolio-showcase" value="https://github.com/alex-dev/portfolio-showcase"
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;" />
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">LIVE DEMO URL (OPTIONAL)</label>
              <input id="subDemoUrl" type="url" placeholder="https://alex-portfolio.dev" value="https://alex-portfolio.dev"
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;" />
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">IMPLEMENTATION NOTES & ARCHITECTURE</label>
              <textarea id="subNotes" rows="3" placeholder="Describe semantic HTML5 structure, responsive layout queries, and Git commits..."
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem; resize: vertical;">Implemented responsive CSS grid/flexbox layout with semantic HTML5 tags and clean git commit history.</textarea>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 18px;">
            <button type="button" class="btn-secondary" onclick="window.app.closeSubmitMission()">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              Submit & Verify Code Proof
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
