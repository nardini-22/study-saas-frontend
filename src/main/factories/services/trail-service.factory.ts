import { trailService } from "@/data/services";
import { makeHttpClientAuthorizedAdapterFactory } from "../adapters";

export function makeTrailServiceFactory() {
  return trailService({
    httpClient: makeHttpClientAuthorizedAdapterFactory(),
  });
}
