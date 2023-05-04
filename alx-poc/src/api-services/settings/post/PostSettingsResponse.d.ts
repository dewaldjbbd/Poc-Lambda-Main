import RestException from "../base-clients/RestException";

type PostSettingsResponse = {
  isException: boolean;
  response?: PostSettingsResponseBody[];
  exception?: RestException;
};
export type PostSettingsResponseBody = {
  id: number,
  key: String,
  name: String,
  version: Sring,
  value: String,
  last_modified_at: Date,
  created_at: Date
};
export default PostSettingsResponse;
