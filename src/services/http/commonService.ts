import _axios, { AxiosRequestConfig } from 'axios';
// import Cookies from 'js-cookie';
// import { Toast } from "@utils/Toasts";
import { ErrorResponse } from '../../types/http';
import { toast } from 'react-toastify';
export class CommonService {
  private static axios = _axios.create({
    // baseURL: process.env.BASE_URL,
    baseURL:
      'https://bt09kmb8yb.execute-api.us-east-1.amazonaws.com/shopnowee/',

    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  static async get(url: string, config?: AxiosRequestConfig) {
    try {
      const token = localStorage.getItem('userToken');
      const headers = token ? { authorization: token } : {};
      const updatedConfig = { ...config, headers };
      const response = await CommonService.axios.get(url, updatedConfig);
      if (response) {
        return response.data;
      }
    } catch (e) {
      CommonService.handleErrors(e as ErrorResponse);
      return Promise.reject(e);
    }
  }

  static async getWithoutToken(url: string, config?: AxiosRequestConfig) {
    try {
      // const token = localStorage.getItem("userToken");
      const headers = {};
      const updatedConfig = { ...config, headers };
      const response = await CommonService.axios.get(url, updatedConfig);
      if (response) {
        return response.data;
      }
    } catch (e) {
      CommonService.handleErrors(e as ErrorResponse);
      return Promise.reject(e);
    }
  }

  static async post(
    url: string,
    body?: object | FormData,
    config: AxiosRequestConfig = {},
  ) {
    try {
      const token = localStorage.getItem('access_token');

      const headers = config.headers || {};

      if (token) {
        headers['Authorization'] = token;
      }

      if (body instanceof FormData) {
        delete headers['Content-Type'];
      } else {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      }

      const updatedConfig: AxiosRequestConfig = {
        ...config,
        headers,
      };

      const response = await CommonService.axios.post(url, body, updatedConfig);
      return response.data;
    } catch (e) {
      CommonService.handleErrors(e as ErrorResponse);
      return Promise.reject(e);
    }
  }

  static async postWithoutToken(url: string, config?: AxiosRequestConfig) {
    try {
      const updatedConfig = { ...config };
      const response = await CommonService.axios.post(url, updatedConfig);
      if (response) {
        return response.data;
      }
    } catch (e) {
      CommonService.handleErrors(e as ErrorResponse);
      return Promise.reject(e);
    }
  }

  static async put(url: string, body?: object, config?: AxiosRequestConfig) {
    try {
      const token = await localStorage.getItem('userToken');
      const headers = token ? { authorization: token } : {};
      const updatedConfig = { ...config, headers: headers };
      const response = await CommonService.axios.put(url, body, updatedConfig);
      if (response) {
        return response.data;
      }
    } catch (e) {
      CommonService.handleErrors(e as ErrorResponse);
      return Promise.reject(e);
    }
  }

  static async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const token = await localStorage.getItem('userToken');
      const headers = token ? { authorization: token } : {};
      const updatedConfig: AxiosRequestConfig = { ...config, headers };
      const response = await CommonService.axios.delete(url, updatedConfig);
      if (response) {
        return response.data;
      }
    } catch (e) {
      CommonService.handleErrors(e as ErrorResponse);
      return Promise.reject(e);
    }
  }

  private static handleErrors(error: ErrorResponse) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        'Something Went Wrong. Please Try Again';
      toast.error(errorMessage);
      console.log(errorMessage);
    } else {
      //   Toast.error("Something went wrong. Please try again.");
    }
  }
}
