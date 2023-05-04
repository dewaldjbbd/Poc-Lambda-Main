import RestException from "../base-clients/RestException";

type PatchSettingsResponse = {
  isException: boolean;
  response?: PatchSettingsResponseBody[];
  exception?: RestException;
};
export type PatchSettingsResponseBody = {
  id: number,
  key: String,
  name: String,
  version: Sring,
  value: String,
  last_modified_at: Date,
  created_at: Date
};
export default PatchSettingsResponse;
