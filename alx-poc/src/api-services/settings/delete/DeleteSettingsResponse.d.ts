import RestException from "../base-clients/RestException";

type DeleteSettingsResponse = {
  isException: boolean;
  response?: DeleteSettingsResponseBody[];
  exception?: RestException;
};
export type DeleteSettingsResponseBody = {
  id: int,
  key: String,
  name: String,
  value: String,
  last_modified_at: Date,
  created_at: Date
};
export default DeleteSettingsResponse;
