// server/agents/careerAgent.js
// AGENT 2: CAREER MATCHING AGENT
// Responsibility: Map learner skills against target career role, compute weighted readiness, and generate digital Career Twin metrics.

import { llm } from "../services/llmService.js";
import { CareerRole } from "../db/database.js";

export async function runCareerMatchingAgent(studentProfile, skillAnalysisData, targetCareerSlug = null) {
  const startTime = Date.now();
  const slug = targetCareerSlug || studentProfile.targetCareerId || "full-stack-developer";
  
  let career = CareerRole.findOne({ slug }) || CareerRole.findOne({ id: slug });
  if (!career) {
    career = CareerRole.findOne({ title: studentProfile.targetCareer }) || CareerRole.findOne();
  }

  const fallbackGenerator = () => {
    const required = career.requiredSkills || [];
    const studentSkills = studentProfile.technicalSkills || [];

    const matchingSkills = [];
    const missingSkills = [];

    let totalWeight = 0;
    let earnedWeight = 0;

    required.forEach(req => {
      totalWeight += req.weight;
      // Match by exact name or substring
      const match = studentSkills.find(
        s => s.name.toLowerCase() === req.name.toLowerCase() ||
             req.name.toLowerCase().includes(s.name.toLowerCase()) ||
             s.name.toLowerCase().includes(req.name.toLowerCase())
      );

      if (match) {
        let proficiencyMultiplier = 0.5;
        if (match.proficiency === "Advanced") proficiencyMultiplier = 1.0;
        else if (match.proficiency === "Intermediate") proficiencyMultiplier = 0.75;
        else if (match.proficiency === "Beginner") proficiencyMultiplier = 0.45;

        // Give additional credibility if verified
        if (match.verified) {
          proficiencyMultiplier = Math.min(1.0, proficiencyMultiplier + 0.15);
        }

        const scorePart = req.weight * proficiencyMultiplier;
        earnedWeight += scorePart;

        matchingSkills.push({
          name: req.name,
          category: req.category,
          requiredLevel: req.minProficiency,
          studentLevel: match.proficiency,
          verified: match.verified || false,
          matchConfidence: match.confidence || 60,
          isCore: req.isCore,
          weight: req.weight
        });
      } else {
        missingSkills.push({
          name: req.name,
          category: req.category,
          requiredLevel: req.minProficiency,
          isCore: req.isCore,
          weight: req.weight,
          urgency: req.isCore ? "High" : "Medium"
        });
      }
    });

    const readinessPercentage = totalWeight > 0
      ? Math.min(100, Math.round((earnedWeight / totalWeight) * 100))
      : 25;

    let qualificationLevel = "Foundational Candidate";
    if (readinessPercentage >= 80) qualificationLevel = "Market-Ready Junior/Mid Engineer";
    else if (readinessPercentage >= 60) qualificationLevel = "Advancing Apprentice";
    else if (readinessPercentage >= 40) qualificationLevel = "Developing Foundations";

    return {
      careerId: career.id,
      careerSlug: career.slug,
      careerTitle: career.title,
      category: career.category,
      salaryRange: career.salaryRange,
      demandLevel: career.demandLevel,
      growthRate: career.growthRate,
      readinessBenchmark: career.readinessBenchmark || 80,
      readinessPercentage,
      qualificationLevel,
      matchingSkillsCount: matchingSkills.length,
      missingSkillsCount: missingSkills.length,
      matchingSkills,
      missingSkills,
      readinessSummary: `Student demonstrates ${readinessPercentage}% alignment with the core competency blueprint for ${career.title}. Identified ${matchingSkills.length} baseline skills and ${missingSkills.length} mission-critical skill gaps.`
    };
  };

  const prompt = `Match this learner against career '${career.title}':
Learner Skills: ${JSON.stringify(studentProfile.technicalSkills)}
Career Requirements: ${JSON.stringify(career.requiredSkills)}
Benchmark: ${career.readinessBenchmark}%

Calculate the weighted career readiness score (0-100%). Identify matching vs missing skills.
Return JSON format:
{
  "careerId": "${career.id}",
  "careerTitle": "${career.title}",
  "readinessPercentage": number,
  "qualificationLevel": string,
  "matchingSkills": [{ "name": string, "category": string, "requiredLevel": string, "studentLevel": string, "verified": boolean, "isCore": boolean }],
  "missingSkills": [{ "name": string, "category": string, "requiredLevel": string, "urgency": string, "isCore": boolean }],
  "readinessSummary": string
}`;

  const result = await llm.generateStructuredJSON(
    prompt,
    "You are AGENT 2: CAREER ARCHITECT in SkillPath AI. You evaluate career fitness with rigorous mathematical weighting.",
    fallbackGenerator
  );

  const durationMs = Date.now() - startTime;
  return {
    agentId: "agent-2-career-architect",
    agentName: "Career Matching Agent (Career Architect)",
    status: "Completed",
    executionTimeMs: durationMs,
    mode: result.mode,
    data: result.data
  };
}
