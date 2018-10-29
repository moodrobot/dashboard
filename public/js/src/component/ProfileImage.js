import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import ProfileImageButton from "./ProfileImageButton";

class ProfileImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uploadLoader: "off",
      removeLoader: "off",
      message: "",
      chosen_image: ""
    };

    this.chosen_image = "";
    this.handleClick = this.handleClick.bind(this);
    this.dispatchFileUpload = this.dispatchFileUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.dispatchFileRemove = this.dispatchFileRemove.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    // if the incoming profile image isn't in the default list then the chosen image will be the profile iamge
    // triggered on file upload
    if (nextProps.default_images.images.filter((e) => { return (e === nextProps.profile_image); }).length === 0)
    {
      //this.chosen_image = nextProps.profile_image;
      return { uploadLoader: "off", removeLoader: "off", message: "", chosen_image: nextProps.profile_image };
    } else {
      return null;
    }
  }

  handleClick(event) {
    // sets for the Dashboard state as a whole
    this.props.setProfileImage(event.target.value);
  }

  dispatchFileRemove() {
    this.props.setProfileImage("");
    this.setState({ removeLoader: "on" });
    document.getElementById("profileImageUpload").reset();
    //this.props.setActiveImage("");
  }

  dispatchFileUpload(e) {
    //console.log("DISPATCHING UPLOAD");
    document.getElementById("file").value = "";
    e.preventDefault();
    
    var event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });

    document.getElementById("file").dispatchEvent(event);
  }

  handleUpload(event) {
    //console.log("HANDLING UPLOAD:", event);
    this.props.freezeInput(true);
    this.setState({ uploadLoader: "on" });
    let msg = "";

    let self = this; // so this can get inside the then;
    let data = new FormData();
    data.append("image", event.target.files[0]);

    let postConfig = {
      method: "POST",
      url: "/dashboard/api/saveProfileImage",
      data: data
    };

    axios
      .request(postConfig)
      .then(function(res) {
        //console.log("SETTING PROFILE IMAGE ", res.data);
        self.props.setProfileImage(res.data.url);
        //UPDATE THUMBNAIL
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          msg = "Only Accepts Image Files";
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          msg = "";
        } else {
          // Something happened in setting up the request that triggered an Error
          msg = "Houston - We Have an Error!";
        }
        //console.log(error.config);
        this.setState({ uploadLoader: "off", message: msg });
        this.props.freezeInput(false);
      });
  }

  componentDidMount() {
    document.getElementById("file").addEventListener("change", this.handleUpload, false);
  }

  imageButtons(images, chosen_image) {
    let retval = [];
    images.map(img => {
      retval.push(<ProfileImageButton image={img} checked={chosen_image === img} handleClick={this.handleClick} key={img} />);
    });
    return retval;
  }

  render() {
    const images = this.props.default_images.images.concat([this.state.chosen_image]);

    return (
      <div className="row bottom-margin-lg">
        <div className="col-auto profileImage">
          {/*<span className="icon-upload-lg" />*/}
          <img
            className="icon-upload-lg"
            src={this.props.profile_image ? this.props.profile_image : "images/upload-icon.png"}
          />
        </div>
        <div className="col">
          {this.imageButtons(images, this.props.profile_image)}
          <div>
            <p>{this.props.recommendedSize}</p>

            <form id="profileImageUpload" action="/dashboard/api/saveProfileImage">
              <div className="row no-gutters">
                <button type="button" className="btn btn-primary proxyBtn" onClick={this.dispatchFileUpload}>
                  <div className="btn-loader">
                    <img className={"btn-loader-sm " + this.state.uploadLoader} src="images/loader.gif" />
                  </div>
                  {this.props.upload}
                </button>
                <button type="button" className="btn btn-primary" onClick={this.dispatchFileRemove}>
                  <div className="btn-loader">
                    <img className={"btn-loader-sm " + this.state.removeLoader} src="images/loader.gif" />
                  </div>
                  {this.props.remove}
                </button>
                <input type="file" name="image" className="hiddenBtn" id="file" />
              </div>
            </form>

            <div className="error-message">{this.state.message}</div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileImage.propTypes = {
  profile_image: PropTypes.string,
  remove: PropTypes.string.isRequired,
  freezeInput: PropTypes.func,
  upload: PropTypes.string.isRequired,
  setProfileImage: PropTypes.func.isRequired,
  default_images: PropTypes.object.isRequired,
  recommendedSize: PropTypes.string
};

export default ProfileImage;
