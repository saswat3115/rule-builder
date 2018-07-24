import React, { Component } from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export default class GroupToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false
    };
  }

  toggleCollapse() {
    this.setState(
      {
        isCollapsed: !this.state.isCollapsed
      },
      this.props.toggleCollapse()
    );
  }

  render() {
    return (
      <div className="div-GroupToolbar-container">
        <div className="div-GroupToolbar">
          {this.props.isMergable ? (
            <Icon
              iconName="Merge"
              className="btn-Merge"
              title="Merge rule group"
            />
          ) : null}

          <Icon
            iconName={
              this.state.isCollapsed ? "CaretUpSolid8" : "CaretDownSolid8"
            }
            className="btn-expand"
            title={this.state.isCollapsed ? "expand rules" : "collapse rules"}
            onClick={this.toggleCollapse.bind(this)}
          />
          {this.props.ischildGroup ? (
            <Icon
              onClick={this.props.deleteAction.bind(this)}
              iconName="Delete"
              className="btn-delete"
              title="Delete rule-group"
            />
          ) : null}
        </div>
      </div>
    );
  }
}
