
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { _, axios } from 'boot';
//#region URL

export const host = 'http://localhost';
export const port = '3000';
//#endregion

export interface ResponseGet {
  row_count: number;
  message: string;
}

export interface ResponsePost {
  result: boolean;
  lastID?: number | number[];
  updateID?: number | number[];
  deleteID?: number | number[];
  message: string;
}

export interface ResponsePut {
  /** The requested result is as follows: [Success: true, Failure: false] */
  result: boolean;
  /** This message is the error message for the request error. */
  message: string;
}

export interface ResponseDelete {
  result: boolean;
  message: string;
}

//#region Requst

type GetData = {
  <RES>(url: string): Promise<AxiosResponse<RES>>;
  <REQ, RES>(url: string, params?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<RES>
  >;
};

type PostData = {
  <REQ>(url: string, params?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<ResponsePost>
  >;
  <REQ, RES>(url: string, params?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<RES>
  >;
};

type PostBodyData = {
  <REQ>(url: string, body?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<ResponsePost>
  >;
  <REQ, RES>(url: string, body?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<RES>
  >;
};

type PutData = {
  <REQ>(url: string, params?: REQ): Promise<AxiosResponse<ResponsePut>>;
  <REQ, RES>(url: string, params?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<RES>
  >;
};

type DeleteData = {
  <REQ>(url: string, params?: REQ): Promise<AxiosResponse<ResponseDelete>>;
  <REQ, RES>(url: string, params?: REQ, config?: AxiosRequestConfig): Promise<
    AxiosResponse<RES>
  >;
};

export const getData: GetData = function <REQ, RES>(
  url: string,
  params?: REQ,
  config?: AxiosRequestConfig
) {
  if (config) {
    config = _.extend({}, config, { params: params });
  } else {
    config = _.extend({}, { params: params });
  }
  return axios.get<RES>(url, config);
};

export const postData: PostData = function <REQ, RES>(
  url: string,
  params?: REQ,
  config?: AxiosRequestConfig
) {
  if (config) {
    config = _.extend({}, config, { params: params });
  } else {
    config = _.extend({}, { params: params });
  }
  return axios.post<RES>(url, null, config);
};

export const postBodyData: PostBodyData = function <REQ, RES>(
  url: string,
  body?: REQ,
  config?: AxiosRequestConfig
) {
  return axios.post<RES>(url, body, config);
};

export const putData: PutData = function <REQ, RES>(
  url: string,
  params?: REQ,
  config?: AxiosRequestConfig
) {
  if (config) {
    config = _.extend({}, config, { params: params });
  } else {
    config = _.extend({}, { params: params });
  }
  return axios.put<RES>(url, null, config);
};

export const deleteData: DeleteData = function <REQ, RES>(
  url: string,
  params?: REQ,
  config?: AxiosRequestConfig
) {
  if (config) {
    config = _.extend({}, config, { params: params });
  } else {
    config = _.extend({}, { params: params });
  }
  return axios.delete<RES>(url, config);
};
//#endregion

//#region Response

//#endregion

//#region Functions

export function getUrl(apiKey: string, id?: string): string {
  let url = `${host}:${port}/${apiKey}`;
  if (!_.isEmpty(id)) {
    url = `${url}/${id}`;
  }
  return url;
}
//#endregion
