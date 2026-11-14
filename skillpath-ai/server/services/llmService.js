// server/services/llmService.js
// Configurable LLM API integration (Gemini / OpenAI) with realistic rule-based fallback

export class LLMService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY || "";
    this.model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    this.hasActiveKey = Boolean(this.apiKey && this.apiKey.trim().length > 10);
  }

  isConfigured() {
    return this.hasActiveKey;
  }

  async generateStructuredJSON(prompt, systemInstruction = "", fallbackGenerator = null) {
    if (!this.hasActiveKey) {
      if (typeof fallbackGenerator === "function") {
        const fallbackResult = await fallbackGenerator();
        return {
          success: true,
          data: fallbackResult,
          mode: "rule-based-fallback",
          model: "SkillPath-RuleEngine-v2",
          note: "Executed via deterministic rule-based agent engine (Set GEMINI_API_KEY in .env to enable live LLM synthesis)."
        };
      }
      throw new Error("No LLM API key configured and no fallback generator provided.");
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction ? systemInstruction + "\n\n" : ""}${prompt}\n\nIMPORTANT: Return ONLY valid, parseable JSON conforming to the requested schema. Do not include markdown code block backticks if possible.` }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          responseMimeType: "application/json"
        }
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`[LLM API Warning] Status ${res.status}: ${errorText}. Falling back to rule engine.`);
        if (typeof fallbackGenerator === "function") {
          return {
            success: true,
            data: await fallbackGenerator(),
            mode: "rule-based-fallback",
            model: "SkillPath-RuleEngine-v2",
            error: `API error (${res.status}): used fallback`
          };
        }
        throw new Error(`LLM API returned status ${res.status}`);
      }

      const json = await res.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleaned);

      return {
        success: true,
        data: parsedData,
        mode: "live-llm",
        model: this.model,
        usage: json.usageMetadata || null
      };
    } catch (err) {
      console.warn("[LLM API Exception] Falling back to rule-based engine:", err.message);
      if (typeof fallbackGenerator === "function") {
        return {
          success: true,
          data: await fallbackGenerator(),
          mode: "rule-based-fallback",
          model: "SkillPath-RuleEngine-v2",
          error: err.message
        };
      }
      throw err;
    }
  }
}

export const llm = new LLMService();
