import React, { Component } from "react";
import "./Video.css";
import VideoPlayer from "./VideoPlayer";

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamURI: "",
      items: []
    };
  }

  componentDidMount() {
    fetch(
      "https://mole.prod.reuters.tv/rest/v2/website/content/reutersnow/region/US/country/USA/duration/10"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          streamURI: data.entity.stream.uri,
          items: data.entity.items
        });
      });
  }

  render() {
    return (
      <section className="Video">
        <VideoPlayer streamURI={this.state.streamURI} items={this.state.items} />
      </section>
    );
  }
}

export default Video;
