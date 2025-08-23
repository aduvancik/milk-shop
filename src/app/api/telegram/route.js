// app/api/telegram/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { text } = body;
    if (!text) {
      console.error("Text is empty!");
      return NextResponse.json({ ok: false, error: "Text is empty" }, { status: 400 });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log("Bot token:", !!TELEGRAM_BOT_TOKEN);
    console.log("Chat ID:", TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ ok: false, error: "Missing token or chat_id" }, { status: 500 });
    }

    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    const result = await telegramRes.json();
    console.log("Telegram API response:", result);

    if (!telegramRes.ok) {
      return NextResponse.json({ ok: false, error: result.description || "Telegram API error" });
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Error in /api/telegram:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
