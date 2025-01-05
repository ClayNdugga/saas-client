import axios, {AxiosRequestConfig} from "axios";

class APIClient {
    url: string

    constructor(endpoint: string) {
        this.url = "http://localhost" + endpoint
    }

    get = <T>(config: AxiosRequestConfig): Promise<T> => {
        return axios
            .get<T>(this.url, config)
            .then((res) => res.data)
    }
    
}