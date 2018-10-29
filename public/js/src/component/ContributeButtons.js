import "core-js/es6/map";
import "core-js/es6/set";
import React from "react";
import PropTypes from "prop-types";

const ContributeButtons = ({ currentLanguage, addArticle, addBlog, addForum, viewContributions, idzUserId }) => (
  <span>
    <a href={"/" + currentLanguage.toLowerCase() + "/node/add/article"} className="btn btn-secondary btn-margin-bottom">
      {addArticle}
    </a>
    <a href={"/" + currentLanguage.toLowerCase() + "/node/add/blog"} className="btn btn-secondary btn-margin-bottom">
      {addBlog}
    </a>
    <a href={"/" + currentLanguage.toLowerCase() + "/node/add/forum"} className="btn btn-secondary btn-margin-bottom">
      {addForum}
    </a>
    <a href={"/" + currentLanguage.toLowerCase() + "/user/" + idzUserId + "/recognitions-contributions"} className="btn btn-primary btn-margin-bottom">
      {viewContributions}
    </a>
  </span>
);

ContributeButtons.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  addArticle: PropTypes.string.isRequired,
  addBlog: PropTypes.string.isRequired,
  addForum: PropTypes.string.isRequired,
  viewContributions: PropTypes.string.isRequired,
  idzUserId: PropTypes.string.isRequired
};

export default ContributeButtons;
