import React, { PureComponent } from "react";
import PropTypes from "prop-types";


class Header extends PureComponent {
  constructor(props) {

    super(props);
    this.getHome = this.getHome.bind(this);

  }

  getHome() {
    window.location = "/dashboard";
  }

  render() {
    const T = this.props.translate;
    const language = this.props.currentLanguage;
    const hideProducts = (this.props.showProducts ? "" : " hidden");

    return (
      <div>
        <div className="DashboardHeader">
          <div className="width-1440 mx-auto">
            <div className="row no-gutters align-items-center">

              <span className="col-logo hand icon-logo-intel" onClick={this.getHome} />
              <div onClick={this.getHome} className="col h_title hand my-auto">
                {T["developer-zone"]}
              </div>
              <div className="col-auto text-right col-login my-auto">
                {/*<img src="images/person_icon.png" />*/}
                <span className="icon-help" />
                <a href={"/" + language + "/support"}>{T["support"]}</a>
                <div className="d-inline-block text-nowrap">
                  {/*<img src="images/person_icon.png" />*/}
                  <span className="icon-user" />
                  <a href="/dashboard/logout">{T["sign-out"]}</a>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="NavigationHeader">
          <div className="width-1440 padding-left-20 mx-auto row no-gutters text-nowrap">
            <div className="col-auto nav_item">
              <a href="#profile" id="nav_profile">{T["your-profile"]}</a>
            </div>
            <div className="col-auto nav_item">
              <a href="#contributions" id="nav_contributions">{T["your-contributions"]}</a>
            </div>
            <div className={"col-auto nav_item" + hideProducts}>
              <a href="#products" id="nav_products">{T["your-products"]}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  translate: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  showProducts: PropTypes.bool.isRequired
};

export default Header;
