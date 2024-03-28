module.exports = {
  extends: ["../../eslintrc.cjs"],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
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
