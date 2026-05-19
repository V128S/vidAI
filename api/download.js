export default async function handler(req, res) {
  if (req.headers['x-app-password'] !== process.env.APP_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const r = await fetch(`https://openrouter.ai/api/v1/videos/${id}/content?index=0`, {
    headers: { 'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY },
  });
  const buf = Buffer.from(await r.arrayBuffer());
  res.status(r.status);
  res.setHeader('Content-Type', r.headers.get('content-type') || 'video/mp4');
  res.setHeader('Content-Length', buf.length);
  res.send(buf);
}
