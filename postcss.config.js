
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested-props"),
    require("postcss-short")({ skip: "x", }),
    require("postcss-position-alt"),
    require("postcss-nesting")({
      noIsPseudoSelector: true,
    }),
    require("cssnano"),
  ],
};
