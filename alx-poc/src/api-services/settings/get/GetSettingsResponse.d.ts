import RestException from "../base-clients/RestException";

type GetSettingsResponse = {
  isException: boolean;
  response?: GetSettingsResponseBody[];
  exception?: RestException;
};
export type GetSettingsResponseBody = {
  id: number,
  key?: String,
  name?: String,
  value?: String,
  version?: String,
  last_modified_at?: Date,
  created_at?: Date
};

export default GetSettingsResponse;
