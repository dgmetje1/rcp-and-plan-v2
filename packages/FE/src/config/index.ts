import { get, isUndefined, omitBy } from "@/lib/imports/lodash";

import { Config, Environment, Environments } from "./types";

const definedEnvironment = get(import.meta.env, "VITE_ENVIRONMENT", "");

const isDefinedEnvironment = (value: string): value is Environment => {
  return Object.keys(Environments).includes(value);
};

if (!isDefinedEnvironment(definedEnvironment)) throw new Error("Environment not defined!!");

const isDevEnvironment = () => definedEnvironment === Environments.local;

const config: Config = {
  environment: definedEnvironment,
  webUrl: "url",
  apiUrl: "url",
  cdnUrl: "url",
  auth0Domain: "url",
  auth0ClientId: "id",
  auth0ApiAudience: "id",
};

const envConfig: Partial<Config> = omitBy(
  {
    webUrl: get(import.meta.env, "VITE_WEB_URL"),
    apiUrl: get(import.meta.env, "VITE_API_URL"),
    cdnUrl: get(import.meta.env, "VITE_CDN_URL"),
    auth0Domain: get(import.meta.env, "VITE_AUTH0_DOMAIN"),
    auth0ClientId: get(import.meta.env, "VITE_AUTH0_CLIENT_ID"),
    auth0ApiAudience: get(import.meta.env, "VITE_AUTH0_API_AUDIENCE"),
  },
  isUndefined,
);

export default {
  ...config,
  ...envConfig,
  isDevEnvironment,
};
