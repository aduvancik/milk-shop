'use client';

export async function sendTelegramMessage(text) {
  try {
    const res = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return data; // повертає { ok: true/false, result/error }
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
