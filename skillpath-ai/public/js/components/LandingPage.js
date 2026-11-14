// public/js/components/LandingPage.js
// Module A: Futuristic Landing Page with Hero, AI Agent Council, Features, and Success Journey

export function renderLandingPage(onNavigate, onOpenAuth) {
  return `
    <div class="landing-page" style="padding-bottom: 60px;">
      <!-- Hero Section -->
      <section style="text-align: center; padding: 70px 20px 50px; max-width: 1100px; margin: 0 auto; position: relative;">
        <div class="badge badge-cyan anim-pulse-cyan" style="margin-bottom: 24px; font-size: 0.85rem; padding: 6px 16px;">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#00F2FE; margin-right:6px;"></span>
          MULTI-AGENT AUTONOMOUS CAREER INTELLIGENCE SYSTEM
        </div>
        
        <h1 style="font-size: 3.4rem; font-weight: 800; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.02em;">
          Your Career Is Not a Guess.<br/>
          <span class="gradient-text-cyan">It's a Journey We Build Together.</span>
        </h1>
        
        <p style="font-size: 1.25rem; color: var(--text-secondary); max-width: 780px; margin: 0 auto 36px; line-height: 1.6;">
          SKILLPATH AI audits your raw skills, predicts your knowledge gaps, maps your digital Career Twin, and orchestrates an adaptive learning path powered by a council of 6 collaborative AI agents.
        </p>

        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 50px;">
          <button class="btn-primary" onclick="window.app.navigate('dashboard')" style="font-size: 1.05rem; padding: 14px 28px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Start Your Career Journey
          </button>
          <button class="btn-purple" onclick="window.app.navigate('agent-center')" style="font-size: 1.05rem; padding: 14px 28px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Explore AI Agent Council
          </button>
          <button class="btn-secondary" onclick="window.app.openDemoAlex()" style="font-size: 1.05rem; padding: 14px 24px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Load Demo Learner (Alex)
          </button>
        </div>

        <!-- 5 Core Questions Answered Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 20px; text-align: left;">
          <div class="glass-card" style="padding: 16px;">
            <div style="color: var(--accent-cyan); font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">QUESTION 1</div>
            <div style="font-weight: 600; font-size: 0.95rem;">What skills do I have?</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Skill DNA audits & computes verified confidence.</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="color: var(--accent-purple); font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">QUESTION 2</div>
            <div style="font-weight: 600; font-size: 0.95rem;">What skills am I missing?</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Gap Predictor finds critical prerequisite chains.</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="color: var(--accent-blue); font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">QUESTION 3</div>
            <div style="font-weight: 600; font-size: 0.95rem;">What can I realistically pursue?</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Career Twin benchmarks 6 high-demand tech paths.</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="color: var(--accent-emerald); font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">QUESTION 4</div>
            <div style="font-weight: 600; font-size: 0.95rem;">What should I learn next?</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Adaptive Roadmap prioritizes daily milestones.</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="color: var(--accent-amber); font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">QUESTION 5</div>
            <div style="font-weight: 600; font-size: 0.95rem;">Am I becoming market-ready?</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Verifiable Proof-of-Skill Passport with evidence.</div>
          </div>
        </div>
      </section>

      <!-- AI Agent Council Section -->
      <section style="max-width: 1200px; margin: 60px auto 40px; padding: 0 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <div class="badge badge-purple" style="margin-bottom: 12px;">COOPERATIVE AGENTIC ARCHITECTURE</div>
          <h2 style="font-size: 2.2rem; font-weight: 700;">Meet The AI Agent Council</h2>
          <p style="color: var(--text-secondary); max-width: 650px; margin: 8px auto 0;">
            Six specialized AI agents run backend diagnostic modules, collaborate across a central orchestrator, and dynamically optimize your learning trajectory.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
          <!-- Agent 1 -->
          <div class="glass-card" style="padding: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; color: #3B82F6;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <span class="badge badge-cyan">AGENT 1</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">Skill Detective</h3>
            <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 10px;">Skill Analysis Agent</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              Audits learner profiles, evaluates existing skills, and calculates verified confidence scores without treating self-claims as fact.
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
              <strong>Output:</strong> Skill DNA Matrix, Verification Confidence Index
            </div>
          </div>

          <!-- Agent 2 -->
          <div class="glass-card" style="padding: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(139, 92, 246, 0.15); display: flex; align-items: center; justify-content: center; color: #8B5CF6;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <span class="badge badge-purple">AGENT 2</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">Career Architect</h3>
            <div style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 600; margin-bottom: 10px;">Career Matching Agent</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              Calculates mathematically weighted Career Readiness for target roles, benchmarks market demands, and builds your digital Career Twin.
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
              <strong>Output:</strong> Career Twin Score (%), Matching vs Missing Breakdown
            </div>
          </div>

          <!-- Agent 3 -->
          <div class="glass-card" style="padding: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(6, 182, 212, 0.15); display: flex; align-items: center; justify-content: center; color: #06B6D4;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
              </div>
              <span class="badge badge-cyan">AGENT 3</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">Gap Predictor</h3>
            <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 10px;">Skill Gap Prediction Agent</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              Traverses prerequisite trees (e.g. JavaScript before React), pinpoints critical blockers, and builds topological learning dependencies.
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
              <strong>Output:</strong> Prerequisite Chains, Prioritized Blockers
            </div>
          </div>

          <!-- Agent 4 -->
          <div class="glass-card" style="padding: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; color: #10B981;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <span class="badge badge-emerald">AGENT 4</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">Learning Researcher</h3>
            <div style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 600; margin-bottom: 10px;">Learning Recommendation Agent</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              Curates open-access documentation, tutorials, and hands-on exercises tailored to the student's available daily hours and study style.
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
              <strong>Output:</strong> Adaptive Roadmap Stages, Curated Free Resources
            </div>
          </div>

          <!-- Agent 5 -->
          <div class="glass-card" style="padding: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; color: #F59E0B;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span class="badge badge-amber">AGENT 5</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">Performance Evaluator</h3>
            <div style="font-size: 0.8rem; color: var(--accent-amber); font-weight: 600; margin-bottom: 10px;">Progress Evaluation Agent</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              Grades assessments, evaluates practical project lab rubrics, diagnoses weak concepts, and triggers the adaptive Learning Rescue System.
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
              <strong>Output:</strong> Diagnostic Scores, Learning Rescue Intervention
            </div>
          </div>

          <!-- Agent 6 -->
          <div class="glass-card" style="padding: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; color: #6366F1;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span class="badge badge-purple">AGENT 6</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">Vera – Career Mentor</h3>
            <div style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 600; margin-bottom: 10px;">AI Mentor & Orchestrator Agent</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              Synthesizes outputs from all 5 agents into personalized conversational guidance, explains roadmap changes, and guides daily focus.
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
              <strong>Output:</strong> Daily Focus Briefing, Context-Aware Career Chat
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works 4-Step Pipeline -->
      <section style="max-width: 1100px; margin: 60px auto; padding: 0 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 2.2rem; font-weight: 700;">How SkillPath AI Works</h2>
          <p style="color: var(--text-secondary);">An autonomous loop connecting diagnosis, planning, execution, and verification.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
          <div class="glass-card" style="padding: 24px; text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 10px;">01</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">Profile & Evidence Audit</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Student inputs existing skills, education, and target career. Skill Detective audits evidence and establishes your baseline Skill DNA.
            </p>
          </div>
          <div class="glass-card" style="padding: 24px; text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-purple); margin-bottom: 10px;">02</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">Career Twin Alignment</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Career Architect benchmarks your skills against market requirements, computing your exact Career Readiness index.
            </p>
          </div>
          <div class="glass-card" style="padding: 24px; text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-blue); margin-bottom: 10px;">03</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">Gap Traversal & Roadmap</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Gap Predictor resolves prerequisite dependencies and Learning Researcher crafts an adaptive stage-by-stage curriculum.
            </p>
          </div>
          <div class="glass-card" style="padding: 24px; text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-emerald); margin-bottom: 10px;">04</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">Project Lab & Passport</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Complete real missions, take diagnostic quizzes, earn XP, and unlock verifiable credentials on your Proof-of-Skill Passport.
            </p>
          </div>
        </div>
      </section>

      <!-- Sample Learner Success Journey -->
      <section style="max-width: 1000px; margin: 60px auto 40px; padding: 0 20px;">
        <div class="glass-card-purple" style="padding: 36px; border-radius: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <span class="badge badge-purple" style="margin-bottom: 8px;">REAL-WORLD CASE STUDY</span>
              <h3 style="font-size: 1.6rem; font-weight: 700;">Alex's Path to Full Stack Developer</h3>
              <p style="color: var(--text-secondary); font-size: 0.95rem;">1st Year CS Undergraduate • Transitioning from beginner to hiring-ready</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.8rem; font-weight: 800; color: #38BDF8;">38% → 84%</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Projected Career Readiness Index</div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 16px; align-items: start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #3B82F6; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">1</div>
              <div>
                <strong style="font-size: 0.95rem;">Initial State:</strong> Alex has Python and SQL foundations from coursework, but lacks JavaScript, React, and server-side APIs. Initial Readiness: <strong>38%</strong>.
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #06B6D4; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">2</div>
              <div>
                <strong style="font-size: 0.95rem;">Council Diagnosis:</strong> Gap Predictor identifies that React cannot be tackled until JavaScript async programming is conquered. Roadmap is constructed.
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #F59E0B; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">3</div>
              <div>
                <strong style="font-size: 0.95rem;">Adaptive Intervention:</strong> Alex scores 40% on an early JS event loop quiz. The Learning Rescue System automatically triggers, inserting an interactive debugging drill into Stage 1.
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #10B981; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">4</div>
              <div>
                <strong style="font-size: 0.95rem;">Project Lab Verification:</strong> Alex builds the Responsive Portfolio & Dynamic Budget Tracker. Performance Evaluator certifies demonstrated skills and exports a verified Proof-of-Skill Passport.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Footer Banner -->
      <section style="text-align: center; padding: 60px 20px 20px; max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 2.2rem; font-weight: 700; margin-bottom: 14px;">Ready to Engineer Your Career?</h2>
        <p style="color: var(--text-secondary); margin-bottom: 28px;">
          Join thousands of learners utilizing autonomous multi-agent intelligence to reach their dream roles.
        </p>
        <button class="btn-primary" onclick="window.app.navigate('dashboard')" style="font-size: 1.1rem; padding: 16px 36px;">
          Launch Dashboard Now
        </button>
      </section>
    </div>
  `;
}
