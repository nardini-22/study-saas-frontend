import { IHttpClient } from "../http-client";

interface IBaseServiceProps {
  httpClient: IHttpClient;
}

export type IBaseService<IService> = (props: IBaseServiceProps) => IService;
