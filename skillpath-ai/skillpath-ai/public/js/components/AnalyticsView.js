// public/js/components/AnalyticsView.js
// Module 10: PROGRESS ANALYTICS & VELOCITY TRACKER

export function renderAnalyticsView(state) {
  const profile = state.profile || {};
  const analytics = state.progressAnalytics || {};
  const events = analytics.recentEvents || [];

  return `
    <div class="analytics-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Title Header -->
      <div style="margin-bottom: 24px;">
        <div class="badge badge-emerald" style="margin-bottom: 8px;">PERFORMANCE INTELLIGENCE</div>
        <h1 style="font-size: 2rem; font-weight: 800;">Progress Analytics & Mastery Velocity</h1>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Track empirical gains, assessment scores, XP accrual, and multi-agent intervention history.
        </p>
      </div>

      <!-- Metrics Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-bottom: 28px;">
        <div class="glass-card" style="padding: 20px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Active Streak</div>
          <div style="font-size: 2rem; font-weight: 800; color: #F59E0B; margin: 4px 0;">${profile.streakDays || 4} Days</div>
          <div style="font-size: 0.75rem; color: #34D399;">Consistency: Top 10% of cohort</div>
        </div>

        <div class="glass-card" style="padding: 20px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total XP Accumulated</div>
          <div style="font-size: 2rem; font-weight: 800; color: #38BDF8; margin: 4px 0;">${profile.xp || 420} XP</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">Level ${profile.level || 3} Engineering Apprentice</div>
        </div>

        <div class="glass-card" style="padding: 20px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Verified Skill Proofs</div>
          <div style="font-size: 2rem; font-weight: 800; color: #10B981; margin: 4px 0;">
            ${(profile.technicalSkills || []).filter(s => s.verified).length} Skills
          </div>
          <div style="font-size: 0.75rem; color: #34D399;">Backed by code artifacts</div>
        </div>

        <div class="glass-card" style="padding: 20px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Career Readiness Index</div>
          <div style="font-size: 2rem; font-weight: 800; color: #C084FC; margin: 4px 0;">${profile.careerReadiness || 38}%</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">Target: 80% market hire threshold</div>
        </div>
      </div>

      <!-- Middle Row: Interactive SVG Velocity Chart & Skill Evidence Ratio -->
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-bottom: 28px;">
        <!-- Weekly Study Velocity SVG Chart -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Weekly Study Velocity (Hours Committed)</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px;">Daily hours dedicated to code labs, tutorials, and quizzes</p>

          <div style="height: 220px; width: 100%;">
            <svg width="100%" height="100%" viewBox="0 0 500 200">
              <!-- Grid lines -->
              <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.1)" />

              <!-- Y-axis labels -->
              <text x="25" y="34" fill="#64748B" font-size="9">4h</text>
              <text x="25" y="84" fill="#64748B" font-size="9">3h</text>
              <text x="25" y="134" fill="#64748B" font-size="9">2h</text>
              <text x="25" y="184" fill="#64748B" font-size="9">0h</text>

              <!-- Bars (Mon to Sun) -->
              <!-- Mon (2.5h) -->
              <rect x="65" y="95" width="35" height="85" rx="4" fill="rgba(6, 182, 212, 0.4)" stroke="#06B6D4" stroke-width="1.5"/>
              <text x="82" y="195" fill="#94A3B8" font-size="9" text-anchor="middle">Mon</text>

              <!-- Tue (3.0h) -->
              <rect x="125" y="80" width="35" height="100" rx="4" fill="rgba(6, 182, 212, 0.5)" stroke="#06B6D4" stroke-width="1.5"/>
              <text x="142" y="195" fill="#94A3B8" font-size="9" text-anchor="middle">Tue</text>

              <!-- Wed (2.0h) -->
              <rect x="185" y="120" width="35" height="60" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06B6D4" stroke-width="1.5"/>
              <text x="202" y="195" fill="#94A3B8" font-size="9" text-anchor="middle">Wed</text>

              <!-- Thu (3.5h) -->
              <rect x="245" y="65" width="35" height="115" rx="4" fill="rgba(6, 182, 212, 0.6)" stroke="#06B6D4" stroke-width="1.5"/>
              <text x="262" y="195" fill="#94A3B8" font-size="9" text-anchor="middle">Thu</text>

              <!-- Fri (3.2h) -->
              <rect x="305" y="75" width="35" height="105" rx="4" fill="rgba(6, 182, 212, 0.5)" stroke="#06B6D4" stroke-width="1.5"/>
              <text x="322" y="195" fill="#94A3B8" font-size="9" text-anchor="middle">Fri</text>

              <!-- Sat (4.0h) -->
              <rect x="365" y="45" width="35" height="135" rx="4" fill="rgba(139, 92, 246, 0.6)" stroke="#8B5CF6" stroke-width="1.5"/>
              <text x="382" y="195" fill="#C084FC" font-size="9" text-anchor="middle">Sat</text>

              <!-- Sun (Today - 2.8h) -->
              <rect x="425" y="85" width="35" height="95" rx="4" fill="rgba(16, 185, 129, 0.6)" stroke="#10B981" stroke-width="1.5"/>
              <text x="442" y="195" fill="#34D399" font-size="9" text-anchor="middle">Sun</text>
            </svg>
          </div>
        </div>

        <!-- Evidence Breakdown Gauge -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Evidence Verification Ratio</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px;">Empirical code proof vs subjective self-claim</p>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span>Project Artifacts & Labs</span>
              <strong style="color: #10B981;">65%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill progress-fill-emerald" style="width: 65%;"></div>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span>Automated Diagnostic Quizzes</span>
              <strong style="color: #38BDF8;">50%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 50%;"></div>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span>Self-Reported Baseline</span>
              <strong style="color: #FBBF24;">35%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 35%; background: #F59E0B;"></div>
            </div>
          </div>

          <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
            Goal: Reach ≥85% verified evidence to export a gold-tier Proof-of-Skill Passport.
          </p>
        </div>
      </div>

      <!-- Recent Learning History Audit Log -->
      <div class="glass-card" style="padding: 24px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 14px;">Recent Progression & Orchestration Events</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${events.length ? events.map(ev => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(0,0,0,0.25); border-radius: 8px;">
              <div>
                <span class="badge ${ev.eventType?.includes('RESCUE') ? 'badge-rose' : ev.eventType?.includes('PASSED') ? 'badge-emerald' : 'badge-cyan'}" style="margin-right: 8px; font-size: 0.65rem;">
                  ${ev.eventType}
                </span>
                <span style="font-size: 0.85rem;">${ev.details}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          `).join("") : `
            <div style="font-size: 0.85rem; color: var(--text-muted);">No events recorded in current session yet.</div>
          `}
        </div>
      </div>
    </div>
  `;
}
