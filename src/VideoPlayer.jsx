import React, { Component } from "react";
import Hls from "hls.js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  playStream() {
    let { streamURI } = this.props;
    let video = document.getElementById("VideoPlayer-player");

    if (Hls.isSupported()) {
      let stream = new Hls();
      stream.loadSource(streamURI);
      stream.attachMedia(video);
      stream.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamURI;
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }

  }

  render() {
    console.log(this.props);

    this.props.streamURI !== "" ? this.playStream() : "";

    return (
      <div className="">
        <video id="VideoPlayer-player" />
      </div>
    );
  }
}

export default App;
