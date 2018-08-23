import React, { Component } from "react";
import "./Video.css";
import VideoPlayer from "./VideoPlayer";

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamURI: "",
      playlist: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://mole.prod.reuters.tv/rest/v2/website/content/reutersnow/region/US/country/USA/duration/10"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          streamURI: data.entity.stream.uri
        });
      });
  }

  render() {
    return (
      <div className="Video">
        <VideoPlayer streamURI={this.state.streamURI} />
      </div>
    );
  }
}

export default Video;
