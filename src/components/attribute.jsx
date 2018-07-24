import React from "react";
import { ComboBox } from "office-ui-fabric-react/lib/ComboBox";
import { HttpClient } from '../services/httpClient';

export default class Attribute extends React.Component {
  constructor(props) {
    super(props);    
    
    this.onchange = this.onchange.bind(this);
    this.state = {
      value: this.props.options.selected,
      path: this.props.path,
      options: this.props.options.options,
      selectedModel: this.props.options.selectedModel
    };
  }

  onchange(e) {
    this.setState({
      value: e.text
    }, () => {
      this.props.action(this.state.path, this.state.value);
    });    
  }

  componentDidMount() {
    if(!this.state.options.options) {
      let counter = 1;
      let options = [];
      new HttpClient().getAttribute(this.state.selectedModel).then(d => {
         Object.keys(d.Attributes).forEach(k => {
            options.push({ key: counter, text: k});
            counter++;
         });
  
         this.setState({
           options: options
         });
      });
    }    
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.options !== nextProps.options) {
        this.setState({
          options: nextProps.options.options,
          value: nextProps.options.selected,
          selectedModel: nextProps.options.selectedModel
        }, () => {
          this.props.action(this.state.path, this.state.value);
        });
    }
  }

  render() {
    return (
      <div className="ms-ComboBoxBasicExample">
        <ComboBox          
          text={this.state.value}
          ariaLabel="Basic ComboBox example"
          allowFreeform={true}
          autoComplete="on"
          options={this.state.options}
          // tslint:disable:jsx-no-lambda
          onChanged={this.onchange}
          // tslint:enable:jsx-no-lambda
        />
      </div>
    );
  }
}
