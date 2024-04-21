export enum Environments {
  local = "local",
  dev = "dev",
  staging = "staging",
  prod = "prod",
}

export type Environment = keyof typeof Environments;

export type Config = {
  environment: Environment;
  webUrl: string;
  apiUrl: string;
  cdnUrl: string;
  auth0Domain: string;
  auth0ClientId: string;
};
