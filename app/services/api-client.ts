import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

class APIClient {
    client: AxiosInstance

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL, 
            headers: {"Content-Type" : "application/json"}
        })
    }

    setAuthToken(token: string) {
        this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    async get<T>(endpoint: string, config?:AxiosRequestConfig): Promise<T> {
        const res = await this.client.get(endpoint, config)
        return res.data
    }

    async delete<T>(endpoint: string, config?:AxiosRequestConfig): Promise<T> {
        const res = await this.client.delete(endpoint, config)
        return res.data
    }

    async post<T>(endpoint: string, data: FormData | Object, config?:AxiosRequestConfig): Promise<T> {
        const isFormData = data instanceof FormData;

        const headers = {
            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            ...config?.headers,
        };

        const res = await this.client.post(endpoint, data, { ...config, headers })
        return res.data
    }

    // async patch<T>(endpoint: string, data: any, config?:AxiosRequestConfig): Promise<T> {
    //     const res = await this.client.patch(endpoint, data, config)
    //     return res.data
    // }
  
    
}

const apiClient = new APIClient("http://localhost:3000")

export default apiClient