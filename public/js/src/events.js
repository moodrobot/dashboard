let api = {
  /**
   * parse an event name like "idz_node_blog_publish" - documentation on
   * format at https://github.com/intel-idz/points-server/wiki/Event-naming
   * @method
   * @param  {string} eventName [description]
   * @return {object}           An object with all the parts, returns false on invalid event name
   */
  parseEventName: function(eventName) {
    let retval = {
      application: null,
      type: null,
      subtype: null,
      action: null
    };

    let splits = eventName.split("_");

    switch (splits.length) {
      case 4:
        retval.application = splits[0];
        retval.type = splits[1];
        retval.subtype = splits[2];
        retval.action = splits[3];
        break;
      case 3:
        retval.application = splits[0];
        retval.type = splits[1];
        retval.action = splits[2];
        break;
      default:
        // invalid event name, return false
        return false;
    }

    return retval;
  },

  /**
   * find a nice name to use for the front end for the type of point event
   * @param  {string} eventName the event name
   * @return {string}           the nice event name
   */
  translateEventName: function(eventName) {
    let eventObj = this.parseEventName(eventName);
    // console.log("eventObj:", eventObj);

    if (eventObj.subtype === null) {
      eventObj.subtype = "";
    }

    // bail with blank name false
    if (eventObj === false) {
      return "";
    }

    switch (eventObj.application) {
      case "admin":
        return "admin";

      case "legacy": {
        if (eventObj.type == "apps") {
          return "app";
        }

        // legacy comments
        if (
          eventObj.type.indexOf("userpoints-nc-comment") > -1 ||
          eventObj.subtype.indexOf("userpoints-nc-comment") > -1 ||
          eventObj.action.indexOf("userpoints-nc-comment") > -1
        ) {
          return "comment";
        }

        // legacy flag
        if (
          eventObj.type.indexOf("flag") > -1 ||
          eventObj.subtype.indexOf("flag") > -1 ||
          eventObj.action.indexOf("flag") > -1
        ) {
          return "flag";
        }

        // legacy article
        if (
          eventObj.type.indexOf("userpoints-nc-node-") > -1 ||
          eventObj.subtype.indexOf("userpoints-nc-node-") > -1 ||
          eventObj.action.indexOf("userpoints-nc-node-") > -1
        ) {
          return "article";
        }

        // legacy admin points
        if (
          eventObj.type.indexOf("admin") > -1 ||
          eventObj.subtype.indexOf("admin") > -1 ||
          eventObj.action.indexOf("admin") > -1
        ) {
          return "admin";
        }

        if (eventObj.type == "null") {
          return "admin";
        }

        let foundNiceName = false;
        Object.keys(eventObj)
          .map(function(k) {
            return eventObj[k];
          })
          .forEach(function(v) {
            let adminTests = [
              "userpoints-inverse-",
              "userpoints-txns",
              "userpoints-incorrect-",
              "userpoints-rollback-",
              "userpoints-intel-discretionary-points",
              "discretionary-points"
            ];
            adminTests.forEach(function(a) {
              // console.log("a:", a);
              if (v.indexOf(a) > -1) {
                foundNiceName = true;
              }
            });
          });

        if (foundNiceName) {
          return "admin";
        }

        if (
          eventObj.type.indexOf("userpoints") > -1 ||
          eventObj.subtype.indexOf("userpoints") > -1 ||
          eventObj.action.indexOf("userpoints") > -1
        ) {
          return "admin";
        }
        break;
      }

      default:
        // eslint-disable-line no-fallthrough
        if (eventObj.application == "admin" || eventObj.type == "admin" || eventObj.subtype == "admin") {
          return "admin";
        }

        switch (eventObj.type) {
          case "comment": {
            if (eventObj.subtype == "flag") {
              return "flag";
            }
            return "comment";
          }
          case "node": {
            if (eventObj.subtype == "forum") {
              return "forum";
            }
            if (eventObj.subtype == "article") {
              return "article";
            }
            if (eventObj.subtype == "blog") {
              return "blog";
            }
            if (eventObj.subtype == "courseware") {
              return "courseware";
            }
            if (eventObj.subtype == "windows-project") {
              return "project";
            }
          }
          default: // eslint-disable-line no-fallthrough
        }

        break;
    }

    return eventName;
  },

  /**
   * decorate a list of events/contributions with links to that contributions
   * @param  {[type]} events [description]
   * @return {[type]}        [description]
   */
  decorateLinks: function(events) {
    let self = this;
    let ids = {};
    let unlinkedIds = {}; // double up to avoid using _.cloneDeep() client side
    events.map(function(e) {
      e.parsedEvent = self.parseEventName(e.event_name);
      if (ids[e.entity_id]) {
        ids[e.entity_id].push(e.parsedEvent.action);
        unlinkedIds[e.entity_id].push(e.parsedEvent.action);
      } else {
        ids[e.entity_id] = [e.parsedEvent.action];
        unlinkedIds[e.entity_id] = [e.parsedEvent.action];
      }
      return e;
    });

    events.map(function(e) {
      switch (unlinkedIds[e.entity_id][0]) {
        case "unpublish":
          e.linkText = e.description;
          e.linkUrl = false;
          break;
        default:
          e.linkText = e.description;
          e.linkUrl = e.url;
          break;
      }

      // console.log("e:", e);
      if (e.linkUrl === false) {
        switch (ids[e.entity_id][0]) {
          case "unpublish":
            e.unpublished = true;
            break;
          default:
            e.unpublished = false;
            break;
        }
        ids[e.entity_id].shift();
      }

      if (e.parsedEvent.application === "admin") {
        e.linkUrl = false;
      }

      return e;
    });

    return events;
  }
};

module.exports = api;
