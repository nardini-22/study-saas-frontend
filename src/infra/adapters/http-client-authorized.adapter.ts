import { HttpRequest, HttpResponse, IHttpClient } from "@/domain/http-client";
import { createClient } from "../gateway/supabase";
import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} from "@/domain/errors";

export function httpClientAuthorizedAdapter(): IHttpClient {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_URL;
  const request = async <Body = unknown, Response = unknown>(
    data: HttpRequest<Body>
  ): Promise<HttpResponse<Response>> => {
    const supabase = createClient();

    const { data: sessionData } = await supabase.auth.getSession();

    const { url, method, body, headers } = data;

    const baseUrl = url.startsWith("http")
      ? url
      : `${API_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;

    const requestHeaders: HeadersInit = {
      ...headers,
      Authorization: `Bearer ${sessionData.session?.access_token}`,
    };

    if (body) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(baseUrl, requestOptions);

    const contentType = response.headers.get("content-type");
    let results: Response;

    if (contentType?.includes("application/json")) {
      results = await response.json();
    } else {
      results = (await response.text()) as Response;
    }

    if (response.ok) {
      return {
        data: results,
        headers: response.headers,
      };
    }
    switch (response.status) {
      case 401:
        throw new UnauthorizedError({
          code: response.status.toString(),
        });
      case 403:
        throw new ForbiddenError({
          code: response.status.toString(),
        });
      case 404:
        throw new NotFoundError({
          code: response.status.toString(),
        });
      case 409:
        throw new ConflictError({
          message: (results as { message: string }).message,
          code: response.status.toString(),
        });
      default:
        throw new ServerError({
          code: response.status.toString(),
        });
    }
  };
  return { request };
}
