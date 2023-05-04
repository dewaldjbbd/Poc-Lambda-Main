import axios, { AxiosRequestHeaders } from "axios";
import RestResponse from "./RestResponse";

const RestDelete = async (
  url: string,
  applyHeaderAuthorization?: boolean
): Promise<RestResponse> => {
  try {
    let data = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data["status"] > 199 && data["status"] < 300) {
      return { status: data["status"] };
    }
    throw Error(data["status"] + "");
  } catch (ex: any) {
    if (ex.toString().includes("500")) return { status: 500 };
    else if (ex.toString().includes("401")) return { status: 401 };
    else if (ex.toString().includes("403")) return { status: 403 };
    else if (ex.toString().includes("404")) return { status: 404 };
    else if (ex.toString().includes("400")) return { status: 400 };
    else if (ex.toString().includes("406")) return { status: 406 };
  }

  return { status: 0 };
};

export default RestDelete;
