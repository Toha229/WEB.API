import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5000/api/Category",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Validation failed, ...
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        getAccessToken() != null
      ) {
        originalConfig._retry = true;
        try {
          const rs = await refreshAccessToken();
          const { accessToken, refreshToken } = rs.data;
          setRefreshToken(refreshToken);
          setAccessToken(accessToken);
          instance.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          return instance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response.data);
        }
        return;
      }
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {
  console.log("refreshAccessToken");
  return instance.post("/RefreshToken", {
    token: getAccessToken(),
    refreshToken: getrefreshToken(),
  });
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token);
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

export function getrefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export function removeTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}

const responseBody: any = (response: any) => response.data;

const request = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
};

const Category = {
  Incert: (Category: any) => request.post("/CreateCategory", Category),
  Update: (Category: any) => request.post("/UpdateCategory", Category),
  GetAll: () => request.get("/GetCategories"),
  // Get: (id: number) => request.get("/course?id=" + id),
  Delete: (id: number) => request.get("/DeleteCategory?id=" + id),
};

export async function Incert(category: any) {
  const data = await Category.Incert(category)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Update(category: any) {
  const data = await Category.Update(category)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function GetAll() {
  const data = await Category.GetAll()
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

// export async function Get(id: number) {
//   const data = await Course.Get(id)
//     .then((response) => {
//       return { response };
//     })
//     .catch((error) => {
//       return error.response;
//     });
//   return data;
// }

export async function Delete(id: number) {
  const data = await Category.Delete(id)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
