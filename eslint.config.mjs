import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
  ],
  rules: {
    // rule overrides
    "unicorn/no-empty-file": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
