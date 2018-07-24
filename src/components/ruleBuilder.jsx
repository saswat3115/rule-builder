import React from "react";
import RuleGroup from "./ruleGroup";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import _ from "lodash";
import { pruneEmpty } from "./../utility/validateJson";

export default class RuleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: this.props.data
    };

    this.handler = this.handler.bind(this);
  }

  handler(path, obj, isSet) {
    let mData = this.state.data;
    if (isSet) {
      _.set(mData, path, obj);
    } else {
      _.unset(mData, path);

      mData = pruneEmpty(mData);
    }

    this.setState({
      data: mData
    });
  }

  openPopup() {
    this.setState({
      showModal: true
    });
  }

  closePopup() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div>
        <div className="tree">
          <ul>
            <RuleGroup
              ischildGroup={false}
              data={this.state.data}
              action={this.handler}
              path="rules"
              index="1"
            />
          </ul>
        </div>
        <div className="get-rule">
          <DefaultButton primary onClick={this.openPopup.bind(this)}>
            get rule
          </DefaultButton>
        </div>

        <Modal
          isOpen={this.state.showModal}
          onDismiss={this.closePopup.bind(this)}
          isBlocking={false}
          containerClassName="ms-modalExample-container"
        >
          <div className="ms-modalExample-header">
            <span>JSON view</span>
            <span className="modal-close" onClick={this.closePopup.bind(this)}>
              x
            </span>
          </div>
          <div className="ms-modalExample-body">
            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
          </div>
        </Modal>
      </div>
    );
  }
}
