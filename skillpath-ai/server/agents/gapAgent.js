// server/agents/gapAgent.js
// AGENT 3: SKILL GAP PREDICTION AGENT
// Responsibility: Identify prerequisite dependencies, prioritize critical skill bottlenecks, construct topological dependency order.

import { llm } from "../services/llmService.js";
import { Skill } from "../db/database.js";

export async function runSkillGapPredictionAgent(careerMatchData, skillAnalysisData) {
  const startTime = Date.now();
  const missingSkills = careerMatchData?.data?.missingSkills || careerMatchData?.missingSkills || [];
  const knownSkills = Skill.find();

  const fallbackGenerator = () => {
    const criticalGaps = [];
    const moderateGaps = [];
    const prerequisiteChains = [];

    // Analyze each missing skill for prerequisites
    missingSkills.forEach(ms => {
      const dbSkill = knownSkills.find(ks => ks.name.toLowerCase() === ms.name.toLowerCase());
      const prereqs = dbSkill ? dbSkill.prerequisites : [];

      const gapObject = {
        name: ms.name,
        category: ms.category || "General",
        urgency: ms.isCore ? "Critical" : "Moderate",
        requiredLevel: ms.requiredLevel || "Intermediate",
        prerequisites: prereqs,
        hasUnmetPrerequisites: prereqs.some(p => missingSkills.some(m => m.name.toLowerCase() === p.toLowerCase()))
      };

      if (ms.isCore) {
        criticalGaps.push(gapObject);
      } else {
        moderateGaps.push(gapObject);
      }

      if (prereqs.length > 0) {
        prerequisiteChains.push({
          target: ms.name,
          requires: prereqs,
          impact: `Cannot achieve production proficiency in ${ms.name} without first completing ${prereqs.join(", ")}.`
        });
      }
    });

    // Topological sorting for recommended sequence:
    // Items with fewer missing prerequisites come earlier
    const allGaps = [...criticalGaps, ...moderateGaps];
    const sequence = [...allGaps].sort((a, b) => {
      if (a.prerequisites.includes(b.name)) return 1;
      if (b.prerequisites.includes(a.name)) return -1;
      if (a.urgency === "Critical" && b.urgency !== "Critical") return -1;
      return 0;
    }).map((g, idx) => ({
      step: idx + 1,
      skillName: g.name,
      urgency: g.urgency,
      reason: g.prerequisites.length > 0
        ? `Prerequisites: ${g.prerequisites.join(", ")}`
        : "Foundational prerequisite for downstream stack components"
    }));

    return {
      analyzedCareer: careerMatchData?.data?.careerTitle || "Target Career",
      totalGapsIdentified: missingSkills.length,
      criticalGapsCount: criticalGaps.length,
      moderateGapsCount: moderateGaps.length,
      criticalGaps,
      moderateGaps,
      prerequisiteChains,
      recommendedSequence: sequence,
      blockerSummary: `Detected ${criticalGaps.length} critical knowledge bottlenecks. Primary blocker sequence identified: ${sequence.slice(0, 3).map(s => s.skillName).join(" -> ")}.`
    };
  };

  const prompt = `Given the target career '${careerMatchData?.data?.careerTitle}' and these missing skills:
${JSON.stringify(missingSkills)}

Analyze prerequisite dependency relationships and formulate a prioritized learning dependency order.
Return JSON format:
{
  "analyzedCareer": "${careerMatchData?.data?.careerTitle}",
  "totalGapsIdentified": number,
  "criticalGaps": [{ "name": string, "urgency": string, "prerequisites": string[] }],
  "moderateGaps": [{ "name": string, "urgency": string, "prerequisites": string[] }],
  "prerequisiteChains": [{ "target": string, "requires": string[], "impact": string }],
  "recommendedSequence": [{ "step": number, "skillName": string, "urgency": string, "reason": string }],
  "blockerSummary": string
}`;

  const result = await llm.generateStructuredJSON(
    prompt,
    "You are AGENT 3: SKILL GAP PREDICTOR in SkillPath AI. You construct strict prerequisite dependency graphs.",
    fallbackGenerator
  );

  const durationMs = Date.now() - startTime;
  return {
    agentId: "agent-3-gap-predictor",
    agentName: "Skill Gap Prediction Agent (Gap Predictor)",
    status: "Completed",
    executionTimeMs: durationMs,
    mode: result.mode,
    data: result.data
  };
}
