export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const cookieName = name.startsWith("utm_") ? name : `utm_${name}`;
  document.cookie = `${cookieName}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export function getCookie(name: string) {
  const cookieName = name.startsWith("utm_") ? name : `utm_${name}`;
  const value = document.cookie
    .split("; ")
    .find(row => row.startsWith(cookieName + "="))
    ?.split("=")[1];
  return value ? decodeURIComponent(value) : null;
}

export function deleteUTMCookie(names?: string[]) {
  const cookies = document.cookie.split("; ").map(c => c.split("=")[0]);
  const targets = names?.length
    ? names.map(n => (n.startsWith("utm_") ? n : `utm_${n}`))
    : cookies.filter(name => name.startsWith("utm_"));
  targets.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure`;
  });
}
