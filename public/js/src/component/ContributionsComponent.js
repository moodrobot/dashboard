import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import shallowCompare from "react-addons-shallow-compare";

//import i18n from "../i18n"; // initialized i18next instance

class ContributionsComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      style: "category",
      data: [],
      filter_data: [],
      loader_display: "",
      view_more_display: "d-none",
      content_display: "d-none",
      no_content_display: "d-none",
      max: 10,
      display_num: 1
    };

    //console.log(this.props);
    this.filterArray = this.filterArray.bind(this);
    this.createContributions = this.createContributions.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.showMoreItems = this.showMoreItems.bind(this);
  }

  createContributions() {
    const T = this.props.translate;
    const currentLanguage = this.props.currentLanguage;
    let filter_data = [...this.state.filter_data];
    if (filter_data.length === 0) {
      filter_data = [...this.state.data];
    }
    //console.log("FILTER DATA", filter_data);
    const listItems = filter_data
      .slice(0, this.state.max * this.state.display_num)
      .map(function(item, index) {
        let link = item.linkText;
        let publishState = "";

        if (item.unpublished) {
          publishState = T["event-unpublish"];
        }

        if (item.linkUrl) {
          link = <a href={item.linkUrl}>{item.linkText}</a>;
        }

        let dateOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
          // hour12: false
        };

        return (
          <tr className="contribution" key={index} value={item.value}>
            <td>
              {T["event-names"][item.nice_event_name]} {publishState}
            </td>
            <td>{link}</td>
            <td>
              {new Intl.DateTimeFormat(currentLanguage, dateOptions).format(new Date(item.awarded))}
            </td>
            <td>{item.points}</td>
          </tr>
        );
      });

    return listItems;
  }

  showMoreItems() {
    var count = this.state.display_num;
    count++;

    //set new display amount and re-render
    this.setState({ display_num: count });
  }

  static getDerivedStateFromProps(nextProps, state) {
    //console.log(nextProps.init);
    if (nextProps.init) {
      //view more display
      let vm = "";
      let cc = "d-block";
      let no_cont = "d-none";
      //console.log(nextProps.data.length, state.max);
      if (nextProps.data.length < state.max) {
        vm = "d-none";
      }

      if (nextProps.data.length == 0) {
        no_cont = "d-block";
        cc = "d-none";
      }

      if (state.display_num * state.max >= state.filter_data.length && state.filter_data.length > 0) {
        vm = "d-none";
      } else if (state.filter_data.length >= state.max) {
        vm = "";
      }

      return {
        data: nextProps.data,
        filter_data: state.filter_data,
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

    if (this.state.display_num * this.state.max >= this.state.filter_data.length && this.state.filter_data.length > 0) {
      vm = "d-none";
    } else if (this.state.filter_data.length >= this.state.max) {
      vm = "";
    }

    //MAKE SURE THERE IS A CHANGE OR WILL INFINITE LOOP
    if (vm != this.state.view_more_display) {
      this.setState({ view_more_display: vm });
    }
  }*/

  initFilterDropDown() {
    const filter_options = [...new Set(this.state.data.map(item => item.nice_event_name))].map(function(item, index) {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });

    return filter_options;
  }

  handleFilter(e) {
    this.filterArray(e.target.value);
  }

  filterArray(filter_str) {
    const temp = [...this.state.data.filter(item => item.nice_event_name === filter_str)];
    this.setState({ filter_data: temp, display_num: 1 });
  }

  render() {
    const T = this.props.translate;
    //console.log("RENDERING CONTRIBUTIONS COMPONENT");
    return (
      <div className="container-fluid">
        <div id="contribution-content" className={this.state.content_display}>
          <select
            id="select_filter"
            defaultValue="default"
            className="capitalize filter_dropdown form-control"
            onChange={this.handleFilter}
          >
            <option key="filter" disabled value="default">
              {T["filter-by"]}
            </option>
            {this.initFilterDropDown()}
          </select>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>{T["type"]}</th>
                <th>{T["title"]}</th>
                <th>{T["posted"]}</th>
                <th>{T["points-earned"]}</th>
              </tr>
            </thead>
            <tbody>{this.createContributions()}</tbody>
          </table>
        </div>
        <div className="col-12 text-center">
          <div className="loader row">
            <div id="no_cont" className={this.state.no_content_display}>
              No contributions yet
            </div>
            <div id="loader_cont" className={"col-12 " + this.state.loader_display}>
              <img src="images/loader.gif" />
            </div>
          </div>
          <button
            id="view_more_btn"
            onClick={this.showMoreItems}
            type="button"
            className={"btn btn-secondary " + this.state.view_more_display}
          >
            {this.props.view_more}
          </button>
        </div>
      </div>
    );
  }
}

ContributionsComponent.propTypes = {
  translate: PropTypes.object,
  currentLanguage: PropTypes.string,
  data: PropTypes.array,
  view_more: PropTypes.string,
  init: PropTypes.bool
};

export default ContributionsComponent;
