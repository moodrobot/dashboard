import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

import { I18nextProvider } from "react-i18next"; // as we build ourself via webpack
import i18n from "./i18n"; // initialized i18next instance

import Translation from "./Translation";

import "../../css/style.scss";

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <I18nextProvider i18n={ i18n }><Translation /></I18nextProvider>,
    // React.createElement(Dashboard),
    document.getElementById("mount")
  );
});
