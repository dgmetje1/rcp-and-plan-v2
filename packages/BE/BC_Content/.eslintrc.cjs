module.exports = {
  extends: ["../../../.eslintrc.json"],
  rules: {
    "no-console": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^\\u0000", "^node:", "^@\\w", "^[^.]"],
          ["^@(application|domain|infrastructure|service|dtos|global_types)(.*|$)*"],
          ["^\\."],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: ["./src/**/*.ts", "./src/**/*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "warn",
      },
    },
    {
      files: ["./src/services/**/*.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@domain/*"],
                message: "Unnallowed access to Domain Layer",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["./src/domain/**/*.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@application/*", "@services/*"],
                message: "Unnallowed access from Domain Layer",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["./src/domain/**/*.ts"],
      excludedFiles: ["./src/domain/**/*Repository.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@infrastructure/*"],
                message: "Unnallowed access from Domain Layer",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["./src/infrastructure/**/*.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@services/*"],
                message: "Unnallowed access to Service Layer",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["./src/application/**/*.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@services/*"],
                message: "Unnallowed access to Service Layer",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["./src/application/**/*.ts"],
      excludedFiles: ["./src/application/**/*Queries.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@infrastructure/*"],
                message: "Unnallowed access to Infrastructure Layer",
              },
            ],
          },
        ],
      },
    },
  ],
};
