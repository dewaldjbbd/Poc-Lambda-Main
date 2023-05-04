import RestException from "./RestException";

type RestResponse = {
  status: number;
  body?: object;
  exception?: RestException;
};
export default RestResponse;
