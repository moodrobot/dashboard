import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Dashboard from "./Dashboard";

import { translate, Interpolate, Trans } from "react-i18next";
import i18n from "./i18n"; // initialized i18next instance

@translate(["view", "nav"], { wait: true })
class Translation extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      // <Dashboard translate={t("translation")} />
      <Dashboard i18n={i18n} />
    );
  }
}

Translation.propTypes = {};

export default Translation;
