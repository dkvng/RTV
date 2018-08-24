import React, { Component } from "react";

export default class MuteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: true
    };
  }

  handleClick() {
    this.props.toggleMute();
    this.setState({
      muted: !this.state.muted
    });
  }

  render() {
    let icon;
    if (this.state.muted) {
      icon = "&#9658";
    }
    return (
      <li id="mute" onClick={() => this.handleClick()}>
        {this.state.muted ? (
          <i class="material-icons">volume_off</i>
        ) : (
          <i class="material-icons">volume_up</i>
        )}
      </li>
    );
  }
}
