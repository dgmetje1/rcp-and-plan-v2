import { AxiosRequestConfig } from "axios";

export type RequestConfig = AxiosRequestConfig & { withAuth?: boolean };
