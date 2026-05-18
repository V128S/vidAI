export default async function handler(req, res) {
  if (req.headers['x-app-password'] !== process.env.APP_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const r = await fetch(`https://openrouter.ai/api/v1/videos/${id}`, {
    headers: { 'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY },
  });
  const data = await r.json();
  res.status(r.status).json(data);
}
