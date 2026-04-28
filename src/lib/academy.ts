const apiUrl = import.meta.env.PUBLIC_API_URL as string | undefined;

function api(path: string): string {
  if (!apiUrl) throw new Error('PUBLIC_API_URL is not configured');
  return `${apiUrl.replace(/\/$/, '')}${path}`;
}

export type AcademyVideo = {
  slug: string;
  title: string;
  duration: string;
};

export async function login(password: string): Promise<boolean> {
  const res = await fetch(api('/academy/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

export async function logout(): Promise<void> {
  await fetch(api('/academy/logout'), {
    method: 'POST',
    credentials: 'include',
  });
}

export async function checkSession(): Promise<boolean> {
  const res = await fetch(api('/academy/session'), { credentials: 'include' });
  return res.ok;
}

export async function listVideos(): Promise<AcademyVideo[]> {
  const res = await fetch(api('/academy/videos'), { credentials: 'include' });
  if (!res.ok) return [];
  return res.json();
}

export function videoSrc(slug: string): string {
  return api(`/academy/video/${encodeURIComponent(slug)}`);
}
