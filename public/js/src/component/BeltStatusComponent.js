import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";

class BeltStatusComponent extends PureComponent {
  constructor(props) {
    super(props);
  }

  nextBeltPoints() {
    let next_belt_points = null;

    switch (this.props.belt) {
      case "":
        next_belt_points = 50;
        break;
      case "green":
        next_belt_points = 500;
        break;
      case "brown":
        next_belt_points = 5000;
        break;
      default:
        next_belt_points = 0;
    }

    return next_belt_points;
  }

  render() {
    //console.log("RENDERED BELT COMPONENT");
    const T = this.props.translate;

    return (
      <div className="row no-gutters">
        <div className="col-md-3 col-lg-2">
          {this.props.belt != "" && <span className={"icon-belt " + this.props.belt} />}
        </div>
        <div className="col-md-9 col-lg-10 vtop">
          <p className="title">
            {T["status-" + this.props.belt]}
            <br />
            {renderHTML(T["information"])}
          </p>

          <p className="title">{T["points-activity"]}</p>
          <p>
            <span>{T["status-title"]}</span>{" "}
            {parseInt(this.props.points, 10).toLocaleString(this.props.currentLanguage)}
          </p>
          <p>
            <span>{T["total-title"]}</span>{" "}
            {parseInt(this.props.total_points, 10).toLocaleString(this.props.currentLanguage)}
          </p>
          <p>
            {this.nextBeltPoints() > 0 && (
              <span>
                {T["next-belt-level-" + this.props.belt + "-title"]}
                {" " + parseInt(this.nextBeltPoints(), 10).toLocaleString(this.props.currentLanguage)}
                {" " + T["next-belt-level-points"]}
              </span>
            )}
          </p>
        </div>
      </div>
    );
  }
}

BeltStatusComponent.propTypes = {
  translate: PropTypes.object,
  currentLanguage: PropTypes.string,
  belt: PropTypes.string,
  points: PropTypes.string,
  total_points: PropTypes.string
};

export default BeltStatusComponent;
