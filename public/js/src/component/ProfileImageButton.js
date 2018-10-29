import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ProfileImageButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vtop">
        <label className="profile-image">
          <input
            type="radio"
            name="default_img"
            value={this.props.image}
            checked={this.props.checked}
            onChange={this.props.handleClick}
          />
          {/*<span className="icon-upload-lg" />*/}
          <img className="icon-upload-sm" src={this.props.image ? this.props.image : "images/upload-icon.png"} />
        </label>
      </div>
    );
  }
}

ProfileImageButton.propTypes = {
  image: PropTypes.string,
  checked: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

export default ProfileImageButton;
