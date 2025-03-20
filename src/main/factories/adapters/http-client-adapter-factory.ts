import { httpClientAdapter } from "@/infra/adapters";

export function makeHttpClientAdapterFactory() {
  return httpClientAdapter();
}
