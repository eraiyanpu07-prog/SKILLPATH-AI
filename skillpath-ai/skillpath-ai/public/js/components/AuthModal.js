// public/js/components/AuthModal.js
// Student Authentication: Login, Registration, and Demo Profile Switcher

export function renderAuthModal(isRegister = false, onClose) {
  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.app.closeAuth();">
      <div class="glass-card" style="max-width: 480px; width: 100%; padding: 32px; border-radius: 20px; border: 1px solid var(--border-glow); position: relative;">
        <!-- Close Button -->
        <button onclick="window.app.closeAuth()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #3B82F6, #06B6D4); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800;">
            ${isRegister ? 'Create Learner Account' : 'Student Login'}
          </h2>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
            Access your personalized multi-agent learning ecosystem.
          </p>
        </div>

        <!-- Quick Demo Alex Login Button -->
        <div style="margin-bottom: 20px;">
          <button class="btn-secondary" onclick="window.app.quickLoginDemoAlex()" 
            style="width: 100%; justify-content: center; border-color: rgba(6, 182, 212, 0.4); background: rgba(6, 182, 212, 0.08); font-size: 0.9rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Instant Demo Login: Alex Rivera (CS Student)
          </button>
        </div>

        <div style="display: flex; align-items: center; margin: 18px 0; color: var(--text-muted); font-size: 0.75rem;">
          <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.08);"></div>
          <span style="padding: 0 10px;">OR USE CREDENTIALS</span>
          <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.08);"></div>
        </div>

        <!-- Form -->
        <form onsubmit="event.preventDefault(); window.app.submitAuthForm(${isRegister});">
          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
            ${isRegister ? `
              <div>
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">FULL NAME</label>
                <input id="authName" type="text" required placeholder="e.g. Maya Chen" 
                  style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;" />
              </div>
            ` : ''}

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">EMAIL ADDRESS</label>
              <input id="authEmail" type="email" required placeholder="alex@skillpath.ai" value="alex@skillpath.ai" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;" />
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">PASSWORD</label>
              <input id="authPassword" type="password" required placeholder="••••••••" value="demo12345" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;" />
            </div>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.95rem; padding: 12px;">
            ${isRegister ? 'Register & Initialize Skill DNA' : 'Log In to Dashboard'}
          </button>
        </form>

        <div style="text-align: center; margin-top: 18px; font-size: 0.8rem; color: var(--text-muted);">
          ${isRegister ? `
            Already have an account? 
            <a href="#" onclick="event.preventDefault(); window.app.openAuth(false);" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none;">Log in</a>
          ` : `
            New to SkillPath AI? 
            <a href="#" onclick="event.preventDefault(); window.app.openAuth(true);" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none;">Create free account</a>
          `}
        </div>
      </div>
    </div>
  `;
}
