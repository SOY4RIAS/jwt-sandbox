import type { AxiosInstance } from "axios";
import { HTTPApi } from "../config/api";

type Request<B> = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  path: string;
  body?: B;
};

export class ApiService {
  public static client: AxiosInstance | null = null;

  public static init(endpoint: string | null) {
    ApiService.client = HTTPApi.getInstance(endpoint).client;
  }

  public static async sendRequest<B>(req: Request<B>) {
    debugger
    let body = req.body || {};

    if(body && typeof body === "string"){
      body = JSON.parse(body);
    }

    return ApiService.client?.request({
      url: req.path || "",
      method: req.method,
      data: req.body,
    });
  }
}
