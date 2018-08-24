import React, { Component } from "react";
import PlayButton from "./PlayButton";
import MuteButton from "./MuteButton";

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

  formatDuration(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return String(minutes) + ":" + seconds;
  }

  render() {
    return (
      <ul className="VideoControls">
        <PlayButton video={this.props.video} />
        <MuteButton toggleMute={this.toggleMute} />
        <p>{this.formatDuration(this.state.currentTime)}</p>
        <progress id="progress" onClick={e => this.skipTo(e)} value="0" min="0">
          <span id="progress-bar" />
        </progress>
        <p>{this.formatDuration(this.state.duration)}</p>
      </ul>
    );
  }
}
