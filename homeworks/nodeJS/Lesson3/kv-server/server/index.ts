import express, { Request, Response } from 'express';
const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'http://localhost:4000';

app.use(express.json());

app.get('/kv/:key', async (req: Request<{ key: string }>, res: Response) => {
  try {
    const { key } = req.params;
    const value = await fetch(`${REDIS_URL}/get?key=${key}`).then(r => r.json());
    res.json(value);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/kv', async (req: any, res: any) => {
  try {
    const { key, value } = req.body;

    const r = await fetch(`${REDIS_URL}/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });

    if (!r.ok) {
      return res.status(500).json({ error: 'Failed to set value' });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});