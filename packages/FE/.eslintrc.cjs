module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh", "import", "simple-import-sort"],
  rules: {
    "import/no-anonymous-default-export": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^react", "^\\u0000", "^@\\w", "^[^.]", "^i18next.*", "^@/lib/imports/.*$"],
          ["^@/(assets|components|config|context|data|i18n|lib|middleware|pages|queries|scripts|types)(.*|$)*"],
          ["^\\."],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-named-as-default-member": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        shorthandFirst: false,
        ignoreCase: true,
        noSortAlphabetically: false,
      },
    ],
  },
};
