/**
 * Server-side Claude API proxy.
 * Uses the ANTHROPIC_API_KEY from environment variables.
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

interface ClaudeRequest {
  model?: string;
  max_tokens: number;
  system?: string;
  messages: { role: string; content: string }[];
}

export async function callClaude(request: ClaudeRequest): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: request.model ?? "claude-haiku-4-5",
        max_tokens: request.max_tokens,
        system: request.system,
        messages: request.messages,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Anthropic API error ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text ?? "";
  } finally {
    clearTimeout(timeout);
  }
}
