import axios, { type AxiosInstance } from "axios";
import { useConfigStore } from "../store/config";

export class HTTPApi {
  private static instance: HTTPApi;

  public client: AxiosInstance;

  private constructor(endpoint: string | null) {
    if(!endpoint){
      throw new Error('Please enter a endpoint');
    }

    this.client = axios.create({
      baseURL: endpoint || undefined,
    });
  }

  public static getInstance(endpoint: string | null): HTTPApi {
    if (!HTTPApi.instance) {
      HTTPApi.instance = new HTTPApi(endpoint);
    }
    return HTTPApi.instance;
  }
}

export const client = axios.create({});
