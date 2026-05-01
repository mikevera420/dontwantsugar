export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    first_name, email,
    stress_score, energy_score, habit_score, reward_score,
    primary_dimension, readiness,
  } = req.body;

  if (!email || !first_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const auth = Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64');

  const payload = {
    email_address: email.trim().toLowerCase(),
    status: 'subscribed',
    merge_fields: {
      FNAME: first_name.trim(),
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Network error:', error);
    return res.status(500).json({ error: 'Network error' });
  }
}
