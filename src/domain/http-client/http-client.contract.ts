export type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export enum HttpStatusCode {
  unknown = -1,
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  serverError = 500,
}

export type HttpRequest<Body = unknown> = {
  url: string;
  method: HttpMethod;
  body?: Body;
  params?: Record<string, string>;
  headers?: Record<string, string>;
};

export type HttpResponse<Response = unknown> = {
  data: Response;
  headers: unknown;
};

export interface IHttpClient {
  request: <Body = unknown, Response = unknown>(
    data: HttpRequest<Body>
  ) => Promise<HttpResponse<Response>>;
}
