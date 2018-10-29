import React from "react";
import jest from "jest";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import ContributionsComponent from "../component/ContributionsComponent";
import contributionsData from "./__mockData__/contributionsData.json";
// import translateData from "../../../../locales/en-US.json";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

const cc = sinon.spy(ContributionsComponent.prototype, "createContributions");

describe("<ContributionsComponent />", () => {
  const wrapper = shallow(
    <ContributionsComponent
      data={contributionsData}
      currentLanguage={"en-US"}
      translate={i18n.t("contributions")}
      view_more = {i18n.t("view-more-button")}
      init={true}
    />

  );
  it("expect to match snapshot", () => {

    //TRIGGERS COMPONENT DID UPDATE
    wrapper.setProps({data: contributionsData});

    /**EXPECT NO CHANGE IN THE SNAPSHOT */
    expect(wrapper).toMatchSnapshot();

  });
  it("expect wrapper to increment display number by 1", () => {

    /**CLICK THE VIEW MORE BUTTON */
    wrapper.find("button").first().simulate("click");

    wrapper.update();

    /**EXPECT THE DISPLAY NUM TO INCREASE BY 1 */
    expect(wrapper.state().display_num).toBe(2);

  });
  it("expect to filter by blog keyword", () => {

    /*setTimeout(function(){
      expect(wrapper.state().filter_data.length > 1);
      console.log("FILTER _DATAS", wrapper.state().filter_data.length);
      done();
    }, 0);*/

    //SIMULATE SELECTING BLOG FROM DROPDOWN
    //wrapper.find("select").simulate("change", {target: {value : "blog"}});

    //wrapper.update();

    //nexpect(wrapper.find("tbody").find("tr").length).toBe(2);

  });
});
