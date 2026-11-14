// public/js/components/MentorChatView.js
// Module J & 11: AI CAREER MENTOR CHATBOT ("Vera")
// Context-aware chatbot with quick prompt suggestions and actionable career guidance

export function renderMentorChatView(state) {
  const profile = state.profile || {};
  const messages = state.chatMessages || [
    {
      sender: "vera",
      text: `Hello ${profile.fullName || "Alex"}! I am **Vera**, your dedicated AI Career Mentor. I continuously analyze the diagnostic findings from our 5 specialist agents (Skill Detective, Career Architect, Gap Predictor, Learning Researcher, and Performance Evaluator) to guide your daily milestones.\n\nYour current career twin shows **${profile.careerReadiness || 38}% market readiness** toward becoming a **${profile.targetCareer || "Full Stack Developer"}**. How can I help you accelerate your journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const suggestedPrompts = [
    "What should I learn today?",
    "Why is JavaScript important for my target career?",
    "Which skill should I improve first?",
    "Can I switch from Full Stack to AI Engineer?",
    "How does the Learning Rescue System work?"
  ];

  return `
    <div class="mentor-chat-view" style="padding: 24px; max-width: 1100px; margin: 0 auto; height: calc(100vh - 120px); display: flex; flex-direction: column;">
      <!-- Chat Header -->
      <div class="glass-card-purple" style="padding: 18px 24px; border-radius: 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #8B5CF6, #6366F1); display: flex; align-items: center; justify-content: center; color: #FFF; box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);" class="anim-pulse-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 style="font-size: 1.25rem; font-weight: 700;">Vera – AI Career Mentor</h2>
              <span class="badge badge-emerald" style="font-size: 0.65rem;">ONLINE</span>
            </div>
            <div style="font-size: 0.8rem; color: #C084FC;">Orchestrator & Career Synthesis Agent</div>
          </div>
        </div>

        <!-- Student Context Badges -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.75rem;">
          <span class="badge badge-cyan">${profile.targetCareer || "Full Stack Developer"}</span>
          <span class="badge badge-purple">${profile.careerReadiness || 38}% Readiness</span>
          <span class="badge badge-amber">${profile.xp || 420} XP</span>
        </div>
      </div>

      <!-- Messages Scroll Area -->
      <div id="chatMessagesContainer" class="glass-card" style="flex: 1; padding: 20px; border-radius: 16px; overflow-y: auto; margin-bottom: 16px; display: flex; flex-direction: column; gap: 16px;">
        ${messages.map(msg => `
          <div style="display: flex; flex-direction: column; align-items: ${msg.sender === 'user' ? 'flex-end' : 'flex-start'};">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 0.75rem; color: var(--text-muted);">
              <strong>${msg.sender === 'user' ? 'You' : 'Vera (AI Mentor)'}</strong>
              <span>${msg.timestamp || ''}</span>
            </div>
            <div style="max-width: 80%; padding: 14px 18px; border-radius: 14px; font-size: 0.95rem; line-height: 1.5; ${
              msg.sender === 'user'
                ? 'background: linear-gradient(135deg, #3B82F6, #06B6D4); color: #FFF; border-bottom-right-radius: 2px;'
                : 'background: rgba(18, 25, 50, 0.85); border: 1px solid rgba(139, 92, 246, 0.3); color: var(--text-primary); border-bottom-left-radius: 2px;'
            }">
              ${formatMarkdownText(msg.text)}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Quick Suggestion Prompts -->
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 10px;">
        ${suggestedPrompts.map(p => `
          <button class="btn-secondary" onclick="window.app.sendChatMessage('${p.replace(/'/g, "\\'")}')" 
            style="font-size: 0.75rem; padding: 6px 12px; white-space: nowrap; flex-shrink: 0; border-radius: 20px;">
            ${p}
          </button>
        `).join("")}
      </div>

      <!-- Input Form -->
      <form onsubmit="event.preventDefault(); window.app.submitChatInput();" style="display: flex; gap: 10px;">
        <input id="chatInput" type="text" placeholder="Ask Vera about what to learn today, career changes, or roadmap milestones..." 
          style="flex: 1; background: var(--bg-card); border: 1px solid var(--border-glow); color: #FFF; padding: 14px 18px; border-radius: 12px; font-size: 0.95rem; outline: none;" />
        <button type="submit" class="btn-primary" style="padding: 12px 24px; font-size: 0.95rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send
        </button>
      </form>
    </div>
  `;
}

function formatMarkdownText(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
