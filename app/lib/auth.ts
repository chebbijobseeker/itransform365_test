import { setCookie, parseCookies } from "nookies";

function setTokenCookie(token: string): void {
  setCookie(null, "token", token, {
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

function getTokenCookie(): string | null {
  const cookies = parseCookies();
  return cookies.token || null;
}

export { setTokenCookie, getTokenCookie };
