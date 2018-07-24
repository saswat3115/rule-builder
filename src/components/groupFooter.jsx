import React from 'react';
import { Icon } from "office-ui-fabric-react/lib/Icon";

export default class GroupFooter extends React.Component {

    render() {
        return(
            <div>
                <Icon
                  iconName="ExploreContent"
                  className="ms-Icon ms-IconExample"
                  onClick={this.props.onAddGroup}
                  title="add new rule group"
                />
                <Icon
                  iconName="ExploreContentSingle"
                  className="ms-Icon ms-IconExample"
                  onClick={this.props.onAddRule}
                  title="add new rule"
                />
              </div>
        );
    }
}