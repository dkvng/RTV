import React, { Component } from "react";
import Hls from "hls.js";

import VideoPlaylist from "./VideoPlaylist";
import VideoControls from "./controls/VideoControls";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      currentSegment: 0
    };
  }

  playStream() {
    const { streamURI } = this.props;
    const video = document.getElementById("VideoPlayer-player");
    this.video = video;

    const videoControls = document.querySelector("VideoControls");

    if (Hls.isSupported()) {
      let stream = new Hls();
      stream.loadSource(streamURI);
      stream.attachMedia(video);
      stream.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
        video.controls = false;
      });
      stream.subtitleTrackController.subtitleDisplay = false;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      videoControls.style = { display: "none" };
      video.controls = true;
      video.src = streamURI;
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }
    this.video.muted = true;
    for (let i = 0; i < this.video.textTracks.length; i++) {
      this.video.textTracks[i].mode = "hidden";
    }
  }

  trackSegment() {
    let i = 0;
    while (i < this.segments.length) {
      if (
        this.refs.playlist.state.currentSegment !== i &&
        this.video.currentTime > this.segments[i].startTime &&
        this.video.currentTime <
          this.segments[i].startTime + this.segments[i].duration
      ) {
        this.refs.playlist.setState({ currentSegment: i });
        break;
      }
      i += 1;
    }
  }

  render() {
    let { streamURI, items } = this.props;

    this.segments = items.filter(
      item =>
        item.type === "STORY" ||
        item.type === "CLOSER" ||
        item.type === "OPENER"
    );

    streamURI !== "" ? this.playStream() : "";

    return (
      <React.Fragment>
        <video
          id="VideoPlayer-player"
          onTimeUpdate={() => this.trackSegment()}
        />

        {items.length > 0 ? <VideoControls video={this.video} /> : ""}
        {items.length > 0 ? (
          <VideoPlaylist
            currentSegment={this.state.currentSegment}
            ref="playlist"
            items={items}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
