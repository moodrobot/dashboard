import "core-js/es6/map";
import "core-js/es6/set";
import React from "react";
import PropTypes from "prop-types";

const SubHead = ({ title }) => (
  <div>
    <hr />
    <h2 className="title">{title}</h2>
  </div>
);

SubHead.propTypes = {
  title: PropTypes.string.isRequired
};

export default SubHead;
