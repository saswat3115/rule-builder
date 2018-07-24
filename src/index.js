import React from 'react';
import ReactDOM from 'react-dom';
import RuleBuilder from './components/ruleBuilder.jsx';
import {
  initializeIcons
} from '@uifabric/icons';
import './../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './css/index.css';
import './css/tree.css';
import './css/custom.css';
import './css/toolbar.css';
import './../node_modules/animate.css/animate.min.css';
import './../node_modules/office-ui-fabric-react/lib-amd/components/Icon/examples/IconExample.scss';
import './../node_modules/office-ui-fabric-react/lib-amd/components/ComboBox/examples/ComboBox.Basic.Example.scss';
import './../node_modules/office-ui-fabric-react/lib-amd/components/TextField/examples/TextField.Examples.scss';
import './../node_modules/office-ui-fabric-react/lib-amd/components/Modal/examples/Modal.Basic.Example.scss';
import data from './json-files/data.json';

initializeIcons();

ReactDOM.render( <
  RuleBuilder data = {
    data
  }
  />,
  document.getElementById('box')
);