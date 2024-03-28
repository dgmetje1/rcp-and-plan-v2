import swaggerAutogen from "swagger-autogen";
import glob from "glob";
import path from "path";

const __dirname = import.meta.dirname;

const serviceBaseURI = path.join(__dirname, "..");

const outputFile = "../documentation.json";
const endpointsFiles = [
  `${serviceBaseURI}/server.ts`,
  ...glob.sync(`${serviceBaseURI}/routes/*.route.*`),
];

const doc = {
  info: {
    title: "Social",
    description: "Bounded context of users interaction",
  },
  host: "localhost:5500",
};

void swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
