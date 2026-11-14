// public/js/components/Sidebar.js
// 12-Module Sidebar Navigation for SkillPath AI

export function renderSidebar(currentPage) {
  const navItems = [
    { id: "landing", label: "Landing Page", icon: `<polygon points="5 3 19 12 5 21 5 3"/>` },
    { id: "dashboard", label: "Main Dashboard", icon: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>` },
    { id: "skill-dna", label: "Skill DNA", icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>`, badge: "CORE" },
    { id: "career-twin", label: "Career Twin", icon: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>` },
    { id: "skill-gap", label: "Skill Gap Analysis", icon: `<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>` },
    { id: "roadmap", label: "Adaptive Roadmap", icon: `<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>` },
    { id: "project-lab", label: "Project Lab", icon: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>` },
    { id: "analytics", label: "Progress Analytics", icon: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>` },
    { id: "mentor-chat", label: "AI Mentor (Vera)", icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`, badge: "AI" },
    { id: "agent-center", label: "Agent Activity Center", icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`, badge: "LIVE" },
    { id: "profile", label: "Student Profile", icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>` },
    { id: "passport", label: "Skill Passport", icon: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`, badge: "VERIFIED" }
  ];

  return `
    <aside style="width: 250px; background: rgba(7, 11, 25, 0.95); border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between; padding: 20px 14px; flex-shrink: 0; min-height: calc(100vh - 68px);">
      <div>
        <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding-left: 10px; margin-bottom: 12px;">
          NAVIGATION MODULES
        </div>

        <nav style="display: flex; flex-direction: column; gap: 4px;">
          ${navItems.map(item => {
            const isActive = currentPage === item.id;
            return `
              <button onclick="window.app.navigate('${item.id}')"
                style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid ${isActive ? 'var(--border-glow)' : 'transparent'}; background: ${isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent'}; color: ${isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)'}; font-weight: ${isActive ? '700' : '500'}; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease; text-align: left;"
                onmouseover="if(!${isActive}) { this.style.background='rgba(255,255,255,0.03)'; this.style.color='#FFF'; }"
                onmouseout="if(!${isActive}) { this.style.background='transparent'; this.style.color='var(--text-secondary)'; }">
                <span style="display: flex; align-items: center; gap: 10px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0;">
                    ${item.icon}
                  </svg>
                  <span>${item.label}</span>
                </span>
                ${item.badge ? `
                  <span class="badge ${item.badge === 'LIVE' ? 'badge-rose anim-pulse-cyan' : item.badge === 'CORE' ? 'badge-purple' : 'badge-emerald'}" style="font-size: 0.6rem; padding: 2px 6px;">
                    ${item.badge}
                  </span>
                ` : ''}
              </button>
            `;
          }).join("")}
        </nav>
      </div>

      <!-- Quick Action Council Widget -->
      <div class="glass-card" style="padding: 14px; text-align: center; border-radius: 12px; border-color: rgba(139, 92, 246, 0.3);">
        <div style="font-size: 0.75rem; font-weight: 700; color: #C084FC; margin-bottom: 4px;">AI AGENT COUNCIL</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 10px;">6 Agents Collaborating</div>
        <button class="btn-purple" onclick="window.app.runCouncilOrchestration()" style="width: 100%; font-size: 0.75rem; padding: 6px 10px; justify-content: center;">
          Trigger Run
        </button>
      </div>
    </aside>
  `;
}
