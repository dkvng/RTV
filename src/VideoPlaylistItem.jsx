import React, { Component } from "react";

export default class VideoPlaylistItem extends Component {
  constructor(props) {
    super(props);
  }

  skipTo(time, item) {
    let video = document.getElementById("VideoPlayer-player");
    video.currentTime = time;
    video.poster = item.resources[item.resources.length - 2].uri;
  }

  render() {
    let { item } = this.props;
    console.log(item.resources);

    return (
      <li
        className="VideoPlaylistItem"
        onClick={() => this.skipTo(item.startTime, item)}
      >
        <img
          alt={item.title}
          src={item.resources[item.resources.length - 2].uri}
        />
        <p>
          {item.title}
          <span>
            time{" "}
            {item.edition !== "RENDOPENER" || item.edition !== "RENDCLOSER"
              ? item.displayCategory
              : ""}
          </span>
        </p>
      </li>
    );
  }
}
