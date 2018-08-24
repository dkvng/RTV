import React, { Component } from "react";
import PlayButton from "./PlayButton";
import MuteButton from "./MuteButton";

export default class VideoControls extends Component {
  constructor(props) {
    super(props);
    this.video = this.props.video;
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  togglePlay() {
    if (this.video.paused || this.video.ended) this.video.play();
    else this.video.pause();
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
  }

  render() {
    return (
      <ul class="VideoControls">
        <PlayButton togglePlay={this.togglePlay}/>
        <MuteButton toggleMute={this.toggleMute} />
        <progress id="progress" value="0" min="0">
          <span id="progress-bar" />
        </progress>
      </ul>
    );
  }
}
