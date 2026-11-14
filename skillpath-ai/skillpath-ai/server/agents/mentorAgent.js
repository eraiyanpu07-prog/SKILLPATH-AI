// server/agents/mentorAgent.js
// AGENT 6: AI CAREER MENTOR & ORCHESTRATOR AGENT ("Vera")
// Responsibility: Conversational career guidance, contextual question answering, explaining roadmap adaptations, and daily learner synthesis.

import { llm } from "../services/llmService.js";
import { StudentProfile, CareerRole } from "../db/database.js";

export async function runMentorSynthesisAgent(studentProfile, aggregatedAgentOutputs) {
  const startTime = Date.now();
  const name = studentProfile.fullName || "Learner";
  const career = studentProfile.targetCareer || "Full Stack Developer";
  const readiness = aggregatedAgentOutputs?.careerMatch?.data?.readinessPercentage || studentProfile.careerReadiness || 40;
  const criticalGaps = aggregatedAgentOutputs?.gapAnalysis?.data?.criticalGaps || [];
  const activeStage = aggregatedAgentOutputs?.learningRoadmap?.data?.stages?.find(s => s.status === "in-progress") || null;

  const fallbackGenerator = () => {
    const topGap = criticalGaps[0]?.name || "Core Programming Foundations";
    return {
      mentorName: "Vera – Your AI Career Mentor",
      greeting: `Welcome back, ${name}. Your career twin is tracking at ${readiness}% readiness toward ${career}.`,
      todayFocus: {
        headline: `Focus on ${topGap} & Stage ${activeStage?.stageNumber || 1}`,
        description: `Your highest-priority knowledge milestone right now is conquering ${topGap}. Completing this eliminates a bottleneck for subsequent roadmap stages.`,
        recommendedAction: `Complete the next interactive module in '${activeStage?.title || "Foundations"}' and check your understanding with a quick benchmark quiz.`
      },
      keyInsights: [
        `Identified ${criticalGaps.length} critical skills standing between your current profile and junior-level hiring benchmarks.`,
        `Your verified project evidence gives you strong credibility in foundational programming—now we scale into full-stack architecture.`,
        `Stay consistent: committing 2-3 focused hours today advances your career readiness index by an estimated +2.5%.`
      ],
      nextSteps: [
        "Review asynchronous execution concepts & event loops",
        "Complete 1 practical code kata in Project Lab",
        "Take the 5-minute verified skill assessment"
      ]
    };
  };

  const prompt = `Synthesize multi-agent career intelligence for learner: ${name}
Target Career: ${career}
Career Readiness: ${readiness}%
Skill Gaps: ${JSON.stringify(criticalGaps.slice(0, 3))}
Current Active Stage: ${JSON.stringify(activeStage)}

As Vera, produce a warm, highly actionable daily guidance briefing explaining what to learn today and why.
Return JSON format:
{
  "mentorName": "Vera – Your AI Career Mentor",
  "greeting": string,
  "todayFocus": {
    "headline": string,
    "description": string,
    "recommendedAction": string
  },
  "keyInsights": string[],
  "nextSteps": string[]
}`;

  const result = await llm.generateStructuredJSON(
    prompt,
    "You are AGENT 6: AI CAREER MENTOR ('Vera') in SkillPath AI. You synthesize technical intelligence into encouraging, razor-sharp mentorship.",
    fallbackGenerator
  );

  const durationMs = Date.now() - startTime;
  return {
    agentId: "agent-6-ai-mentor",
    agentName: "AI Mentor & Orchestrator Agent (Vera)",
    status: "Completed",
    executionTimeMs: durationMs,
    mode: result.mode,
    data: result.data
  };
}

