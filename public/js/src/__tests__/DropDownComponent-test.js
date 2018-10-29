import React from "react";
import { shallow } from "enzyme";
import DropDownComponent from "../component/DropDownComponent";
import countries from "./__mockData__/countries.json";

let props = {
  title: "Language",
  data: countries,
  id: "language",
  value: "en-US",
  defaultValue: "US",
  onChangeHandler: function() {}
};

describe("<DropDownComponent />", () => {
  it("expect to match snapshot", () => {
    const wrapper = shallow(<DropDownComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
    
  });
});
