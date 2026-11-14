// server/agents/skillAgent.js
// AGENT 1: SKILL ANALYSIS AGENT
// Responsibility: Deep audit of student skills, proficiency classification, confidence scoring, evidence verification.

import { llm } from "../services/llmService.js";
import { StudentProfile, AssessmentResult, ProjectEvaluation, Skill } from "../db/database.js";

export async function runSkillAnalysisAgent(studentId) {
  const startTime = Date.now();
  const profile = StudentProfile.findOne({ id: studentId }) || StudentProfile.findOne();
  if (!profile) {
    throw new Error(`Learner profile not found for ID: ${studentId}`);
  }

  // Gather empirical evidence: assessment results & evaluated projects
  const assessments = AssessmentResult.find({ studentId: profile.id });
  const projectEvals = ProjectEvaluation.find({ studentId: profile.id, status: "evaluated" });
  const allKnownSkills = Skill.find();

  // Rule-based fallback calculation
  const fallbackGenerator = () => {
    const rawSkills = profile.technicalSkills || [];
    const strong = [];
    const intermediate = [];
    const beginner = [];
    const untested = [];

    let totalConfidencePoints = 0;
    let assessedCount = 0;
    let projectVerifiedCount = 0;

    rawSkills.forEach(s => {
      // Check if skill has assessment evidence
      const asmEvidence = assessments.filter(a => a.skillName.toLowerCase() === s.name.toLowerCase());
      const bestAsm = asmEvidence.sort((a, b) => b.score - a.score)[0];

      // Check if verified by completed projects
      const projEvidence = projectEvals.some(pe => (pe.verifiedSkills || []).some(vs => vs.toLowerCase() === s.name.toLowerCase()));

      let confidence = s.confidence || (s.verified ? 70 : 40);
      if (bestAsm) {
        assessedCount++;
        confidence = Math.round((confidence * 0.4) + (bestAsm.score * 0.6));
      }
      if (projEvidence) {
        projectVerifiedCount++;
        confidence = Math.min(100, confidence + 15);
      }

      totalConfidencePoints += confidence;

      const item = {
        name: s.name,
        declaredProficiency: s.proficiency || "Beginner",
        confidence,
        verified: Boolean(bestAsm?.passed || projEvidence || s.verified),
        assessmentScore: bestAsm ? bestAsm.score : null,
        projectEvidence: projEvidence ? "Verified in Project Lab" : null,
        source: s.source || (bestAsm ? "Assessment Graded" : "Self-Reported")
      };

      if (confidence >= 75) strong.push(item);
      else if (confidence >= 55) intermediate.push(item);
      else if (confidence >= 30) beginner.push(item);
      else untested.push(item);
    });

    const averageConfidence = rawSkills.length > 0
      ? Math.round(totalConfidencePoints / rawSkills.length)
      : 30;

    const strengths = strong.map(s => `${s.name} (${s.confidence}% confidence, ${s.source})`);
    const weaknesses = beginner.concat(untested).map(s => `${s.name} (${s.confidence}% confidence)`);

    return {
      studentId: profile.id,
      studentName: profile.fullName,
      analyzedAt: new Date().toISOString(),
      skillsCount: rawSkills.length,
      averageConfidence,
      verifiedCount: assessedCount + projectVerifiedCount,
      selfReportedCount: rawSkills.filter(s => !s.verified).length,
      classification: {
        strong,
        intermediate,
        beginner,
        untested
      },
      strengths: strengths.length ? strengths : ["Demonstrated foundation in computer science principles"],
      weaknesses: weaknesses.length ? weaknesses : ["Requires formal assessment on emerging framework skills"],
      evidenceSummary: [
        `Verified ${assessedCount} technical skills through automated assessments.`,
        `Extracted ${projectVerifiedCount} practical skill proofs from evaluated lab missions.`,
        `Identified ${rawSkills.length - assessedCount} self-reported skills requiring verification benchmarks.`
      ]
    };
  };

  const prompt = `Analyze this learner profile and produce an in-depth Skill DNA report:
Student: ${profile.fullName}
Degree: ${profile.degree}
Technical Skills: ${JSON.stringify(profile.technicalSkills)}
Completed Assessments: ${JSON.stringify(assessments)}
Project Evaluations: ${JSON.stringify(projectEvals)}

Classify each skill into strong, intermediate, beginner, or untested. Compute a verified skill confidence score (0-100) factoring in that self-reported skills cannot have full confidence without empirical assessment or project evidence.
Return JSON with schema:
{
  "studentId": "${profile.id}",
  "studentName": "${profile.fullName}",
  "averageConfidence": number,
  "classification": {
    "strong": [{ "name": string, "confidence": number, "verified": boolean, "source": string }],
    "intermediate": [{ "name": string, "confidence": number, "verified": boolean, "source": string }],
    "beginner": [{ "name": string, "confidence": number, "verified": boolean, "source": string }],
    "untested": [{ "name": string, "confidence": number, "verified": boolean, "source": string }]
  },
  "strengths": string[],
  "weaknesses": string[],
  "evidenceSummary": string[]
}`;

  const result = await llm.generateStructuredJSON(
    prompt,
    "You are AGENT 1: SKILL DETECTIVE in SkillPath AI. You evaluate skills objectively, refusing to treat unverified self-claims as verified.",
    fallbackGenerator
  );

  const durationMs = Date.now() - startTime;
  return {
    agentId: "agent-1-skill-detective",
    agentName: "Skill Analysis Agent (Skill Detective)",
    status: "Completed",
    executionTimeMs: durationMs,
    mode: result.mode,
    data: result.data
  };
}