export async function chatWithMentor(studentId, message, conversationHistory = []) {
  const profile = StudentProfile.findOne({ id: studentId }) || StudentProfile.findOne();
  const career = CareerRole.findOne({ slug: profile?.targetCareerId }) || CareerRole.findOne();

  const fallbackChat = () => {
    const lower = message.toLowerCase();

    if (lower.includes("what should i learn today") || lower.includes("today") || lower.includes("start")) {
      return {
        reply: `Hello ${profile?.fullName || "Alex"}! Today your priority should be mastering **JavaScript asynchronous programming (Promises, async/await, and the Event Loop)**. In your target career as a **${profile?.targetCareer || "Full Stack Developer"}**, JavaScript is the backbone for both React frontend components and Node.js backend services. You're currently at Stage 1/Stage 2 in your roadmap. I recommend spending 45 minutes on the interactive tutorial, followed by Mission 2 in the Project Lab!`,
        suggestedPrompts: [
          "Why is JavaScript important for my target career?",
          "How can I test my JavaScript knowledge?",
          "What is my current career readiness score?"
        ]
      };
    }

    if (lower.includes("why is javascript important") || lower.includes("javascript")) {
      return {
        reply: `JavaScript is the universal runtime of the modern web. In the **${profile?.targetCareer || "Full Stack Developer"}** blueprint, JavaScript accounts for **20% of your total weighted career readiness score**. Without strong JavaScript proficiency, learning React or Node.js becomes exponentially harder because both rely heavily on closures, array methods, and asynchronous promises. By mastering JS first, you unlock the entire downstream roadmap!`,
        suggestedPrompts: [
          "Take JavaScript Skill Assessment now",
          "What are the prerequisites for React.js?",
          "What should I learn today?"
        ]
      };
    }

    if (lower.includes("switch") || lower.includes("change") || lower.includes("ai engineer") || lower.includes("data scientist")) {
      return {
        reply: `You can seamlessly explore or switch career goals anytime using our **Career Twin** module! When you switch, our AI Council (Career Architect & Gap Predictor) automatically recalculates your matching skills and reorders your roadmap while **strictly preserving all your earned XP, verified assessments, and completed projects**. For instance, your existing Python and SQL skills will give you an instant 45-55% head start if you explore Data Scientist or AI Engineer!`,
        suggestedPrompts: [
          "Compare Full Stack vs AI Engineer side-by-side",
          "What skills do I need for AI Engineer?",
          "Recalculate my roadmap"
        ]
      };
    }

    if (lower.includes("rescue") || lower.includes("score") || lower.includes("fail") || lower.includes("roadmap change")) {
      return {
        reply: `Our **Learning Rescue System** is designed precisely so you never get stuck. If you score under 50% on any assessment, Agent 5 (Performance Evaluator) flags the exact weak concepts and Agent 4 inserts targeted remedial drills and easier resources into your roadmap. Learning is not linear—adapting when you struggle is how true mastery happens!`,
        suggestedPrompts: [
          "How does the Learning Rescue System work?",
          "What are my weakest skills right now?",
          "What should I learn today?"
        ]
      };
    }

    // Default intelligent conversational reply
    return {
      reply: `I'm tracking your learning trajectory closely, ${profile?.fullName || "Alex"}. You are currently at **${profile?.careerReadiness || 38}% career readiness** for **${profile?.targetCareer || "Full Stack Developer"}** with **${profile?.xp || 420} XP**. All 6 AI agents in our council are active and ready. What specific question can I help you with regarding your roadmap, skill gaps, or career strategy?`,
      suggestedPrompts: [
        "What should I learn today?",
        "Why is JavaScript important for my target career?",
        "Can I switch from Full Stack to AI Engineer?",
        "Explain my Skill DNA score"
      ]
    };
  };

  const prompt = `Student: ${profile?.fullName}
Target Career: ${profile?.targetCareer}
Career Readiness: ${profile?.careerReadiness}%
Technical Skills: ${JSON.stringify(profile?.technicalSkills)}
Message: "${message}"

Respond as Vera, the AI Career Mentor. Be insightful, concise, specific to their data, and inspiring. Provide 3 suggested follow-up prompts.
Return JSON format:
{
  "reply": string,
  "suggestedPrompts": string[]
}`;

  const result = await llm.generateStructuredJSON(
    prompt,
    "You are Vera, the AI Career Mentor in SkillPath AI. You provide contextual, empathetic, and actionable career advice.",
    fallbackChat
  );

  return {
    success: true,
    data: result.data,
    mode: result.mode
  };
}
