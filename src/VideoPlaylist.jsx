import React, { Component } from "react";
import VideoPlaylistItem from "./VideoPlaylistItem";

export default class VideoPlaylist extends Component {
  constructor(props) {
    super(props);
  }

  displayPlaylistItems() {
    return this.props.items.map((item, idx) => {
      return <VideoPlaylistItem key={idx} item={item} />;
    });
  }

  render() {
    return <ul className="">{this.displayPlaylistItems()}</ul>;
  }
}
