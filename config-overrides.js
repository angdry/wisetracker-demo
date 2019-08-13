const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",

    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@border-radius-base": "20px;",
      "@font-size-base": "12px;",
      "@btn-font-weight": "bold",
      "@btn-primary-shadow": "none",
      "@btn-default-color": "#919191",
      "@btn-default-bg": "#E8E8E8",
      "@btn-default-border": "none;",
      "@btn-text-shadow": "none",
      "@table-border-radius-base": "none",
      // "@table-row-hover-bg": "transparent;",
      "@tabs-card-head-background": "@background-color-light;",
      "@tabs-card-height": "40px;",
      "@tabs-card-active-color": "#3B3B3B",
      "@tabs-title-font-size": "@font-size-base;",
      "@tabs-title-font-size-lg": "@font-size-lg;",
      "@tabs-title-font-size-sm": "@font-size-base;",
      "@tabs-ink-bar-color": "@primary-color;",
      "@tabs-bar-margin": "0 0 16px 0;",
      "@tabs-horizontal-margin": "15px 15px 0 15px;",
      "@tabs-horizontal-padding": "11px 0px;",
      "@tabs-horizontal-padding-lg": "16px;",
      "@tabs-horizontal-padding-sm": "8px 16px;",
      "@tabs-vertical-padding": "8px 24px;",
      "@tabs-vertical-margin": "0 0 16px 0;",
      "@tabs-scrolling-size": "32px;",
      "@tabs-highlight-color": "#3B3B3B;",
      "@tabs-hover-color": "#3B3B3B;",
      "@tabs-active-color": "@primary-7;",
      "@tabs-card-gutter": "8px;",
      "@tabs-card-tab-active-border-top": "3px solid transparent;",
      "@modal-mask-bg": "fade(@white, 75%);",

      "@menu-item-active-bg": "transparent"
    }
  })
);
