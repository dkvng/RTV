import React, { Component } from "react";
import VideoPlaylistItem from "./VideoPlaylistItem";

export default class VideoPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSegment: 0
    };
    this.segments = this.props.items.filter(
      item =>
        item.type === "STORY" ||
        item.type === "CLOSER" ||
        item.type === "OPENER"
    );
  }

  componentDidMount() {
    let video = document.getElementById("VideoPlayer-player");

    let progressBar = document.querySelector("VideoPlaylist-progress");
    video.addEventListener("timeupdate", function() {
      // debugger
      // progressBar.style.width =
      //   Math.floor(video.currentTime / video.duration * 100) + "%";
    });
  }

  updateProgress(segments) {
    console.log("ok");
    debugger;
    segments.forEach((segment, idx) => {
      if (this.currentTime >= segment.startTime) {
        console.log(this.state);
        this.setState({
          currentSegment: idx
        });
      }
    });
  }

  displayPlaylistItems() {
    return this.segments.map((item, idx) => {
      return <VideoPlaylistItem key={idx} item={item} />;
    });
  }

  render() {
    let video = document.getElementById("VideoPlayer-player");
    let addProgress = this.addProgress;

    video.addEventListener("timeupdate", function() {
      if (this.currentTime >= 5 * 60) {
        // this.pause();
        debugger;
        console.log(this.currentTime);
      }
    });

    // let video = document.getElementById("VideoPlayer-player");


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
