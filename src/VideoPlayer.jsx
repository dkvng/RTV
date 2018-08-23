import React, { Component } from "react";
import Hls from "hls.js";

import VideoPlaylist from "./VideoPlaylist";

export default class VideoPlayer extends Component {
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
    let { streamURI, items } = this.props;

    streamURI !== "" ? this.playStream() : "";

    return (
      <div className="">
        <video controls id="VideoPlayer-player" />
        {items.length > 0 ? <VideoPlaylist items={items} /> : ""}
      </div>
    );
  }
}
