/* eslint-disable prettier/prettier */
import { Axios, AxiosResponse } from "axios";
import https from "./apiConfig";
import http  from "./authConfig";
export default abstract class Crud {
  abstract getAll(): any;
  abstract get(id: number | string): Promise<AxiosResponse>; // eslint-disable-line no-unused-vars
  abstract getByKey(query: string): Promise<AxiosResponse>; // eslint-disable-line no-unused-vars
  abstract store(data: object | any): Promise<AxiosResponse>; // eslint-disable-line no-unused-vars
  abstract update(
    id: number | string, // eslint-disable-line no-unused-vars
    data: object | any // eslint-disable-line no-unused-vars
  ): Promise<AxiosResponse>;
  abstract destroy(id: number | string): Promise<AxiosResponse>; // eslint-disable-line no-unused-vars
  abstract url: string;
  protected axios: Axios = https;
  protected unsecureAxios = http;
  public getData(response: AxiosResponse<any, any>): [] | any[] {
    if (typeof response.data !== "object") {
      return [];
    }
    return response.data["data"];
  }
}
