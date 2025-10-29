// app/services/apiService.ts
import { getAccessToken } from "../lib/actions";

const API_BASE = process.env.NEXT_PUBLIC_API_HOST ?? "";

const isFormData = (v: unknown): v is FormData =>
  typeof FormData !== "undefined" && v instanceof FormData;

const resolveAccessToken = async (): Promise<string | null> => {
  if (typeof window !== "undefined") {
    const t =
      localStorage.getItem("access_token") || localStorage.getItem("access");
    if (t) return t;
  }
  try {
    return await getAccessToken();
  } catch {
    return null;
  }
};

const parseResponse = async (res: Response, url: string, method: string) => {
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${url} ${res.status}: ${text}`);
  return text ? JSON.parse(text) : null;
};

const normalizePath = (u: string) => {
  try {
    const full = new URL(u, API_BASE);
    let p = full.pathname;
    if (!p.endsWith("/")) p += "/";
    return p;
  } catch {
    const p0 = u.split("?")[0].split("#")[0];
    return p0.endsWith("/") ? p0 : `${p0}/`;
  }
};

const request = async (
  method: "GET" | "POST",
  url: string,
  data?: unknown,
  withAuth = true
) => {
  const isFD = isFormData(data);
  const path = normalizePath(url);

  const PUBLIC_AUTH_ROUTES = new Set<string>([
    "/api/auth/login/",
    "/api/auth/register/",
    "/api/token/refresh/",
    "/api/auth/jwt/refresh/",
  ]);

  const shouldAttachAuth = withAuth && !PUBLIC_AUTH_ROUTES.has(path);
  const token = shouldAttachAuth ? await resolveAccessToken() : null;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (method === "POST" && !isFD) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const body: BodyInit | undefined =
    method === "POST"
      ? isFD
        ? (data as FormData)
        : JSON.stringify(data ?? {})
      : undefined;

  const res = await fetch(`${API_BASE}${url}`, { method, headers, body });
  return parseResponse(res, url, method);
};

const apiService = {
  get: (url: string) => request("GET", url, undefined, true),
  post: (url: string, data: unknown) => request("POST", url, data, true),
  postWithoutToken: (url: string, data: unknown) =>
    request("POST", url, data, false),
};

export default apiService;

// import { getAccessToken } from "../lib/actions";

// const API_BASE = process.env.NEXT_PUBLIC_API_HOST ?? "";

// const isFormData = (v: unknown): v is FormData =>
//   typeof FormData !== "undefined" && v instanceof FormData;

// const resolveAccessToken = async (): Promise<string | null> => {
//   // Prefer fresh browser token
//   if (typeof window !== "undefined") {
//     const t = localStorage.getItem("access_token");
//     if (t) return t;
//   }
//   // Fallback to server helper (no-op on client if unavailable)
//   try {
//     return await getAccessToken();
//   } catch {
//     return null;
//   }
// };

// const parseResponse = async (res: Response, url: string, method: string) => {
//   const text = await res.text(); // read once
//   if (!res.ok) {
//     // bubble the real body for debugging (JSON or HTML/text)
//     throw new Error(`${method} ${url} ${res.status}: ${text}`);
//   }
//   return text ? JSON.parse(text) : null;
// };

// const request = async (
//   method: "GET" | "POST",
//   url: string,
//   data?: unknown,
//   withAuth = true
// ) => {
//   const isFD = isFormData(data);

//   // Normalize the URL path (strip query/hash, ensure trailing slash)
//   const normalizePath = (u: string) => {
//     try {
//       // Works if you pass absolute URLs; otherwise falls back
//       const full = new URL(u, API_BASE);
//       let p = full.pathname;
//       if (!p.endsWith("/")) p += "/";
//       return p;
//     } catch {
//       // Relative URL case without base
//       const p0 = u.split("?")[0].split("#")[0];
//       return p0.endsWith("/") ? p0 : `${p0}/`;
//     }
//   };

//   const path = normalizePath(url);

//   // Only these are public auth routes (extend if you add more)
//   const PUBLIC_AUTH_ROUTES = new Set<string>([
//     "/api/auth/login/",
//     "/api/auth/register/",
//     "/api/token/refresh/",
//     "/api/auth/jwt/refresh/",
//   ]);

//   const shouldAttachAuth = withAuth && !PUBLIC_AUTH_ROUTES.has(path);
//   const token = shouldAttachAuth ? await resolveAccessToken() : null;

//   const headers: Record<string, string> = {};
//   // It's fine to always send Accept for JSON APIs
//   headers.Accept = "application/json";

//   // Only set Content-Type for JSON bodies (never for FormData)
//   if (method === "POST" && !isFD) {
//     headers["Content-Type"] = "application/json";
//   }

//   if (token) headers.Authorization = `Bearer ${token}`;

//   const body: BodyInit | undefined =
//     method === "POST"
//       ? isFD
//         ? (data as FormData)
//         : JSON.stringify(data ?? {})
//       : undefined;

//   const res = await fetch(`${API_BASE}${url}`, { method, headers, body });
//   return parseResponse(res, url, method);
// };

// const apiService = {
//   // Always returns parsed JSON (or null for empty body) or throws with a detailed Error
//   get: (url: string) => request("GET", url, undefined, /*withAuth*/ true),

//   // Handles both JSON objects and FormData; attaches Authorization unless it's an auth route
//   post: (url: string, data: unknown) =>
//     request("POST", url, data, /*withAuth*/ true),

//   // Public POST (no Authorization); still handles JSON vs FormData correctly
//   postWithoutToken: (url: string, data: unknown) =>
//     request("POST", url, data, /*withAuth*/ false),
// };

// export default apiService;
