type Session = { address: string | null; timestamp: number };
const sessions = new Map<string, Session>();

/** TTL in ms (5 min) */
const TTL = 5 * 60_000;

/** Basic GC so the Map doesn’t keep dead rows forever */
setInterval(() => {
  const now = Date.now();
  for (const [id, s] of sessions) if (now - s.timestamp > TTL) sessions.delete(id);
}, 60_000);

export default {
  port: process.env.PORT ?? 8080,
  fetch(req: Request) {
    const { searchParams, pathname } = new URL(req.url);

    if (pathname !== "/ergopay/auth")
      return new Response("Not found", { status: 404 });

    const id   = searchParams.get("id") ?? undefined;
    const addr = searchParams.get("address") ?? undefined;

    if (!id) {
      return json({ success: false, address: null,
                    message: "Missing id query parameter" }, 400);
    }

    // Wallet sets the user’s address
    if (addr) {
      sessions.set(id, { address: addr, timestamp: Date.now() });
      return json({ success: true, address: addr });
    }

    // Front-end polling
    const row = sessions.get(id);
    if (!row?.address)
      return json({ success: false, address: null, message: "Not connected" });

    return json({ success: true, address: row.address });
  }
};

/** Helper to return JSON with proper headers */
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
