import { HttpRequest, HttpResponse, IHttpClient } from "@/domain/http-client";

export function httpClientAdapter(): IHttpClient {
  const request = async <Body = unknown, Response = unknown>(
    data: HttpRequest<Body>
  ): Promise<HttpResponse<Response>> => {
    const { url, method, body, headers } = data;
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    const results = await response.json();
    return {
      data: results,
      headers: response.headers,
    };
  };
  return { request };
}
