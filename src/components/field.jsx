import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.val            
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {        
        this.setState({
            text: e
        }, () => {
            this.props.action(this.props.path, this.state.text);
        })
    }

    render() {
        return (            
            <div>
                <TextField  
                    value={this.state.text} 
                    onChanged={this.handleChange}                     
                    placeholder="enter value" 
                    />
            </div>
        );
    }
}