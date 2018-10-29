import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class TextComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      style_text: "category form-control",
      style_title: "category",
      error_message: "off",
      focus: false
    };

    this.returnTextArea = this.returnTextArea.bind(this);
    this.returnTextInput = this.returnTextInput.bind(this);
    this.turnOffFocus = this.turnOffFocus.bind(this);
    this.turnOnFocus = this.turnOnFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.hasError) {
      return {
        style_text: "category form-control",
        style_title: "category",
        error_message: "off"
      };
    } else {
      return null;
    }
  }

  //SPECIFICALLY FOR NESTED OBJECTS OF TYPE TEXT AREA
  handleChange(e) {
    this.props.handler(e, this.props.nest);
  }

  returnTextInput() {
    return (
      <input
        //className={"category form-control" + ((this.props.hasError && this.state.style_text) ? " error " : " ") + this.props.size}
        className={this.state.style_text + " " + this.props.size}
        type="text"
        placeholder={this.props.required}
        id={this.props.id}
        value={this.props.value}
        disabled={this.props.disabled}
        required={this.props.required}
        onChange={this.handleChange}
        onFocus={this.turnOnFocus}
        onBlur={this.turnOffFocus}
      />
    );
  }

  returnTextArea() {
    return (
      <textarea
        rows={this.props.row}
        className={this.state.style_text}
        type="text"
        placeholder={this.props.required}
        required={this.props.required}
        id={this.props.id}
        disabled={this.props.disabled}
        value={this.props.value}
        onChange={this.handleChange}
        onFocus={this.turnOnFocus}
        onBlur={this.turnOffFocus}
      />
    );
  }

  turnOnFocus() {
    this.setState({
      style_text: "category form-control",
      style_title: "category",
      error_message: "off",
      focus: true
    });
    this.forceUpdate();
  }

  turnOffFocus() {
    if (this.props.hasError) {
      this.setState({
        style_text: "category form-control error",
        style_title: "category error",
        error_message: "on",
        focus: false
      });
    } else {
      this.setState({ focus: false });
    }
    this.forceUpdate();
  }

  render() {
    //console.log("RENDERED TEXTCOMPONENT");
    return (
      <div className="text-component no-gutters">
        <div className={"col-md-3 col-lg-2 d-inline-block " + (this.props.align_top ? "align-top" : "align-middle")}>
          <label htmlFor={this.props.id} className="label-title">
            <span className={this.state.style_title}>{this.props.title}</span>
          </label>
        </div>

        <div className="col-md-9 col-lg-10 align-middle d-inline-block">
          {this.props.type === "area" ? this.returnTextArea() : this.returnTextInput()}

          <div className={"error-message " + this.state.error_message}>{this.props.error_message}</div>
        </div>
      </div>
    );
  }
}

TextComponent.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.string,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error_message: PropTypes.string,
  size: PropTypes.string,
  row: PropTypes.number,
  nest: PropTypes.string,
  align_top: PropTypes.string,
  long: PropTypes.bool
};

export default TextComponent;
