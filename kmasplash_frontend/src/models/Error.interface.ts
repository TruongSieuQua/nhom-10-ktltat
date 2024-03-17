import { HttpStatusCode } from "axios";

export type TError = {
  status: HttpStatusCode;
  data: {
    statusCode: HttpStatusCode;
    message: string;
  };
};
