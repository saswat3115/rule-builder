import React from 'react';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';

export default class Operator extends React.Component {
    constructor(props) {
        super(props);
        this.onchange = this.onchange.bind(this);
        this.state = {
            value: this.props.val            
        }
    }

    onchange(e) {
        this.setState({
            value: e.text
        },() => {
            this.props.action(this.props.path, this.state.value);
          })
    }

    render() {       
        const _testOptions = [            
            { key: '1', text: 'EQUALS' },
            { key: '2', text: 'GREATER' },
            { key: '3', text: 'LESSER' },
            { key: '4', text: 'IN'},
            { key: '5', text: 'NOT IN'},
            { key: '6', text: 'STARTS WITH'},
            { key: '7', text: 'END WITH'}
          ];

        return (            
            <div className="ms-ComboBoxBasicExample">               
                <ComboBox                    
                    //defaultSelectedKey={['1']}
                    text={this.state.value}                    
                    label=""                    
                    ariaLabel="Basic ComboBox example"
                    allowFreeform={true}
                    autoComplete="on"
                    options={_testOptions}                    
                    // tslint:disable:jsx-no-lambda                    
                    onChanged={this.onchange}                    
                    // tslint:enable:jsx-no-lambda
                    />
            </div>
        );
    }
}