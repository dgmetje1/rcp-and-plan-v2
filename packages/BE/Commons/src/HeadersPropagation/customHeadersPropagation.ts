import { AxiosHeaders } from "axios";
import { IncomingHttpHeaders } from "http";

const DEFAULT_PROPAGATED_HEADERS = ["accept-language"];
export const propagateHeaders = (
  incomingHeaders: IncomingHttpHeaders,
  selectedHeaders: string[] = DEFAULT_PROPAGATED_HEADERS,
) => {
  const resultHeaders = new AxiosHeaders();

  selectedHeaders.forEach(header => {
    resultHeaders.set(header, incomingHeaders[header]);
  });

  return resultHeaders;
};
