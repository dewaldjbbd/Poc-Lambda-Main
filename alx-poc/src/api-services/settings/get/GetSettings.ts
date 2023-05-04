import GetSettingsResponse, { GetSettingsResponseBody } from "./GetSettingsResponse";
import RestException from "../../base-clients/RestException";
import { RestGet } from "../../base-clients";
import { RestEndpoints } from "../../Constants";
const GetSettings = async (): Promise<GetSettingsResponse> => {
  const url = `${RestEndpoints.url}/settings`;
  const response = await RestGet(url, false);
  if (response.status === 200) {
    const body = response.body as GetSettingsResponseBody[];
    return {
      isException: false,
      response: body,
    } as GetSettingsResponse;
  }
  return {
    isException: true,
    exception: {
      status: response.status,
      message: response.body,
    } as unknown as RestException,
  } as GetSettingsResponse;
};
export default GetSettings;
