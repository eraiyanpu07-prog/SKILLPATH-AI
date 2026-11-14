// public/js/components/Navbar.js
// Futuristic Top Bar with Status Indicators, XP, Streak, and Council Health

export function renderNavbar(state) {
  const profile = state.profile || {};
  const readiness = profile.careerReadiness || 38;
  const xp = profile.xp || 420;
  const streak = profile.streakDays || 4;
  const activePage = state.currentPage || "landing";

  return `
    <header style="background: rgba(7, 11, 25, 0.85); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle); position: sticky; top: 0; z-index: 50; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px;">
      <!-- Logo & Brand Tagline -->
      <div style="display: flex; align-items: center; gap: 14px; cursor: pointer;" onclick="window.app.navigate('landing')">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #3B82F6, #06B6D4); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div>
          <div style="font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; display: flex; align-items: center; gap: 6px;">
            <span>SKILLPATH</span>
            <span class="gradient-text-cyan">AI</span>
          </div>
          <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
            Discover Skills • Predict Gaps • Engineer Future
          </div>
        </div>
      </div>

      <!-- Center Status Badges -->
      <div style="display: flex; align-items: center; gap: 12px;" class="hide-mobile">
        <span class="badge badge-cyan" title="Live Agent Council Active">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #00F2FE; margin-right: 4px;"></span>
          6 AGENTS ONLINE
        </span>

        <span class="badge badge-purple" title="Career Readiness Index">
          READINESS: ${readiness}%
        </span>

        <span class="badge badge-amber" title="${streak} Day Study Streak">
          🔥 ${streak} DAYS
        </span>

        <span class="badge badge-emerald" title="Experience Points">
          ⚡ ${xp} XP
        </span>
      </div>

      <!-- Right Actions: User Profile / Auth -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <button class="btn-outline-cyan" onclick="window.app.navigate('dashboard')" style="font-size: 0.8rem; padding: 6px 14px;">
          Dashboard
        </button>

        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 4px 8px; border-radius: 10px; background: rgba(255,255,255,0.03);"
          onclick="window.app.navigate('profile')">
          <div style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #8B5CF6, #3B82F6); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #FFF;">
            ${(profile.fullName || "A")[0]}
          </div>
          <div style="text-align: left;" class="hide-mobile">
            <div style="font-size: 0.85rem; font-weight: 600;">${profile.fullName || "Alex Rivera"}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${profile.targetCareer || "Full Stack Developer"}</div>
          </div>
        </div>
      </div>
    </header>
  `;
}
