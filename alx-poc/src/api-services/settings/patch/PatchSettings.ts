import PatchSettingsResponse, {
  PatchSettingsResponseBody,
} from "./PatchSettingsResponse";
import RestException from "../../base-clients/RestException";
import { RestPatch } from "../../base-clients";
import { GetSettingsResponseBody } from "../get/GetSettingsResponse";
import { RestEndpoints } from "../../Constants";

const PatchSettings = async (
  id: number
  , setting: GetSettingsResponseBody
): Promise<PatchSettingsResponse> => {
  const url = `${RestEndpoints.url}/settings/${id}`;

  const response = await RestPatch(url, JSON.stringify(setting), false);
  
  console.log(response)

  if (response.status === 200) {
    const body = response.body as PatchSettingsResponseBody[];
    return {
      isException: false,
      response: body,
    } as PatchSettingsResponse;
  }
  return {
    isException: true,
    exception: {
      status: response.status,
      message: response.body,
    } as unknown as RestException,
  } as PatchSettingsResponse;
};
export default PatchSettings;
