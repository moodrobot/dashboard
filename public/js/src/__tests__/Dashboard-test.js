import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import ProfileDetailsComponent from "../component/ProfileDetailsComponent";
import TextComponent from "../component/TextComponent";
import translateData from "../../../../locales/en-US.json";
import profileData from "./__mockData__/profileData.json";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

import Dashboard from "../Dashboard";
jest.dontMock("sharp");



//STUBS ALLOWS US TO CAPTURE ALL THE XHTTP CALLS
sinon.stub(Dashboard.prototype, "getProfile");
sinon.stub(Dashboard.prototype, "getProducts");
sinon.stub(Dashboard.prototype, "getCountries");
sinon.stub(Dashboard.prototype, "getContributions");
sinon.stub(Dashboard.prototype, "getPage");

const hpc = sinon.spy(Dashboard.prototype, "handleProfileChange");
const name = "Jim";

// beforeAll(() => {
//   console.log("Dashboard", Dashboard);
// });

describe("<Dashboard />", () => {
  const wrapper = shallow(
    <Dashboard
      i18n={i18n}
    />
  );

  it("expect set state to match snapshot", () => {

    //GIVE THIS OUR STATIC DATA
    wrapper.setState({ profile: profileData[0]});
    wrapper.update();

    /**EXPECT NO CHANGE IN THE SNAPSHOT */
    expect(wrapper).toMatchSnapshot();

  });
  xit("expect handleProfileChange to be called when input is changed", () => {

    //PROFILE DETAILS COMPONENT WRAPPER
    const details = wrapper.find(ProfileDetailsComponent).dive();

    //THE FIRST TEXTCOMPONENT WRAPPER
    const textComp = details.find(TextComponent).first().dive();

    //FIND THE INPUT AND CHANGE THE VALUE
    textComp.find("input").simulate("change", {target: {value : name}});

    //CHECKS TO MAKE SURE HANDLE PROFILE IS CALLED WHEN INPUT TEXT CHANGES
    expect(hpc.called).toBe(true);
    expect(hpc.args[0][0].target.value).toBe(name);

  });
});
