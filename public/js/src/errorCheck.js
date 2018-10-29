/**IMPORT ERROR CHECKING TOOLS */
import DOMPurify from "dompurify";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";
import isAlphanumeric from "validator/lib/isAlphanumeric";

const allowedTags = [ "a", "b", "blockquote", "br", "em", "i", "img", "li", "ol", "p", "pre", "s", "strong", "sub", "sup", "ul" ];

let api = {
  /**
    * check text components for proper formatting and valid html before sending
    * to the server for more cleaning - 2x security layer for xss hacks, etc.
    * @method
    * @param  {string} eventName [description]
    * @return {object}           returns false on invalid user input
    */

  findErrorInComponents: function() {
    //return element === true;
    const err = Object.values(this.componentHasError).find(
      item => item.flag === true
    );
    //console.log("ERROR LIST ", temp);
    return err;
  },

  /**
   * sanitize a string
   * @param  {string} string         the string to sanitize
   * @param  {boolean} reniveAllTags if true remove ALL tags
   * @return {object}                { sanitized: <the sanitized string>, removed: <array of removed things> }
   */
  sanitize: function(string, removeAllTags) {
    let options = {
      ALLOWED_TAGS: allowedTags
    };

    // remove all tags?
    if (removeAllTags === true) {
      options.ALLOWED_TAGS = [];
    }

    return {
      sanitized: DOMPurify.sanitize(string, options),
      removed: DOMPurify.removed
    };
  },

  /**
   * [description]
   * @param  {[type]} string [description]
   * @return {[type]}        [description]
   */
  hasAllowedTags: function(string) {
    let test = this.sanitize(string);
    if (test.removed.length === 0 || // no tags removed
        (test.removed.length === 1   // one tag removed - make sure is the "implied" body tag
        && test.removed[0].element
        && test.removed[0].element.tagName == "BODY")) {
      return true;
    }
    // more than one tag removed
    return false;
  },

  hasTags: function(string) {
    let test = this.sanitize(string, true);
    if (test.removed.length === 0 || // no tags removed
        (test.removed.length === 1   // one tag removed - make sure is the "implied" body tag
        && test.removed[0].element
        && test.removed[0].element.tagName == "BODY")) {
      return false;
    }
    return true;
  },

  checkForErrors: function(checkProps) {
    let value = checkProps.value.trim();

    // required
    if (checkProps.required && value === "") {
      return { flag: true, message: "required" };
    }

    // if isn't required and is empty, just return
    if (!checkProps.required && value === "") {
      return { flag: false, message: "" };
    }

    if (checkProps.id !== "bio" && this.hasTags(value) ) {
      return { flag: true, message: "noHTML" };
    }

    switch (checkProps.id) {
      case "bio":
        if (!this.hasAllowedTags(value)) {
          return { flag: true, message: "someHTML" };
        }
        break;
      case "email":
        if (!isEmail(value)) {
          return { flag: true, message: "email" };
        }
        break;
      case "twitter":
        checkProps.value = value.replace("https://twitter.com/", "");
        if (!/^[a-z0-9_]{1,15}$/i.test(checkProps.value)) {
          return { flag: true, message: "twitter" };
        }
        break;
      case "github":
        checkProps.value = value.replace("https://github.com/", "");
        if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(checkProps.value)) {
          return { flag: true, message: "github" };
        }
        break;
      case "developer-mesh":
        checkProps.value = value.replace("https://devmesh.intel.com/users/", "" );
        if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(checkProps.value)) {
          return { flag: true, message: "devmesh" };
        }
        break;
      case "website":
        if (!isURL(value, { require_protocol: true })) {
          return { flag: true, message: "url" };
        }
        break;
    }

    return { flag: false, message: "" };
  }

};

module.exports = api;
