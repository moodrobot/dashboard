/**
 * initialize i18n for testing
 * @type {object}
 */
import i18n from "i18next";
import Backend from "i18next-sync-fs-backend";

i18n.use(Backend).init({
  initImmediate: false,
  backend: {
    loadPath: "./locales/{{lng}}.json"
  },
  escapeInterpolation: false,
  returnObjects: true,
  fallbackLng: "en-US",

  react: {
    // wait: true, // globally set to wait for loaded translations in translate hoc
    // exposeNamespace: true // exposes namespace on data-i18next-options to be used in eg. locize-editor
  },

  // have a common namespace used around the full app
  ns: ["common"],
  defaultNS: "common",

  whitelist: ["en-US", "zh-CN", "pt-BR", "es-ES", "ru-RU"],
  load: "currentOnly",
  // debug: true,
  debug: false,
  // cache: {
  //   enabled: true
  // },

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
    format: function(value, format, lng) {
      if (format === "uppercase") return value.toUpperCase();
      return value;
    }
  }
});

export default i18n;
