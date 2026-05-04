async function saveToSupabase(payload) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('Supabase env vars missing; skipping CRM save');
    return;
  }
  try {
    const res = await fetch(`${url}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('Supabase save failed:', res.status, txt.slice(0, 200));
    }
  } catch (err) {
    console.error('Supabase save error:', err.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    first_name, email,
    stress_score, energy_score, habit_score, reward_score,
    primary_dimension, readiness, answers,
  } = req.body;

  if (!email || !first_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const auth = Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64');

  const sanitizedFirstName = first_name.trim().slice(0, 100);
  const sanitizedEmail = email.trim().toLowerCase();

  const payload = {
    email_address: sanitizedEmail,
    status: 'subscribed',
    merge_fields: {
      FNAME: sanitizedFirstName,
      SFUNNEL: 'sugar',
      PDIM: primary_dimension || '',
      READINESS: readiness || '',
      STRESS: Number(stress_score) || 0,
      ENERGY: Number(energy_score) || 0,
      HABIT: Number(habit_score) || 0,
      REWARD: Number(reward_score) || 0,
    },
    tags: ['sugar'],
  };

  try {
    const response = await fetch(
      'https://us10.api.mailchimp.com/3.0/lists/95e2a14c14/members',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok && data.title !== 'Member Exists') {
      console.error('Mailchimp error:', data);
      return res.status(500).json({ error: data.detail || 'Subscription failed' });
    }

    // Save to Supabase CRM (non-blocking)
    const sourceDetail = readiness
      ? `Readiness: ${readiness}` + (Array.isArray(answers) ? `; ${answers.length} quiz answers captured` : '')
      : null;

    const contactRow = {
      first_name: sanitizedFirstName,
      email: sanitizedEmail,
      source_funnel: 'sugar_quiz',
      stage: 'lead',
    };
    if (typeof stress_score === 'number') contactRow.stress_score = stress_score;
    if (typeof energy_score === 'number') contactRow.energy_score = energy_score;
    if (typeof habit_score === 'number') contactRow.habit_score = habit_score;
    if (typeof reward_score === 'number') contactRow.reward_score = reward_score;
    if (typeof primary_dimension === 'string') contactRow.primary_dimension = primary_dimension;
    if (sourceDetail) contactRow.source_detail = sourceDetail.slice(0, 1000);

    await saveToSupabase(contactRow);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Network error:', error);
    return res.status(500).json({ error: 'Network error' });
  }
}
