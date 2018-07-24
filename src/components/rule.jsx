import React from "react";
import Model from "./model";
import Operator from "./operator";
import Attribute from "./attribute";
import Field from "./field";
import RuleToolbar from "./ruleToolbar";
import { HttpClient } from "../services/httpClient";

export default class Rule extends React.Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onRuleParamChange = this.onRuleParamChange.bind(this);

    this.state = {
      path: this.props.path,
      attributeOptions: {
        options: [],
        selected: this.props.rule.attribute,
        selectedModel: this.props.rule.model
      }
    };
  }

  onDelete() {
    this.props.action(this.state.path, null, false);
  }

  onRuleParamChange(path, data) {
    if (path.includes("model")) {
      let options = [];
      let counter = 0;
      new HttpClient().getAttribute(data).then(d => {
        Object.keys(d.Attributes).forEach(k => {
          options.push({ key: counter, text: k });
          counter++;
        });

        this.setState({
          attributeOptions: {
            options: options,
            selected: options[0].text,
            selectedModel: data
          }
        });
      });
    }
    this.props.action(path, data, true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.attributeOptions !== nextState.attributeOptions;
  }

  // onDrag(event) {
  //   console.log(event);
  //   event.dataTransfer.setData("text/plain", JSON.stringify(this.props.rule));
  // }

  render() {
    return (
      <li>
        <a>
          <div>
            <RuleToolbar
              action={this.onDelete}
              // onDragStart={this.onDrag.bind(this)}
            />

            <div className="rule-body">
              <Model
                val={this.props.rule.model}
                path={this.state.path + ".model"}
                action={this.onRuleParamChange}
              />
              <Attribute
                path={this.state.path + ".attribute"}
                action={this.onRuleParamChange}
                options={this.state.attributeOptions}
              />
              <Operator
                val={this.props.rule.op}
                path={this.state.path + ".op"}
                action={this.onRuleParamChange}
              />
              <Field
                val={this.props.rule.value}
                path={this.state.path + ".value"}
                action={this.onRuleParamChange}
              />
            </div>
          </div>
        </a>
      </li>
    );
  }
}
