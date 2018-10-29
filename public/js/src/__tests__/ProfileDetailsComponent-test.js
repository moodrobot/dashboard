import React, { Component } from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import ProfileDetailsComponent from "../component/ProfileDetailsComponent.js";
import profileData from "./__mockData__/profileData.json";
import countries from "./__mockData__/countries.json";
import translateData from "../../../../locales/en-US.json";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

let componentHasError = {
  first_name: { flag: false, message: "" },
  last_name: { flag: false, message: "" },
  display_name: { flag: false, message: "" },
  email: { flag: false, message: "" },
  phone: { flag: false, message: "" },
  company: { flag: false, message: "" },
  bio: { flag: false, message: "" },
  signature: { flag: false, message: "" },
  "developer-mesh": { flag: false, message: "" },
  twitter: { flag: false, message: "" },
  github: { flag: false, message: "" },
  website: { flag: false, message: "" }
};

let allERROR = {
  first_name: { flag: true, message: "noHTML" },
  last_name: { flag: true, message: "noHTML" },
  display_name: { flag: true, message: "noHTML" },
  email: { flag: true, message: "noHTML" },
  phone: { flag: true, message: "noHTML" },
  company: { flag: true, message: "noHTML" },
  bio: { flag: true, message: "noHTML" },
  signature: { flag: true, message: "noHTML" },
  "developer-mesh": { flag: true, message: "noHTML" },
  twitter: { flag: true, message: "noHTML" },
  github: { flag: true, message: "noHTML" },
  website: { flag: true, message: "noHTML" }
};

describe("<ProfileDetailsComponent />", () => {
  const wrapper = shallow(
    <ProfileDetailsComponent
      data={profileData[0]}
      translateTitle={i18n.t("profile-details")}
      translateError={i18n.t("error")}
      componentHasError={componentHasError}
      countries={countries}
      handleProfileChange={function() {}}
      handleLanguageChange={function() {}}
    />
  );
  it("expect to match snapshot", () => {
    /**EXPECT NO CHANGE IN THE SNAPSHOT */
    expect(wrapper).toMatchSnapshot();

    /**CHECK PROPS TO MAKE SURE ARE MAPPING CORRECTLY - (INSTEAD OF SNAPSHOT?) */
    expect(
      wrapper
        .find("input")
        .first()
        .props().value === profileData[0].first_name
    );
  });
  it("expect setProps to update value with new data", () => {
    /**ADD DIFFERENT PROPS TO SIMULATE CHANGE FROM ABOVE */
    wrapper.setProps({ data: profileData[1] });

    wrapper.update();

    /** EXPECT PROPS TO UPDATE WITH NEW NAME */
    expect(
      wrapper
        .find("input")
        .first()
        .props().value === profileData[1].first_name
    );
  });
});
