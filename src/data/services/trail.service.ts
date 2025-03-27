import { ITrails, ITrailsContract } from "@/domain/models/trails";
import { IBaseService } from "@/domain/shared";

export const trailService: IBaseService<ITrailsContract> = ({ httpClient }) => {
  const createTrail = async ({ body }: ITrailsContract.createTrailProps) => {
    const response = await httpClient.request<
      unknown,
      ITrailsContract.createTrailResponse
    >({
      method: "POST",
      url: "trail",
      body,
    });
    return response.data;
  };

  const getTrails = async () => {
    const response = await httpClient.request<
      unknown,
      ITrailsContract.getTrailsResponse
    >({
      method: "GET",
      url: "trail",
    });
    return response.data;
  };

  return {
    createTrail,
    getTrails,
  };
};
