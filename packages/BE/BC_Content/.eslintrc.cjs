module.exports = {
  extends: ["../../../.eslintrc.json"],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
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
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "warn",
      },
    },
  ],
};
