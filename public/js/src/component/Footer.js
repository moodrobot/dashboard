import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Footer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const T = this.props.translate;
    const language = this.props.currentLanguage;
    return (
      <div className="footer">
        <div className="NavigationHeader">
          <div className="width-1440 mx-auto row list-unstyled footer-group">
            <div className="col-sm-6 col-md-3">
              <p>
                <span className="f_title">{T["header-hardware-developers"]}</span>
                <li>
                  <a href="https://www.intel.com/content/www/us/en/design/resource-design-center.html">{T["resource-and-design-center"]}</a>
                </li>
                <li>
                  <a href="http://www.intel.com/buy/">{T["shop-intel"]}</a>
                </li>
                <li>
                  <a href="https://firmware.intel.com/">{T["firmware"]}</a>
                </li>
              </p>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>
                <span className="f_title">{T["header-open-source"]}</span>
                <li>
                  <a href="https://www.01.org/">{T["01-org"]}</a>
                </li>
                <li>
                  <a href="https://www.clearlinux.org/">{T["clear-linux-project"]}</a>
                </li>
                <li>
                  <a href="https://www.zephyrproject.org/">{T["zephyr-project"]}</a>
                </li>
              </p>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>
                <span className="f_title">{T["header-manage-your-tools"]}</span>
                <li>
                  <a href="https://downloadcenter.intel.com/">{T["download-center"]}</a>
                </li>
                <li>
                  <a href="http://www.intel.com/supporttickets">{T["online-serivce-center"]}</a>
                </li>
                <li>
                  <a href="https://registrationcenter.intel.com/">{T["registration-center"]}</a>
                </li>
              </p>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>
                <span className="f_title">{T["header-stay-up-to-date"]}</span>
                <li>
                  <a href={"/" + language + "/forum"}>{T["forums"]}</a>
                </li>
                <li>
                  <a href={"/" + language + "/recent-updates"}>{T["recent-updates"]}</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/subscription_center?add_us75er=intelswnetwork">{T["subscribe-to-our-youtube-channel"]}</a>
                </li>
                <li>
                  <a href={"/" + language + "/newsletter"}>{T["newsletter-archives"]}</a>
                </li>
              </p>
            </div>
          </div>
        </div>
        <div className="SectionHeader f_terms">
          <div className="col-md-12">
            <div className="row text-nowrap">
              <div className="col-auto">
                <a  href="http://www.intel.com/content/www/us/en/legal/terms-of-use.html">{T["terms-of-use"]}</a>
              </div>
              <div className="col-auto">
                <a href="http://www.intel.com/content/www/us/en/legal/trademarks.html">{T["trademarks"]}</a>
              </div>
              <div className="col-auto">
                <a href="http://www.intel.com/content/www/us/en/privacy/intel-online-privacy-notice-summary.html">{T["privacy"]}</a>
              </div>
              <div className="col-auto">
                <a href="http://www.intel.com/content/www/us/en/privacy/intel-cookie-notice.html">{T["cookies"]}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  translate: PropTypes.object.isRequired,
  currentLanguage : PropTypes.string.isRequired
};

export default Footer;
