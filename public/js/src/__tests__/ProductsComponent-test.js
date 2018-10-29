import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import ProductsComponent from "../component/ProductsComponent";
import productsData from "./__mockData__/productsData.json";
import translateData from "../../../../locales/en-US.json";
import i18n from "../i18n-for-testing"; // initialized i18next instance for testing

describe("<ProductsComponent />", () => {
  const wrapper = shallow(
    <ProductsComponent
      data={productsData}
      currentLanguage={"en-US"}
      translate={i18n.t("products")}
      view_more = {i18n.t("view-more-button")}
      init={true}
    />
  );


  it("expect to match snapshot", () => {
    /**EXPECT NO CHANGE IN THE SNAPSHOT */
    expect(wrapper).toMatchSnapshot();
  });

  it("expect display number to incerease and show 20 total list items", () => {
    /**CLICK THE VIEW MORE BUTTON */
    wrapper.find("button").first().simulate("click");

    wrapper.update();

    /**EXPECT THE DISPLAY NUM TO INCREASE BY 1 */
    expect(wrapper.state().display_num).toBe(2);

    //EXPECT THE LIST TO SHOW AS MANY ITEMS AS THE MAX MULTIPLIED BY THE DISPLAY NUMBER
    expect(wrapper.find("ul").find("li").length).toBe(20);//.debug());

  });
});
