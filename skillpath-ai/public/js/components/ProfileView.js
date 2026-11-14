// public/js/components/ProfileView.js
// Module B: LEARNER PROFILE - View & Edit Profile, Technical Skills Manager with Evidence Badges

export function renderProfileView(state) {
  const profile = state.profile || {};
  const skills = profile.technicalSkills || [];
  const softSkills = profile.softSkills || [];
  const certifications = profile.certifications || [];

  return `
    <div class="profile-view" style="padding: 24px; max-width: 1200px; margin: 0 auto;">
      <!-- Title Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div class="badge badge-cyan" style="margin-bottom: 8px;">IDENTITY & CREDENTIAL DOSSIER</div>
          <h1 style="font-size: 2rem; font-weight: 800;">Learner Profile & Competency Record</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Manage your academic credentials, target career trajectory, study pace, and technical competencies.
          </p>
        </div>

        <button class="btn-primary" onclick="window.app.saveProfileChanges()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save & Update Profile
        </button>
      </div>

      <!-- Main Form Grid -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px;">
        <!-- Left Column: Personal & Academic Details -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 18px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
            Personal & Academic Information
          </h3>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">FULL NAME</label>
              <input id="profFullName" type="text" value="${profile.fullName || 'Alex Rivera'}" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.95rem;" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">EDUCATION LEVEL</label>
                <select id="profEduLevel" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;">
                  <option value="Undergraduate" ${profile.educationLevel === "Undergraduate" ? "selected" : ""}>Undergraduate</option>
                  <option value="Graduate" ${profile.educationLevel === "Graduate" ? "selected" : ""}>Graduate / Master's</option>
                  <option value="Bootcamp" ${profile.educationLevel === "Bootcamp" ? "selected" : ""}>Bootcamp Graduate</option>
                  <option value="Self-Taught" ${profile.educationLevel === "Self-Taught" ? "selected" : ""}>Self-Taught Engineer</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">DAILY STUDY HOURS</label>
                <input id="profHours" type="number" min="1" max="12" value="${profile.availableHoursPerDay || 3}" 
                  style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;" />
              </div>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">COLLEGE / INSTITUTION</label>
              <input id="profInstitution" type="text" value="${profile.institution || 'State Institute of Technology'}" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.95rem;" />
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">CURRENT DEGREE / PROGRAM</label>
              <input id="profDegree" type="text" value="${profile.degree || 'B.S. in Computer Science (1st Year)'}" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.95rem;" />
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">TARGET CAREER VECTOR</label>
              <select id="profCareer" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-glow); color: var(--accent-cyan); font-weight: 700; padding: 10px 14px; border-radius: 8px; font-size: 0.95rem;">
                <option value="Full Stack Developer" ${profile.targetCareer === "Full Stack Developer" ? "selected" : ""}>Full Stack Developer</option>
                <option value="AI Engineer" ${profile.targetCareer === "AI Engineer" ? "selected" : ""}>AI Engineer</option>
                <option value="Data Scientist" ${profile.targetCareer === "Data Scientist" ? "selected" : ""}>Data Scientist</option>
                <option value="Cybersecurity Analyst" ${profile.targetCareer === "Cybersecurity Analyst" ? "selected" : ""}>Cybersecurity Analyst</option>
                <option value="Cloud & DevOps Engineer" ${profile.targetCareer === "Cloud & DevOps Engineer" ? "selected" : ""}>Cloud & DevOps Engineer</option>
                <option value="UI/UX Product Designer" ${profile.targetCareer === "UI/UX Product Designer" ? "selected" : ""}>UI/UX Product Designer</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">PREFERRED LEARNING STYLE</label>
              <select id="profStyle" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); color: #FFF; padding: 10px 14px; border-radius: 8px; font-size: 0.9rem;">
                <option value="Hands-on projects & Interactive drills" ${profile.preferredLearningStyle?.includes("Hands-on") ? "selected" : ""}>Hands-on projects & Interactive drills</option>
                <option value="Comprehensive video walkthroughs" ${profile.preferredLearningStyle?.includes("video") ? "selected" : ""}>Comprehensive video walkthroughs</option>
                <option value="Text-based deep dives & official specs" ${profile.preferredLearningStyle?.includes("Text") ? "selected" : ""}>Text-based deep dives & official specs</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Right Column: Technical & Soft Skills Manager -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Technical Skills -->
          <div class="glass-card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              <h3 style="font-size: 1.15rem; font-weight: 700;">Technical Skills Inventory</h3>
              <button class="btn-outline-cyan" onclick="window.app.addSkillPrompt()" style="font-size: 0.75rem; padding: 4px 10px;">
                + Add Skill
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${skills.map((s, idx) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <strong style="font-size: 0.9rem;">${s.name}</strong>
                      <span class="badge ${s.verified ? 'badge-emerald' : 'badge-amber'}" style="font-size: 0.65rem;">
                        ${s.verified ? 'VERIFIED' : 'SELF-REPORTED'}
                      </span>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                      ${s.source || "Coursework"} • Confidence: ${s.confidence || 50}%
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 0.8rem; color: #38BDF8; font-weight: 600;">${s.proficiency}</span>
                    <button onclick="window.app.deleteSkill(${idx})" style="background: transparent; border: none; color: #F43F5E; cursor: pointer; padding: 4px;" title="Remove Skill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Certifications & Projects -->
          <div class="glass-card" style="padding: 24px;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              Certifications & Projects
            </h3>

            <div style="margin-bottom: 14px;">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Certificates:</div>
              ${certifications.length ? certifications.map(c => `
                <div style="font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 4px;">
                  🏆 <strong>${c.title}</strong> — <span style="color: var(--text-muted);">${c.issuer} (${c.year})</span>
                </div>
              `).join("") : '<div style="font-size: 0.8rem; color: var(--text-muted);">No external certificates loaded.</div>'}
            </div>

            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Completed Projects:</div>
              ${(profile.projects || []).map(p => `
                <div style="font-size: 0.85rem; padding: 6px 10px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 6px; margin-bottom: 4px;">
                  🚀 <strong>${p.title}</strong> — <span style="color: #34D399;">Skills: ${(p.skillsDemonstrated || []).join(", ")}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
