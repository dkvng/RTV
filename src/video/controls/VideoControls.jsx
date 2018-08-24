import React, { Component } from "react";
import PlayButton from "./PlayButton";
import MuteButton from "./MuteButton";

import * as Util from "../util";

export default class VideoControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      currentTime: 0
    };
    this.video = this.props.video;
    this.toggleMute = this.toggleMute.bind(this);
    this.progress = document.querySelector("progress");
    this.progressBar = document.querySelector("progress-bar");
  }

  componentDidMount() {
    this.video.addEventListener("timeupdate", function() {
      let progress = document.querySelector("progress");
      let progressBar = document.querySelector("#progress-bar");
      let playlistProgress = document.querySelector(".VideoPlaylist-progress");

      if (!progress.getAttribute("max"))
        progress.setAttribute("max", this.duration);
      progress.value = this.currentTime;

      progressBar.style = {
        width: Math.floor(this.currentTime / this.duration * 100) + "%"
      };
    });
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
  }

  skipTo(e) {
    var pos = (e.pageX - e.target.offsetLeft) / e.target.offsetWidth;
    this.video.currentTime = pos * this.video.duration;
  }

  render() {
    return (
      <ul className="VideoControls">
        <PlayButton video={this.props.video} />
        <MuteButton toggleMute={this.toggleMute} />
        <p>{Util.formatDuration(this.state.currentTime)}</p>
        <progress id="progress" onClick={e => this.skipTo(e)} value="0" min="0">
          <span id="progress-bar" />
        </progress>
        <p>{Util.formatDuration(this.state.duration)}</p>
      </ul>
    );
  }
}
