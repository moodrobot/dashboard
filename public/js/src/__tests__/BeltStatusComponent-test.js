import React from "react";
import { shallow } from "enzyme";
import BeltStatusComponent from "../component/BeltStatusComponent";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

describe("<BeltStatusComponent />", () => {
  it("expect to match snapshot", () => {
    const wrapper = shallow(
      <BeltStatusComponent
        belt="blue"
        translate={i18n.t("profile-details-belt", { returnObjects: true })}
        currentLanguage={"en-US"}
        points="9000"
        total_points="9001"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
