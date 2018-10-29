import React, { Component } from "react";
import TextComponent from "../component/TextComponent";
import DropDownComponent from "../component/DropDownComponent";
import SubHead from "../component/SubHead";
import PropTypes from "prop-types";

class ProfileDetailsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log("RENDERING PROFILE DETAILS");

    const TT = this.props.translateTitle;
    const TE = this.props.translateError;
    const CE = this.props.componentHasError;

    return (
      <div>
        <SubHead title={TT["title"]} />
        <TextComponent
          title={TT["first-name"]}
          id="first_name"
          hasError={CE.first_name.flag}
          required="Required"
          error_message={TE[CE.first_name.message]}
          size="small"
          value={this.props.data.first_name}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["last-name"]}
          id="last_name"
          hasError={CE.last_name.flag}
          required="Required"
          size="small"
          error_message={TE[CE.last_name.message]}
          value={this.props.data.last_name}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["display-name"]}
          id="display_name"
          hasError={CE.display_name.flag}
          required="Required"
          size="small"
          error_message={TE[CE.display_name.message]}
          value={this.props.data.display_name}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["email"]}
          id="email"
          size="small"
          hasError={CE.email.flag}
          required="Required"
          error_message={TE[CE.email.message]}
          value={this.props.data.email}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["company"]}
          id="company"
          size="small"
          hasError={CE.company.flag}
          error_message={TE[CE.company.message]}
          value={this.props.data.company}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["phone-number"]}
          id="phone"
          size="small"
          hasError={CE.phone.flag}
          error_message={TE[CE.phone.message]}
          value={this.props.data.phone}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <DropDownComponent
          title={TT["country"]}
          data={this.props.countries}
          id="country"
          defaultValue={this.props.data.country}
          onChangeHandler={this.props.handleProfileChange}
          value={this.props.data.country}
          disabled={this.props.freezeAll}
        />
        <DropDownComponent
          title={TT["language-preference"]}
          //data={t("profile-details-language-preference-options", {
          //  returnObjects: true
          //})}
          data={TT["language-preference-options"]}
          id="language"
          value={this.props.currentLanguage}
          defaultValue={this.props.data.language}
          onChangeHandler={this.props.handleLanguageChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["about"]}
          id="bio"
          hasError={CE.bio.flag}
          error_message={TE[CE.bio.message]}
          type="area"
          row={6}
          align_top="true"
          value={this.props.data.bio}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["signature"]}
          id="signature"
          hasError={CE.signature.flag}
          error_message={TE[CE.signature.message]}
          value={this.props.data.signature}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <SubHead title={TT["connect-title"]} />
        <TextComponent
          title={TT["connect-twitter"]}
          id="twitter"
          hasError={CE.twitter.flag}
          error_message={TE[CE.twitter.message]}
          nest="other_services"
          value={(this.props.data.other_services["twitter"]) ? (this.props.data.other_services["twitter"]) : ""}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["connect-github"]}
          id="github"
          hasError={CE.github.flag}
          error_message={TE[CE.github.message]}
          nest="other_services"
          value={(this.props.data.other_services.github) ? (this.props.data.other_services.github) : ""}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["connect-developer-mesh"]}
          id="developer-mesh"
          hasError={CE["developer-mesh"].flag}
          error_message={TE[CE["developer-mesh"].message]}
          nest="other_services"
          value={(this.props.data.other_services["developer-mesh"]) ? (this.props.data.other_services["developer-mesh"]) : ""}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
        <TextComponent
          title={TT["connect-website"]}
          id="website"
          hasError={CE.website.flag}
          error_message={TE[CE.website.message]}
          nest="other_services"
          value={(this.props.data.other_services.website) ? (this.props.data.other_services.website) : ""}
          handler={this.props.handleProfileChange}
          disabled={this.props.freezeAll}
        />
      </div>
    );
  }
}

ProfileDetailsComponent.propTypes = {
  data: PropTypes.object,
  freezeAll: PropTypes.bool,
  translateTitle: PropTypes.object.isRequired,
  translateError: PropTypes.object.isRequired,
  countries: PropTypes.array,
  componentHasError: PropTypes.object,
  handleProfileChange: PropTypes.func,
  handleLanguageChange: PropTypes.func,
  currentLanguage: PropTypes.string,
  init: PropTypes.bool
};

export default ProfileDetailsComponent;
