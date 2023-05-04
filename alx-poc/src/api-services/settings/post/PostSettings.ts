import RestException from "../../base-clients/RestException";
import { RestPost } from "../../base-clients";
import { PostSettingsRequestBody } from "./PostSettingsRequest";
import PostSettingsResponse, { PostSettingsResponseBody } from "./PostSettingsResponse";
import { RestEndpoints } from "../../Constants";

const PostSettings = async (setting: PostSettingsRequestBody
): Promise<PostSettingsResponse> => {
  const url = `${RestEndpoints.url}/settings`;

  const response = await RestPost(url, JSON.stringify(setting), false);

  console.log(response)

  if (response.status === 200) {
    const body = response.body as PostSettingsResponseBody[];
    return {
      isException: false,
      response: body,
    } as PostSettingsResponse;
  }
  return {
    isException: true,
    exception: {
      status: response.status,
      message: response.body,
    } as unknown as RestException,
  } as PostSettingsResponse;
};
export default PostSettings;
