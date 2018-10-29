import React from "react";
import { shallow } from "enzyme";
import Footer from "../component/Footer";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

describe("<Footer />", () => {
  it("expect to match snapshot", () => {
    const wrapper = shallow(
      <Footer
        translate={i18n.t("footer")}
        currentLanguage="en-US"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
