import React, { Component } from "react";

export default class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false
    };
  }

  handleClick() {
    this.props.togglePlay();
    this.setState({
      play: !this.state.play
    });
  }

  render() {
    let icon;
    if (this.state.play) {
      icon = "&#9658";
    }
    return (
      <li id="playpause" onClick={() => this.handleClick()}>
        {this.state.play ? (
          <i class="material-icons">play_arrow</i>
        ) : (
          <i class="material-icons">pause</i>
        )}
      </li>
    );
  }
}
