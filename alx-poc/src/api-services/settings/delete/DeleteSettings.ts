import DeleteSettingsResponse, {
  DeleteSettingsResponseBody,
} from "./DeleteSettingsResponse";
import RestException from "../../base-clients/RestException";
import { RestDelete } from "../../base-clients";
import { RestEndpoints } from "../../Constants";

const DeleteSettings = async (id: number): Promise<DeleteSettingsResponse> => {
  const url = `${RestEndpoints.url}/settings/${id}`;
  const response = await RestDelete(url, false);
  console.log(response)
  if (response.status === 200) {
    const body = response.body as DeleteSettingsResponseBody[];
    return {
      isException: false,
      response: body,
    } as DeleteSettingsResponse;
  }
  return {
    isException: true,
    exception: {
      status: response.status,
      message: response.body,
    } as unknown as RestException,
  } as DeleteSettingsResponse;
};
export default DeleteSettings;
