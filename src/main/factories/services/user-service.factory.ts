import { userService } from "@/data/services";
import { makeHttpClientAuthorizedAdapterFactory } from "../adapters";

export function makeUserServiceFactory() {
  return userService({
    httpClient: makeHttpClientAuthorizedAdapterFactory(),
  });
}
