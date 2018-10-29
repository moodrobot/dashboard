import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ProductsComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      style: "category",
      data: this.props.data,
      loader_display: "",
      view_more_display: "d-none",
      content_display: "d-none",
      no_content_display: "d-none",
      max: 10,
      display_num: 1
    };

    this.showMoreItems = this.showMoreItems.bind(this);
  }

  showMoreItems() {
    var count = this.state.display_num;
    count++;

    //set new display amount and re-render
    this.setState({ display_num: count });
  }

  static getDerivedStateFromProps(nextProps, state) {
    //HIDES THE PRELOADER

    //view more display
    let vm = "";
    let cc = "d-block";
    let no_cont = "d-none";

    if (nextProps.init) {
      
      if (nextProps.data.length < state.max) {
        //document.getElementById("view_more_prod_btn").style.display = "none";
        vm = "d-none";
      }

      if (nextProps.data.length === 0) {
        //document.getElementById("no_prod").style.display = "block";
        no_cont = "d-block";
        cc = "d-none";
      }

      if (state.display_num * state.max >= nextProps.data.length && nextProps.data.length > 0) {
        vm = "d-none";
      } else if (nextProps.data.length >= nextProps.max) {
        vm = "";
      }

      return {
        data: nextProps.data,
        loader_display: "d-none",
        content_display: cc,
        view_more_display: vm,
        no_content_display: no_cont
      };
    } else {
      return null;
    }
  }

  /*componentDidUpdate() {
    let vm;

    if (this.state.display_num * this.state.max >= this.state.data.length && this.state.data.length > 0) {
      vm = "d-none";
    } else if (this.state.data.length >= this.state.max) {
      vm = "";
    }

    //MAKE SURE THERE IS A CHANGE OR WILL INFINITE LOOP
    if (vm != this.state.view_more_display) {
      this.setState({ view_more_display: vm });
    }
  }*/

  createOptions() {
    const T = this.props.translate;
    let currentLanguage = this.props.currentLanguage;

    const listItems = this.state.data.slice(0, this.state.max * this.state.display_num).map(function(item, index) {
      let licenseLink = "";
      if (item.moreinfourl) {
        licenseLink = (
          <p className="top-pad">
            <a href={item.moreinfourl}>{T["manage-license"]}</a>
          </p>
        );
      }

      let forumLink = "";
      if (item.forumurl) {
        forumLink = (
          <p className="top-pad">
            <a href={item.forumurl}>{T["forum"]}</a>
          </p>
        );
      }

      let downloadLink = "";
      if (item.download) {
        downloadLink = (
          <a href={item.download} className="btn btn-orange">
            {T["download-button"]}
          </a>
        );
      }

      return (
        <li className="product" key={index} value={item.value}>
          <div className="row">
            <div className="col-md-4 col-sm-12 text-center">
              <img className="float-image-center" src={item.imageurl} />
            </div>
            <div className="col">
              <div className="row no-gutters">
                <div className="col my-auto">
                  <span className="title text-md-nowrap">{item.name}</span>
                </div>
                <div className="col-md-auto">{downloadLink}</div>
              </div>
              <div className="row align-top">
                <div className="col-sm-7 col-lg-5 category">{T["serial"]}</div>
                <div className="col-sm-5 content">{item.serialnumber}</div>
              </div>
              <div className="row align-top">
                <div className="col-sm-7 col-lg-5 category">{T["license-type"]}</div>
                <div className="col-sm-5 content">{item.licensetype}</div>
              </div>
              <div className="row align-top">
                <div className="col-sm-7 col-lg-5 category">{T["purchase-date"]}</div>
                <div className="col-sm-5 content">
                  {new Date(item.registerdateepoch * 1000).toLocaleDateString(currentLanguage)}
                </div>
              </div>
              <div className="row align-top">
                <div className="col-sm-7 col-lg-5 category">{T["expiry-date"]}</div>
                <div className="col-sm-5 content">
                  {new Date(item.supportexpirationdateepoch * 1000).toLocaleDateString(currentLanguage)}
                </div>
              </div>
              {licenseLink}
              {forumLink}
            </div>
          </div>
        </li>
      );
    });
    return listItems;
  }

  render() {
    //console.log("RENDERING PRODUCTS COMPONENT");

    return (
      <div className="container-fluid">
        <div className="loader row">
          <div id="no_prod" className={this.state.no_content_display}>
            No products yet
          </div>
          <div id="loader_prod" className={"col-12 " + this.state.loader_display}>
            <img src="images/loader.gif" />
          </div>
        </div>
        <div id="product-content" className={this.state.content_display}>
          <div className="container-fluid">
            <ul className="list-unstyled">{this.createOptions()}</ul>
          </div>
          <div className="row text-center">
            <div className="col text-center">
              <button
                id="view_more_prod_btn"
                onClick={this.showMoreItems}
                type="button"
                className={"btn btn-secondary " + this.state.view_more_display}
              >
                {this.props.view_more}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductsComponent.propTypes = {
  translate: PropTypes.object,
  data: PropTypes.array,
  currentLanguage: PropTypes.string,
  view_more: PropTypes.string,
  init: PropTypes.bool
};

export default ProductsComponent;
