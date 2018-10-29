import React from "react";
import { shallow } from "enzyme";
import Header from "../component/Header";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

describe("<Header />", () => {
  it("expect to match snapshot", () => {
    const wrapper = shallow(
      <Header
        translate={i18n.t("header")}
        currentLanguage="en-US"
        showProducts={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
