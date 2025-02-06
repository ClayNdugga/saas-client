import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient {
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    // this.client.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const originalRequest = error.config;

    //     // Skip refresh token attempt if the failed request was itself a refresh token request
    //     // or if we've already tried to refresh once
    //     if (error.response?.status === 401
    //         && !originalRequest._retry
    //         && originalRequest.url !== '/api/auth/refresh-token') {
    //       originalRequest._retry = true;
    //       try {
    //         console.log("Refreshing token");
    //         await this.client.post('/api/auth/refresh-token');
    //         return this.client(originalRequest);
    //       } catch (refreshError) {
    //         window.location.href = '/login';
    //         return Promise.reject(refreshError);
    //       }
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }

  // setAuthToken(token: string) {
  //   this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }

  // initializeTokenFromSession() {
  //   // const token = sessionStorage.getItem("authToken");
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     this.setAuthToken(token);
  //   }
  // }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.get(endpoint, config);
    return res.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.delete(endpoint, config);
    return res.data;
  }

  async post<T>(endpoint: string, data?: FormData | Object, config?: AxiosRequestConfig): Promise<T> {
    const isFormData = data instanceof FormData;

    const headers = {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...config?.headers,
    };

    const res = await this.client.post(endpoint, data, { ...config, headers });
    return res.data;
  }

  async patch<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.patch(endpoint, data, config);
    return res.data;
  }
}

const apiClient = new APIClient("https://prod-backend-service-666458574194.us-central1.run.app");
// apiClient.initializeTokenFromSession();

export default apiClient;
