import { useEffect, useRef, useState } from "react";

/**
 * useCountdown — ticks a "Xd XXh XXm XXs" string down every second from a
 * fixed number of seconds. The deadline is anchored to mount time, so each
 * time the panel opens it restarts near the given value (mock behaviour).
 */
export function useCountdown(totalSeconds: number): string {
  const deadline = useRef(Date.now() + totalSeconds * 1000);
  const [, force] = useState(0);

  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, Math.round((deadline.current - Date.now()) / 1000));
  const d = Math.floor(remaining / 86400);
  const h = Math.floor((remaining % 86400) / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d}d ${p(h)}h ${p(m)}m ${p(s)}s`;
}
