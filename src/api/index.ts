import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

import { camelizeKeys, snakeCaseKeys } from "./api.utils";
import session from "@/utils/session";
import { jwtDecode } from "jwt-decode";
import store, { useAppDispatch } from "@/redux/store";
import { refreshAccessToken } from "@/redux/slices/login/loginActions";
import { setError } from "@/redux/slices/error/errorSlice";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ErrorResponse {
  message: string;
  statusCode: number;
  code: string;
}


class ApiClient {
  private http: AxiosInstance;

  constructor(baseURL: string = `${apiBaseUrl}`, timeout: number = 30000) {
    this.http = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.http.interceptors.request.use(async (config) => ({
      ...config,
      headers: await this.prepareRequestHeaders(config.headers),
      data: this.prepareRequestBody(config.data, config.params),
      params: this.prepareRequestParams(config.params),
    }));

    this.http.interceptors.request.use(
      async (config) => {
        if (config.url && config.url.includes("/Login/refresh")) {
          let refreshToken = session.getKeyStorage("refresh_token");
          config.headers.Authorization = ` ${refreshToken}`;
          return config;
        }
        const savedUser = session.getKeyStorage("user");
        let accessToken = session.getKeyStorage("accessToken");

        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          const bufferTime = 5 * 60;

          if (decodedToken.exp && decodedToken.exp < currentTime + bufferTime) {
            try {
              accessToken = (await refreshAccessToken()) as string;
            } catch (error) {
              session.clearLogout();
              return Promise.reject(error);
            }
          }
          // ตั้งค่า Authorization header ใหม่
          config.headers.Authorization = ` ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.http.interceptors.response.use(
      (response) => this.handleSuccess(response),
      (error) => this.handleError(error)
    );
  }

  private prepareRequestBody = (data: any, params: any) => {
    if (data) {
      if (params) {
        const { keycloak = false } = params;
        if (keycloak) {
          return snakeCaseKeys(data);
        } else {
          return camelizeKeys(data);
        }
      } else {
        return camelizeKeys(data);
      }
    } else {
      return;
    }
  };

  private prepareRequestParams = (params: any) => {
    if (!params) return;
    return camelizeKeys(params);
  };

  private prepareResponseData(data: any) {
    return camelizeKeys(data);
  }
  private prepareRequestHeaders(headers: AxiosRequestHeaders) {
    return session.setHeader(headers);
  }

  private handleSuccess(response: AxiosResponse) {
    // Handle successful response here
    return { ...response, data: this.prepareResponseData(response.data) };
  }

  alertMessage = (e: any, message: string, alertMessage: boolean = true) => {
    if (alertMessage) alert(message);
    return Promise.reject({ ...e, message });
  };

  onValidateFailed(e: any) {
    const { response } = e;
    if (response?.data?.errors && Array.isArray(response?.data?.errors)) {
      (response?.data?.errors || []).forEach((error: any) =>
        alert(error.message)
      );
      let messages = JSON.stringify(response?.data.errors, null, 2);
      return Promise.reject({ ...e, messages });
    }
    return this.alertMessage(
      e,
      JSON.stringify(response?.data.message || response?.data.errors, null, 2)
    );
  }

  onServerError(e: any) {
    return this.alertMessage(e, "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }

  onRequestTimeout(e: any) {
    return this.alertMessage(e, "INTERNET ล่าช้า กรุณาลองใหม่อีกครั้ง");
  }

  onNetworkError(e: any) {
    return this.alertMessage(
      e,
      "การเชื่อมต่อกับเซิฟเวอร์มีปัญหา กรุณาลองใหม่อีกครั้งภายหลัง"
    );
  }

  onUnauthorized(e: any) {
    const { response } = e;
    session.clearLogout();
    return this.alertMessage(e, response?.data.message, false);
  }

  onNotFound(e: any) {
    const { response } = e;
    return this.alertMessage(e, response?.data.message);
  }

  onBadRequest(e: any) {
    const { response } = e;
    return this.alertMessage(e, response?.data.message);
  }
  private handleError(error: AxiosError) {
    // Handle error response here
    const { response,config } = error;
        const url = config?.url || null;
    if (response) {
   const { code, message } = response.data as ErrorResponse;
       store.dispatch(setError({ code, message, url }));
      if (message === "Unauthorized")
        return this.onUnauthorized(error);
      else if (code === "not_found") return this.onNotFound(error);
      else if (code === "server_error") return this.onServerError(error);
      else if (code === "bad_request") return this.onBadRequest(error);
      else if (code === "validate_failed") return this.onValidateFailed(error);
      else {
        return Promise.reject({
          ...error,
          response: this.prepareResponseData(response),
        });
      }
    } else {
      if (/timeout/.test(error.message)) return this.onRequestTimeout(error);
      else if (/Network/.test(error.message)) return this.onNetworkError(error);
      else return Promise.reject(error);
    }
  }

  public get(path: string, params?: any, config?: AxiosRequestConfig) {
    console.log(path, "path");
    const requestData = {
      ...config,
      params: {
        ...this.prepareRequestParams(params),
      },
    };
    return this.http.get(path, requestData);
  }

  public post(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.http.post(path, data, config);
  }

  public put(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.http.put(path, data, config);
  }

  public patch(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.http.patch(path, data, config);
  }

  public delete(path: string, params?: any, config?: AxiosRequestConfig) {
    return this.http.delete(path, config);
  }
}

export default new ApiClient();
