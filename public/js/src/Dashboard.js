/** DASHBOARD COMPONENT
 * Created by jedx.bursiek@intel.com
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/*IMPORT COMPONENTS*/
import SubHead from "./component/SubHead";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ProfileImage from "./component/ProfileImage";
import ProfileDetailsComponent from "./component/ProfileDetailsComponent";
import ProductsComponent from "./component/ProductsComponent";
import ContributionsComponent from "./component/ContributionsComponent";
import BeltStatusComponent from "./component/BeltStatusComponent";
import ContributeButtons from "./component/ContributeButtons";

/**IMPORT ERROR CHECKING TOOLS */
import * as errorCheck from "./errorCheck";

/**IMPORT VARIOUS OTHER TOOLS */
import format from "date-fns/format";
import axios from "axios";
import renderHTML from "react-render-html";
import * as events from "./events";
//import { currentId } from "async_hooks";

// import { translate, Interpolate, Trans } from "react-i18next";
// import i18n from "./i18n"; // initialized i18next instance
let i18n = {};
// @translate(["view", "nav"], { wait: true })

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    i18n = this.props.i18n;

    this.format = format;

    this.previous = "profile";
    this.init = false;
    this.init_contributions = false;
    this.init_products = false;

    this.componentHasError;
    this.initComponentHasError();

    this.state = {
      cancelDisabled: true,
      cancelLoader: "off",
      freezeAll: false,

      saveDisabled: true,
      saveLoader: "off",

      default_images: {
        images: [
          "https://s3.amazonaws.com/dpi-prod/default-images/avatar-Autonomous-2.jpg",
          "https://s3.amazonaws.com/dpi-prod/default-images/avatar-GD.jpg",
          "https://s3.amazonaws.com/dpi-prod/default-images/avatar-IoT-2.jpg",
          "https://s3.amazonaws.com/dpi-prod/default-images/bot01-square.jpg",
          "https://s3.amazonaws.com/dpi-prod/default-images/paper-bird.jpg",
          "https://s3.amazonaws.com/dpi-prod/default-images/wire-head-square.jpg"
        ],
        chosen_image: ""
      },

      profile: {
        enterprise_id: "",
        profile_image: "",
        first_name: "",
        last_name: "",
        display_name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        bio: "",
        belt: "",
        signature: "",
        points: "",
        total_points: "",
        language: "en-US",
        other_services: {
          "developer-mesh": "",
          twitter: "",
          github: "",
          website: ""
        },
        other_ids: {
          idz: ""
        }
      },
      countries: [],
      products: [{ init: true }],
      contributions: [{ init: true }],

      forceLocale: false
    };

    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.changeSectionClick = this.changeSectionClick.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.getPage = this.getPage.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.getSection = this.getSection.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.setProfileImage = this.setProfileImage.bind(this);
    this.resetProfile = this.resetProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.freezeInput = this.freezeInput.bind(this);
    this.findErrorInComponents = this.findErrorInComponents.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);

    let getQueryString = function(q) {
      if (typeof q == "undefined" || q.length == 0) {
        return {};
      }
      return (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
          var p = a[i].split("=");
          if (p.length != 2) continue;
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
      })(q.split("&"));
    };

    let qs = getQueryString(window.location.search.substr(1));
    if (qs.lang) {
      // alert("will change language to: " + qs.lang);
      this.setState({ forceLocale: qs.lang }, () => {
        this.changeLanguage(qs.lang);
      });
    }

    this.getProfile();
    this.getProducts();
    this.getContributions();
  }

  initComponentHasError() {
    this.componentHasError = {
      first_name: { flag: false, message: "" },
      last_name: { flag: false, message: "" },
      display_name: { flag: false, message: "" },
      email: { flag: false, message: "" },
      phone: { flag: false, message: "" },
      company: { flag: false, message: "" },
      bio: { flag: false, message: "" },
      signature: { flag: false, message: "" },
      "developer-mesh": { flag: false, message: "" },
      twitter: { flag: false, message: "" },
      github: { flag: false, message: "" },
      website: { flag: false, message: "" }
    };
  }

  /* HANDLE CHANGE FOR TEXT-COMPONENTS */
  handleProfileChange(event, nest) {
    //event.preventDefault();

    //CHECK FOR ERRORS SO WE CAN DISABLE THE SAVE BUTTON
    var hasError = errorCheck.checkForErrors(event.target);
    this.componentHasError[event.target.id] = hasError;

    if (nest === "other_services") {
      this.setState({
        profile: {
          ...this.state.profile,
          other_services: {
            ...this.state.profile.other_services,
            [event.target.id]: event.target.value
          }
        },
        saveDisabled: this.findErrorInComponents() ? true : false,
        cancelDisabled: false
      });
    } else {
      this.setState({
        profile: {
          ...this.state.profile,
          [event.target.id]: event.target.value
        },
        saveDisabled: this.findErrorInComponents() ? true : false,
        cancelDisabled: false
      });
    }
  }

  handleLanguageChange(e) {
    this.changeLanguage(e.target.value);
  }

  changeLanguage(locale) {
    if (this.state.forceLocale == false || this.state.forceLocale == locale) {
      i18n.changeLanguage(locale);
      this.getCountries();
    }

    this.setState({
      profile: {
        ...this.state.profile,
        language: locale
      },
      saveDisabled: this.findErrorInComponents() ? true : false,
      cancelDisabled: false
    });
  }

  findErrorInComponents() {
    const err = Object.keys(this.componentHasError)
      .map(e => this.componentHasError[e])
      .find(item => item.flag === true);

    return err;
  }

  getCountries() {
    axios.get("/dashboard/api/getCountries/" + i18n.language).then(res => {
      this.setState({
        countries: res.data.map(e => {
          return { name: e.name, value: e.iso2 };
        })
      });
    });
  }

  resetProfile() {
    this.setState({ cancelLoader: "on" });
    this.getProfile();
  }

  getProfile() {
    this.initComponentHasError();

    axios
      .get("/dashboard/api/getProfile")
      .then(res => {
        this.changeLanguage(res.data.language);
        this.getCountries();

        if (res.data.points === "") {
          res.data.points = "0";
        }
        if (res.data.total_points === "") {
          res.data.total_points = "0";
        }

        this.setState({ profile: res.data, saveDisabled: true, cancelDisabled: true, cancelLoader: "off" });
      })
      .catch(error => {
        console.error(error);
      });
  }

  saveProfile() {
    //turn on the spinny part of the button
    this.setState({ saveLoader: "on" });

    let post_profile = this.state.profile;

    //clean up before saving
    post_profile = {
      enterprise_id: "",
      profile_image: errorCheck.sanitize(post_profile.profile_image, true).sanitized,
      first_name: errorCheck.sanitize(post_profile.first_name, true).sanitized,
      last_name: errorCheck.sanitize(post_profile.last_name, true).sanitized,
      display_name: errorCheck.sanitize(post_profile.display_name, true).sanitized,
      email: errorCheck.sanitize(post_profile.email, true).sanitized,
      phone: errorCheck.sanitize(post_profile.phone, true).sanitized,
      company: errorCheck.sanitize(post_profile.company, true).sanitized,
      country: errorCheck.sanitize(post_profile.country, true).sanitized,
      bio: errorCheck.sanitize(post_profile.bio).sanitized,
      signature: errorCheck.sanitize(post_profile.signature, true).sanitized,
      language: errorCheck.sanitize(post_profile.language, true).sanitized, //.replace("_", "-"),
      other_services: {
        "developer-mesh": errorCheck.sanitize(post_profile.other_services["developer-mesh"], true).sanitized,
        twitter: errorCheck.sanitize(post_profile.other_services.twitter, true).sanitized,
        github: errorCheck.sanitize(post_profile.other_services.github, true).sanitized,
        website: errorCheck.sanitize(post_profile.other_services.website, true).sanitized
      }
    };

    delete post_profile.belt;
    delete post_profile.points;
    delete post_profile.total_points;

    // console.log("post_profile", post_profile);

    axios
      .post("/dashboard/api/saveProfile", post_profile)
      .then(res => {
        // console.log("**************************");
        // console.log("profile saved:", res.data);
        // console.log("**************************");
        // this.setState({ saveDisabled : true, cancelDisabled: true});
        this.setState({ profile: res.data, saveDisabled: true, cancelDisabled: true, saveLoader: "off" });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getProducts() {
    axios
      .get("/dashboard/api/getProducts")
      .then(res => {
        // console.log("**************************");
        // console.log("Get products:", res.data);
        // console.log("**************************");
        this.init_products = true;
        this.setState({ products: res.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getContributions() {
    axios
      .get("/dashboard/api/getContributions")
      .then(res => {
        res.data.map(function(e) {
          e.nice_event_name = events.translateEventName(e.event_name);
          return e;
        });

        try {
          res.data = events.decorateLinks(res.data);
        } catch (err) {
          console.error("decorate links err:", err);
        }

        // console.log("**************************");
        // console.log("nice contributions:", res.data);
        // console.log("**************************");

        this.init_contributions = true;
        this.setState({ contributions: res.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setProfileImage(url) {
    this.setState({
      profile: {
        ...this.state.profile,
        profile_image: url
      },

      saveDisabled: this.findErrorInComponents() ? true : false,
      cancelDisabled: false,
      freezeAll: false
    });
  }

  changeSectionClick(e) {
    //handle click action - pass in the page only (i.e. strip "nav_")
    this.changeSection(e.target.id.substring(4));
  }

  getSection() {
    let section = /[^#]*$/.exec(window.location.href)[0];
    if (!document.getElementById(section)) {
      section = "profile";
    }
    return section;
  }

  updatePageTitle(section) {
    document.title = i18n.t("header.page-title") + " - " + i18n.t(section + ".header");
  }

  getPage(section) {
    if (!document.getElementById(section)) {
      section = "profile";
    }

    this.updatePageTitle(section);

    //toggles the navigation to new active state

    document.getElementById("nav_" + this.previous).style.color = "#FFFFFF";
    document.getElementById("nav_" + section).style.color = "#00AEEF";

    /* SHOW NEXT */
    this.showSection(document.getElementById(section));

    if (section != this.previous) {
      /* HIDE PREVIOUS */
      this.hideSection(document.getElementById(this.previous));
    }

    /* SET NEW PREVIOUS */
    this.previous = section;
  }

  //updates the url
  changeSection(section) {
    window.location = "#" + section;
  }

  //checks url to update the page content
  componentDidMount() {
    //console.log("COMPONENT MOUNTED!!!!!");
    window.onhashchange = e => {
      this.getPage(this.getSection());
    };

    window.onload = e => {
      this.getPage(this.getSection());
    };
  }

  hideSection(obj) {
    obj.style.display = "none";
  }

  showSection(obj) {
    obj.style.display = "block";
  }

  freezeInput(freeze) {
    this.setState({ freezeAll: freeze });
  }

  componentDidUpdate() {
    if (!this.init) {
      this.getPage(this.getSection());
      this.init = true;
    }
  }

  willTransitionFrom(component, transition) {
    if (!window.confirm("Are you sure you want to leave ?")) {
      transition.abort();
    }
  }

  render() {
    let currentLanguage = this.state.profile.language.replace("_", "-");

    if (currentLanguage.length < 5) {
      currentLanguage = "en-us";
    }

    this.updatePageTitle(this.getSection());

    return (
      <div className="Dashboard">
        <Header
          translate={i18n.t("header")}
          currentLanguage={currentLanguage}
          showProducts={(this.state.products.length ? true : false) && this.init_products}
        />

        {/*PROFILE SECTION*/}
        <div id="profile">
          {/*PROFILE-HEADER*/}
          <div className="section-header">
            <div className="width-1440 mx-auto row align-items-center no-gutters padding-left-20">
              <div className="col-auto">
                <span className="header">{i18n.t("profile.header")}</span>
              </div>
              <div className="col text-right text-sm-nowrap">
                <button
                  onClick={this.resetProfile}
                  type="button"
                  className={"btn btn-secondary " + (this.state.cancelDisabled ? "active" : "")}
                  disabled={this.state.cancelDisabled}
                >
                  <div className="btn-loader">
                    <img className={"btn-loader-sm " + this.state.cancelLoader} src="images/loader.gif" />
                  </div>
                  {i18n.t("profile-cancel-button")}
                </button>
                <button
                  onClick={this.saveProfile}
                  type="button"
                  className={"btn btn-primary " + (this.state.saveDisabled ? "active" : "")}
                  disabled={this.state.saveDisabled}
                >
                  <div className="btn-loader">
                    <img className={"btn-loader-sm " + this.state.saveLoader} src="images/loader.gif" />
                  </div>
                  {i18n.t("profile-save-button")}
                </button>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className="title">
              {i18n.t("member-since")}{" "}
              {new Date(this.state.profile.create_date_timestamp).toLocaleDateString(currentLanguage)}
            </h2>

            {renderHTML(i18n.t("view-your-public-profile", { url: "/" + currentLanguage.toLowerCase() + "/user/" }))}

            {/*
            {this.state.profile.other_ids.idz ?
              renderHTML(i18n.t("view-your-public-profile", { url: "/" + currentLanguage + "/user/" + this.state.profile.other_ids.idz })) :
              renderHTML(i18n.t("view-your-public-profile", { url: "/" + currentLanguage + "/user/" }))}
            */}

            {/*PROFILE IMAGE*/}
            <SubHead title={i18n.t("profile-image-title")} />
            <ProfileImage
              profile_image={this.state.profile.profile_image}
              setProfileImage={this.setProfileImage}
              freezeInput={this.freezeInput}
              default_images={this.state.default_images}
              recommendedSize={i18n.t("profile-image-recommended-size")}
              remove={i18n.t("profile-image-remove")}
              upload={i18n.t("profile-image-upload")}
            />

            {/*YOUR PROFILE DETAILS*/}
            <ProfileDetailsComponent
              data={this.state.profile}
              translateTitle={i18n.t("profile-details")}
              translateError={i18n.t("error")}
              countries={this.state.countries}
              componentHasError={this.componentHasError}
              handleProfileChange={this.handleProfileChange}
              handleLanguageChange={this.handleLanguageChange}
              currentLanguage={currentLanguage}
              freezeAll={this.state.freezeAll}
            />

            {/*YOUR EMAIL SUBSCRIPTIONS*/}
            {/* <SubHead title={i18n.t("profile-details-email-subscriptions-title")} />
            {renderHTML(i18n.t("profile-details-email-subscriptions-copy"))}
            <p>
              {renderHTML(
                i18n.t("profile-details-email-subscriptions-idz-newsletter")
              )}
            </p>
            <p>
              {renderHTML(
                i18n.t("profile-details-email-subscriptions-product-updates")
              )}
            </p>
            <p>
              {renderHTML(
                i18n.t("profile-details-email-subscriptions-intel-newsletter")
              )}
            </p> */}

            {/*YOUR CONTRIBUTIONS TO THE DEVELOPER'S ZONE*/}
            <SubHead title={i18n.t("profile-details-contributions-title")} />
            <ContributeButtons
              currentLanguage={currentLanguage}
              addArticle={i18n.t("profile-details-contributions-add-article")}
              addBlog={i18n.t("profile-details-contributions-add-blog-post")}
              addForum={i18n.t("profile-details-contributions-add-forum-topic")}
              viewContributions={i18n.t("profile-details-contributions-view-contributions")}
              idzUserId={this.state.profile.other_ids.idz}
            />
            <hr />

            {/*BELT STATUS*/}
            <BeltStatusComponent
              belt={this.state.profile.belt}
              translate={i18n.t("profile-details-belt")}
              currentLanguage={currentLanguage}
              points={this.state.profile.points}
              total_points={this.state.profile.total_points}
            />
          </div>
          <Footer translate={i18n.t("footer")} currentLanguage={currentLanguage} />
        </div>

        {/*CONTRIBUTIONS SECTION*/}
        <div id="contributions">
          {/*CONTRIBUTIONS-HEADER*/}
          <div className="section-header">
            <div className="width-1440 mx-auto col-auto padding-left-20">
              <span className="header">{i18n.t("contributions.header")}</span>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12">
              <ContributeButtons
                currentLanguage={currentLanguage}
                addArticle={i18n.t("contributions.add-article-button")}
                addBlog={i18n.t("contributions.add-blog-post-button")}
                addForum={i18n.t("contributions.add-forum-topic-button")}
                viewContributions={i18n.t("profile-details-contributions-view-contributions")}
                idzUserId={this.state.profile.other_ids.idz}
              />
            </div>

            {/*CONTRIBUTIONS-CONTENT*/}
            <ContributionsComponent
              data={this.state.contributions}
              currentLanguage={currentLanguage}
              translate={i18n.t("contributions")}
              view_more={i18n.t("view-more-button")}
              init={this.init_contributions}
            />
          </div>
          <Footer translate={i18n.t("footer")} currentLanguage={currentLanguage} />
        </div>

        {/*PRODUCTS SECTION*/}
        <div id="products">
          {/*PRODUCTS-HEADER*/}
          <div className="section-header">
            <div className="width-1440 mx-auto row align-items-center padding-left-20">
              <div className="col-auto">
                <span className="header">{i18n.t("products.header")}</span>
              </div>
              {/* <div className="col text-right">
                <a href="" className="btn btn-primary">
                  {i18n.t("products.online-services-button")}
                </a>
              </div> */}
            </div>
          </div>

          {/*PRODUCTS-CONTENT*/}
          <div className="container">
            <ProductsComponent
              data={this.state.products}
              translate={i18n.t("products")}
              currentLanguage={currentLanguage}
              view_more={i18n.t("view-more-button")}
              init={this.init_products}
            />
          </div>
          <Footer translate={i18n.t("footer")} currentLanguage={currentLanguage} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  i18n: PropTypes.any
};

export default Dashboard;
