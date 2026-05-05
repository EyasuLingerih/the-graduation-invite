import type { VercelRequest, VercelResponse } from '@vercel/node';

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const RSVP_LIST_KEY = 'graduation-rsvp-list';

async function upstash(path: string, method = 'GET', body?: unknown) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    throw new Error('Upstash environment variables are not configured.');
  }

  const res = await fetch(`${UPSTASH_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Upstash error: ${error}`);
  }

  return res.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      const { name, email, guests, phone, message, attending } = req.body;

      if (!name || !email || guests === undefined || guests === null) {
        return res.status(400).json({ error: 'Name, email, and guest count are required.' });
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const isNotAttending = attending === false || guests === 0;
      const rsvp = {
        id,
        name,
        email,
        guests,
        phone: phone || '',
        message: message || '',
        attending: !isNotAttending,
        status: isNotAttending ? 'not_attending' : 'pending',
        submittedAt: new Date().toISOString(),
      };

      // Store RSVP
      await upstash(`/set/graduation-rsvp:${id}`, 'POST', rsvp);
      // Append id to the list
      await upstash(`/rpush/${RSVP_LIST_KEY}/${id}`, 'POST');

      return res.status(200).json({ ok: true, id });
    }

    if (req.method === 'GET') {
      // Security check
      const authHeader = req.headers.authorization;
      if (!process.env.ADMIN_PASSWORD || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get all IDs
      const listData = await upstash(`/lrange/${RSVP_LIST_KEY}/0/-1`);
      const ids: string[] = listData.result || [];

      if (ids.length === 0) return res.status(200).json({ rsvps: [] });

      // Fetch each RSVP
      const rsvps = await Promise.all(
        ids.map(async (id) => {
          try {
            const data = await upstash(`/get/graduation-rsvp:${id}`);
            let val = data.result;
            if (typeof val === 'string') val = JSON.parse(val);
            if (typeof val === 'string') val = JSON.parse(val);
            return val;
          } catch (e) {
            console.error(`Error fetching RSVP ${id}:`, e);
            return null;
          }
        })
      );

      return res.status(200).json({ rsvps: rsvps.filter(Boolean).reverse() });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('RSVP API Error:', e);
    return res.status(500).json({ error: String(e) });
  }
}
