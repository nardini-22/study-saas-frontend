import { ICreateTrail, ITrails } from "./trails.model";

export interface ITrailsContract {
  createTrail(props: ITrailsContract.createTrailProps): Promise<ITrails>;
}

export namespace ITrailsContract {
  export type createTrailProps = {
    body: ICreateTrail;
  };
}
