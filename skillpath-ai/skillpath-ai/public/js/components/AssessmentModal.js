// public/js/components/AssessmentModal.js
// Interactive Skill Diagnostic Assessment with Real-Time Grading & Learning Rescue Interventions

export function renderAssessmentModal(assessment, onSubmit, onClose) {
  const asm = assessment || {};
  const questions = asm.questions || [];

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.app.closeQuiz();">
      <div class="glass-card" style="max-width: 750px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; border-radius: 20px; border: 1px solid var(--border-glow); position: relative;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-cyan">${asm.skillName || 'Skill'} Assessment</span>
              <span class="badge badge-purple">${asm.difficulty || 'Intermediate'}</span>
            </div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">${asm.title || 'Technical Benchmark'}</h2>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Passing Threshold: 70% • Questions: ${questions.length} • Scores below 50% trigger Learning Rescue
            </div>
          </div>

          <button onclick="window.app.closeQuiz()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Questions Form -->
        <form id="assessmentForm" onsubmit="event.preventDefault(); window.app.submitQuizForm('${asm.id}');">
          <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px;">
            ${questions.map((q, qIdx) => `
              <div style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 6px;">
                  <span>QUESTION ${qIdx + 1} OF ${questions.length}</span>
                  <span style="color: var(--text-muted);">${q.topic || 'Concept'}</span>
                </div>

                <div style="font-size: 0.95rem; font-weight: 600; margin-bottom: 12px; line-height: 1.4;">
                  ${q.question}
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${(q.options || []).map((opt, optIdx) => `
                    <label style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; cursor: pointer; font-size: 0.85rem; transition: background 0.2s;">
                      <input type="radio" name="question_${q.id}" value="${optIdx}" required style="accent-color: var(--accent-cyan); cursor: pointer;" />
                      <span>${opt}</span>
                    </label>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 18px;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Graded by Agent 5 (Performance Evaluator)
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="button" class="btn-secondary" onclick="window.app.closeQuiz()">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                Submit Assessment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderAssessmentResultModal(result, onClose) {
  const r = result || {};
  const passed = r.passed;
  const rescue = r.requiresRescue;

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.app.closeQuizResult();">
      <div class="glass-card ${rescue ? 'anim-rescue' : ''}" style="max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; border-radius: 20px; border: 1px solid ${rescue ? '#F43F5E' : passed ? '#10B981' : '#F59E0B'}; position: relative;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 3rem; margin-bottom: 10px;">
            ${passed ? '🎉' : rescue ? '🚨' : '📝'}
          </div>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: ${passed ? '#34D399' : rescue ? '#FB7185' : '#FBBF24'};">
            ${passed ? 'Assessment Passed!' : rescue ? 'Learning Rescue System Triggered!' : 'Assessment Completed'}
          </h2>
          <div style="font-size: 2.2rem; font-weight: 800; margin: 8px 0;" class="${passed ? 'gradient-text-cyan' : 'gradient-text-gold'}">
            Score: ${r.score}%
          </div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
            ${r.evaluationSummary || ''}
          </p>
        </div>

        <!-- Learning Rescue Plan Details (if triggered) -->
        ${rescue && r.rescuePlan ? `
          <div style="background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.35); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; color: #FB7185; font-weight: 700; font-size: 0.9rem; margin-bottom: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              ADAPTIVE LEARNING RESCUE INTERVENTION
            </div>
            <p style="font-size: 0.85rem; color: #F8FAFC; line-height: 1.4; margin-bottom: 10px;">
              Your score was below 50%. The AI Council immediately adapted your path to rebuild foundational understanding:
            </p>
            <ul style="padding-left: 18px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              ${(r.rescuePlan.recommendedPrerequisiteReview || []).map(item => `
                <li style="margin-bottom: 4px;">${item}</li>
              `).join("")}
            </ul>
            <div style="margin-top: 12px; font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">
              ✓ Injected "${r.rescuePlan.remedialDrill?.title || 'Remedial Drill'}" into Stage 1 of your Roadmap!
            </div>
          </div>
        ` : ''}

        <!-- Weak Topics List -->
        ${r.weakTopics && r.weakTopics.length ? `
          <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
              Diagnosed Weak Concepts:
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              ${r.weakTopics.map(topic => `
                <span class="badge badge-rose" style="font-size: 0.75rem;">${topic}</span>
              `).join("")}
            </div>
          </div>
        ` : ''}

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn-primary" onclick="window.app.closeQuizResult()">
            View Updated Roadmap
          </button>
        </div>
      </div>
    </div>
  `;
}
