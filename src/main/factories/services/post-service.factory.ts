import { postService } from "@/data/services";
import { makeHttpClientAuthorizedAdapterFactory } from "../adapters";

export function makePostServiceFactory() {
  return postService({
    httpClient: makeHttpClientAuthorizedAdapterFactory(),
  });
}
