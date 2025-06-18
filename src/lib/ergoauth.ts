import { writable, get } from 'svelte/store';
import { change_address } from '../stores/ui';

export const AUTH_URL = 'https://crystalpool.cc:8443/auth';

export const sessionId = writable<string | null>(null);

export function startAuthSession(): string {
  const id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  sessionId.set(id);
  return id;
}

export function waitForWalletAuth(
  { timeout = 60_000, interval = 2_000 } = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const started = Date.now();

    async function tick() {
      const id = get(sessionId);
      if (!id) {
        reject(new Error('Auth session not started'));
        return;
      }

      try {
        const res = await fetch(`${AUTH_URL}?id=${id}`);
        const text = await res.text();
        const data = JSON.parse(text);

        if (data?.address?.length > 1) {
          change_address.set(data.address[0]);
          resolve(data.address);
          return;
        }
      } catch (err) {
        console.error('Auth poll failed:', err);
      }

      if (Date.now() - started >= timeout) {
        reject(new Error('Auth timed out (60 s)'));
        return;
      }

      setTimeout(tick, interval);
    }

    tick();
  });
}
