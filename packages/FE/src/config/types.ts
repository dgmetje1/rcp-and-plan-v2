export enum Environments {
  dev = "dev",
  pre = "pre",
  staging = "staging",
  prod = "prod",
}

export type Environment = keyof typeof Environments;

export type Config = {
  environment: Environment;
  webUrl: string;
  apiUrl: string;
  auth0Domain: string;
  auth0ClientId: string;
};
