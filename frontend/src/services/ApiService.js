import Api from "../utils/Api";

function ApiService() {
  const apiPrefix = "api";

  return {
    get: (apiUri, params, config) => {
      config = config || {};
      config.params = params;
      return Api.get(`${apiPrefix}/${apiUri}`, config);
    },
    post: (apiUri, params, config) => {
      config = config || {};
      return Api.post(`${apiPrefix}/${apiUri}`, params, config);
    },
    delete: (apiUri, params, config) => {
      config = config || {};
      config.params = params;
      return Api.delete(`${apiPrefix}/${apiUri}`, config);
    },
    patch: (apiUri, params, config) => {
      config = config || {};
      config.params = params;
      return Api.patch(`${apiPrefix}/${apiUri}`, config);
    }
  };
}

// function get(apiUri, params, config) {
//   config = config || {};
//   config.params = params;
//   return Api.get(`${apiPrefix}/${apiUri}`, config);
// }

// function post(apiUri, params, config) {
//   config = config || {};
//   return Api.post(`${apiPrefix}/${apiUri}`, params, config);
// }

// function remove(apiUri, params, config) {
//   config = config || {};
//   config.params = params;
//   return Api.remove(`${apiPrefix}/${apiUri}`, config);
// }

const apiService = new ApiService();
export default apiService;

//put이나 patch추가할 경우,,, 추가... 아래 axios 메소드 인자 맞출것
// get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
// delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
// post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
// put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
// patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
