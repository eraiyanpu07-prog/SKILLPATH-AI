// public/js/components/PassportModal.js
// Module I: PROOF-OF-SKILL PASSPORT MODAL & EXPORT ENGINE
// Verifiable credentials, cryptographic hash, print/PDF layout, and JSON export

export function renderPassportModal(passportData, onClose) {
  const p = passportData || {};
  const creds = p.verifiableCredentials || {};
  const verified = creds.verifiedSkills || [];
  const unverified = creds.unverifiedSelfReported || [];

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.app.closePassport();">
      <div class="glass-card" style="max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 36px; border: 1px solid var(--border-glow); position: relative; border-radius: 20px;">
        <!-- Close Button -->
        <button onclick="window.app.closePassport()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Printable Passport Certificate Container -->
        <div id="passportPrintArea" style="background: rgba(10, 15, 35, 0.95); border: 2px solid rgba(56, 189, 248, 0.4); border-radius: 16px; padding: 32px; box-shadow: 0 0 30px rgba(6, 182, 212, 0.15);">
          <!-- Passport Top Header -->
          <div style="display: flex; justify-content: space-between; align-items: start; border-bottom: 2px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 24px;">
            <div>
              <div style="font-size: 0.8rem; font-weight: 800; letter-spacing: 0.1em; color: var(--accent-cyan); text-transform: uppercase;">
                OFFICIAL VERIFIABLE CREDENTIAL
              </div>
              <h2 style="font-size: 1.8rem; font-weight: 800; margin: 4px 0;">PROOF-OF-SKILL PASSPORT™</h2>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Decentralized Career Readiness & Competency Record</div>
            </div>

            <div style="text-align: right;">
              <div style="width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, #3B82F6, #06B6D4); display: flex; align-items: center; justify-content: center; margin-left: auto; margin-bottom: 6px; box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span class="badge badge-cyan" style="font-size: 0.65rem;">DIGITALLY SIGNED</span>
            </div>
          </div>

          <!-- Student & Trajectory Info -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Issued To</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #FFF;">${p.issuedTo || 'Alex Rivera'}</div>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">${p.degree || 'Computer Science Student'}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${p.institution || 'State Institute of Technology'}</div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Target Career Track</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: #38BDF8;">${p.targetCareer || 'Full Stack Developer'}</div>
              <div style="font-size: 0.9rem; font-weight: 700; color: #34D399; margin-top: 4px;">
                Career Readiness: ${p.careerReadinessIndex || '38%'}
              </div>
              <div style="font-size: 0.8rem; color: #C084FC;">Skill DNA Confidence: ${p.skillConfidenceScore || '65%'}</div>
            </div>
          </div>

          <!-- Verified Skills Section -->
          <div style="margin-bottom: 20px;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #34D399; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Empirically Verified Competencies (Exam & Code Lab Proofs)
            </h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${verified.length ? verified.map(v => `
                <span class="badge badge-emerald" style="padding: 6px 12px; font-size: 0.8rem;">
                  ✓ ${v.name} (${v.proficiency || 'Intermediate'} • ${v.confidence || 75}%)
                </span>
              `).join("") : '<span style="font-size: 0.8rem; color: var(--text-muted);">None verified yet. Complete missions or assessments.</span>'}
            </div>
          </div>

          <!-- Unverified Self-Reported Skills -->
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FBBF24; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Self-Reported Baseline (Pending Verification Benchmark)
            </h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${unverified.length ? unverified.map(u => `
                <span class="badge badge-amber" style="padding: 6px 12px; font-size: 0.8rem;">
                  ⚠ ${u.name} (Unverified)
                </span>
              `).join("") : '<span style="font-size: 0.8rem; color: var(--text-muted);">All claimed skills verified!</span>'}
            </div>
          </div>

          <!-- Security Stamp & Metadata -->
          <div style="border-top: 1px dashed rgba(255, 255, 255, 0.15); padding-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted);">
            <div>
              <div>Verification Hash: <code style="color: var(--accent-cyan);">${p.verificationHash || 'VERIFY-SKILLPATH-7890'}</code></div>
              <div>Issue Date: ${new Date(p.issueDate || Date.now()).toLocaleDateString()}</div>
            </div>
            <div style="text-align: right;">
              <div>Signer: SkillPath Multi-Agent Council</div>
              <div style="color: #34D399;">Status: ACTIVE & VALID</div>
            </div>
          </div>
        </div>

        <!-- Export Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button class="btn-secondary" onclick="window.print()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / Save as PDF
          </button>
          <button class="btn-primary" onclick="window.app.downloadPassportJSON()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Credential JSON
          </button>
        </div>
      </div>
    </div>
  `;
}
