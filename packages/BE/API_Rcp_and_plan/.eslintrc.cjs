module.exports = {
  extends: ["../../../.eslintrc.json"],
  rules: {
    "no-console": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^\\u0000", "^node:", "express", "^@\\w", "^[^.]"],
          ["^@(api|application|domain|infrastructure|service|dtos)(.*|$)*"],
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
