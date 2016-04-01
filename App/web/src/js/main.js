import React from 'react';
import ReactDOM from 'react-dom';
import Scaffold from './views/scaffold/scaffold';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppCanvas from 'material-ui/lib/app-canvas';
injectTapEventPlugin();

ReactDOM.render(<AppCanvas><Scaffold /></AppCanvas>, document.getElementById('main'));