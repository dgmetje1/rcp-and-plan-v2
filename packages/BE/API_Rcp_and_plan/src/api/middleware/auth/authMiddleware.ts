import { auth } from "express-oauth2-jwt-bearer";

const checkAuthentication = auth({
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  audience: process.env.AUDIENCE,
  tokenSigningAlg: "RS256",
  timeoutDuration: 10000,
  
});

export default checkAuthentication;
