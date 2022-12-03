module.exports = {
  plugins: ["prettier"],
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-multiple-template-root": 0,
    "vue/multi-word-component-names": 0,
    "vue/valid-v-slot": 0,

    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
};
