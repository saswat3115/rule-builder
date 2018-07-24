import React from "react";
import Rule from "./rule";
import { colorLuminance } from "../utility/rgb";
import CollapsedRule from "./collapsedRule";
import GroupToolbar from "./groupToolbar";
import CondtionSlider from "./conditionSlider";
import GroupFooter from "./groupFooter";

const BASE_SHADE = "F7F7F7";
const DEFAULT_RULE = {
  model: "Patient",
  attribute: "PatientName",
  op: "EQUALS",
  value: ""
};

export default class RuleGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conditionIndex: this.props.data.condition === "AND" ? 0 : 1,
      ruleList: this.constructRuleList(this.props.data.rules),
      path: this.props.path,
      isCollapsed: false
    };

    this.onAction = this.onAction.bind(this);
    this.handler = this.handler.bind(this);
  }

  constructRuleList(rulelist) {
    if (rulelist) {
      let rules = [];
      let counter = 0;

      rulelist.forEach(rule => {
        if (!("condition" in rule)) {
          rules.push({ rule: rule, key: counter, isGroup: false });
        } else {
          rules.push({ rule: rule, key: counter, isGroup: true });
        }
        counter++;
      });
      return rules;
    } else {
      return [];
    }
  }

  isSingleRule(rules) {
    return rules && rules.length > 1;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      conditionIndex: nextProps.data.condition === "AND" ? 0 : 1,
      ruleList: this.constructRuleList(nextProps.data.rules),
      path: nextProps.path
    });
  }

  handleSlideChange(slideIndex) {
    let thisPath = this.slicePath(this.state.path);
    thisPath = this.props.ischildGroup ? thisPath + ".condition" : "condition";
    this.onAction(thisPath, slideIndex === 1 ? "OR" : "AND", true);
  }

  addRule(ruleData) {
    this.onAction(
      this.state.path + "[" + this.state.ruleList.length + "]",
      ruleData,
      true
    );

    if (this.state.isCollapsed) {
      this.setState({
        isCollapsed: false
      });
    }
  }

  addRuleGroup() {
    let ruleGroupData = {
      condition: "AND",
      rules: [DEFAULT_RULE, DEFAULT_RULE]
    };
    this.onAction(
      this.state.path + "[" + this.state.ruleList.length + "]",
      ruleGroupData,
      true
    );

    if (this.state.isCollapsed) {
      this.setState({
        isCollapsed: false
      });
    }
  }

  onAction(path, data, isSet) {
    this.props.action(path, data, isSet);
  }

  onDelete() {
    //slicing ".rules" from path
    this.onAction(
      this.state.path.slice(0, this.state.path.length - 6),
      null,
      false
    );
  }

  slicePath(path) {
    return path.slice(0, path.length - 6);
  }

  handler(path, obj, isSet) {
    this.onAction(path, obj, isSet);
  }

  toggleCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  onDrop(event) {
    let json = event.dataTransfer.getData("text/plain");
    this.addRule(JSON.parse(event.dataTransfer.getData("text/plain")));
  }

  onDragOver(e) {
    e.preventDefault();
  }

  render() {
    return (
      <li>
        <ul
          style={{
            backgroundColor: colorLuminance(
              BASE_SHADE,
              parseInt(this.props.index, 10)
            )
          }}
        >
          <li>
            <a              
              // onDrop={this.onDrop.bind(this)}
              // onDragOver={this.onDragOver.bind(this)}
            >
              <GroupToolbar
                ischildGroup={this.props.ischildGroup}
                isMergable={this.props.isMergable}
                deleteAction={this.onDelete.bind(this)}
                toggleCollapse={this.toggleCollapse.bind(this)}
              />
              <CondtionSlider
                conditionIndex={this.state.conditionIndex}
                onChange={this.handleSlideChange.bind(this)}
              />
              <GroupFooter
                onAddRule={this.addRule.bind(this, DEFAULT_RULE)}
                onAddGroup={this.addRuleGroup.bind(this)}
              />
            </a>
            <ul>
              {this.state.isCollapsed ? (
                <CollapsedRule ruleCount={this.state.ruleList.length} />
              ) : (
                this.state.ruleList.map(r => {
                  let pathindex = this.state.path + "[" + r.key + "]";
                  return r.isGroup ? (
                    <RuleGroup
                      data={r.rule}
                      key={r.key}
                      ischildGroup
                      isMergable={
                        r.rule.rules ? r.rule.rules.length === 1 : true
                      }
                      path={pathindex + ".rules"}
                      action={this.handler}
                      index={parseInt(this.props.index, 10) + 1}
                    />
                  ) : (
                    <Rule
                      rule={r.rule}
                      key={r.key}
                      path={pathindex}
                      action={this.handler}
                    />
                  );
                })
              )}
            </ul>
          </li>
        </ul>
      </li>
    );
  }
}
