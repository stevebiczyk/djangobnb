// import { getAccessToken } from "../lib/actions";

// const isFormData = (val: unknown): val is FormData =>
//   typeof FormData !== "undefined" && val instanceof FormData;

// const apiBase = process.env.NEXT_PUBLIC_API_HOST ?? "";

// const parseJsonSafely = async (res: Response) => {
//   const text = await res.text();
//   return text ? JSON.parse(text) : null;
// };

// const apiService = {
//   get: async (url: string) => {
//     const res = await fetch(`${apiBase}${url}`, {
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
//     return parseJsonSafely(res);
//   },

//   post: async (url: string, data: unknown) => {
//     const token = await getAccessToken();
//     const isFD = isFormData(data);

//     const headers: Record<string, string> = { Accept: "application/json" };
//     if (token) headers.Authorization = `Bearer ${token}`;
//     if (!isFD) headers["Content-Type"] = "application/json";

//     const body = isFD
//       ? (data as FormData)
//       : (() => {
//           if (typeof data !== "object" || data === null) {
//             throw new Error(
//               "apiService.post expects a plain object or FormData"
//             );
//           }
//           return JSON.stringify(data);
//         })();

//     const res = await fetch(`${apiBase}${url}`, {
//       method: "POST",
//       headers,
//       body,
//     });
//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`POST ${url} ${res.status}: ${text}`);
//     }
//     return parseJsonSafely(res);
//   },

//   // ← Use this for login/register etc.
//   postWithoutToken: async (url: string, data: unknown) => {
//     const isFD = isFormData(data);

//     const headers: Record<string, string> = { Accept: "application/json" };
//     if (!isFD) headers["Content-Type"] = "application/json";

//     const body = isFD
//       ? (data as FormData)
//       : (() => {
//           if (typeof data !== "object" || data === null) {
//             throw new Error(
//               "apiService.postWithoutToken expects a plain object or FormData"
//             );
//           }
//           return JSON.stringify(data);
//         })();

//     const res = await fetch(`${apiBase}${url}`, {
//       method: "POST",
//       headers,
//       body,
//     });
//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`POST (no token) ${url} ${res.status}: ${text}`);
//     }
//     return parseJsonSafely(res);
//   },
// };

// export default apiService;

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

import { getAccessToken } from "../lib/actions";

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log("get", url);

    const token = await getAccessToken();
    // const token =
    //   (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
    //   (await getAccessToken());

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    const token =
      (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
      (await getAccessToken());
    // const token = await getAccessToken();
    // Use the existing FormData if provided; otherwise convert an object -> FormData
    const isFD = typeof FormData !== "undefined" && data instanceof FormData;
    const body: BodyInit = isFD
      ? data
      : (() => {
          const fd = new FormData();
          if (data && typeof data === "object") {
            Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
          }
          return fd;
        })();

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        // .catch((error) => {
        //   reject(error);
        // });
        .catch((error) => reject(error));
    });
  },

  // postWithoutToken: async function (url: string, data: any): Promise<any> {
  //   console.log("post", url, data);

  //   const formData = new FormData();
  //   for (const key in data) {
  //     formData.append(key, data[key]);
  //   }

  //   return new Promise((resolve, reject) => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
  //       method: "POST",
  //       body: formData,
  //       // body: JSON.stringify(data),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       // .then((response) => response.json())
  //       .then(async (response) => {
  //         // Check if the response is not OK (status code >= 400)
  //         if (!response.ok) {
  //           const error = await response.json();
  //           throw new Error(JSON.stringify(error));
  //         }
  //         return response.json();
  //       })
  //       .then((json) => {
  //         console.log("Response:", json);

  //         resolve(json);
  //       })
  //       .catch((error) => {
  //         console.error("Fetch error:", error); // Log the error
  //         reject(error);
  //       });
  //   });
  // },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    // detect FormData so we don't set Content-Type (browser sets boundary)
    const isFD = typeof FormData !== "undefined" && data instanceof FormData;

    // ✅ try client token first; fallback to server helper if available
    const localToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token") || localStorage.getItem("access")
        : null;
    let token = localToken;
    if (!token) {
      try {
        // harmless if ../lib/actions is server-only; we just catch errors
        const { getAccessToken } = await import("../lib/actions");
        token = await getAccessToken();
      } catch {}
    }

    const headers: Record<string, string> = {};
    if (!isFD) {
      headers.Accept = "application/json";
      headers["Content-Type"] = "application/json";
    }
    if (token) headers.Authorization = `Bearer ${token}`;

    const body = isFD ? (data as FormData) : JSON.stringify(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      headers,
      body,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`POST ${url} ${res.status}: ${text}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },
};

export default apiService;
