import { auth } from "express-oauth2-jwt-bearer";

const checkAuthentication = auth({
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  audience: process.env.AUDIENCE,
  tokenSigningAlg: "RS256",
});

export default checkAuthentication;

