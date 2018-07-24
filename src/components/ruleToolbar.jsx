import React, { Component } from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export default class RuleToolbar extends Component {
  render() {
    return (
      <div
        className="div-toolbar-container"
        // draggable
        // onDragStart={this.props.onDragStart}
      >
        <div className="div-toolbar">
          <Icon
            onClick={this.props.action.bind(this)}
            iconName="Delete"
            className="btn-delete"
            title="Delete rule"
          />
        </div>
      </div>
    );
  }
}
