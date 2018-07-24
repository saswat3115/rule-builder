import React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class CollapsedRule extends React.Component {

    render() {
        return(
            <li>
                <a>
                    <div className="rule-body">
                        <Icon iconName="CollapseMenu" />
                        <div className="collapse-content">
                            {this.props.ruleCount} rule(s) collapsed!
                        </div>                        
                    </div>
                </a>
            </li>
        );
    }
}