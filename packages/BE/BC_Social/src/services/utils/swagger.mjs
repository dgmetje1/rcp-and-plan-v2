import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { writeFile } from "fs";

const __dirname = import.meta.dirname;

const serviceBaseURI = path.join(__dirname, "..");

const outputFile = "./documentation.json";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BC_Social",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Exception: {
          type: "object",
          properties: {
            exceptionMessage: {
              type: "string",
            },
            params: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
      },
    },
  },
  apis: [`${serviceBaseURI}/routes/*.route.*`],
};

const openapiSpecification = swaggerJsdoc(options);
const outPath = path.join(serviceBaseURI, outputFile);

writeFile(outPath, JSON.stringify(openapiSpecification), () => console.log("Swagger documentation generated!"));
