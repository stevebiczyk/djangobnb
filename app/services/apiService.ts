const apiService = {
  get: async (url: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GET ${url} ${res.status}: ${text}`);
    }
    // Handle 204 / empty body safely
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  post: async (url: string, data: unknown) => {
    // If you're expecting JSON, make sure `data` is an object
    if (typeof data !== "object" || data === null) {
      throw new Error(
        "apiService.post expects a plain object for JSON endpoints"
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // safe now
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

// const apiService = {
//   get: async function (url: string): Promise<any> {
//     console.log("get", url);

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "GET",
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
//   post: async function (url: string, data: any): Promise<any> {
//     console.log("post", url, data);
//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "POST",
//         body: JSON.stringify(data),
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
