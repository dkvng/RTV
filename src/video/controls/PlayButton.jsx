import React, { Component } from "react";

export default class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false
    };

    this.video = this.props.video;
  }

  togglePlay() {
    if (this.video.paused || this.video.ended) {
      this.video.play();
      this.setState({
        play: false
      });
    } else {
      this.video.pause();
      this.setState({
        play: true
      });
    }
  }

  render() {
    return (
      <li id="playpause" onClick={() => this.togglePlay()}>
        {this.state.play ? (
          <i className="material-icons">play_arrow</i>
        ) : (
          <i className="material-icons">pause</i>
        )}
      </li>
    );
  }
}
