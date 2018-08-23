import React, { Component } from "react";

export default class VideoPlaylistItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item } = this.props;
    console.log(item.resources);
    let img;
    if (item.resources.length > 3) {
      return (
        <li className="VideoPlaylistItem">
          <img alt={item.title} src={item.resources[item.resources.length - 2].uri} />
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
    } else {
      return "";
    }
  }
}
