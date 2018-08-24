import React, { Component } from "react";
import * as Util from "./util";

export default class VideoPlaylistItem extends Component {
  constructor(props) {
    super(props);
  }

  skipTo(e, time, item) {
    this.props.updateSegment(e);
    let video = document.getElementById("VideoPlayer-player");
    video.currentTime = time;
    video.poster = item.resources[item.resources.length - 2].uri;
  }



  render() {
    let { item } = this.props;
    let classes = "VideoPlaylistItem";
    if (this.props.selected) {
      classes += " selected";
    }

    return (
      <li
        className={classes}
        onClick={e => this.skipTo(e, item.startTime, item)}
        value={this.props.value}
      >
      <div className="marker"></div>
        <img
          alt={item.title}
          src={item.resources[item.resources.length - 2].uri}
        />
        <p>
          {item.title}
          <span>
            {Util.formatDuration(item.duration)}{" "}
            {item.edition !== "RENDOPENER" || item.edition !== "RENDCLOSER"
              ? item.displayCategory
              : ""}
          </span>
        </p>
      </li>
    );
  }
}
