import React, { Component } from "react";
import Hls from "hls.js";

import VideoPlaylist from "./VideoPlaylist";
import VideoControls from "./VideoControls";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0
    };
  }

  playStream() {
    const { streamURI } = this.props;
    const video = document.getElementById("VideoPlayer-player");
    this.video = video;

    const videoControls = document.querySelector("VideoControls");
    debugger;

    if (Hls.isSupported()) {
      let stream = new Hls();
      stream.loadSource(streamURI);
      stream.attachMedia(video);
      stream.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
        video.controls = false;
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.controls = true;
      video.src = streamURI;
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }

    this.video.muted = true;

  }

  // componentDidMount() {
  //   if (this.video == null) {
  //     this.video = document.getElementById("VideoPlayer-player");
  //   }
  // }

  log() {
    // this.setState({
    //   currentTime: this.video.currentTime
    // });
    debugger;
    this.props.items.filter(
      item =>
        item.type === "STORY" ||
        item.type === "CLOSER" ||
        item.type === "OPENER"
    );
    // .forEach((item, idx) => {
    //   if (this.video.currentTime >= item.startTime) {
    //     console.log(this.state);
    //     this.setState({
    //       currentSegment: idx
    //     });
    //     console.log(this.state);
    //   }
    // });
  }

  render() {
    let { streamURI, items } = this.props;

    streamURI !== "" ? this.playStream() : "";

    return (
      <React.Fragment>
        <video
          id="VideoPlayer-player"
          onTimeUpdate={() => this.log()}
        />

        {items.length > 0 ? <VideoControls video={this.video} /> : ""}
        {items.length > 0 ? <VideoPlaylist items={items} /> : ""}
      </React.Fragment>
    );
  }
}
