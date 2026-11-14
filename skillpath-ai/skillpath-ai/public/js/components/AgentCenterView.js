// public/js/components/AgentCenterView.js
// Module E & 12: AI AGENT ACTIVITY CENTER & COUNCIL CONTROL ROOM
// Displays all 6 specialized agents, live workflow visualization, execution times, inputs, and outputs

export function renderAgentCenterView(state) {
  const logs = state.agentLogs || [];
  const isRunning = state.orchestrationRunning || false;

  const agents = [
    {
      id: "agent-1-skill-detective",
      name: "Skill Detective",
      title: "Skill Analysis Agent",
      responsibility: "Audits learner profile, technical skills, assessment results, and computes verified confidence.",
      accent: "#3B82F6",
      status: isRunning ? "Running" : "Completed",
      lastTask: "Audited learner profile & evaluated verification confidence",
      inputSummary: `Profile: ${state.profile?.fullName || 'Alex Rivera'}, Skills: ${(state.profile?.technicalSkills || []).length}`,
      outputSummary: `Computed Skill DNA. Verified 2 skills via lab evidence.`,
      execTime: "14ms"
    },
    {
      id: "agent-2-career-architect",
      name: "Career Architect",
      title: "Career Matching Agent",
      responsibility: "Calculates mathematically weighted career readiness and benchmarks digital Career Twin metrics.",
      accent: "#8B5CF6",
      status: isRunning ? "Running" : "Completed",
      lastTask: `Calculated Career Twin readiness for ${state.profile?.targetCareer || 'Full Stack Developer'}`,
      inputSummary: `Career Blueprint: ${state.profile?.targetCareer || 'Full Stack Developer'}`,
      outputSummary: `Readiness: ${state.profile?.careerReadiness || 38}%. 3 matching skills, 5 gaps.`,
      execTime: "18ms"
    },
    {
      id: "agent-3-gap-predictor",
      name: "Gap Predictor",
      title: "Skill Gap Prediction Agent",
      responsibility: "Constructs topological prerequisite trees and identifies critical knowledge bottlenecks.",
      accent: "#06B6D4",
      status: isRunning ? "Running" : "Completed",
      lastTask: "Predicted prerequisite dependencies & formulated sequence",
      inputSummary: "Missing skills from Career Architect",
      outputSummary: "Found 4 critical blockers. JavaScript is the primary gatekeeper.",
      execTime: "11ms"
    },
    {
      id: "agent-4-learning-researcher",
      name: "Learning Researcher",
      title: "Learning Recommendation Agent",
      responsibility: "Synthesizes adaptive multi-stage learning roadmaps prioritizing free open-source curriculum.",
      accent: "#10B981",
      status: isRunning ? "Running" : "Completed",
      lastTask: "Synthesized adaptive learning roadmap & recommended open resources",
      inputSummary: `Pace: ${state.profile?.availableHoursPerDay || 3} hrs/day • Style: ${state.profile?.preferredLearningStyle || 'Hands-on'}`,
      outputSummary: `Generated 8-stage progression spanning ~20 weeks.`,
      execTime: "22ms"
    },
    {
      id: "agent-5-performance-evaluator",
      name: "Performance Evaluator",
      title: "Progress Evaluation Agent",
      responsibility: "Grades assessments, evaluates Project Lab rubrics, and triggers the Learning Rescue System.",
      accent: "#F59E0B",
      status: isRunning ? "Running" : "Completed",
      lastTask: "Monitored learning velocity, XP trends & rescue triggers",
      inputSummary: `XP: ${state.profile?.xp || 420} • Streak: ${state.profile?.streakDays || 4} days`,
      outputSummary: "Progress normal. Passed prerequisites clear. Rescue ready.",
      execTime: "12ms"
    },
    {
      id: "agent-6-ai-mentor",
      name: "Vera – Career Mentor",
      title: "AI Mentor & Orchestrator Agent",
      responsibility: "Coordinates recommendations from all agents and provides conversational guidance to the student.",
      accent: "#EC4899",
      status: isRunning ? "Running" : "Completed",
      lastTask: "Synthesized multi-agent recommendations into daily briefing for student",
      inputSummary: "Aggregated diagnostic findings from Agents 1 through 5",
      outputSummary: "Synthesized today's focus on JavaScript Async & Portfolio.",
      execTime: "28ms"
    }
  ];

  return `
    <div class="agent-center-view" style="padding: 24px; max-width: 1350px; margin: 0 auto;">
      <!-- Title Header & Orchestration Trigger -->
      <div class="glass-card" style="padding: 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <div class="badge badge-purple" style="margin-bottom: 8px;">AUTONOMOUS AGENT COUNCIL</div>
          <h1 style="font-size: 2rem; font-weight: 800;">AI Agent Activity Center</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Inspect live backend agent executions, prerequisite handoffs, and real-time reasoning logs.
          </p>
        </div>

        <button class="btn-primary" onclick="window.app.runCouncilOrchestration()" ${isRunning ? 'disabled' : ''} style="font-size: 1rem; padding: 12px 24px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="${isRunning ? 'anim-pulse-cyan' : ''}"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          ${isRunning ? 'Council Orchestration In Progress...' : 'Run Full Multi-Agent Pipeline'}
        </button>
      </div>

      <!-- Agent Collaboration Workflow Visualizer -->
      <div class="glass-card" style="padding: 24px; margin-bottom: 28px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Multi-Agent Dataflow Architecture</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 18px;">
          How structured intelligence cascades through the six specialized backend modules
        </p>

        <!-- Visual Flow Strip -->
        <div style="display: flex; align-items: center; justify-content: space-between; overflow-x: auto; padding: 16px 8px; gap: 10px;">
          <div style="background: rgba(59, 130, 246, 0.15); border: 1px solid #3B82F6; border-radius: 10px; padding: 12px; min-width: 140px; text-align: center;">
            <div style="font-size: 0.7rem; color: #38BDF8; font-weight: 700;">AGENT 1</div>
            <div style="font-weight: 700; font-size: 0.85rem;">Skill Detective</div>
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

          <div style="background: rgba(139, 92, 246, 0.15); border: 1px solid #8B5CF6; border-radius: 10px; padding: 12px; min-width: 140px; text-align: center;">
            <div style="font-size: 0.7rem; color: #C084FC; font-weight: 700;">AGENT 2</div>
            <div style="font-weight: 700; font-size: 0.85rem;">Career Architect</div>
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

          <div style="background: rgba(6, 182, 212, 0.15); border: 1px solid #06B6D4; border-radius: 10px; padding: 12px; min-width: 140px; text-align: center;">
            <div style="font-size: 0.7rem; color: #00F2FE; font-weight: 700;">AGENT 3</div>
            <div style="font-weight: 700; font-size: 0.85rem;">Gap Predictor</div>
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

          <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10B981; border-radius: 10px; padding: 12px; min-width: 140px; text-align: center;">
            <div style="font-size: 0.7rem; color: #34D399; font-weight: 700;">AGENT 4</div>
            <div style="font-weight: 700; font-size: 0.85rem;">Learning Researcher</div>
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

          <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #F59E0B; border-radius: 10px; padding: 12px; min-width: 140px; text-align: center;">
            <div style="font-size: 0.7rem; color: #FBBF24; font-weight: 700;">AGENT 5</div>
            <div style="font-weight: 700; font-size: 0.85rem;">Performance Evaluator</div>
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

          <div style="background: rgba(236, 72, 153, 0.15); border: 1px solid #EC4899; border-radius: 10px; padding: 12px; min-width: 140px; text-align: center;">
            <div style="font-size: 0.7rem; color: #F472B6; font-weight: 700;">AGENT 6</div>
            <div style="font-weight: 700; font-size: 0.85rem;">Vera (AI Mentor)</div>
          </div>
        </div>
      </div>

      <!-- Six Agent Activity Status Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; margin-bottom: 28px;">
        ${agents.map(ag => `
          <div class="glass-card" style="padding: 22px; border-left: 4px solid ${ag.accent};">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 700;">${ag.name}</h3>
                <div style="font-size: 0.8rem; color: ${ag.accent}; font-weight: 600;">${ag.title}</div>
              </div>
              <span class="badge ${ag.status === 'Running' ? 'badge-amber anim-pulse-cyan' : 'badge-emerald'}">
                ${ag.status}
              </span>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px;">
              ${ag.responsibility}
            </p>

            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; font-size: 0.8rem; display: flex; flex-direction: column; gap: 8px;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Active Task:</span>
                <div style="font-weight: 600;">${ag.lastTask}</div>
              </div>

              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Input Analysed:</span>
                <div style="color: var(--text-secondary);">${ag.inputSummary}</div>
              </div>

              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Output Generated:</span>
                <div style="color: ${ag.accent}; font-weight: 500;">${ag.outputSummary}</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 12px; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
              <span>Execution Time: <strong style="color: var(--text-primary);">${ag.execTime}</strong></span>
              <span>Backend Mode: <strong>Rule Engine / LLM</strong></span>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Real Execution Logs Stream -->
      <div class="glass-card" style="padding: 24px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;">Real-Time Agent Execution Event Stream</h3>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto;">
          ${logs.length ? logs.map(l => `
            <div style="display: flex; justify-content: space-between; align-items: start; padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 8px; font-size: 0.8rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
                  <strong style="color: #38BDF8;">${l.agentName}</strong>
                  <span class="badge ${l.status === 'Completed' ? 'badge-emerald' : 'badge-rose'}" style="font-size: 0.65rem;">${l.status}</span>
                  <span style="color: var(--text-muted);">(${l.executionTimeMs}ms)</span>
                </div>
                <div style="color: var(--text-primary); font-weight: 500;">${l.task}</div>
                <div style="color: var(--text-muted); font-size: 0.75rem;">${l.outputSummary}</div>
              </div>
              <span style="color: var(--text-muted); font-size: 0.7rem; flex-shrink: 0;">
                ${new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          `).join("") : `
            <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              Click 'Run Full Multi-Agent Pipeline' to trigger live coordinated agent executions.
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}
