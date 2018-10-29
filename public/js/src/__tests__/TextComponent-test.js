import React from "react";
import { shallow } from "enzyme";
import TextComponent from "../component/TextComponent";

let props = {
  title: "A String",
  id: "first_name",
  hasError: false,
  required: "Required",
  error_message: "hasError",
  size: "small",
  value: "Bill",
  handler: function() {}
};

describe("<TextComponent />", () => {
  it("expect to match snapshot", () => {
    const wrapper = shallow(<TextComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
