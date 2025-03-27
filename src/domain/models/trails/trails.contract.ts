import { ICreateTrail, ITrails } from "./trails.model";

export interface ITrailsContract {
  createTrail(
    props: ITrailsContract.createTrailProps
  ): Promise<ITrailsContract.createTrailResponse>;
  getTrails(): Promise<ITrailsContract.getTrailsResponse>;
}

export namespace ITrailsContract {
  export type createTrailProps = {
    body: ICreateTrail;
  };
  export type createTrailResponse = ITrails;
  export type getTrailsResponse = Array<ITrails>;
}
