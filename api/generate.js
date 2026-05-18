export default async function handler(req, res) {
  if (req.headers['x-app-password'] !== process.env.APP_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' });

  const r = await fetch('https://openrouter.ai/api/v1/videos', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://vidai.vercel.app',
      'X-Title': 'AI Video Studio',
    },
    body: JSON.stringify(req.body),
  });
  const data = await r.json();
  res.status(r.status).json(data);
}
