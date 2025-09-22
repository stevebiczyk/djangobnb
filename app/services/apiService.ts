import { getAccessToken } from "../lib/actions";

const isFormData = (val: unknown): val is FormData =>
  typeof FormData !== "undefined" && val instanceof FormData;

const apiBase = process.env.NEXT_PUBLIC_API_HOST ?? "";

const parseJsonSafely = async (res: Response) => {
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

const apiService = {
  get: async (url: string) => {
    const res = await fetch(`${apiBase}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GET ${url} ${res.status}: ${text}`);
    }
    return parseJsonSafely(res);
  },

  post: async (url: string, data: unknown) => {
    const token = await getAccessToken();
    const isFD = isFormData(data);

    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (!isFD) headers["Content-Type"] = "application/json";

    const body = isFD
      ? (data as FormData)
      : (() => {
          if (typeof data !== "object" || data === null) {
            throw new Error(
              "apiService.post expects a plain object or FormData"
            );
          }
          return JSON.stringify(data);
        })();

    const res = await fetch(`${apiBase}${url}`, {
      method: "POST",
      headers,
      body,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`POST ${url} ${res.status}: ${text}`);
    }
    return parseJsonSafely(res);
  },

  // ← Use this for login/register etc.
  postWithoutToken: async (url: string, data: unknown) => {
    const isFD = isFormData(data);

    const headers: Record<string, string> = { Accept: "application/json" };
    if (!isFD) headers["Content-Type"] = "application/json";

    const body = isFD
      ? (data as FormData)
      : (() => {
          if (typeof data !== "object" || data === null) {
            throw new Error(
              "apiService.postWithoutToken expects a plain object or FormData"
            );
          }
          return JSON.stringify(data);
        })();

    const res = await fetch(`${apiBase}${url}`, {
      method: "POST",
      headers,
      body,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`POST (no token) ${url} ${res.status}: ${text}`);
    }
    return parseJsonSafely(res);
  },
};

export default apiService;

// import { getAccessToken } from "../lib/actions";

// const apiService = {
//   get: async (url: string) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${await getAccessToken()}`,
//       },
//     });
//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`GET ${url} ${res.status}: ${text}`);
//     }
//     // Handle 204 / empty body safely
//     const text = await res.text();
//     return text ? JSON.parse(text) : null;
//   },

//   post: async (url: string, data: unknown) => {
//     // If you're expecting JSON, make sure `data` is an object
//     if (typeof data !== "object" || data === null) {
//       throw new Error(
//         "apiService.post expects a plain object for JSON endpoints"
//       );
//     }

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${await getAccessToken()}`,
//       },
//       body: JSON.stringify(data), // safe now
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`POST ${url} ${res.status}: ${text}`);
//     }

//     const text = await res.text();
//     return text ? JSON.parse(text) : null;
//   },

//   postWithoutToken: async (url: string, data: unknown) => {
//     // If you're expecting JSON, make sure `data` is an object
//     if (typeof data !== "object" || data === null) {
//       throw new Error(
//         "apiService.postWithoutToken expects a plain object for JSON endpoints"
//       );
//     }

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data), // safe now
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

// import { getAccessToken } from "../lib/actions";

// const apiService = {
//   get: async function (url: string): Promise<any> {
//     console.log("get", url);

//     const token = await getAccessToken();

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
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

//     const token = await getAccessToken();

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "POST",
//         body: data,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
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

//   postWithoutToken: async function (url: string, data: any): Promise<any> {
//     console.log("post", url, data);

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "POST",
//         body: data,
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
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
// };

// export default apiService;
