
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-short")({ skip: "x", }),
    require("postcss-position-alt"),
    require("postcss-each"),
    require("postcss-define-property")({ syntax: {
      atrule: "def-utils",
      separator: "",
      parameter: "",
      property: "utils-",
    } }),
    require("postcss-nesting")({
      noIsPseudoSelector: true,
    }),
    require("autoprefixer"),
    require("cssnano"),
  ],
};
