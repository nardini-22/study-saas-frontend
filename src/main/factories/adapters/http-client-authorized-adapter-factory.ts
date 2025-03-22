import { httpClientAuthorizedAdapter } from "@/infra/adapters";

export function makeHttpClientAuthorizedAdapterFactory() {
  return httpClientAuthorizedAdapter();
}
