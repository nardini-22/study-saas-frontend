import { HttpRequest, HttpResponse, IHttpClient } from "@/domain/http-client";
import { createClient } from "../gateway/supabase";

export function httpClientAdapter(): IHttpClient {
  const request = async <Body = unknown, Response = unknown>(
    data: HttpRequest<Body>
  ): Promise<HttpResponse<Response>> => {
    const supabase = createClient();

    const { data: sessionData } = await supabase.auth.getSession();

    const { url, method, body, headers } = data;
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        ...headers,
        Authorization: `Bearer ${sessionData.session?.access_token}`,
      },
    });
    const results = await response.json();
    return {
      data: results,
      headers: response.headers,
    };
  };
  return { request };
}
