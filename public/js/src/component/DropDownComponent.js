import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class DropDownComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { style: "category", init: "false"};
  }

  createOptions() {
    const listItems = this.props.data.map(item => {

      return <option key={item.name} value={item.value}>
        {item.name}
      </option>;
    });
    return listItems;
  }

  render() {
    let dropdownValue = this.props.defaultValue;
    if (this.props.value != "") {
      dropdownValue = this.props.value;
    }
    return (
      <div className="dropdown-component no-gutters">
        <div className="col-md-3 col-lg-2 align-middle d-inline-block"><span className={this.state.style}>{this.props.title}</span></div>
        <div className="col-md-9 col-lg-10 align-middle d-inline-block">
          <select className="form-control dropdown" id={this.props.id} disabled={this.props.disabled} onChange={this.props.onChangeHandler} value={dropdownValue}>{this.createOptions()}</select>
        </div>
      </div>
    );
  }
}

DropDownComponent.propTypes = {
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func
};

export default DropDownComponent;
