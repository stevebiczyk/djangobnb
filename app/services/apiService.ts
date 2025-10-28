// app/services/apiService.ts
import { getAccessToken } from "../lib/actions";

const API_BASE = process.env.NEXT_PUBLIC_API_HOST ?? "";

const isFormData = (v: unknown): v is FormData =>
  typeof FormData !== "undefined" && v instanceof FormData;

const resolveAccessToken = async (): Promise<string | null> => {
  // Prefer fresh browser token
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("access_token");
    if (t) return t;
  }
  // Fallback to server helper (no-op on client if unavailable)
  try {
    return await getAccessToken();
  } catch {
    return null;
  }
};

const parseResponse = async (res: Response, url: string, method: string) => {
  const text = await res.text(); // read once
  if (!res.ok) {
    // bubble the real body for debugging (JSON or HTML/text)
    throw new Error(`${method} ${url} ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
};

const request = async (
  method: "GET" | "POST",
  url: string,
  data?: unknown,
  withAuth = true
) => {
  const isFD = isFormData(data);
  const isAuthRoute = url.startsWith("/api/auth/"); // don’t send Authorization here

  const token = withAuth && !isAuthRoute ? await resolveAccessToken() : null;

  const headers: Record<string, string> = {};
  if (method === "GET" || !isFD) {
    headers.Accept = "application/json";
  }
  if (!isFD && method === "POST") {
    headers["Content-Type"] = "application/json";
  }
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
  // Always returns parsed JSON (or null for empty body) or throws with a detailed Error
  get: (url: string) => request("GET", url, undefined, /*withAuth*/ true),

  // Handles both JSON objects and FormData; attaches Authorization unless it's an auth route
  post: (url: string, data: unknown) =>
    request("POST", url, data, /*withAuth*/ true),

  // Public POST (no Authorization); still handles JSON vs FormData correctly
  postWithoutToken: (url: string, data: unknown) =>
    request("POST", url, data, /*withAuth*/ false),
};

export default apiService;

// import { getAccessToken } from "../lib/actions";

// const apiService = {
//   get: async function (url: string): Promise<any> {
//     console.log("get", url);

//     // const token = await getAccessToken();
//     const token =
//       (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
//       (await getAccessToken());

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(async (res) => {
//           const text = await res.text(); // read once
//           if (!res.ok) throw new Error(`GET ${url} ${res.status}: ${text}`);
//           return text ? JSON.parse(text) : null; // only parse JSON when present
//         })
//         .then((response) => response.json())
//         .then((json) => {
//           console.log("Response:", json);

//           resolve(json);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },

//   post: async function (url: string, data: any): Promise<any> {
//     console.log("post", url, data);

//     const token =
//       (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
//       (await getAccessToken());
//     // const token = await getAccessToken();
//     // Use the existing FormData if provided; otherwise convert an object -> FormData
//     const isFD = typeof FormData !== "undefined" && data instanceof FormData;
//     const body: BodyInit = isFD
//       ? data
//       : (() => {
//           const fd = new FormData();
//           if (data && typeof data === "object") {
//             Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
//           }
//           return fd;
//         })();

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "POST",
//         body,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((json) => {
//           console.log("Response:", json);

//           resolve(json);
//         })
//         .catch((error) => reject(error));
//     });
//   },

//   // postWithoutToken: async function (url: string, data: any): Promise<any> {
//   //   console.log("post", url, data);

//   //   const formData = new FormData();
//   //   for (const key in data) {
//   //     formData.append(key, data[key]);
//   //   }

//   //   return new Promise((resolve, reject) => {
//   //     fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//   //       method: "POST",
//   //       body: formData,
//   //       // body: JSON.stringify(data),
//   //       headers: {
//   //         Accept: "application/json",
//   //         "Content-Type": "application/json",
//   //       },
//   //     })
//   //       // .then((response) => response.json())
//   //       .then(async (response) => {
//   //         // Check if the response is not OK (status code >= 400)
//   //         if (!response.ok) {
//   //           const error = await response.json();
//   //           throw new Error(JSON.stringify(error));
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((json) => {
//   //         console.log("Response:", json);

//   //         resolve(json);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Fetch error:", error); // Log the error
//   //         reject(error);
//   //       });
//   //   });
//   // },

//   postWithoutToken: async function (url: string, data: any): Promise<any> {
//     console.log("post", url, data);

//     // detect FormData so we don't set Content-Type (browser sets boundary)
//     const isFD = typeof FormData !== "undefined" && data instanceof FormData;

//     // ✅ try client token first; fallback to server helper if available
//     const localToken =
//       typeof window !== "undefined"
//         ? localStorage.getItem("access_token") || localStorage.getItem("access")
//         : null;
//     let token = localToken;
//     if (!token) {
//       try {
//         // harmless if ../lib/actions is server-only; we just catch errors
//         const { getAccessToken } = await import("../lib/actions");
//         token = await getAccessToken();
//       } catch {}
//     }

//     const headers: Record<string, string> = {};
//     if (!isFD) {
//       headers.Accept = "application/json";
//       headers["Content-Type"] = "application/json";
//     }
//     if (token) headers.Authorization = `Bearer ${token}`;

//     const body = isFD ? (data as FormData) : JSON.stringify(data);

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//       method: "POST",
//       headers,
//       body,
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`POST ${url} ${res.status}: ${text}`);
//     }

//     const text = await res.text();
//     return text ? JSON.parse(text) : null;
//   },
// };

// export default apiService;
