import React, { Component } from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import ProfileImage from "../component/ProfileImage.js";
import ProfileImageButton from "../component/ProfileImageButton.js";
import translateData from "../../../../locales/en-US.json";

const file_upload = sinon.stub(ProfileImage.prototype, "componentDidMount");
const handle_click = sinon.spy(ProfileImage.prototype, "handleClick");

const default_images = {
  images: [
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-Autonomous-1.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-Autonomous-2.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-Data.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-GD.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-IoT-1.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-IoT-2.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/avatar-Realsense.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/bot01.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/one-eye.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/paper-bird.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/see-all-the-things.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/time.jpg",
    "https://s3.amazonaws.com/dpi-prod/default-images/wire-head.jpg"
  ],
  chosen_image: ""
};

describe("<ProfileImage />", () => {
  it("expect to match snapshot", () => {
    const wrapper = shallow(
      <ProfileImage
        profile_image="https://s3.amazonaws.com/dpi-intx/11531542/sirloin-1200-1200.jpg"
        setProfileImage={function() {}}
        default_images={default_images}
        recommendedSize={translateData["profile-image-recommended-size"]}
        remove={translateData["profile-image-remove"]}
        upload={translateData["profile-image-upload"]}
      />
    );

    /**EXPECT NO CHANGE IN THE SNAPSHOT */
    expect(wrapper).toMatchSnapshot();

    /** CHECK IMAGE/RADIO BUTTON CHANGE WHEN CLICKED */

    /*
    const image_button = wrapper.find(ProfileImageButton).first().dive();
    console.log(image_button.debug());
    image_button.find("input").first().simulate("click");//, {target: {value : default_images.default_img_01});
    wrapper.update();

    //CHECKS TO MAKE SURE HANDLE PROFILE IS CALLED WHEN CLICK NEW RADIO BTN IMAGE
    //expect(handle_click.called).toBe(true);
    //console.log(handle_click.called);
    //expect(handle_click.args[0][0].target.value).toBe(default_images.default_img_01);

    //console.log(wrapper.find("img").first().html());
    //expect(wrapper.find("input").first().props().value === profileData[0].first_name);

    /**ADD DIFFERENT PROPS TO SIMULATE CHANGE FROM ABOVE */
    //wrapper.setProps({data: profileData[1]});

    //wrapper.update();

    /** EXPECT PROPS TO UPDATE WITH NEW NAME */
    //expect(wrapper.find("input").first().props().value === profileData[1].first_name);
  });
});
