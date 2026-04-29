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

export type AcademyAssetKind = 'image' | 'video' | 'pdf';

export type AcademyAsset = {
  slug: string;
  title: string;
  kind: AcademyAssetKind;
  blurb: string;
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

export async function listMarketing(): Promise<AcademyAsset[]> {
  const res = await fetch(api('/academy/marketing'), { credentials: 'include' });
  if (!res.ok) return [];
  return res.json();
}

export function marketingSrc(slug: string, download = false): string {
  const base = api(`/academy/marketing/${encodeURIComponent(slug)}`);
  return download ? `${base}?download=1` : base;
}

export async function listReference(): Promise<AcademyAsset[]> {
  const res = await fetch(api('/academy/reference'), { credentials: 'include' });
  if (!res.ok) return [];
  return res.json();
}

export function referenceSrc(slug: string): string {
  return api(`/academy/reference/${encodeURIComponent(slug)}`);
}
