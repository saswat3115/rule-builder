import React from "react";
import { ComboBox } from "office-ui-fabric-react/lib/ComboBox";
import { HttpClient } from '../services/httpClient';

export default class Model extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {
            value: this.props.val,
            path: this.props.path,
            options:[]
        }        
    }
    

    onChange(e) {
        this.setState({
            value: e.text
          }, () => {
            this.props.action(this.state.path, this.state.value);
          });  
    }

    componentDidMount() {
        let counter = 1;
        let options = [];
        new HttpClient().getModels().then(d => {
           d.models.forEach(k => {
              options.push({ key: counter, text: k});
              counter++;
           });
    
           this.setState({
             options: options
           });
        });
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
                    onChanged={this.onChange}          
                    />
                </div>
        );
    }
}