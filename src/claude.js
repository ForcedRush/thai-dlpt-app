// Vercel serverless function: /api/claude
// Keeps the Anthropic API key on the server. The browser never sees it.
// Set ANTHROPIC_API_KEY (NOT prefixed with VITE_) in Vercel → Project → Settings → Environment Variables.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "ANTHROPIC_API_KEY is not configured on the server. Add it in Vercel env vars and redeploy.",
    });
    return;
  }

  const { system, messages, max_tokens } = req.body || {};

  if (!messages) {
    res.status(400).json({ error: "Missing 'messages' in request body." });
    return;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: max_tokens || 2000,
        system,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: data });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || "Unknown server error while contacting Anthropic." });
  }
}
