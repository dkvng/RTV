import React, { Component } from "react";
import VideoPlaylistItem from "./VideoPlaylistItem";

export default class VideoPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSegment: this.props.currentSegment
    };
    this.segments = this.props.items.filter(
      item =>
        item.type === "STORY" ||
        item.type === "CLOSER" ||
        item.type === "OPENER"
    );
    this.updateSegment = this.updateSegment.bind(this);
  }

  displayPlaylistItems() {
    return this.segments.map((item, idx) => {
      return (
        <VideoPlaylistItem
          key={idx}
          item={item}
          value={idx}
          selected={idx === this.state.currentSegment ? true : false}
          updateSegment={this.updateSegment}
        />
      );
    });
  }

  updateSegment(e) {
    this.setState({
      currentSegment: e.currentTarget.value
    });
  }

  render() {
    let progressStyle = {
      top: this.state.currentSegment * 1 / this.segments.length * 100 + "%",
      height: 1 / this.segments.length * 100 + "%"
    };

    return (
      <ul className="VideoPlaylist">
        <div style={progressStyle} className="VideoPlaylist-progress" />
        <p key={999}>Playlist</p>
        {this.displayPlaylistItems()}
      </ul>
    );
  }
}
